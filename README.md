# 🎨 AI Time Capsule Studio

> Create meaningful time capsules with AI-powered reflections for your future self

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://ai-time-capsule-studio.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)](https://tailwindcss.com/)

## 🌐 Live Demo

**[Try it now →](https://ai-time-capsule-studio.vercel.app)**

## ✨ Features

- 📸 **Photo Upload** - Capture meaningful moments with drag-and-drop support
- 😊 **Mood Selection** - Track your emotional state with interactive mood cards
- 💭 **Personal Intentions** - Write messages to your future self (up to 500 characters)
- 🤖 **AI-Powered Reflections** - Get personalized insights powered by Google Gemini AI
- ⏳ **Time-Locked Capsules** - Set custom unlock dates (days, weeks, months, or years)
- 🎉 **Unlock Animations** - Beautiful confetti effects and smooth reveal animations
- 📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile devices
- 🎨 **Modern UI** - Gradient designs, glassmorphism effects, and smooth transitions

## 🚀 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui
- **Animations:** Framer Motion
- **AI:** Google Gemini API
- **Icons:** Lucide React
- **Notifications:** Sonner
- **Confetti:** Canvas Confetti
- **Deployment:** Vercel

## 🎯 Key Highlights

This project showcases:

✅ **Modern React Patterns** - Server Components and Client Components architecture  
✅ **Real AI Integration** - Google Gemini API for personalized reflections  
✅ **Complex State Management** - Multi-step form with validation and persistence  
✅ **Advanced Animations** - Framer Motion for page transitions and micro-interactions  
✅ **Responsive Design** - Mobile-first approach with Tailwind CSS  
✅ **Type Safety** - Full TypeScript implementation  
✅ **Clean Architecture** - Organized component structure and code separation  

## 🛠️ Installation

```bash
# Clone the repository
git clone https://github.com/midhat81/ai-time-capsule-studio.git

# Navigate to project directory
cd ai-time-capsule-studio

# Install dependencies
npm install

# Create .env.local file
echo "GEMINI_API_KEY=your_api_key_here" > .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## 🔑 Environment Variables

Create a `.env.local` file in the root directory:

```env
GEMINI_API_KEY=your_gemini_api_key
```

Get your free API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

## 📁 Project Structure

```
ai-time-capsule-studio/
├── app/
│   ├── actions/              # Server actions (AI generation)
│   │   └── generate-reflection.ts
│   ├── capsule/[id]/        # Dynamic capsule pages
│   │   └── page.tsx
│   ├── create/              # Creation flow
│   │   ├── _components/     # Step components
│   │   │   ├── step-progress.tsx
│   │   │   ├── upload-photo.tsx
│   │   │   ├── mood-selector.tsx
│   │   │   ├── intention-input.tsx
│   │   │   ├── capsule-preview.tsx
│   │   │   └── lock-capsule.tsx
│   │   └── page.tsx
│   ├── layout.tsx           # Root layout with toast provider
│   ├── page.tsx             # Landing page
│   └── globals.css          # Global styles
├── components/
│   └── ui/                  # shadcn/ui components
├── lib/
│   └── utils.ts             # Utility functions
├── public/                  # Static assets
└── package.json
```

## 🎨 Design Philosophy

- **User-First:** Intuitive, guided six-step experience
- **Delightful:** Thoughtful animations and micro-interactions
- **Emotional:** Connects users with their future selves through AI
- **Modern:** Clean, contemporary design with gradients and glassmorphism

## 🎬 User Journey

1. **Landing** - Hero section with clear call-to-action
2. **Upload** - Drag-and-drop photo upload with preview
3. **Mood** - Select from 6 emotional states with animated cards
4. **Intention** - Write a message with character counter
5. **Preview** - Review capsule with AI preview message
6. **Lock** - Set unlock date and seal the capsule
7. **View** - Countdown timer with blurred photo
8. **Unlock** - Confetti celebration with AI-generated reflection

## 🚀 Deployment

This project is deployed on Vercel with:
- Automatic deployments from the main branch
- Environment variables configured
- Edge runtime for optimal performance

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/midhat81/ai-time-capsule-studio)

## 🧪 Testing

To test the unlock feature immediately:
1. Create a capsule and set unlock date to 1 day
2. Open browser DevTools (F12) → Console
3. Run this code (replace with your capsule ID):
```javascript
const id = "capsule-xxxxx";
const data = JSON.parse(localStorage.getItem(id));
data.unlockDate = "2026-01-02T00:00:00.000Z";
localStorage.setItem(id, JSON.stringify(data));
location.reload();
```

## 📝 Future Enhancements

- [ ] Email notifications when capsules unlock
- [ ] User authentication (Clerk/Auth.js)
- [ ] Database integration (MongoDB/Supabase)
- [ ] Public/private capsule sharing
- [ ] Voice message recording
- [ ] Multiple photos per capsule
- [ ] Collaborative capsules with friends
- [ ] Export capsule as PDF
- [ ] Analytics dashboard

## 🐛 Known Issues

- LocalStorage used for MVP (data resets on browser clear)
- Photo stored as blob URL (consider cloud storage for production)
- No auth (anyone can access any capsule URL)

## 💡 What I Learned

- Next.js 16 App Router and Server Actions
- Google Gemini AI API integration
- Complex multi-step form state management
- Advanced Framer Motion animations
- TypeScript with React best practices
- Production deployment workflows

## 👨‍💻 Developer

**Muhammad Midhat**

- GitHub: [@midhat81](https://github.com/midhat81)
- LinkedIn: [Connect with me](https://linkedin.com/in/muhammadmidhat81)

## 📄 License

MIT License - feel free to use this project for learning and portfolio purposes!

## 🙏 Acknowledgments

- Design inspiration from modern SaaS landing pages
- AI powered by Google Gemini
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

<div align="center">

**⭐ Star this repo if you found it helpful!**

Made with ❤️ and ☕ by Muhammad Midhat

[Live Demo](https://ai-time-capsule-studio.vercel.app) • [Report Bug](https://github.com/midhat81/ai-time-capsule-studio/issues) • [Request Feature](https://github.com/midhat81/ai-time-capsule-studio/issues)

</div>
