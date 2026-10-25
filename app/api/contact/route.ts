import { NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '../../../lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, inquiryType, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    const submission = {
      name,
      email,
      inquiry_type: inquiryType || 'general',
      message,
      created_at: new Date().toISOString(),
      status: 'pending',
    };

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('inquiries').insert([submission]);
      if (error) {
        console.warn('Supabase inquiry insert note:', error.message);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Inquiry received successfully',
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Server error saving inquiry' },
      { status: 500 }
    );
  }
}
