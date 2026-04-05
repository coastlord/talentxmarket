import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { companyName, workEmail, roleHiringFor, urgency, candidateId, candidateRole } = body;

    // Validate required fields
    if (!companyName || !workEmail || !roleHiringFor) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const token = process.env.AIRTABLE_TOKEN;
    const baseId = process.env.AIRTABLE_BASE_ID;
    const tableId = process.env.AIRTABLE_EMPLOYER_REQUESTS_TABLE || 'Employers';

    if (!token || !baseId) {
      console.error('Missing Airtable env vars');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableId)}`;

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        records: [
          {
            fields: {
              'Company Name': companyName,
              'Email': workEmail,
              'Job Title / Role Hiring For': roleHiringFor,
              'Urgency': urgency || 'Not specified',
              'Candidate ID': candidateId || '',
              'Candidate Role': candidateRole || '',
              'Status': 'New',
              'Request Type': 'Profile Unlock',
            },
          },
        ],
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error('Airtable error:', JSON.stringify(data));
      return NextResponse.json({ error: 'Failed to record request' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Employer request error:', err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
