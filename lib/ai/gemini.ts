import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  REPLY_SYSTEM_PROMPT,
  SENTIMENT_PROMPT,
  LEAD_DETECT_PROMPT,
  SUMMARIZE_PROMPT,
  SCORE_LEAD_PROMPT,
  EXTRACT_PROMISES_PROMPT,
  DETECT_APPOINTMENT_PROMPT,
  GENERATE_FOLLOWUP_PROMPT,
  PROPOSE_PAYMENT_PROMPT,
} from "./prompts";

// The user mentioned an API key in the prompt, let's use the environment variable
const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

export const geminiFlash = genAI.getGenerativeModel({ 
  model: "gemini-1.5-flash" 
});

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function generateReply(
  conversationHistory: { role: string; content: string }[],
  businessContext: string,
  tone: string
): Promise<string> {
  await delay(200);

  const systemPrompt = REPLY_SYSTEM_PROMPT
    .replace('{{BUSINESS_CONTEXT}}', businessContext)
    .replace('{{TONE}}', tone);

  const historyText = conversationHistory
    .map(m => `${m.role}: ${m.content}`)
    .join("\n");

  const prompt = `${systemPrompt}\n\nConversation:\n${historyText}\n\nReply:`;

  try {
    const result = await geminiFlash.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Gemini Reply Error:", error);
    
    // Provide a tone-specific fallback so the UI visibly updates even without an API key
    if (tone.toLowerCase() === 'casual') return "Hey! Thanks for reaching out. Give me just a sec to check on that for you.";
    if (tone.toLowerCase() === 'empathetic') return "I completely understand why you're reaching out about this. Let me look into this for you right away.";
    if (tone.toLowerCase() === 'persuasive') return "Thanks for reaching out! You're going to love what we have to offer. Let me grab those details for you now.";
    
    return "Thanks for reaching out! Let me check that for you and get back shortly.";
  }
}

