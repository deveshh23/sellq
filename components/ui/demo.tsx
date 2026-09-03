'use client'

import { SplineScene } from "@/components/ui/splite";
import { Card } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"
 
export function SplineSceneBasic() {
  return (
    <Card className="w-full h-[500px] bg-black/[0.96] border-none relative overflow-hidden">
      <Spotlight size={400} />
      
      <div className="flex h-full">
        {/* Left content */}
        <div className="flex-1 p-8 relative z-10 flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
            SellQ AI
          </h1>
          <p className="mt-4 text-neutral-300 max-w-lg leading-relaxed">
            The intelligent operating system for your sales team. Automatically score leads, predict churn before it happens, and let autonomous AI agents handle conversations 24/7. Turn every interaction into revenue.
          </p>
        </div>

        {/* Right content */}
        <div className="flex-1 relative cursor-auto">
          <SplineScene 
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full cursor-auto"
          />
        </div>
      </div>
    </Card>
  )
}
