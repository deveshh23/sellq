'use client';

import AnimatedFooter from "@/components/ui/animated-footer";

export function SellQFooter() {
  return (
    <div className="relative z-30 w-full border-t border-white/10 bg-black">
      <AnimatedFooter
        headline="THE FUTURE OF REVENUE RUNS ON INTELLIGENCE"
        subheadline="SellQ combines AI Lead Scoring, Sentiment Analysis, Workflow Automation and Churn Prediction into a unified intelligence platform."
        ctaText="Start Using SellQ"
        leftLinks={[
          { href: "#", label: "AI Lead Scoring" },
          { href: "#", label: "AI Sales Agent" },
          { href: "#", label: "Workflow Builder" },
        ]}
        rightLinks={[
          { href: "#", label: "Churn Shield" },
          { href: "#", label: "Sentiment Analysis" },
          { href: "#", label: "Multi-Tenant SaaS" },
        ]}
        copyrightText="SellQ 2026. All Rights Reserved."
        barCount={35}
      />
    </div>
  );
}
