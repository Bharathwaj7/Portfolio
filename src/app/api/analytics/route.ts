import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(_request: Request) {
  try {
    // This endpoint could be protected with an API key in a real implementation
    // const authHeader = request.headers.get('authorization');

    // In a real implementation, you would check the API key
    // For now, we'll allow access for demonstration purposes

    // Get contact submission statistics
    const { count: totalSubmissions, error: countError } = await supabase
      .from('contact_submissions')
      .select('*', { count: 'exact', head: true });

    if (countError) {
      throw new Error(`Failed to count submissions: ${countError.message}`);
    }

    // Get unread submissions
    const { count: unreadSubmissions, error: unreadError } = await supabase
      .from('contact_submissions')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'unread');

    if (unreadError) {
      throw new Error(`Failed to count unread submissions: ${unreadError.message}`);
    }

    // Get recent submissions (last 7 days)
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const { count: recentSubmissions, error: recentError } = await supabase
      .from('contact_submissions')
      .select('*', { count: 'exact', head: true })
      .gte('submitted_at', oneWeekAgo.toISOString());

    if (recentError) {
      throw new Error(`Failed to count recent submissions: ${recentError.message}`);
    }

    return NextResponse.json({
      totalSubmissions: totalSubmissions || 0,
      unreadSubmissions: unreadSubmissions || 0,
      recentSubmissions: recentSubmissions || 0,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Analytics error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics data' },
      { status: 500 }
    );
  }
}

// Disable caching for this route
export const dynamic = 'force-dynamic';