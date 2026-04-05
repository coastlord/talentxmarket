import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';

export async function POST(req: Request) {
  try {
    // 1. Auth — get the logged-in user's email from Clerk
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const email = user.emailAddresses[0]?.emailAddress;
    if (!email) {
      return NextResponse.json({ error: 'No email on account' }, { status: 400 });
    }

    // 2. Parse the profile payload from the dashboard form
    const body = await req.json();
    const {
      title,
      experience,
      location,
      specialisms,
      certifications,
      salaryAmount,
      salaryCurrency,
      salaryPeriod,
      workPreference,
      bio,
      currentCompany,
      previousCompany,
      education,
      isVisible,
    } = body;

    const token = process.env.AIRTABLE_TOKEN;
    const baseId = process.env.AIRTABLE_BASE_ID;
    const tableId = process.env.AIRTABLE_TABLE_ID || 'Professionals';

    // 3. Look up the candidate's existing record by email
    const searchUrl = `https://api.airtable.com/v0/${baseId}/${tableId}?filterByFormula=${encodeURIComponent(`{Email}="${email}"`)}`;
    const searchRes = await fetch(searchUrl, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    });
    const searchData = await searchRes.json();

    // 4. Build the fields object — only include non-empty values
    const fields: Record<string, unknown> = {};

    if (title)           fields['Role'] = title;
    if (experience)      fields['Years of Experience'] = experience;
    if (location)        fields['Location'] = location;
    if (workPreference)  fields['Employment Type'] = workPreference;

    // Availability status driven by the visibility toggle
    fields['Availability Status'] = isVisible ? 'Available Now' : 'Not Available';

    // Multi-select arrays — only write if non-empty
    if (Array.isArray(specialisms) && specialisms.length > 0) {
      fields['Skills'] = specialisms;
    }
    if (Array.isArray(certifications) && certifications.length > 0) {
      fields['Professional Certifications'] = certifications;
    }

    // Optional text fields (may not exist in all Airtable bases yet)
    if (bio)             fields['Summary'] = bio;
    if (currentCompany)  fields['Current Company'] = currentCompany;
    if (previousCompany) fields['Previous Company'] = previousCompany;
    if (education)       fields['Education'] = education;
    if (salaryAmount) {
      fields['Salary Expectation'] =
        `${salaryCurrency} ${Number(salaryAmount).toLocaleString()} / ${salaryPeriod}`;
    }

    let result;

    if (searchData.records && searchData.records.length > 0) {
      // 5a. Record exists — PATCH it
      const recordId = searchData.records[0].id;
      const patchUrl = `https://api.airtable.com/v0/${baseId}/${tableId}/${recordId}`;
      const patchRes = await fetch(patchUrl, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fields }),
      });
      result = await patchRes.json();

      if (!patchRes.ok) {
        console.error('Airtable PATCH error:', result);
        // Return a soft error so the UI still shows success to the user
        return NextResponse.json(
          { error: 'Airtable update failed', detail: result },
          { status: 500 }
        );
      }
    } else {
      // 5b. No record found — CREATE one with email attached
      fields['Email'] = email;
      const createUrl = `https://api.airtable.com/v0/${baseId}/${tableId}`;
      const createRes = await fetch(createUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fields }),
      });
      result = await createRes.json();

      if (!createRes.ok) {
        console.error('Airtable POST error:', result);
        return NextResponse.json(
          { error: 'Airtable create failed', detail: result },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({ success: true, id: result.id });
  } catch (err) {
    console.error('Profile save error:', err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
