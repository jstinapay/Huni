import { type LucideIcon, Film, Music, Radio, Headphones, Mic, BookOpen } from "lucide-react";

export interface QuickAction {
  title: string;
  description: string;
  gradient: string;
  href: string;
  icon: LucideIcon;
};

export const quickActions: QuickAction[] = [
  {
    title: "YouTube Narration",
    description: "Create engaging voiceovers for your next video",
    gradient: "from-cyan-400 to-cyan-50",
    icon: Film,
    href: "/text-to-speech?text=Hidden beneath the Pacific Ocean lies one of the least explored places on Earth: the Mariana Trench. Deeper than Mount Everest is tall, this mysterious world is home to extraordinary creatures that thrive under crushing pressure and complete darkness.",
  },
  {
    title: "TikTok Voiceover",
    description: "Generate viral short-form content with AI voices",
    gradient: "from-pink-400 to-pink-100",
    icon: Music,
    href: "/text-to-speech?text=Stop scrolling! Here's a productivity trick that takes less than two minutes. Before starting any task, write down the very first action you need to take. It eliminates decision fatigue and makes getting started almost effortless.",
  },
  {
    title: "Product Advertisement",
    description: "Produce professional ads for brands and businesses",
    gradient: "from-violet-500 to-violet-100",
    icon: Radio,
    href: "/text-to-speech?text=Meet the all-new Nova Wireless Earbuds. Enjoy crystal-clear audio, up to thirty hours of battery life, and active noise cancellation that keeps you focused wherever you go. Upgrade your listening experience today.",
  },
  {
    title: "Customer Support",
    description: "Build polished IVR and phone system greetings",
    gradient: "from-orange-400 to-orange-100",
    icon: Headphones,
    href: "/text-to-speech?text=Thank you for calling Horizon Telecom. Your call is important to us. For billing, press one. For technical support, press two. To speak with a customer representative, please stay on the line.",
  },
  {
    title: "Podcast Intro",
    description: "Hook listeners with a polished opening",
    gradient: "from-blue-500 to-blue-100",
    icon: Mic,
    href: "/text-to-speech?text=Welcome to Beyond the Code, the podcast where technology meets creativity. Every week we explore the latest breakthroughs in AI, software development, and digital innovation through conversations with industry experts and inspiring creators.",
  },
  {
    title: "E-Learning Lesson",
    description: "Turn educational content into natural narration",
    gradient: "from-lime-400 to-lime-100",
    icon: BookOpen,
    href: "/text-to-speech?text=Welcome to today's lesson on photosynthesis. In this module, you'll learn how plants convert sunlight, water, and carbon dioxide into the energy they need to grow. By the end of this lesson, you'll understand why this process is essential for life on Earth.",
  },
];