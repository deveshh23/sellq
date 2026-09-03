export const REPLY_SYSTEM_PROMPT = `You are an AI customer support agent for a business.
Business context: {{BUSINESS_CONTEXT}}
Tone: {{TONE}}
Reply helpfully and concisely. Max 3 sentences.`;

export const SENTIMENT_PROMPT = `Classify the sentiment of this customer message as exactly one word: positive, neutral, negative, or urgent.
Message: "{{MESSAGE}}"
Reply with JSON only, no markdown: {"sentiment": "...", "confidence": 0.0}`;

export const LEAD_DETECT_PROMPT = `Analyze this conversation for buying intent.
Conversation:
{{HISTORY}}

Reply with JSON only, no markdown:
{"isLead": true/false, "priority": "hot/warm/cold", "reason": "one sentence explanation"}`;

export const SUMMARIZE_PROMPT = `Summarize this customer conversation in 2 sentences max, focusing on what the customer needed and the outcome.
Conversation:
{{HISTORY}}`;

export const SCORE_LEAD_PROMPT = `Analyze the provided lead details and conversation history to determine a precise lead score (0-100).
Evaluate based on:
1. Intent: How explicitly have they expressed a desire to purchase?
2. Urgency: Is there a specific timeframe or immediate need?
3. Budget: Are they inquiring about enterprise, bulk, or high-value items?
4. Engagement: How responsive and detailed are their inquiries?

Lead Data:
{{LEAD_DATA}}

Reply with JSON only, no markdown:
{"score": 85, "breakdown": {"intent": 80, "urgency": 90, "budget": 85, "engagement": 90}, "recommendation": "One sentence AI advice on next steps."}`;

export const EXTRACT_PROMISES_PROMPT = `Analyze the conversation history and extract any actionable promises or commitments made by the agent to the customer.
A promise is defined as something the agent said they will do for the customer (e.g. send a document, schedule a call, follow up on an issue, process a refund).

Conversation:
{{HISTORY}}

Reply with a JSON array only, no markdown:
[
  {
    "promiseText": "Short description of the promise",
    "promisedTo": "Customer Name or 'Customer'",
    "dueDate": "ISO date string (guess relative date based on context, like 'tomorrow' or 'next week', defaulting to today + 1 if unspecified)"
  }
]`;

export const DETECT_APPOINTMENT_PROMPT = `Analyze this customer message and detect if they are requesting or open to scheduling a meeting or call.

Message: {{MESSAGE}}

Return ONLY valid JSON:
{
  "appointmentRequested": true/false,
  "preferredTime": "string or null",
  "meetingType": "demo|follow_up|support|onboarding",
  "confidence": 0-100,
  "suggestedReply": "message proposing specific time slots"
}`;

export const GENERATE_FOLLOWUP_PROMPT = `You are a professional sales follow-up specialist. Based on this conversation history, generate a warm, personalized follow-up message.

Trigger reason: {{TRIGGER_TYPE}}
Contact: {{CONTACT_NAME}}
Business context: {{BUSINESS_CONTEXT}}

The message should:
- Reference something specific from the conversation
- Have a clear, single call-to-action
- Be under 100 words
- Sound human, not robotic
- Not be pushy or salesy

Conversation: {{CONVERSATION}}

Return ONLY the follow-up message text, no JSON, no quotes, no explanation.`;

export const SCORE_EXPLANATION_PROMPT = `You are an expert B2B sales analyst. Analyze this lead's score and provide a clear explanation.

Lead: {{LEAD_NAME}} ({{COMPANY}})
Overall Score: {{SCORE}}/100
Priority: {{PRIORITY}}
Channel: {{CHANNEL}}
Summary: {{SUMMARY}}

Score Breakdown:
- Engagement: {{ENGAGEMENT}}%
- Purchase Intent: {{INTENT}}%
- Recency: {{RECENCY}}%
- Sentiment: {{SENTIMENT}}%

Return ONLY valid JSON (no markdown, no code fences):
{
  "reasons": [
    "Concise reason 1 for the score (1 sentence, specific to the data)",
    "Concise reason 2 for the score (1 sentence, specific to the data)",
    "Concise reason 3 for the score (1 sentence, specific to the data)"
  ],
  "recommendedAction": "One specific, actionable next step for this lead (e.g. 'Send enterprise pricing deck with custom compliance add-on')"
}`;

export const PROPOSE_PAYMENT_PROMPT = `You are a sales AI agent for SellQ. Analyze the conversation below for EXPLICIT purchase intent — the customer is ready to buy, pay, or complete a checkout RIGHT NOW.

Available products (select ONLY from this list, never make up a product or price):
- prod_starter_1mo: Starter Plan, 5 agents (₹499)
- prod_growth_1mo: Growth Plan, 25 agents (₹1,499)
- prod_pro_1mo: Pro Plan, unlimited agents (₹2,999)
- prod_enterprise_1mo: Enterprise Plan, compliance features (₹5,999)
- prod_addon_consulting: AI Strategy Consulting Session (₹199)

Conversation:
{{HISTORY}}

If the customer clearly wants to purchase/pay for something, respond with JSON only:
{"shouldPropose": true, "productId": "prod_xxx", "productName": "Plan Name", "draftMessage": "I can send you a payment link for [Product] — want me to go ahead?"}

If there is no clear purchase intent, respond with JSON only:
{"shouldPropose": false}
`;
