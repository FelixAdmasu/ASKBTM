import { NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '../../../lib/supabase';
import { ContactInquiry } from '../../../lib/siteData';

// Server-side in-memory cache to ensure inquiries persist and show up in Admin even without DB setup
let memoryInquiries: ContactInquiry[] = [
  {
    id: 'INQ-1730001',
    name: 'Sara Tadesse',
    email: 'sara.t@example.com',
    phone: '+251 911 23 45 67',
    subject: 'Volunteer Work',
    message: 'Hello, I am a certified early childhood teacher and would love to volunteer in the afternoons at the Legatafo center.',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    status: 'new',
  },
  {
    id: 'INQ-1730002',
    name: 'Dr. Michael Chen',
    email: 'mchen@health-alliance.org',
    phone: '+1 415 555 0192',
    subject: 'Corporate Partnership',
    message: 'We are organizing pediatric health supplies and would like to arrange a delivery date for vitamin supplements.',
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    status: 'in-progress',
  },
  {
    id: 'INQ-1730003',
    name: 'Abebe Gebre',
    email: 'abebe.g@ethio.com',
    phone: '+251 922 45 67 89',
    subject: 'Donation & Sponsorship',
    message: 'I completed a transfer of 4,500 ETB via CBE branch for the Mother Loan fund. Reference: FREM-2025-MicroLoan-AbebeGebre.',
    createdAt: new Date(Date.now() - 3600000 * 72).toISOString(),
    status: 'replied',
  },
];

export async function GET() {
  try {
    if (isSupabaseConfigured && supabase) {
      let { data, error } = await supabase
        .from('contact_inquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error || !data) {
        const fallbackRes = await supabase
          .from('inquiries')
          .select('*')
          .order('created_at', { ascending: false });
        data = fallbackRes.data;
        error = fallbackRes.error;
      }

      if (!error && data && data.length > 0) {
        return NextResponse.json({ success: true, inquiries: data });
      }
    }
    return NextResponse.json({ success: true, inquiries: memoryInquiries });
  } catch (error: any) {
    return NextResponse.json({ success: true, inquiries: memoryInquiries });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required fields.' },
        { status: 400 }
      );
    }

    const newInquiry: ContactInquiry = {
      id: `INQ-${Date.now().toString().slice(-6)}`,
      name: name.trim(),
      email: email.trim(),
      phone: phone ? phone.trim() : undefined,
      subject: subject || 'General Question',
      message: message.trim(),
      createdAt: new Date().toISOString(),
      status: 'new',
    };

    // 1. Save to in-memory store
    memoryInquiries = [newInquiry, ...memoryInquiries];

    // 2. Save to Supabase if configured
    if (isSupabaseConfigured && supabase) {
      try {
        const payload = {
          id: newInquiry.id,
          name: newInquiry.name,
          email: newInquiry.email,
          phone: newInquiry.phone || null,
          subject: newInquiry.subject,
          message: newInquiry.message,
          created_at: newInquiry.createdAt,
          status: newInquiry.status,
        };
        const { error } = await supabase.from('contact_inquiries').insert([payload]);
        if (error) {
          await supabase.from('inquiries').insert([payload]);
        }
      } catch (err) {
        console.warn('Supabase inquiry insert note:', err);
      }
    }

    // 3. Forward to FormSubmit in background so owner gets the real email alert
    try {
      fetch('https://formsubmit.co/ajax/fadm94202@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: `New Inquiry from ASKBTM Website: ${newInquiry.subject}`,
          Name: newInquiry.name,
          Email: newInquiry.email,
          Phone: newInquiry.phone || 'Not provided',
          Topic: newInquiry.subject,
          Message: newInquiry.message,
          ReferenceId: newInquiry.id,
        }),
      }).catch((e) => console.warn('FormSubmit background note:', e));
    } catch (e) {
      // background forward error shouldn't fail user experience
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your message has been received by Sister Sirgutemikael and our Legatafo team.',
      inquiry: newInquiry,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Server error saving inquiry.' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: 'ID and status required' }, { status: 400 });
    }

    memoryInquiries = memoryInquiries.map((inq) =>
      inq.id === id ? { ...inq, status } : inq
    );

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('contact_inquiries').update({ status }).eq('id', id);
      if (error) {
        await supabase.from('inquiries').update({ status }).eq('id', id);
      }
    }

    return NextResponse.json({ success: true, message: 'Status updated' });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Update failed' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400 });
    }

    memoryInquiries = memoryInquiries.filter((inq) => inq.id !== id);

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('contact_inquiries').delete().eq('id', id);
      if (error) {
        await supabase.from('inquiries').delete().eq('id', id);
      }
    }

    return NextResponse.json({ success: true, message: 'Inquiry deleted' });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Delete failed' }, { status: 500 });
  }
}