export async function detectSentiment(
  message: string
): Promise<{ sentiment: string; confidence: number }> {
  await delay(200);

  const prompt = SENTIMENT_PROMPT.replace('{{MESSAGE}}', message.replace(/"/g, '\\"'));

  try {
    const result = await geminiFlash.generateContent(prompt);
    let text = result.response.text();
    // Clean up potential markdown formatting from Gemini
    if (text.startsWith('```json')) {
      text = text.replace(/```json\n?/, '').replace(/\n?```/, '');
    } else if (text.startsWith('```')) {
      text = text.replace(/```\n?/, '').replace(/\n?```/, '');
    }
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini Sentiment Error:", error);
    return { sentiment: "neutral", confidence: 0.8 };
  }
}

export async function detectLead(
  conversationHistory: { role: string; content: string }[]
): Promise<{ isLead: boolean; priority: string; reason: string }> {
  await delay(200);

  const historyText = conversationHistory
    .map(m => `${m.role}: ${m.content}`)
    .join("\n");

  const prompt = LEAD_DETECT_PROMPT.replace('{{HISTORY}}', historyText);

  try {
    const result = await geminiFlash.generateContent(prompt);
    let text = result.response.text();
    // Clean up potential markdown formatting from Gemini
    if (text.startsWith('```json')) {
      text = text.replace(/```json\n?/, '').replace(/\n?```/, '');
    } else if (text.startsWith('```')) {
      text = text.replace(/```\n?/, '').replace(/\n?```/, '');
    }
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini Lead Detect Error:", error);
    return { isLead: false, priority: "cold", reason: "Unable to analyze" };
  }
}

export async function summarizeConversation(
  conversationHistory: { role: string; content: string }[]
): Promise<string> {
  await delay(200);

  const historyText = conversationHistory
    .map(m => `${m.role}: ${m.content}`)
    .join("\n");

  const prompt = SUMMARIZE_PROMPT.replace('{{HISTORY}}', historyText);

  try {
    const result = await geminiFlash.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Gemini Summarize Error:", error);
    return "Conversation with customer regarding their enquiry.";
  }
}

export async function scoreLead(
  leadData: any
): Promise<{ score: number; breakdown: any; recommendation: string }> {
  await delay(200);

  const prompt = SCORE_LEAD_PROMPT.replace('{{LEAD_DATA}}', JSON.stringify(leadData, null, 2));

  try {
    const result = await geminiFlash.generateContent(prompt);
    let text = result.response.text();
    if (text.startsWith('```json')) {
      text = text.replace(/```json\n?/, '').replace(/\n?```/, '');
    } else if (text.startsWith('```')) {
      text = text.replace(/```\n?/, '').replace(/\n?```/, '');
    }
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini Score Lead Error:", error);
    return {
      score: 50,
      breakdown: { intent: 50, urgency: 50, budget: 50, engagement: 50 },
      recommendation: "Requires manual review."
    };
  }
}

export async function extractPromises(
  conversationHistory: { role: string; content: string }[]
): Promise<Array<{ promiseText: string; promisedTo: string; dueDate: string }>> {
  await delay(200);

  const historyText = conversationHistory
    .map(m => `${m.role}: ${m.content}`)
    .join("\n");

  const prompt = EXTRACT_PROMISES_PROMPT.replace('{{HISTORY}}', historyText);

  try {
    const result = await geminiFlash.generateContent(prompt);
    let text = result.response.text();
    if (text.startsWith('```json')) {
      text = text.replace(/```json\n?/, '').replace(/\n?```/, '');
    } else if (text.startsWith('```')) {
      text = text.replace(/```\n?/, '').replace(/\n?```/, '');
    }
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini Extract Promises Error:", error);
    return [];
  }
}

export async function detectAppointment(message: string, contactName: string) {
  await delay(150);

  const prompt = DETECT_APPOINTMENT_PROMPT.replace('{{MESSAGE}}', message);

  try {
    const result = await geminiFlash.generateContent(prompt);
    let text = result.response.text();
    if (text.startsWith('```json')) {
      text = text.replace(/```json\n?/, '').replace(/\n?```/, '');
    } else if (text.startsWith('```')) {
      text = text.replace(/```\n?/, '').replace(/\n?```/, '');
    }
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini Detect Appointment Error:", error);
    return {
      appointmentRequested: false,
      preferredTime: null,
      meetingType: 'demo',
      confidence: 0,
      suggestedReply: ''
    };
  }
}

export async function generateFollowUp(
  conversationHistory: any[],
  contactName: string,
  triggerType: string,
  businessContext: string
) {
  await delay(200);

  const formattedConversation = conversationHistory.map((m: any) => 
    `[${m.sender.toUpperCase()}]: ${m.text}`
  ).join('\n');

  const prompt = GENERATE_FOLLOWUP_PROMPT
    .replace('{{TRIGGER_TYPE}}', triggerType)
    .replace('{{CONTACT_NAME}}', contactName)
    .replace('{{BUSINESS_CONTEXT}}', businessContext)
    .replace('{{CONVERSATION}}', formattedConversation);

  try {
    const result = await geminiFlash.generateContent(prompt);
    return result.response.text().trim();
  } catch (error) {
    console.error("Gemini Generate FollowUp Error:", error);
    return `Hi ${contactName}, I wanted to follow up on our recent conversation. Let me know if you need any further assistance!`;
  }
}

export interface PaymentProposal {
  productId: string;
  productName: string;
  draftMessage: string;
}

export async function proposePayment(
  conversationHistory: { role: string; content: string }[]
): Promise<PaymentProposal | null> {
  await delay(200);

  const historyText = conversationHistory
    .map(m => `${m.role}: ${m.content}`)
    .join("\n");

  const prompt = PROPOSE_PAYMENT_PROMPT.replace('{{HISTORY}}', historyText);

  try {
    const result = await geminiFlash.generateContent(prompt);
    let text = result.response.text();
    if (text.startsWith('```json')) {
      text = text.replace(/```json\n?/, '').replace(/\n?```/, '');
    } else if (text.startsWith('```')) {
      text = text.replace(/```\n?/, '').replace(/\n?```/, '');
    }
    const parsed = JSON.parse(text);
    if (parsed.shouldPropose && parsed.productId && parsed.draftMessage) {
      return {
        productId: parsed.productId,
        productName: parsed.productName,
        draftMessage: parsed.draftMessage,
      };
    }
  } catch (error) {
    console.error("Gemini Propose Payment Error:", error);
  }

  return null;
}
