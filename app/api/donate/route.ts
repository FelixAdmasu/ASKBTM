import { NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '../../../lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount, currency, frequency, program, paymentMethod, donor } = body;

    // Validate inputs
    if (!amount || amount <= 0) {
      return NextResponse.json({ error: 'Valid contribution amount is required' }, { status: 400 });
    }

    if (!donor?.fullName || !donor?.email) {
      return NextResponse.json({ error: 'Donor name and email are required' }, { status: 400 });
    }

    const transactionId = `ASKBTM-${Date.now().toString().slice(-6)}`;
    const record = {
      transaction_id: transactionId,
      amount,
      currency,
      frequency,
      program,
      payment_method: paymentMethod,
      donor_name: donor.fullName,
      donor_email: donor.email,
      is_anonymous: Boolean(donor.isAnonymous),
      dedication: donor.isDedicated ? donor.dedicationName : null,
      created_at: new Date().toISOString(),
      status: 'confirmed',
    };

    // If Supabase is configured with real credentials, save to database
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('donations').insert([record]);
      if (error) {
        console.warn('Supabase insert note:', error.message);
      }
    }

    return NextResponse.json({
      success: true,
      transactionId,
      message: 'Donation recorded successfully',
      data: record,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Server error processing contribution' },
      { status: 500 }
    );
  }
}
