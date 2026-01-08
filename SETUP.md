# CRM with AI Chatbot - Setup Guide

## 🎯 Project Overview

Modern CRM application built with Next.js 16, featuring an integrated AI chatbot assistant that can search contacts and provide CRM insights using Vercel AI SDK 6 and DeepSeek via Vercel AI Gateway.

## 📋 Prerequisites

- Node.js 18+ installed
- Neon PostgreSQL database ([Create free account](https://neon.tech))
- Vercel AI Gateway configured with DeepSeek model ([Setup guide](https://vercel.com/docs/ai/ai-gateway))

## 🚀 Quick Start

### 1. Environment Configuration

Create a `.env` file in the project root (**Note:** `.env` is in `.gitignore` and won't be committed):

```bash
# Database - Get this from your Neon dashboard
DATABASE_URL=postgresql://username:password@your-neon-host/database

# Better Auth
# Generate with: openssl rand -hex 32
BETTER_AUTH_SECRET=your_secret_here
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000

# Vercel AI Gateway - DeepSeek
# Get these from your Vercel AI Gateway settings
AI_GATEWAY_API_KEY=your_gateway_api_key
AI_GATEWAY_BASE_URL=https://ai-gateway.vercel.sh/v1/ai
```

**Generate BETTER_AUTH_SECRET:**
```bash
openssl rand -hex 32
```

### 2. Database Setup

Generate BetterAuth schema:
```bash
npx @better-auth/cli generate
```

Push schema to Neon database:
```bash
npx drizzle-kit push
```

### 3. Start Development Server

```bash
npm run dev
```

Visit http://localhost:3000

## 🏗️ Project Structure

```
crm/
├── app/
│   ├── (auth)/              # Authentication routes (to be added)
│   ├── (dashboard)/         # Protected dashboard routes
│   │   ├── dashboard/       # Home page
│   │   ├── contacts/        # Contacts management
│   │   └── layout.tsx       # Dashboard layout with sidebar
│   ├── api/
│   │   └── chat/           # AI chatbot endpoint (DeepSeek)
│   ├── layout.tsx           # Root layout
│   └── page.tsx            # Home page (redirects to dashboard)
├── components/
│   ├── chatbot/            # Floating AI chatbot
│   └── ui/                 # Reusable UI components
├── db/
│   ├── schema/             # Database schema definitions
│   │   ├── crm.ts         # CRM tables (contacts, leads)
│   │   └── auth.ts        # BetterAuth tables (auto-generated)
│   ├── index.ts           # Drizzle instance
│   └── drizzle.config.ts  # Drizzle config
├── lib/
│   ├── auth.ts            # BetterAuth instance
│   ├── auth-client.ts     # Client-side auth helpers
│   └── utils.ts           # Utility functions
├── middleware.ts          # Route protection
├── index.css             # Tailwind v4 with Tweakcn theme
└── tsconfig.json         # TypeScript config
```

## 🎨 Tech Stack

- **Framework:** Next.js 16 (React 19, Turbopack, App Router)
- **Styling:** Tailwind CSS v4 (Zero-config, CSS-native variables)
- **UI:** Custom components with Tweakcn theme
- **Database:** Neon (PostgreSQL)
- **ORM:** Drizzle ORM
- **Auth:** BetterAuth
- **AI:** Vercel AI SDK 6 with DeepSeek via Vercel AI Gateway

## 🤖 AI Chatbot Features

The floating AI assistant (bottom-right corner) uses **DeepSeek v3.2** via Vercel AI Gateway and can:

- **Search Contacts:** Find contacts by name, email, or company
- **Get Stats:** Provide contact statistics and insights
- **Natural Language:** Understand conversational queries

**Example queries:**
- "Show me all contacts from Acme Corp"
- "How many contacts do I have?"
- "Find contacts with status 'lead'"

## 📝 Available Scripts

```bash
npm run dev       # Start development server with Turbopack
npm run build     # Build for production
npm run start     # Start production server
npm run lint      # Run ESLint
npm run db:generate  # Generate Drizzle migrations
npm run db:migrate   # Run database migrations
npm run db:push      # Push schema changes to database
```

## 🚢 Deployment on Vercel

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: CRM with AI Chatbot"
   git remote add origin https://github.com/sodown4thecause/CRM.git
   git push -u origin main
   ```

2. **Deploy on Vercel:**
   - Import your GitHub repository
   - Add environment variables in Vercel dashboard:
     - `DATABASE_URL` (from Neon)
     - `BETTER_AUTH_SECRET` (generate new one)
     - `BETTER_AUTH_URL` (your Vercel URL)
     - `NEXT_PUBLIC_BETTER_AUTH_URL` (your Vercel URL)
     - `AI_GATEWAY_API_KEY` (from Vercel AI Gateway)
     - `AI_GATEWAY_BASE_URL` (https://ai-gateway.vercel.sh/v1/ai)

3. **Set up Neon Database for Production:**
   - Create a new Neon project for production
   - Copy the connection string to Vercel env vars
   - Run `npx drizzle-kit push` to create tables

## 🔐 Authentication (To Be Implemented)

BetterAuth is configured but requires UI implementation:

1. Create signup/login pages in `app/(auth)/`
2. Implement sign-up form
3. Implement sign-in form
4. Add sign-out functionality to dashboard header

## 🐛 Troubleshooting

**Database connection issues:**
- Verify `DATABASE_URL` is correct
- Check Neon database is active
- Ensure network allows connections

**AI chatbot not working:**
- Verify `AI_GATEWAY_API_KEY` is set
- Check Vercel AI Gateway configuration
- Verify DeepSeek model is enabled in gateway
- Check browser console for errors

**Build errors:**
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`

## 📚 Next Steps

1. **Implement Auth UI:** Create login/signup pages
2. **Add Server Actions:** Create contact/lead mutations
3. **Enhance Chatbot:** Add more tools (create contact, update lead)
4. **Error Handling:** Add error boundaries and loading states
5. **Mobile Responsive:** Optimize for mobile devices
6. **Add Shadcn UI:** Replace custom components with Shadcn

## 📖 Documentation

- [Next.js 16 Docs](https://nextjs.org/docs)
- [Tailwind CSS v4](https://tailwindcss.com/docs/v4-beta)
- [Drizzle ORM](https://orm.drizzle.team)
- [BetterAuth](https://www.better-auth.com)
- [Vercel AI SDK 6](https://sdk.vercel.ai/docs)
- [Vercel AI Gateway](https://vercel.com/docs/ai/ai-gateway)
- [Neon Database](https://neon.tech/docs)

## 🙏 Credits

- **Tweakcn Theme:** Modern color scheme with amber primary
- **Lucide Icons:** Beautiful icon library
- **Vercel AI SDK:** Powerful AI integration tools
- **DeepSeek:** Advanced reasoning AI model
