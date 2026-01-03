import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sparkles, Clock, Heart } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50 flex flex-col">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-violet-600" />
          <h1 className="text-xl font-semibold text-gray-900">AI Time Capsule</h1>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 container mx-auto px-4 flex flex-col items-center justify-center text-center">
        <div className="max-w-3xl space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-violet-200 shadow-sm">
            <Sparkles className="w-4 h-4 text-violet-600" />
            <span className="text-sm font-medium text-gray-700">AI-Powered Memory Preservation</span>
          </div>

          {/* Headline */}
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
            Send a message to your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-pink-600">
              future self
            </span>
          </h2>

          {/* Subheadline */}
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Upload a photo, set your intention, and let AI transform it into a time capsule. 
            Lock it away and rediscover it when the time is right.
          </p>

          {/* CTA Button */}
          <div className="pt-4">
            <Link href="/create">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Create Your Capsule
                <Sparkles className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 pt-12">
            <FeatureCard
              icon={<Sparkles className="w-6 h-6 text-violet-600" />}
              title="AI Transformation"
              description="Your photo gets reimagined with artistic AI styling"
            />
            <FeatureCard
              icon={<Clock className="w-6 h-6 text-violet-600" />}
              title="Time-Locked"
              description="Set a future date and wait for the reveal moment"
            />
            <FeatureCard
              icon={<Heart className="w-6 h-6 text-violet-600" />}
              title="Personal Journey"
              description="Capture your intentions and rediscover them later"
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-6 text-center text-sm text-gray-500">
        <p>Built with Next.js, Tailwind CSS, and AI magic ✨</p>
      </footer>
    </div>
  );
}

function FeatureCard({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
}) {
  return (
    <div className="bg-white/60 backdrop-blur-sm border border-violet-100 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex justify-center mb-3">{icon}</div>
      <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}