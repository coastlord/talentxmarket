import { NextResponse } from 'next/server';

function getInitials(name: string): string {
  if (!name) return '??';
  const parts = name.trim().split(' ');
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + '.' + parts[parts.length - 1][0] + '.').toUpperCase();
}

export async function GET() {
  try {
    const token = process.env.AIRTABLE_TOKEN;
    const baseId = process.env.AIRTABLE_BASE_ID;
    const tableId = 'tblFf2SRxXXSruwZu';
    const formula = encodeURIComponent("AND({Status}='Active')");
    const url = `https://api.airtable.com/v0/${baseId}/${tableId}?filterByFormula=${formula}`;

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
      const rawCerts = record.fields?.['Professional Certifications'];
      const certifications = Array.isArray(rawCerts)
        ? rawCerts.filter(Boolean)
        : typeof rawCerts === 'string'
        ? rawCerts.split(',').map((c: string) => c.trim()).filter(Boolean)
        : [];

      const rawSkills = record.fields?.Skills;
      const skills = Array.isArray(rawSkills)
        ? rawSkills.filter(Boolean)
        : typeof rawSkills === 'string'
        ? rawSkills.split(',').map((s: string) => s.trim()).filter(Boolean)
        : [];

      return {
        id: record.id || String(i),
        initials: getInitials(record.fields?.Name || ''),
        specialism: record.fields?.Specialism || 'Compliance',
        seniority: record.fields?.Seniority || '',
        experience: record.fields?.Experience || '',
        location: record.fields?.Location || '',
        remote: record.fields?.Remote || false,
        type: record.fields?.['Employment Type'] || '',
        industry: record.fields?.Industry || '',
        availability: record.fields?.Availability === 'Available Now' ? 'now' : 'soon',
        skills,
        certifications,
      };
    });

    return NextResponse.json(sanitized);
  } catch (err) {
    console.error('Fetch error:', err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
