# TalentX Market

The compliance talent marketplace — connecting AML, Risk, MLRO, and Trust & Safety professionals with the organisations that need them.

🌐 [talentxmarket.com](https://talentxmarket.com)

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Forms**: Tally.so (embedded)
- **Deployment**: Vercel
- **Version Control**: GitHub

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Install & Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 🔧 Configuration

### Tally.so Forms

In `components/SignUp.tsx`, replace the form IDs with your actual Tally form IDs:

```typescript
const PROFESSIONAL_FORM_ID = 'YOUR_FORM_ID'; // "Open to Work" form
const EMPLOYER_FORM_ID = 'YOUR_FORM_ID';     // "Hiring / Post Vacancy" form
```

To get your Tally form ID:
1. Go to [tally.so](https://tally.so) and create/open your form
2. Click **Share** → **Embed**
3. Copy the ID from the embed URL (e.g., `https://tally.so/embed/wkPzVB` → ID is `wkPzVB`)

## 🚀 Deploying to Vercel

1. Push this project to a GitHub repository
2. Go to [vercel.com](https://vercel.com) → **Add New Project**
3. Import your GitHub repository
4. Vercel auto-detects Next.js — click **Deploy**
5. Add your custom domain `talentxmarket.com` in Vercel's domain settings

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx      # Root layout, metadata, fonts
│   ├── page.tsx        # Main page (assembles all sections)
│   └── globals.css     # Global styles & Tailwind directives
├── components/
│   ├── Navbar.tsx      # Sticky navigation
│   ├── Hero.tsx        # Hero section
│   ├── StatsBar.tsx    # Key statistics
│   ├── HowItWorks.tsx  # Step-by-step guide (tabbed)
│   ├── ComplianceRoles.tsx  # Roles/specialisms grid
│   ├── WhyTalentX.tsx  # Features & benefits
│   ├── Testimonials.tsx # Social proof
│   ├── About.tsx       # About section
│   ├── SignUp.tsx      # Tally.so form embeds
│   └── Footer.tsx      # Footer
├── public/
│   ├── logo-dark.png   # Dark logo (for light backgrounds)
│   └── logo-light.png  # Light logo (for dark backgrounds)
└── ...config files
```

## 🎨 Design System

| Token | Value |
|---|---|
| Brand Black | `#0A0A0A` |
| Brand Gold | `#C9A84C` |
| Gold Light | `#E8C96A` |
| Off White | `#F8F8F6` |

---

Built with ❤️ for the compliance community.
