# CRM with AI Chatbot

Modern CRM application built with Next.js 16, featuring an integrated AI chatbot assistant powered by DeepSeek via Vercel AI Gateway.

## 🚀 Quick Start

1. **Clone the repository:**
   ```bash
   git clone https://github.com/sodown4thecause/CRM.git
   cd CRM
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file (see [SETUP.md](./SETUP.md) for detailed instructions):
   
   ```bash
   DATABASE_URL=your_neon_database_url
   BETTER_AUTH_SECRET=your_secret_here
   BETTER_AUTH_URL=http://localhost:3000
   NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
   AI_GATEWAY_API_KEY=your_gateway_api_key
   AI_GATEWAY_BASE_URL=https://ai-gateway.vercel.sh/v1/ai
   ```

4. **Set up the database:**
   ```bash
   npx @better-auth/cli generate
   npx drizzle-kit push
   ```

5. **Run the development server:**
   ```bash
   npm run dev
   ```

6. **Open [http://localhost:3000](http://localhost:3000)**

## ✨ Features

- 🎨 **Modern UI:** Built with Next.js 16, React 19, and Tailwind CSS v4
- 🤖 **AI Assistant:** Floating chatbot powered by DeepSeek v3.2
- 📊 **Contact Management:** Full CRM with contacts and leads tracking
- 🔐 **Authentication:** BetterAuth integration (UI to be implemented)
- 💾 **Database:** Neon PostgreSQL with Drizzle ORM
- ⚡ **Performance:** Turbopack for fast development

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (React 19, Turbopack, App Router)
- **Styling:** Tailwind CSS v4 with Tweakcn theme
- **Database:** Neon PostgreSQL
- **ORM:** Drizzle ORM
- **Auth:** BetterAuth
- **AI:** Vercel AI SDK 6 + DeepSeek via Vercel AI Gateway

## 📖 Documentation

For detailed setup instructions, deployment guide, and troubleshooting, see [SETUP.md](./SETUP.md).

## 🤖 AI Chatbot Capabilities

The AI assistant can help you:
- Search contacts by name, email, or company
- Get contact statistics and insights
- Provide natural language interface to your CRM data

## 📝 Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run start     # Start production server
npm run db:push   # Push database schema changes
```

## 🚢 Deployment

This project is ready for deployment on Vercel. See [SETUP.md](./SETUP.md#-deployment-on-vercel) for detailed deployment instructions.

## 📄 License

MIT

## 🙏 Credits

Built with modern web technologies and AI integration tools.
