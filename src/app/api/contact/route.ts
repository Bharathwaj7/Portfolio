import { NextResponse } from 'next/server';
import { contactSchema, rateLimiter, getClientIP } from '@/lib/validation';
import { insertContactSubmission } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    // Parse request body
    const body = await request.json();

    // Check honeypot field (spam protection)
    if (body.honeypot) {
      return NextResponse.json(
        { error: 'Spam detected' },
        { status: 400 }
      );
    }

    // Validate input
    const validatedData = contactSchema.parse(body);

    // Get client IP for rate limiting
    const clientIP = getClientIP(request);

    // Check rate limiting
    if (rateLimiter.isRateLimited(clientIP)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Prepare submission data
    const submissionData = {
      name: validatedData.name,
      email: validatedData.email,
      message: validatedData.message,
      ip_address: clientIP,
      user_agent: request.headers.get('user-agent') || '',
      status: 'unread'
    };

    // Insert into Supabase
    await insertContactSubmission(submissionData);

    return NextResponse.json(
      { success: true, message: 'Message sent successfully!' },
      { status: 200 }
    );
  } catch (error) {
    // Handle Zod validation errors
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation failed', details: error.message },
        { status: 400 }
      );
    }

    // Handle other errors
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Disable caching for this route
export const dynamic = 'force-dynamic';