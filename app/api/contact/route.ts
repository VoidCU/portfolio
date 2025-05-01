// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { name, email, msg } = await request.json();

    // Basic validation
    if (!name || !email || !msg) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, and msg are all required.' },
        { status: 400 }
      );
    }

    // TODO: replace with real email sending or database persistence
    console.log('📩 New contact form submission:', { name, email, msg });

    return NextResponse.json(
      { message: 'Your message was received. Thank you!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'There was an error processing your request.' },
      { status: 500 }
    );
  }
}
