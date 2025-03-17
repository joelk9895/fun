import { NextResponse } from "next/server";
import { headers } from "next/headers";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const headersList = await headers();
    
    // Get IP address (in production using a proxy like Nginx, use X-Forwarded-For)
    const ip = 
      headersList.get('x-forwarded-for') || 
      headersList.get('x-real-ip') ||
      'Unknown IP';

    // Add IP to logged data
    const logData = {
      ...body,
      ip,
      userAgent: headersList.get('user-agent') || 'Unknown',
    };

    // Log to console for development
    console.log(`User action logged:`, logData);

    // In a production environment, you might want to save this to a database

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error logging action:", error);
    return NextResponse.json(
      { success: false, message: "Failed to log action" },
      { status: 500 }
    );
  }
}
