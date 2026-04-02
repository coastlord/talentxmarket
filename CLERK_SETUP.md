# Clerk Auth Setup — TalentX Market

Follow these steps BEFORE running the app. This takes about 10 minutes.

---

## Step 1 — Create a Clerk Account

1. Go to https://clerk.com and sign up (free)
2. Click **"Create application"**
3. Name it: `TalentX Market`
4. Select sign-in methods: **Email** only (uncheck Google/GitHub for now)
5. Click **Create application**

---

## Step 2 — Get Your API Keys

1. In the Clerk dashboard, go to **API Keys** (left sidebar)
2. Copy your **Publishable key** — looks like: `pk_test_...`
3. Copy your **Secret key** — looks like: `sk_test_...`

---

## Step 3 — Set Invitation-Only Mode

This is critical — stops anyone from signing up without your invite link.

1. In Clerk dashboard → **User & Authentication** → **Restrictions**
2. Under **Sign-up mode**, select **Invitation only**
3. Save

---

## Step 4 — Add Keys to Your Project

In your TalentX folder, open (or create) the file `.env.local` and add:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_YOUR_KEY_HERE
CLERK_SECRET_KEY=sk_test_YOUR_KEY_HERE

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

Replace `pk_test_YOUR_KEY_HERE` and `sk_test_YOUR_KEY_HERE` with your actual keys.

> ⚠️ Never commit .env.local to GitHub. It's already in .gitignore by default.

---

## Step 5 — Install Clerk

In your terminal, inside the TalentX folder, run:

```bash
npm install @clerk/nextjs
```

---

## Step 6 — Deploy to Vercel

After setting up locally, add the same environment variables to Vercel:

1. Go to your Vercel project → **Settings** → **Environment Variables**
2. Add:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` → your publishable key
   - `CLERK_SECRET_KEY` → your secret key
   - `NEXT_PUBLIC_CLERK_SIGN_IN_URL` → `/sign-in`
   - `NEXT_PUBLIC_CLERK_SIGN_UP_URL` → `/sign-up`
   - `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL` → `/dashboard`
   - `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL` → `/dashboard`
3. Redeploy

---

## How to Invite a Candidate

Once everything is live:

1. Clerk dashboard → **Users** → **Invitations**
2. Click **"Invite user"**
3. Enter candidate's email
4. Clerk sends them an invite link automatically
5. They land on your branded `/sign-up` page and create their account
6. After signup → redirected to `/dashboard`

---

## File Changes Made (already in your codebase)

| File | What it does |
|------|-------------|
| `middleware.ts` | Protects /dashboard and /admin — redirects to sign-in if not logged in |
| `app/layout.tsx` | Wraps app in ClerkProvider |
| `app/sign-up/[[...sign-up]]/page.tsx` | Premium invite-only sign-up page |
| `app/sign-in/[[...sign-in]]/page.tsx` | Sign-in page |
| `app/dashboard/page.tsx` | Candidate dashboard |
| `components/Navbar.tsx` | Updated with Sign In button + user avatar when logged in |
