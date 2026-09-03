"use client";

import { MessageSquare, Target, Users, ShieldAlert, Cpu } from "lucide-react";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";

const timelineData = [
  {
    id: 1,
    title: "AI Lead Scoring",
    date: "0ms LATENCY",
    content: "Real-time analysis of incoming leads across all channels to identify high-intent signals instantly.",
    category: "Intelligence",
    icon: Target,
    relatedIds: [2, 3],
    status: "completed" as const,
    energy: 94,
  },
  {
    id: 2,
    title: "Unified Inbox",
    date: "OMNICHANNEL",
    content: "Aggregates WhatsApp, Email, Instagram, and SMS into a single context-aware neural stream.",
    category: "Platform",
    icon: MessageSquare,
    relatedIds: [1, 3, 5],
    status: "completed" as const,
    energy: 85,
  },
  {
    id: 3,
    title: "Autonomous Agents",
    date: "24/7 ACTIVE",
    content: "Generative AI sales representatives capable of full lifecycle deal closing and meeting scheduling.",
    category: "Action",
    icon: Cpu,
    relatedIds: [1, 2],
    status: "in-progress" as const,
    energy: 98,
  },
  {
    id: 4,
    title: "Churn Shield",
    date: "PREDICTIVE",
    content: "Sentiment analysis continuously monitors customer health to predict and prevent churn before it happens.",
    category: "Retention",
    icon: ShieldAlert,
    relatedIds: [2, 5],
    status: "pending" as const,
    energy: 72,
  },
  {
    id: 5,
    title: "Multi-Tenant Hub",
    date: "ENTERPRISE",
    content: "Isolated data environments for scale, ensuring complete privacy while maintaining cross-tenant macro analytics.",
    category: "Architecture",
    icon: Users,
    relatedIds: [4, 2],
    status: "completed" as const,
    energy: 88,
  },
];

export function SellQFeaturesTimeline() {
  return (
    <div className="w-full relative z-20 py-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">The Neural Architecture</h2>
        <p className="text-neutral-400 max-w-2xl mx-auto text-sm md:text-base">Explore the interconnected subsystems powering the SellQ autonomous engine. Click nodes to view data streams.</p>
      </div>
      <RadialOrbitalTimeline timelineData={timelineData} />
    </div>
  );
}
