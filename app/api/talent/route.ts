import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const token = process.env.AIRTABLE_TOKEN;
    const baseId = process.env.AIRTABLE_BASE_ID;
    const tableId = process.env.AIRTABLE_TABLE_ID || 'Professionals';
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

    const sanitized = (data.records || []).map((record: any, i: number) => {
      const fullName: string = record.fields?.['Full Name'] || record.fields?.['Name'] || '';
      const nameParts = fullName.trim().split(' ').filter(Boolean);
      let initials = 'TX';
      if (nameParts.length === 1) initials = nameParts[0].slice(0, 2).toUpperCase();
      else if (nameParts.length >= 2)
        initials = (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase();

      const rawSkills = record.fields?.['Skills'];
      const skills: string[] = Array.isArray(rawSkills)
        ? rawSkills
        : typeof rawSkills === 'string'
        ? rawSkills.split(',').map((s: string) => s.trim()).filter(Boolean)
        : [];

      const rawCerts = record.fields?.['Professional Certifications'];
      const certifications: string[] = Array.isArray(rawCerts)
        ? rawCerts
        : typeof rawCerts === 'string'
        ? rawCerts.split(',').map((s: string) => s.trim()).filter(Boolean)
        : [];

      return {
        id: record.id || String(i),
        initials,
        availabilityStatus: record.fields?.['Availability Status'] || 'Available Now',
        role: record.fields?.['Role'] || record.fields?.['Job Title'] || 'Compliance Professional',
        location: record.fields?.['Location'] || '',
        industry: record.fields?.['Industry'] || '',
        employmentType: record.fields?.['Employment Type'] || '',
        experience: record.fields?.['Years of Experience'] || '',
        skills,
        certifications,
        headline: record.fields?.['Professional Summary'] || record.fields?.['Headline'] || record.fields?.['Bio'] || '',
      };
    });

    return NextResponse.json(sanitized);
  } catch (err) {
    console.error('Fetch error:', err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
