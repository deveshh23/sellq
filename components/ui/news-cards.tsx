"use client";

import { motion, AnimatePresence, useReducedMotion, LayoutGroup } from "framer-motion";
import { useState, useEffect } from "react";
import { BookmarkIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface NewsCard {
  id: string;
  title: string;
  category: string;
  subcategory: string;
  timeAgo: string;
  location: string;
  image: string;
  gradientColors?: string[];
  content?: string[];
}

interface StatusBar {
  id: string;
  category: string;
  subcategory: string;
  length: number; // 1-3 for different lengths
  opacity: number; // 0.3-1 for different opacities
}

interface NewsCardsProps {
  title?: string;
  subtitle?: string;
  statusBars?: StatusBar[];
  newsCards?: NewsCard[];
  enableAnimations?: boolean;
}

const defaultStatusBars: StatusBar[] = [
  {
    id: "1",
    category: "Performance",
    subcategory: "Lead Conversion",
    length: 3,
    opacity: 1,
  },
  {
    id: "2", 
    category: "Speed",
    subcategory: "Response Time",
    length: 2,
    opacity: 0.7,
  },
  {
    id: "3",
    category: "Growth",
    subcategory: "Meetings Booked",
    length: 1,
    opacity: 0.4,
  }
];

const defaultNewsCards: NewsCard[] = [
  {
    id: "1",
    title: "Lead Conversion Rate: +34%",
    category: "Performance Metrics",
    subcategory: "Conversion",
    timeAgo: "Real-time AI",
    location: "Global Platform",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
    gradientColors: ["from-purple-500/20", "to-blue-500/20"],
    content: [
      "By instantly engaging leads across WhatsApp and Email within seconds of their inquiry, SellQ dramatically increases the likelihood of a closed deal.",
      "The autonomous sales agent operates continuously, never missing an inbound inquiry. Using sophisticated natural language processing, the AI identifies buying intent immediately and responds with highly personalized, context-aware messaging.",
      "Our latest analytics show that businesses deploying SellQ see an average 34% increase in their total lead conversion rates within the first quarter of deployment. The immediate engagement stops prospects from checking out competitors while waiting for a human reply."
    ]
  },
  {
    id: "2",
    title: "Response Time: < 1.2s",
    category: "System Speed", 
    subcategory: "Latency",
    timeAgo: "24/7 Uptime",
    location: "Edge Network",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=60",
    gradientColors: ["from-blue-500/20", "to-cyan-500/20"],
    content: [
      "Never let a lead go cold. The AI core guarantees sub-two-second response times 24/7/365, across every supported messaging channel.",
      "Speed to lead is the single most critical factor in modern sales. Research indicates that conversion rates drop by 400% if the lead isn't responded to within the first 5 minutes. SellQ obliterates this delay, handling the initial interaction in roughly 1.2 seconds.",
      "Whether the inquiry comes in via Instagram DM, a website form, or a direct email, the platform immediately processes the context, searches the trained company knowledge base, and drafts a perfectly natural, accurate response."
    ]
  },
  {
    id: "3",
    title: "Support Churn: -22%",
    category: "Customer Success",
    subcategory: "Retention",
    timeAgo: "Predictive Analytics",
    location: "Global Platform",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop",
    gradientColors: ["from-rose-500/20", "to-red-500/20"],
    content: [
      "Predictive sentiment analysis catches frustrated users early, automatically escalating critical tickets to human reps before the customer churns.",
      "SellQ doesn't just respond to messages; it understands the emotional state of the user. By analyzing tone, phrasing, and context, the system assigns a real-time sentiment score to every interaction.",
      "When a conversation is flagged as high-risk or the customer shows signs of severe frustration, the AI instantly bridges the gap, routing the conversation directly to your senior support staff along with a comprehensive summary of the interaction history, ultimately reducing churn by 22%."
    ]
  },
  {
    id: "4",
    title: "Meetings Booked: 3x",
    category: "Sales Automation",
    subcategory: "Scheduling",
    timeAgo: "Autonomous Calendar",
    location: "Global Platform",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&auto=format&fit=crop",
    gradientColors: ["from-emerald-500/20", "to-teal-500/20"],
    content: [
      "Autonomous scheduling agents handle the back-and-forth negotiation, directly depositing qualified leads into your sales team's calendar.",
      "The dreaded back-and-forth of finding a suitable time is a major drop-off point in the sales funnel. SellQ seamlessly integrates with your team's Google or Outlook calendars, reads availability in real-time, and naturally negotiates a time with the prospect.",
      "Once a time is agreed upon, the AI sends the invite, logs the event in your CRM, and even follows up with automated, personalized reminders. This frictionless process typically triples the volume of successful meetings booked."
    ]
  }
];

export function NewsCards({
  title = "News Today",
  subtitle = "Stories from all over the world",
  statusBars = defaultStatusBars,
  newsCards = defaultNewsCards,
  enableAnimations = true,
}: NewsCardsProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedCard, setSelectedCard] = useState<NewsCard | null>(null);
  const [bookmarkedCards, setBookmarkedCards] = useState<Set<string>>(new Set());
  const shouldReduceMotion = useReducedMotion();
  const shouldAnimate = enableAnimations && !shouldReduceMotion;

  const toggleBookmark = (cardId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(cardId)) {
        newSet.delete(cardId);
      } else {
        newSet.add(cardId);
      }
      return newSet;
    });
  };

  const openCard = (card: NewsCard) => {
    setSelectedCard(card);
  };

  const closeCard = () => {
    setSelectedCard(null);
  };

  useEffect(() => {
    if (shouldAnimate) {
      const timer = setTimeout(() => setIsLoaded(true), 100);
      return () => clearTimeout(timer);
    } else {
      setIsLoaded(true);
    }
  }, [shouldAnimate]);

  // Animation variants
  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };

  const headerVariants: any = {
    hidden: { 
      opacity: 0, 
      y: -20,
      scale: 0.95,
      filter: "blur(4px)",
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 28,
        mass: 0.6,
      }
    }
  };

  const statusBarContainerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      }
    }
  };

  const statusBarVariants: any = {
    hidden: { 
      opacity: 0, 
      scaleX: 0,
      x: -20,
    },
    visible: { 
      opacity: 1, 
      scaleX: 1,
      x: 0,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 25,
        scaleX: { type: "spring", stiffness: 400, damping: 30 }
      }
    }
  };

  const cardContainerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.8,
      }
    }
  };

  const cardVariants: any = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.9,
      filter: "blur(6px)",
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 28,
        mass: 0.8,
      }
    }
  };

  return (
    <motion.div
      className="w-full max-w-6xl mx-auto p-6 bg-transparent text-foreground z-40 relative"
      initial={shouldAnimate ? "hidden" : "visible"}
      animate={isLoaded ? "visible" : "hidden"}
      variants={shouldAnimate ? containerVariants : {}}
    >
       <motion.div
         className="mb-8"
         variants={shouldAnimate ? headerVariants : {}}
       >
         <h1 className="text-4xl font-bold mb-2 text-white">{title}</h1>
         <p className="text-neutral-400 text-lg">{subtitle}</p>
         
         <motion.div 
           className="mt-6 space-y-1"
           variants={shouldAnimate ? statusBarContainerVariants : {}}
         >
           {statusBars.map((bar, index) => (
             <motion.div
               key={bar.id}
               className={cn("h-0.5 rounded-full", bar.id === "1" ? "bg-white/80" : bar.id === "2" ? "bg-white/60" : "bg-white/40")}
               style={{ 
                 opacity: bar.opacity,
                 width: `${(bar.length / 3) * 100}%`
               }}
               variants={shouldAnimate ? statusBarVariants : {}}
               initial={{ scaleX: 0 }}
               animate={{ scaleX: 1 }}
               transition={{ 
                 delay: 0.3 + (index * 0.1),
                 type: "spring", 
                 stiffness: 400, 
                 damping: 30 
               }}
             />
           ))}
         </motion.div>
       </motion.div>

       <LayoutGroup>
         <motion.div
           className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8"
           variants={shouldAnimate ? cardContainerVariants : {}}
         >
           {newsCards.map((card, index) => {
             if (selectedCard?.id === card.id) {
               return null;
             }
             
             return (
               <motion.article
                 key={card.id}
                 layoutId={`card-${card.id}`}
                 className="bg-neutral-900 border border-white/10 rounded-lg overflow-hidden transition-all duration-300 cursor-pointer group"
                 variants={shouldAnimate ? cardVariants : {}}
                 whileHover={shouldAnimate ? { 
                   y: -4,
                   scale: 1.01,
                   transition: { type: "spring", stiffness: 400, damping: 25 }
                 } : {}}
                 onClick={() => openCard(card)}
               >
                 <motion.div 
                   layoutId={`card-image-${card.id}`}
                   className="relative h-56 overflow-hidden bg-neutral-800"
                 >
                   <img
                     src={card.image}
                     alt={card.title}
                     className="w-full h-full object-cover transform-gpu group-hover:scale-105 transition-transform duration-700 ease-out"
                   />
                   <div className="absolute inset-x-0 bottom-0 h-1/5 bg-gradient-to-t from-black/80 to-transparent"></div>
                   {card.gradientColors && (
                     <div className={`absolute inset-x-0 bottom-0 h-1/5 bg-gradient-to-t ${card.gradientColors[0]} ${card.gradientColors[1]} to-transparent`}></div>
                   )}
                   
                   <motion.div 
                     className="absolute top-3 right-3"
                     initial={{ opacity: 0, scale: 0.8 }}
                     animate={{ opacity: 1, scale: 1 }}
                     transition={{ delay: 0.6, type: "spring", stiffness: 400, damping: 25 }}
                     whileHover={{ scale: 1.1 }}
                     whileTap={{ scale: 0.9 }}
                     onClick={(e) => toggleBookmark(card.id, e)}
                   >
                     <BookmarkIcon 
                       className={`w-5 h-5 transition-colors cursor-pointer ${
                         bookmarkedCards.has(card.id) 
                           ? 'text-yellow-400 fill-yellow-400' 
                           : 'text-white/80 hover:text-white'
                       }`} 
                     />
                   </motion.div>

                   <motion.div 
                     className="absolute bottom-3 left-3 text-white"
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 0.5, type: "spring", stiffness: 400, damping: 25 }}
                   >
                     <div className="text-xs mb-1 opacity-90">
                       {card.category}, {card.subcategory}
                     </div>
                     <div className="text-xs opacity-75">
                       {card.timeAgo}, {card.location}
                     </div>
                   </motion.div>
                 </motion.div>

                 <motion.div 
                   layoutId={`card-content-${card.id}`}
                   className="p-6"
                 >
                   <motion.h3 
                     layoutId={`card-title-${card.id}`}
                     className="font-semibold text-lg leading-tight line-clamp-3 text-white group-hover:text-purple-400 transition-colors"
                   >
                     {card.title}
                   </motion.h3>
                 </motion.div>
               </motion.article>
             );
           })}
         </motion.div>

         <AnimatePresence>
           {selectedCard && (
             <>
               <motion.div
                 className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0 }}
                 onClick={closeCard}
               />
               
               <motion.div
                 layoutId={`card-${selectedCard.id}`}
                 className="fixed inset-4 md:inset-8 lg:inset-16 bg-neutral-900 border border-white/10 rounded-xl overflow-hidden z-50"
               >
                 <motion.button
                   className="absolute top-4 right-4 w-8 h-8 bg-black/80 hover:bg-black rounded-full flex items-center justify-center z-10 text-white"
                   initial={{ opacity: 0, scale: 0 }}
                   animate={{ opacity: 1, scale: 1 }}
                   transition={{ delay: 0.2 }}
                   whileHover={{ scale: 1.1 }}
                   whileTap={{ scale: 0.9 }}
                   onClick={closeCard}
                 >
                   <X className="w-4 h-4" />
                 </motion.button>

                 <div className="h-full overflow-y-auto">
                   <motion.div 
                     layoutId={`card-image-${selectedCard.id}`}
                     className="relative h-64 md:h-80"
                   >
                     <img
                       src={selectedCard.image}
                       alt={selectedCard.title}
                       className="w-full h-full object-cover"
                     />
                     <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-neutral-900 to-transparent"></div>
                     {selectedCard.gradientColors && (
                       <div className={`absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t ${selectedCard.gradientColors[0]} ${selectedCard.gradientColors[1]} to-transparent`}></div>
                     )}
                     
                     <div className="absolute bottom-4 left-4 text-white">
                       <div className="text-sm mb-1 opacity-90">{selectedCard.category}, {selectedCard.subcategory}</div>
                       <div className="text-sm opacity-75">{selectedCard.timeAgo}, {selectedCard.location}</div>
                     </div>
                   </motion.div>

                   <motion.div 
                     layoutId={`card-content-${selectedCard.id}`}
                     className="p-6 md:p-8"
                   >
                     <motion.h1 
                       layoutId={`card-title-${selectedCard.id}`}
                       className="text-2xl md:text-3xl font-bold mb-6 text-white"
                     >
                       {selectedCard.title}
                     </motion.h1>
                     
                     <motion.div 
                       className="prose prose-lg prose-invert max-w-none text-neutral-400"
                       initial={{ opacity: 0, y: 20 }}
                       animate={{ opacity: 1, y: 0 }}
                       transition={{ delay: 0.3, duration: 0.4 }}
                     >
                       {selectedCard.content ? (
                         selectedCard.content.map((paragraph, index) => (
                           <p key={index} className="mb-4 leading-relaxed">
                             {paragraph}
                           </p>
                         ))
                       ) : (
                         <p>Loading content...</p>
                       )}
                     </motion.div>
                   </motion.div>
                 </div>
               </motion.div>
             </>
           )}
         </AnimatePresence>
       </LayoutGroup>
     </motion.div>
   );
}
