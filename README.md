# F1-Themed 3D Portfolio Website

An interactive, high-performance portfolio website with a Formula 1 theme featuring a 3D interactive car model built with Next.js, React Three Fiber, and Tailwind CSS.

## Features

- **Interactive 3D F1 Car**: Fully interactive 3D model with hotspots for information
- **Scroll-Based Animations**: Camera moves along a virtual racetrack as you scroll
- **F1 HUD Overlay**: Real-time speedometer, lap counter, and telemetry data
- **Responsive Design**: Works on all device sizes with simplified 3D for mobile
- **Performance Optimized**: LOD systems, frustum culling, and adaptive quality
- **Supabase Integration**: Contact form with database storage
- **Post-Processing Effects**: Bloom, depth of field, and color grading

## Technologies Used

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **3D Graphics**: Three.js, React Three Fiber, Drei
- **Animations**: Framer Motion
- **Backend**: Supabase (Database, Authentication)
- **Deployment**: Vercel
- **Validation**: Zod

## Project Structure

```
/src
  /app              # Next.js app router pages and API routes
  /components       # React components
  /lib              # Utility functions and Supabase client
  /public           # Static assets (3D models, textures)
  /styles           # Global CSS styles
```

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd f1-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file with your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 3D Assets

Place your F1 car model in `/public/models/f1-car.glb`. The model should include named meshes for:
- `body` or `chassis` - Main car body
- `wing` or `accent` - Wing components
- `light` or `led` - Light components

Textures should be placed in `/public/textures/`.

## Deployment

1. **Deploy to Vercel**
   - Connect your GitHub repository to Vercel
   - Set environment variables in Vercel dashboard
   - Deploy!

2. **Supabase Setup**
   - Create a Supabase project
   - Set up the contact submissions table:
     ```sql
     CREATE TABLE contact_submissions (
       id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
       name VARCHAR(255) NOT NULL,
       email VARCHAR(255) NOT NULL,
       message TEXT NOT NULL,
       submitted_at TIMESTAMP DEFAULT NOW(),
       ip_address VARCHAR(45),
       user_agent TEXT,
       status VARCHAR(50) DEFAULT 'unread'
     );
     ```

## Performance Optimization

The website implements several performance optimizations:
- Level of Detail (LOD) system for 3D models
- Draco compression for GLB files
- Frustum and occlusion culling
- Adaptive quality settings based on device capabilities
- Geometry merging for static environments
- Texture atlasing for repeated elements
- Render throttling for mobile devices

## Customization

### Colors
- **F1 Red**: `#E10600`
- **Neon Blue**: `#00F5FF`
- **Matte Black**: `#0A0A0A`

### Fonts
- Primary: Geist Sans (via Next.js Font)
- Monospace: Geist Mono (via Next.js Font)

## API Endpoints

- `POST /api/contact` - Submit contact form
- `GET /api/health` - Health check endpoint
- `GET /api/analytics` - Analytics data (admin only)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.