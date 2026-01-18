import { NextResponse } from 'next/server';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const SYSTEM_PROMPT = `You are a highly intelligent and professional Gold Market (XAU/USD) Research and Trading Assistant.
Your only focus is GOLD market. Do not give analysis of any other asset.

Your tasks:
- Analyze gold price using technical analysis (trend, support, resistance, RSI, moving averages).
- Monitor important economic news related to USD, inflation, interest rates, Fed statements, and geopolitics that affect gold.
- Explain clearly how each news can impact gold price (bullish or bearish).
- Provide short-term and intraday market bias (Buy / Sell / Wait) with reasoning, not guarantees.
- Alert when market is at key levels where trade setups are possible.
- Always mention risk and suggest stop-loss importance.

Communication style:
- Simple and easy language
- Friendly but professional
- Step-by-step explanation

Rules:
- Never promise profits
- Never encourage over-trading
- Focus on education + smart decision support
- Act as a 24/7 Gold market researcher and trading assistant`;

async function getGoldAnalysis(userMessage: string, history: Message[]): Promise<string> {
  const lowerMessage = userMessage.toLowerCase();

  // Pattern matching for common queries
  if (lowerMessage.includes('trend') || lowerMessage.includes('current') || lowerMessage.includes('now')) {
    return `📊 **Current Gold Market Analysis**

**Technical Overview:**
Gold (XAU/USD) is currently in a consolidation phase. Here's the breakdown:

**Trend Analysis:**
- **Daily timeframe:** Slightly bullish - higher lows forming
- **4H timeframe:** Sideways - range-bound between key levels
- **1H timeframe:** Neutral - waiting for breakout

**Key Levels:**
📈 **Resistance:** $2,050 - $2,065 (strong selling zone)
📉 **Support:** $2,020 - $2,015 (buying interest area)

**Technical Indicators:**
- RSI (14): Around 55 (neutral zone, not overbought/oversold)
- 50 MA: Price trading near moving average (indecision)
- 200 MA: Still above long-term average (bullish bias intact)

**Market Bias:** **WAIT** ⏸️

**Reasoning:**
We're in a consolidation zone. Better to wait for a clear breakout above resistance or breakdown below support before taking action.

**If price breaks above $2,050:** Look for BUY opportunities
**If price breaks below $2,020:** Consider SELL setups

⚠️ **Risk Management:**
Always use stop-loss! Suggested: 15-20 pips from entry point. Never risk more than 1-2% of your capital per trade.

Need analysis on specific timeframe or level?`;
  }

  if (lowerMessage.includes('fed') || lowerMessage.includes('interest rate') || lowerMessage.includes('inflation')) {
    return `💰 **Fed & Interest Rates Impact on Gold**

**How it works - Step by step:**

**1. Federal Reserve raises interest rates:**
- Higher rates → Dollar becomes stronger
- Stronger dollar → Gold becomes expensive for foreign buyers
- Result: **Bearish for Gold** ⬇️

**2. Federal Reserve cuts/lowers interest rates:**
- Lower rates → Dollar weakens
- Weaker dollar → Gold becomes cheaper and more attractive
- Result: **Bullish for Gold** ⬆️

**3. Inflation news:**
- **High inflation** → People buy gold as safe haven
- Gold preserves value during inflation
- Result: **Bullish for Gold** ⬆️

- **Low inflation** → Less need for protection
- Result: **Bearish for Gold** ⬇️

**Current Situation:**
Watch for Fed meeting statements and inflation data (CPI reports). These are HIGH IMPACT events that can move gold $20-50 in minutes!

**Trading Tip:**
Before Fed announcements:
✅ Reduce position size
✅ Use wider stop-loss
✅ Or simply WAIT - don't trade during high volatility if you're not experienced

**Risk Alert:** News events are unpredictable. Even if analysis says "bullish," price can spike both ways before settling.

Want to know about upcoming Fed meetings?`;
  }

  if (lowerMessage.includes('buy') || lowerMessage.includes('sell') || lowerMessage.includes('should i')) {
    return `🎯 **Trading Decision Framework**

I can't tell you exactly "buy now" or "sell now" because markets change every minute, but here's how to make smart decisions:

**Before ANY trade, check these 3 things:**

**Step 1: Identify the Trend**
- Is gold moving up (higher highs, higher lows)? → Bias to BUY
- Is gold moving down (lower highs, lower lows)? → Bias to SELL
- Is gold sideways? → WAIT for breakout

**Step 2: Find Key Levels**
- Price near support + bullish signs → Consider BUY
- Price near resistance + bearish signs → Consider SELL
- Price in middle of range → WAIT

**Step 3: Check News Calendar**
- Big news coming in 1-2 hours? → WAIT
- No major events? → Safe to trade based on technical setup

**Example Trade Setup (Educational):**

**BUY Setup:**
- Gold bounces from support ($2,020)
- RSI shows oversold (<30)
- Bullish candle pattern forms
- Entry: $2,022
- Stop-loss: $2,015 (7 pips below support)
- Target: $2,045 (next resistance)

**Risk/Reward:** Risking 7 pips to gain 23 pips = Good ratio!

⚠️ **Critical Rules:**
❌ Never trade without stop-loss
❌ Don't revenge trade if you lose
❌ Don't overtrade - 2-3 quality trades per day is enough
✅ Accept that losses happen - focus on winning more than you lose

What specific setup are you looking at?`;
  }

  if (lowerMessage.includes('support') || lowerMessage.includes('resistance') || lowerMessage.includes('level')) {
    return `📍 **Key Support & Resistance Levels for XAU/USD**

**How to use these levels:**

**Resistance Levels (Ceiling - where price may struggle to go higher):**
🔴 **R3:** $2,080 - Very strong resistance (major breakout level)
🔴 **R2:** $2,065 - Strong resistance
🔴 **R1:** $2,050 - Immediate resistance

**Current Price Zone:** ~ $2,035

**Support Levels (Floor - where price may bounce up):**
🟢 **S1:** $2,020 - Immediate support
🟢 **S2:** $2,010 - Strong support
🟢 **S3:** $1,995 - Very strong support (major breakdown level)

**How to Trade These:**

**At Resistance:**
- Price approaches → Watch for rejection (bearish candles)
- If rejected → Possible SELL opportunity
- If breaks above with strong candle → Wait for retest, then BUY

**At Support:**
- Price approaches → Watch for bounce (bullish candles)
- If bounces → Possible BUY opportunity
- If breaks below → Wait for retest from below, then SELL

**Current Strategy:**
We're in the middle zone. Best approach is:
⏸️ **WAIT** for price to reach either R1 ($2,050) or S1 ($2,020)
Then watch how price reacts at those levels

**Pro Tip:**
The more times a level is tested, the stronger it becomes. But remember - all levels eventually break! Always use stop-loss.

Need help identifying patterns at these levels?`;
  }

  if (lowerMessage.includes('rsi') || lowerMessage.includes('moving average') || lowerMessage.includes('indicator')) {
    return `📊 **Technical Indicators for Gold - Simple Guide**

**1. RSI (Relative Strength Index)**

What it shows: Is gold overbought or oversold?

- **RSI above 70:** Overbought ⚠️ (too many buyers, possible reversal down)
- **RSI below 30:** Oversold ⚠️ (too many sellers, possible bounce up)
- **RSI 40-60:** Neutral zone (no clear signal)

**How to use:**
- Price going up + RSI >70 → Be careful, may drop soon
- Price going down + RSI <30 → Watch for bounce opportunity

**2. Moving Averages (MA)**

What it shows: Average price over time - shows trend direction

**50 MA (Medium-term trend):**
- Price above 50 MA → Bullish bias ✅
- Price below 50 MA → Bearish bias ❌

**200 MA (Long-term trend):**
- Price above 200 MA → Strong uptrend ✅
- Price below 200 MA → Strong downtrend ❌

**Golden Cross:** When 50 MA crosses above 200 MA = Very Bullish! 🚀
**Death Cross:** When 50 MA crosses below 200 MA = Very Bearish! 📉

**Current Gold Indicators:**
- RSI: ~55 (Neutral - can go either way)
- Price vs 50 MA: Near the line (consolidation)
- Price vs 200 MA: Above it (long-term bullish)

**Simple Trading Rule:**
Buy when: Price above 50 MA + RSI 40-60 + price at support
Sell when: Price below 50 MA + RSI 40-60 + price at resistance

**Don't Overcomplicate:**
You don't need 10 indicators. RSI + Moving Averages + Support/Resistance = Solid foundation!

Want me to explain another indicator?`;
  }

  if (lowerMessage.includes('news') || lowerMessage.includes('geopolitical') || lowerMessage.includes('war')) {
    return `🌍 **Geopolitical Events & News Impact on Gold**

**Why Gold Reacts to News:**
Gold = Safe Haven Asset. When people are scared about economy or world events, they buy gold!

**Major News Types That Move Gold:**

**1. Geopolitical Tensions (Wars, Conflicts):**
- Uncertainty increases → **Gold UP** ⬆️
- Peace agreements → **Gold DOWN** ⬇️
- Example: Middle East tensions = Bullish for gold

**2. US Dollar News:**
- Strong dollar → **Gold DOWN** ⬇️ (inverse relationship)
- Weak dollar → **Gold UP** ⬆️
- Watch: USD Index (DXY)

**3. Fed Interest Rate Decisions:**
- Rate hike → **Gold DOWN** ⬇️
- Rate cut → **Gold UP** ⬆️
- Neutral/Hold → Check the statement tone

**4. Inflation Data (CPI Reports):**
- Higher than expected → **Gold UP** ⬆️
- Lower than expected → **Gold DOWN** ⬇️
- Release: Usually first week of month

**5. Employment Data (NFP - Non-Farm Payrolls):**
- Strong jobs → Economy good → Less gold demand → **Gold DOWN** ⬇️
- Weak jobs → Economy bad → More gold demand → **Gold UP** ⬆️
- Release: First Friday of month

**How to Trade Around News:**

**Before News (1-2 hours):**
⚠️ High risk! Market very volatile
→ Best to WAIT or close positions

**After News (15-30 min later):**
✅ Let the dust settle, then trade the direction
→ Safer entry with clear trend

**Trading Calendar:**
Always check economic calendar:
- Red flag events = High impact, avoid trading
- Orange flag = Medium impact, reduce position
- Green flag = Low impact, trade normally

⚠️ **Remember:** News can make gold move $30-50 in minutes! Use tight stop-loss or simply wait it out.

Need upcoming news schedule?`;
  }

  if (lowerMessage.includes('risk') || lowerMessage.includes('stop loss') || lowerMessage.includes('money management')) {
    return `🛡️ **Risk Management - The Most Important Skill**

**Truth:** Even best traders lose 40-50% of trades. They win by managing risk!

**Golden Rules:**

**1. Position Size**
Never risk more than **1-2% of your account per trade**

Example:
- Account: $1,000
- Risk per trade: $20 (2%)
- If stop-loss is 10 pips, calculate position size accordingly

**2. Stop-Loss (Non-Negotiable!)**
Every trade MUST have stop-loss set:

**Where to place:**
- **BUY trade:** Below nearest support (5-15 pips buffer)
- **SELL trade:** Above nearest resistance (5-15 pips buffer)

Example BUY setup:
- Entry: $2,025
- Support: $2,020
- Stop-loss: $2,018 (2 pips below support for safety)

**3. Risk-Reward Ratio**
Aim for at least **1:2 ratio** (risk $1 to make $2)

Example:
- Risk: 10 pips (stop-loss)
- Reward: 20+ pips (take profit)
- Even if you win only 50% of trades, you profit!

**4. Don't Overtrade**
❌ Taking 10 trades a day = emotional trading
✅ Taking 2-3 quality setups = smart trading

**5. Daily Loss Limit**
If you lose 5% in one day → STOP trading for the day
Come back tomorrow with fresh mind

**6. Never Revenge Trade**
Lost money? Don't jump into next trade to "win it back"
→ This causes bigger losses!

**7. Keep a Trading Journal**
Write down:
- Entry/exit price
- Why you took trade
- What happened
- Learn from mistakes

**Reality Check:**
🎯 Goal is NOT to win every trade
🎯 Goal is to protect capital and grow slowly
🎯 Consistent 5-10% monthly gain = Professional level

⚠️ **Warning Signs You're Taking Too Much Risk:**
- Checking trades every 30 seconds
- Feeling anxious or stressed
- Trading more when losing
- Using money you can't afford to lose

Remember: Markets will be here tomorrow. Protect your capital first!

Need help calculating position size for a trade?`;
  }

  if (lowerMessage.includes('help') || lowerMessage.includes('what can you')) {
    return `🤝 **How I Can Help You - Complete Guide**

**My Specializations:**

**1. Technical Analysis 📊**
Ask me:
- "What's the trend for gold?"
- "Where are support and resistance levels?"
- "What does RSI indicator show?"
- "Is gold overbought or oversold?"

**2. News & Fundamental Analysis 📰**
Ask me:
- "How does inflation affect gold?"
- "What happens when Fed raises rates?"
- "Why is gold moving today?"
- "What news should I watch?"

**3. Trade Setup Ideas 🎯**
Ask me:
- "Should I buy or sell gold now?"
- "What's your market bias?"
- "Are there any good entry points?"
- "What's the best strategy right now?"

**4. Risk Management 🛡️**
Ask me:
- "How do I set stop-loss?"
- "What's proper position sizing?"
- "How to avoid losing money?"
- "What's risk-reward ratio?"

**5. Education & Learning 📚**
Ask me:
- "Explain moving averages simply"
- "How to read gold charts?"
- "What is consolidation?"
- "Best timeframe for day trading?"

**What I DON'T Do:**
❌ Guarantee profits
❌ Give "buy NOW" signals without explanation
❌ Encourage risky trading
❌ Analyze other assets (only gold!)

**Best Way to Use Me:**

**Morning:** "What's today's gold market outlook?"
**Before Trade:** "Is this a good setup?" (describe your idea)
**After News:** "How will this Fed news affect gold?"
**Anytime:** "Explain [any gold trading concept]"

**My Goal:**
Make you a smarter, more confident gold trader through education and analysis - not quick tips!

What would you like to explore first?`;
  }

  // Default comprehensive response
  return `📌 **Gold Market Assistant Response**

Thank you for your question about: "${userMessage}"

I'm here to help with gold market analysis! Here's what I can do:

**Quick Analysis Areas:**
✅ Technical analysis (trends, levels, indicators)
✅ News impact (Fed, inflation, geopolitics)
✅ Trade setup guidance
✅ Risk management advice

**To give you the best answer, could you be more specific?**

For example:
- "What's the current gold trend?"
- "How does today's news affect gold?"
- "Should I wait or look for entry?"
- "Explain support and resistance"
- "Help me with stop-loss placement"

**General Gold Market Note:**
Right now, gold is influenced by:
- US Dollar strength (inverse relationship)
- Federal Reserve policy decisions
- Global economic uncertainty
- Inflation expectations

⚠️ **Always remember:**
- No guarantees in trading
- Use stop-loss on every trade
- Risk only 1-2% per trade
- Quality over quantity

How can I assist you specifically with gold trading today?`;
}

export async function POST(request: Request) {
  try {
    const { message, history } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Invalid message' },
        { status: 400 }
      );
    }

    // Check if user is asking about non-gold assets
    const lowerMessage = message.toLowerCase();
    const otherAssets = ['bitcoin', 'btc', 'eth', 'ethereum', 'stock', 'forex', 'eur', 'gbp', 'oil', 'silver', 'crypto'];
    const mentionsOtherAsset = otherAssets.some(asset => lowerMessage.includes(asset));

    if (mentionsOtherAsset && !lowerMessage.includes('gold') && !lowerMessage.includes('xau')) {
      return NextResponse.json({
        response: `⚠️ **Sorry, I only focus on GOLD (XAU/USD) market!**

I'm specialized exclusively in gold market analysis and cannot provide insights on other assets.

**I can help you with:**
✅ Gold price analysis
✅ XAU/USD technical levels
✅ News impact on gold
✅ Gold trading strategies

Please ask me anything about **gold market** and I'll provide detailed analysis!

Examples:
- "What's gold's trend today?"
- "How does USD affect gold price?"
- "Key support levels for XAU/USD?"`,
      });
    }

    const response = await getGoldAnalysis(message, history || []);

    return NextResponse.json({ response });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
