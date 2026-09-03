# SellQ AI — Premium Co-pilot SaaS Hub

![SellQ AI Cover](https://via.placeholder.com/1200x630/0a0e1a/8b5cf6?text=SellQ+AI+Dashboard)

**One inbox. Every customer. AI-powered replies.**
SellQ unifies WhatsApp, Instagram, and Website Chat into one AI-powered inbox that replies, detects leads, and never sleeps. Built with a stunning dark-mode glassmorphic aesthetic.

## 🚀 Features

- **Omnichannel Inbox**: Unifies WhatsApp, Instagram, and Website chat.
- **AI Autopilot**: Automatically draft or autonomously send responses using custom knowledge.
- **Lead Detection Engine**: Automatically flags high-intent conversations.
- **Sentiment Analysis**: Tracks customer mood in real-time.
- **Knowledge Base**: Train your AI on custom business logic and policies.
- **Premium Analytics**: Track messages, response times, and lead conversion rates.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) + Custom Glassmorphism
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Database / Auth**: [Supabase](https://supabase.com/)
- **AI Models**: Google Gemini (gemini-1.5-flash)

## 🏁 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Setup
Copy `.env.local` or create it, and fill in your keys:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
GEMINI_API_KEY=your_gemini_api_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```
*(Note: GEMINI_API_KEY must NOT have the NEXT_PUBLIC_ prefix, to ensure it remains strictly server-side.)*

### 3. Get API Keys
- Get your free Gemini API key at: [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
- Set up a [Supabase project](https://supabase.com/) and run the provided `supabase/schema.sql`.

### 4. Run Development Server
```bash
npm run dev
```
Navigate to `http://localhost:3000`.

## 🧪 Demo Mode

To instantly explore the fully seeded experience without external setup, use the **Demo Login**:
- **Email:** `demo@sellq.ai`
- **Password:** `demo1234`
- Click **"✨ Try Demo"** on the login screen for an automated login experience.

## 📱 Mobile Responsiveness
SellQ features a tailored mobile layout with a bottom tab bar and optimized single-column inbox for on-the-go agent support. All cards stack gracefully, and touch targets are optimized for mobile.

## 📄 License
MIT License
