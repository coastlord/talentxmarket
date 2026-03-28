import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const token = process.env.AIRTABLE_TOKEN;
    const baseId = process.env.AIRTABLE_BASE_ID;
    const tableId = 'tbl6LDd5SZ8La5Vom';
    const url = `https://api.airtable.com/v0/${baseId}/${tableId}`;

    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    });

    const data = await res.json();

    if (!res.ok) {
      console.error('Airtable error:', data);
      return NextResponse.json({ error: data }, { status: 500 });
    }

    const sanitized = (data.records || []).map((record, i) => ({
      id: record.id || String(i),
      companyName: record.fields?.['Company Name'] || 'Confidential',
      jobTitle: record.fields?.['Job Title / Role Hiring For'] || 'Compliance Role',
      workLocation: record.fields?.['Work Location'] || '',
      employmentType: record.fields?.['Employment Type'] || '',
      location: record.fields?.['Location'] || '',
      salary: record.fields?.['Salary / Rate Budget'] || '',
      experience: record.fields?.['Years of Experience Required'] || '',
      jurisdictions: record.fields?.['Required Jurisdictions'] || '',
      certifications: record.fields?.['Required Certifications'] || '',
      postedAt: record.createdTime || '',
    }));

    return NextResponse.json(sanitized);
  } catch (err) {
    console.error('Fetch error:', err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
