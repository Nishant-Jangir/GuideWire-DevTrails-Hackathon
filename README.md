# GigShield — Income Protection for Food Delivery Partners

> Guidewire DEVTrails 2026 · University Hackathon  
> Persona: Food Delivery Partners (Zomato / Swiggy)  
> Phase 1 Submission

---

## Table of Contents

1. [The Problem](#the-problem)
2. [Who We Are Building For](#who-we-are-building-for)
3. [What GigShield Is](#what-gigshield-is)
4. [How We Solve the Problem](#how-we-solve-the-problem)
5. [Benefits — For the Delivery Partner](#benefits--for-the-delivery-partner)
6. [Benefits — For Platforms Like Swiggy and Zomato](#benefits--for-platforms-like-swiggy-and-zomato)
7. [The Weekly Premium Model](#the-weekly-premium-model)
8. [Parametric Triggers — How Claims Fire](#parametric-triggers--how-claims-fire)
9. [The Claim Journey — Step by Step](#the-claim-journey--step-by-step)
10. [Fraud Detection](#fraud-detection)
11. [AI and ML Integration](#ai-and-ml-integration)
12. [Platform and Tech Stack](#platform-and-tech-stack)
13. [Application Workflow](#application-workflow)
14. [Development Roadmap](#development-roadmap)
15. [Why This Works](#why-this-works)
16. [Team](#team)

---

## The Problem

Every day, roughly 5 million food delivery partners across India wake up knowing their income depends entirely on factors outside their control. They are not employees. They have no fixed salary. No sick leave. No paid time off. Their earnings exist only when they are physically on the road, accepting and completing orders.

Now consider what happens during a heavy monsoon afternoon in Mumbai. The rain starts around 2 PM. By 2:30 PM, the roads are flooded. Restaurants are getting fewer orders because customers are staying home — or ordering less frequently because delivery ETAs have tripled. The platform's algorithm reduces order assignments in waterlogged zones because completion rates are dropping. A delivery partner who was earning ₹80–100 per hour is now sitting under a petrol station shed, watching his app go quiet. He might earn ₹150 for the entire afternoon instead of ₹500.

That ₹350 difference is simply gone. There is no mechanism to recover it.

The same thing happens during:
- Air Quality Index spikes above 300 in Delhi during winter (outdoor work becomes medically dangerous)
- Sudden bandhs or Section 144 orders that shut down entire zones
- Extreme heat waves where working outdoors between 11 AM and 4 PM is physically impossible
- Platform-level technical outages where the app stops assigning orders entirely

In all of these cases, the delivery partner had no role in creating the problem. The disruption is external, measurable, and verifiable. Yet they bear 100% of the financial impact.

India has roughly 15 million gig workers in the logistics and delivery space as of 2024. The delivery segment specifically faces income volatility of 20–30% month-on-month purely due to environmental and social disruptions. There is no insurance product in the market today that addresses this gap. Existing micro-insurance products focus on health, life, or accident — none of them protect the income itself.

GigShield is built to close that gap.

---

## Who We Are Building For

### Primary Persona — Arjun, Swiggy Delivery Partner, Bengaluru

Arjun is 26 years old. He moved to Bengaluru from Davangere three years ago and has been delivering for Swiggy for 22 months. He works 9 AM to 8 PM most days, taking a break mid-afternoon, and earns between ₹700 and ₹950 on a normal day. That comes to roughly ₹22,000–26,000 a month after fuel costs.

He pays ₹4,200/month on a used Honda Activa loan. He sends ₹8,000 home every month. What remains barely covers rent and food in the city.

Arjun has no savings buffer. When Bengaluru had four consecutive days of heavy rain in September 2023, he estimates he lost close to ₹2,800 over those four days — a figure that forced him to borrow ₹1,500 from a colleague.

He is not looking for complicated insurance products. He does not have time to read policy documents. He wants one thing: if something outside his control stops him from working, he wants some money to cover that gap. He wants it fast, and he does not want to have to explain himself to anyone.

That is exactly the product GigShield is.

### Secondary Persona — Fatima, Part-Time Delivery Partner, Hyderabad

Fatima is 31 years old and works delivery shifts in the evenings and on weekends to supplement her primary income as a salon assistant. She logs about 20–25 hours a week on Swiggy, earning roughly ₹8,000–10,000 a month from deliveries. This money goes toward her daughter's school fees.

For Fatima, the stakes per disruption are lower in absolute terms but higher proportionally — a single rain-affected weekend can wipe out 30% of her delivery income for the month. She is also less familiar with financial products and would benefit enormously from a simple, automatic system that requires zero active management on her part.

---

## What GigShield Is

GigShield is a **parametric income protection platform** for food delivery partners.

The word "parametric" is the key to understanding what makes this different from conventional insurance. In traditional insurance, you file a claim, someone reviews it, they decide whether it qualifies, and eventually you receive a payout — sometimes weeks later. The process requires documentation, back-and-forth, and often ends in disputes about whether your loss was "covered."

Parametric insurance works differently. Instead of asking "did you suffer a loss?" it asks "did a specific, measurable event occur?" If the answer is yes, the payout triggers automatically. No paperwork. No review process. No dispute.

In GigShield's case, the measurable events are things like: rainfall crossing a defined intensity threshold in your zone, AQI crossing 300, a curfew being declared, or platform downtime exceeding 30 minutes. The moment our system detects any of these conditions are met in your operating zone, your claim is initiated automatically.

The delivery partner does not need to do anything. They receive a notification saying their coverage has activated. A few minutes later, the payout hits their UPI.

---

## How We Solve the Problem

Our solution has four core components that work together:

### 1. Verified External Disruption Monitoring

GigShield runs a continuous monitoring pipeline that pulls data from multiple sources in near real-time:

- **Weather APIs** (OpenWeatherMap, IMD data) — tracking rainfall intensity, temperature, and severe weather alerts across pin-code level zones in every major metro
- **Air Quality APIs** (OpenAQ, WAQI) — monitoring AQI readings across city zones
- **Government alert feeds** (mocked for the prototype) — detecting curfews, Section 144 orders, and declared bandhs
- **Platform health monitoring** (simulated Swiggy/Zomato API) — detecting zone-level delivery assignment failures that indicate platform downtime

When any of these feeds crosses a predefined threshold, the system logs a disruption event against the affected zones.

### 2. Dynamic Worker-Zone Matching

Every delivery partner who signs up for GigShield registers their primary and secondary operating zones. When a disruption event is detected, the system identifies all active policy holders whose registered zones overlap with the affected area.

This is important because a rainfall event in Koramangala, Bengaluru should not trigger claims for workers primarily operating in Whitefield. The geographic matching ensures payouts go to workers who were actually affected.

### 3. Automated Claim Processing with Fraud Checks

Once a worker is matched to a disruption event, the system runs a set of automated fraud checks before initiating the payout. These checks happen in under 30 seconds:

- Is the worker's last known location consistent with the claimed zone?
- Is the disruption duration sufficient to cause meaningful income loss (minimum 45 minutes)?
- Does this claim pattern match the worker's historical behaviour?
- Is there an unusual cluster of simultaneous claims that might indicate coordinated fraud?

If the claim clears all checks, the payout is initiated immediately. If any check raises a flag, the claim goes into a manual review queue in the insurer admin dashboard — the worker is notified that their claim is under review and given an expected resolution time.

### 4. Instant UPI Payout

Clean claims are settled via UPI transfer, simulated through Razorpay's test mode in the prototype. The target settlement time is under 2 minutes from claim initiation to money in the worker's account. Workers can see their payout status in real time within the GigShield app.

---

## Benefits — For the Delivery Partner

### Financial Security Against Events Outside Their Control

The most direct benefit: when a disruption happens, they do not absorb 100% of the financial loss. GigShield steps in to partially replace the income they lost because of an external event — not because they made a bad decision or failed at their job.

For Arjun, this means a bad monsoon week does not mean borrowing from colleagues or skipping the monthly remittance home. For Fatima, it means her daughter's school fees are not at risk because of a three-day AQI spike in December.

### Zero Effort Claims

Arjun does not need to know how parametric insurance works. He does not need to file anything. He does not need to remember to submit a claim within a window. The moment our system detects a qualifying disruption in his zone, his claim starts automatically. He gets a push notification. He gets a payout. That is the entire experience from his side.

This is the most important design principle in GigShield: **the best claim experience is one the worker never has to actively participate in.**

### Transparent, Predictable Weekly Pricing

GigShield charges a weekly premium — not monthly, not annual. This matches how delivery partners actually think about and manage money. The premium is shown to the worker every Sunday before the next week begins, so they always know exactly what they are paying. They can opt out of any week with no penalty if money is tight.

There are no hidden fees, no deductibles, no excess clauses. The policy document is one page and written in plain language, available in Hindi, Kannada, Tamil, and Telugu in addition to English.

### A Safety Net That Builds Over Time

Workers who stay on the platform and maintain a clean claims history receive a loyalty discount on their premium. Workers who refer other delivery partners receive a one-week free coverage credit. The longer Arjun stays with GigShield, the cheaper his coverage gets — rewarding exactly the kind of long-term relationship that is good for both the worker and the product.

### Proof of Financial Responsibility for Other Financial Products

An unintended but valuable benefit: a GigShield policy history creates a trackable record of income, disruption exposure, and financial behaviour for workers who otherwise have no formal financial footprint. This kind of data can eventually become useful evidence of creditworthiness — something many gig workers struggle to demonstrate when applying for vehicle loans or housing.

---

## Benefits — For Platforms Like Swiggy and Zomato

This section matters because GigShield's long-term model includes a potential partnership or white-label arrangement with the platforms themselves. Here is why it is in Swiggy and Zomato's interest to see something like GigShield exist:

### Reduced Partner Churn During Disruption Events

One of the biggest challenges platforms face is partner attrition — workers leaving after a string of bad weeks. When disruptions cause income to drop significantly, the workers most likely to quit are the ones who needed the income most urgently. These are often experienced, high-rated partners who the platform has invested in (through onboarding, incentive schemes, and training).

If GigShield cushions the financial impact of bad weeks, workers are more likely to stay on the platform through the rough patch rather than switching to a different gig economy job. Lower churn means lower recruitment and onboarding costs for the platform.

### Better Partner Availability During Recovery

After a heavy rain event, platforms currently face a lag of 2–4 hours before partner availability recovers to normal, because workers who lost income during the disruption are hesitant to log back in until conditions are completely clear. If those workers have received a partial income replacement, they are more likely to log back in earlier — which means faster platform recovery and better customer experience.

### Positive Brand Positioning Around Worker Welfare

The policy conversation around gig worker welfare in India is getting louder. The Code on Social Security 2020 and ongoing regulatory discussions around platform workers' rights mean that platforms which can point to genuine worker protection initiatives have a meaningful PR and regulatory advantage. A partnership with GigShield — or a Swiggy-branded version of it — gives the platform a concrete, demonstrable welfare programme.

### Potential Revenue Sharing Model

If Swiggy or Zomato choose to offer GigShield as a built-in benefit (either subsidising the full premium or offering discounted rates to their partner network), GigShield shares a portion of the premium revenue with the platform. The platform earns recurring revenue from their own partner base while reducing churn — a genuine win-win structure.

---

## The Weekly Premium Model

### Why Weekly?

Delivery partners are paid by the platform on a weekly basis in most cases. Their expenses — fuel, food, occasional vehicle maintenance — are also managed week to week. Monthly or annual insurance premiums require a lump sum commitment that is genuinely hard for this income segment. A weekly model means the insurance cost is always proportional to what they earned that week.

### Base Premium Structure

| Coverage Tier | Weekly Premium | Max Payout Per Event | Max Events Per Week |
|---|---|---|---|
| Basic | ₹39 | ₹300 | 1 |
| Standard | ₹59 | ₹600 | 2 |
| Premium | ₹89 | ₹1,000 | 3 |

The majority of workers will be on the Standard tier — it covers the most common disruption scenarios (one bad rain afternoon + one additional event) without being expensive.

### Dynamic Adjustment Factors

The base premium is adjusted weekly using three inputs:

**Zone Risk Score (±₹15)**

Each operating zone is scored based on:
- Flood and waterlogging frequency over the past 3 monsoon seasons
- Average AQI readings by month
- Historical bandh/curfew frequency
- Proximity to low-lying areas or industrial zones

A worker in a low-risk zone gets a reduction of up to ₹15. A worker in a historically high-disruption zone pays the base or up to ₹10 more.

**Predictive Weather Index (±₹12)**

Every Sunday evening, our ML model pulls a 7-day weather forecast for the worker's registered zones. It runs this through a probability model to estimate the likelihood of a trigger-level event occurring in the coming week. If the probability exceeds 60%, the premium adjusts upward. If it is a forecast clear week, the premium adjusts downward.

This is where the AI adds genuine value — the premium is not just based on historical zone data, it reflects what is likely to actually happen to that specific worker in the next 7 days.

**Loyalty Discount (up to −₹8)**

Workers who have been active for 3+ months with no fraudulent claim history receive a progressive discount. This caps at ₹8/week after 6 months of clean usage.

### Example Calculations

**Arjun — Standard tier, Bengaluru**
- Zone: Moderate risk (Koramangala) → −₹4 adjustment
- Forecast: Clear week in February → −₹7 adjustment
- Tenure: 22 months, clean history → −₹8 discount
- **Final premium: ₹59 − ₹4 − ₹7 − ₹8 = ₹40/week**

**Arjun — Same tier, week of August 15**
- Zone: Same zone, but monsoon season raises risk → +₹6 adjustment
- Forecast: 80% probability of heavy rain trigger → +₹10 adjustment
- Tenure: Same discount applies → −₹8
- **Final premium: ₹59 + ₹6 + ₹10 − ₹8 = ₹67/week**

The premium range for a Standard tier worker will typically fall between ₹39 and ₹79 across the year. Most workers will pay an average of ₹52–55/week — roughly the cost of 4–5 chai and snacks.

---

## Parametric Triggers — How Claims Fire

This is the technical heart of GigShield. Each trigger is a set of measurable conditions. When those conditions are met and sustained for a defined minimum duration, the trigger fires for all active policy holders in the affected zone.

### Trigger 1 — Heavy Rainfall

| Parameter | Value |
|---|---|
| Data Source | OpenWeatherMap API (current weather + alerts endpoint) |
| Threshold | Rainfall intensity > 15mm/hour |
| Minimum Duration | 45 continuous minutes |
| Geographic Resolution | Zone-level (approximately 5km radius per zone) |
| Payout Basis | ₹75/hour of disruption, up to policy maximum |

**Why 15mm/hour?** This is the threshold at which food delivery platforms in major metros begin seeing significant order drop and delivery rejection rates. Below this, rain is an inconvenience but not a genuine income blocker. Above this, roads in low-lying areas flood, visibility drops dangerously, and most restaurants stop accepting new orders entirely.

**Why 45 minutes minimum?** Short rain bursts of 10–15 minutes are common during Indian monsoons and resolve quickly. They do not cause meaningful income loss. The 45-minute threshold filters out these events and ensures we only pay for disruptions that actually kept workers off the road.

### Trigger 2 — Dangerous AQI Level

| Parameter | Value |
|---|---|
| Data Source | OpenAQ API / WAQI API |
| Threshold | AQI > 300 (Hazardous category, PM2.5 and PM10 combined) |
| Minimum Duration | 3 continuous hours |
| Geographic Resolution | City district level |
| Payout Basis | ₹60/hour of disruption |

**Context:** AQI above 300 is classified as Hazardous by India's Central Pollution Control Board. At this level, outdoor physical work is medically inadvisable, and the government itself issues advisories against prolonged outdoor activity. This trigger is primarily relevant for Delhi/NCR partners from November through January.

### Trigger 3 — Extreme Heat

| Parameter | Value |
|---|---|
| Data Source | OpenWeatherMap API (feels-like temperature) |
| Threshold | Feels-like temperature > 44°C |
| Time Window | Between 11:00 AM and 4:00 PM only |
| Minimum Duration | 3 continuous hours within the window |
| Geographic Resolution | City level |
| Payout Basis | ₹50/hour (partial coverage — workers may still work but at reduced capacity) |

**Why feels-like instead of actual temperature?** At 44°C feels-like, the combination of heat and humidity makes outdoor physical work genuinely dangerous. Actual temperature of 40°C with 70% humidity feels like 50°C. The feels-like index captures real physiological risk better than raw temperature.

### Trigger 4 — Platform Downtime

| Parameter | Value |
|---|---|
| Data Source | Simulated Swiggy/Zomato platform API health endpoint |
| Threshold | Order assignment failure rate > 80% across a zone |
| Minimum Duration | 30 continuous minutes |
| Verification | Worker must have been in "online" status at time of outage |
| Payout Basis | ₹80/hour of downtime |

**Why platform downtime?** This is a disruption entirely created by the platform itself — workers are logged in, ready to work, and earning nothing through no fault of their own. The platform's own downtime is in many ways the most unjust income loss a delivery partner faces, and it is the most precisely measurable.

For the prototype, we simulate platform health data. A real implementation would require an API-level partnership with the platform (which is another argument for the Swiggy/Zomato partnership model).

### Trigger 5 — Curfew / Section 144 / Declared Bandh

| Parameter | Value |
|---|---|
| Data Source | Government notification API (mocked) + verified news signal cross-check |
| Threshold | Official government order restricting movement in the area |
| Minimum Duration | Any declared duration counts from the moment of order |
| Geographic Resolution | Ward / area level |
| Payout Basis | ₹85/hour for declared duration |

**Why highest payout rate?** A curfew or Section 144 order is a legal prohibition on movement. This is the highest-confidence trigger — it is an official government action, completely unambiguous, and the income loss is total rather than partial. Workers legally cannot be on the road, so the payout reflects that.

---

## The Claim Journey — Step by Step

This is worth walking through in full detail because it is the most important user experience in the product. Everything else exists to make this work.

### From the Worker's Perspective

**Step 1: Disruption Occurs**

It is 3:15 PM on a Wednesday. Arjun is in Koramangala. Rainfall has been heavy since 2:45 PM and his app has gone quiet. He has no idea what GigShield is doing in the background.

**Step 2: Trigger Detected (3:30 PM)**

GigShield's monitoring service detects that rainfall in the Koramangala zone has exceeded 15mm/hour and has been sustained for 45 minutes. A disruption event is created in the system, timestamped 3:30 PM, and all active Standard and Premium tier policy holders in the Koramangala zone are flagged.

**Step 3: Fraud Checks Run (3:30 PM – 3:31 PM)**

For Arjun specifically:
- His last GPS ping from the platform mock API shows him at a location within the Koramangala zone ✓
- His policy is active and in good standing ✓
- He has not made a claim in the past 72 hours ✓
- His claim frequency is within normal range for his peer group ✓
- The disruption event is corroborated by multiple sensor sources ✓

All checks pass in approximately 40 seconds.

**Step 4: Payout Initiated (3:31 PM)**

The system initiates a payout calculation: disruption is ongoing, so an initial payout of 1 hour is calculated (₹75 for Standard tier, Heavy Rain trigger). The payout is queued in Razorpay test mode to Arjun's registered UPI ID.

**Step 5: Worker Notified (3:31 PM)**

Arjun's phone buzzes. Push notification:

> *"Heavy rain detected in your zone. Your GigShield coverage is active. ₹75 has been sent to your UPI. If the rain continues, your coverage keeps running."*

**Step 6: Ongoing Monitoring**

The disruption continues until 5:45 PM — approximately 2.5 hours of qualifying disruption. The system calculates a total payout of 2.5 × ₹75 = ₹187.50, rounded to ₹187. Arjun's total payout for the event is ₹187, against a weekly premium of ₹40.

From Arjun's perspective, his phone buzzed once. Money appeared. He did not do a single thing.

**Step 7: Post-Event Summary**

That evening, a summary notification:

> *"Today's rain event: 2.5 hours covered. ₹187 paid to your UPI. Your weekly policy remains active. Stay safe."*

### What Happens When a Claim Is Flagged

If any fraud check raises a concern, the claim does not automatically reject — it enters a manual review queue. Arjun receives a different notification:

> *"We've detected a weather event in your zone and are reviewing your claim. We'll update you within 4 hours."*

A human reviewer (or in Phase 3, an AI-assisted reviewer using the insurer dashboard) looks at the flagged signal. Most flagged claims will be legitimate — false positives from aggressive fraud rules — and will be approved after review. Genuinely suspicious claims are investigated further before any payout.

Workers are never left in the dark. Every status change triggers a notification.

---

## Fraud Detection

Parametric insurance is inherently susceptible to a specific kind of fraud: workers gaming the trigger conditions. In our case, the most realistic fraud vectors are:

### GPS Spoofing
A worker registers themselves as being in a high-disruption zone when they are actually elsewhere, to qualify for a claim they should not receive.

**Our countermeasure:** Cross-reference the worker's last 3 GPS pings from the platform API with the claimed zone. We look for sudden, physically impossible location jumps (being in Whitefield at 2 PM and in Koramangala at 2:05 PM). Workers whose location data is inconsistent with the triggered zone are automatically flagged.

### Fake Policy for Rain Zone
A worker who primarily operates in a low-disruption zone registers their zone as a high-disruption area to benefit from larger trigger probabilities.

**Our countermeasure:** Zone assignment is verified against the worker's historical delivery data from the platform API mock. If someone claims to work in Dharavi but their delivery history shows 90% of orders in Bandra, the zone mismatch is flagged at onboarding.

### Coordinated Claim Clustering
A group of workers coordinate to all claim during a marginal event that just barely crosses the trigger threshold, hoping the volume makes individual review unlikely.

**Our countermeasure:** When we see an unusual spike in simultaneous claim initiations in a zone relative to the historical norm, we increase the evidence threshold required for automatic approval. Marginal trigger events (rainfall sitting right at the 15mm threshold) trigger additional data cross-referencing before auto-approval.

### Repeated Low-Severity Claims
A worker learns exactly what the trigger thresholds are and starts logging in strategically only during events they know will trigger a claim, effectively gaming the coverage to be profitable.

**Our countermeasure:** We track each worker's claim-to-premium ratio over a rolling 8-week window. Outliers — workers whose claims consistently far exceed their premiums by a statistical anomaly — get flagged for review. We also adjust their future premium upward to reflect their elevated risk profile.

### Our Fraud Scoring Model

Each claim is assigned a fraud risk score between 0 and 1 before payout. The score is calculated from:

- GPS consistency (0 = perfect match, 1 = impossible location)
- Claim frequency percentile within peer group
- Time since last claim
- Trigger confidence level (how far above threshold the event was)
- Worker account age

Claims scoring below 0.3 auto-approve. Claims between 0.3 and 0.6 are reviewed within 4 hours. Claims above 0.6 are placed in a detailed investigation queue.

---

## AI and ML Integration

### Premium Calculation — XGBoost Risk Model

The dynamic premium calculation runs on an XGBoost regression model trained on:
- 3 years of historical weather data for 12 major Indian metros (sourced from IMD public datasets)
- Historical AQI readings from OpenAQ archives
- Historical bandh and curfew frequency data by city/district (compiled from public records)
- Synthetic worker income data modelled on publicly available platform earnings surveys

The model outputs a weekly risk score for each worker's primary zone. This score is translated into a premium adjustment using a lookup table calibrated to maintain the platform's target loss ratio.

For the prototype, we generate realistic synthetic training data that demonstrates the model's behaviour accurately — judges will be able to see the premium adjust in real time based on simulated forecast changes.

### Fraud Detection — Anomaly Scoring with Isolation Forest

The fraud scoring model uses an Isolation Forest algorithm, which is well-suited to anomaly detection when you have more normal samples than fraudulent ones (which is the case here — most claims will be legitimate).

The model is trained on synthetic claim behaviour data representing both normal usage patterns and the fraud vectors described above. In production, the model would be retrained monthly as real claim data accumulates.

### Conversational Onboarding — Claude API

The worker onboarding flow uses Claude (claude-sonnet-4-6) as a conversational interface. Instead of filling out a form with 8 fields, the worker has a brief back-and-forth exchange:

> *GigShield: Hi! I'm going to set up your coverage in about 2 minutes. Which platform do you deliver for — Swiggy, Zomato, or both?*
>
> *Worker: swiggy mostly*
>
> *GigShield: Got it. Which areas of the city do you mostly deliver in?*
>
> *Worker: koramangala and hsr mostly*

The Claude API extracts structured data (platform, zones, language preference, working hours) from this conversation and populates the worker's profile automatically. This is faster and more accessible than a form — especially for workers who are more comfortable typing in their native language.

The API is also used in Phase 3 for Hindi, Kannada, Tamil, and Telugu language support — workers can interact with the app in their preferred language without us building separate language models.

### Predictive Analytics for Insurers

The insurer admin dashboard includes a predictive panel powered by the ML model: a 7-day forward projection of likely claim volume and total payout by city and zone. This helps the insurance partner manage their reserve requirements — knowing that next week is forecasted to be a heavy disruption week in Mumbai means they can ensure adequate liquidity before the claims fire.

---

## Platform and Tech Stack

### Why Web (Progressive Web App)?

We chose a web-first, mobile-optimised progressive web application over a native Android/iOS app for two reasons.

First, for the hackathon: a web app is easier to share, demo, and judge. No APK installation, no TestFlight, no device compatibility issues.

Second, for the actual product: delivery partners already have 2–3 apps running on their phone (the delivery platform app, Google Maps, possibly WhatsApp for work communication). Getting them to install a fourth dedicated app is a high-friction ask. A PWA can be added to the home screen with one tap, works offline for core functions, and looks and feels like a native app. It also means one codebase, which is important for a small team.

The UI is built mobile-first — large touch targets, high contrast, minimal text input required, designed for use while sitting on a two-wheeler waiting for rain to stop.

### Stack

| Layer | Technology | Why |
|---|---|---|
| Frontend | React 18 + Tailwind CSS | Component model suits dashboard + worker UI split |
| Backend API | Node.js + Express | JavaScript across stack, large ecosystem |
| Database | PostgreSQL | Structured relational data suits insurance records |
| ML Service | Python 3.11 + FastAPI + XGBoost + scikit-learn | Separate microservice, well-suited for model serving |
| AI / NLP | Claude API (claude-sonnet-4-6) | Conversational onboarding + multilingual support |
| Weather Data | OpenWeatherMap API (free tier) | Reliable, covers all Indian metros, good documentation |
| AQI Data | OpenAQ API + WAQI API | Free, granular, covers major Indian cities |
| Platform Mock | Custom Node.js mock service | Simulates Swiggy/Zomato API responses |
| Payments | Razorpay Test Mode | Simulates UPI payouts realistically |
| Auth | Firebase Auth | Fast to implement, secure, supports phone number OTP |
| Hosting | Vercel (frontend) + Railway (backend + ML service) | Both have free tiers, fast CI/CD |
| Version Control | GitHub | This repository |

### Architecture Overview

```
┌─────────────────────────────────────────────────────┐
│                  Worker PWA (React)                  │
│         Onboarding · Policy · Claims · Payouts       │
└──────────────────────┬──────────────────────────────┘
                       │ HTTPS
┌──────────────────────▼──────────────────────────────┐
│              Express API Server (Node.js)            │
│    Auth · Policy CRUD · Claim Processing · Payouts   │
└────┬──────────────┬───────────────┬─────────────────┘
     │              │               │
┌────▼───┐    ┌─────▼─────┐   ┌────▼──────────────────┐
│Postgres│    │ML Service  │   │  Trigger Monitor       │
│        │    │(FastAPI +  │   │  (Cron-based Node.js)  │
│Workers │    │ XGBoost)   │   │  Weather · AQI ·       │
│Policies│    │            │   │  Platform · Curfew     │
│Claims  │    │Premium calc│   │                        │
│Payouts │    │Fraud score │   └────────────────────────┘
└────────┘    └────────────┘
```

---

## Application Workflow

### Worker Onboarding (Target: Under 3 Minutes)

```
1. Phone number entry → OTP verification (Firebase)
2. Conversational onboarding via Claude API
   → Platform (Swiggy/Zomato/both)
   → Primary operating zones (2–3 areas)
   → Approximate working hours
   → UPI ID for payouts
3. AI generates risk profile → weekly premium quoted
4. Worker selects coverage tier (Basic / Standard / Premium)
5. First week's premium payment via Razorpay
6. Policy active from the following Monday 00:00
```

### Active Coverage Week

```
Sunday evening
→ ML model calculates next week's premium
→ Worker notified of upcoming premium and forecast summary
→ Worker confirms renewal (or opts out — no penalty)

Monday through Sunday
→ Trigger monitor runs every 5 minutes
→ On trigger: zone match → fraud checks → payout or queue
→ Worker receives push notifications for every claim event
→ Weekly summary sent Sunday evening
```

### Insurer Dashboard

```
Real-time overview
→ Active policy count by city
→ Live disruption map (active triggers highlighted)
→ Claims in flight (auto-approved, in-review, flagged)
→ Today's total payout exposure

Analytics panel
→ Loss ratio by zone, trigger type, and time period
→ Fraud alert queue with risk scores and case details
→ Predictive panel: next 7-day forecast claim volume
→ Worker cohort analysis (retention, claim frequency, churn risk)
```

---

## Development Roadmap

### Phase 1 — Weeks 1–2 (Ideation and Foundation) ← Current Phase

- [x] Problem statement analysis and persona definition
- [x] Weekly premium model designed and documented
- [x] Parametric trigger logic and thresholds defined
- [x] Fraud detection approach designed
- [x] Tech stack selected and justified
- [ ] GitHub repository created and structured
- [ ] Database schema designed (ERD)
- [ ] UI wireframes (Figma — worker app + admin dashboard)
- [ ] Project scaffolding (React frontend + Express backend initialised)

**Deliverable:** This README + GitHub repo + 2-minute strategy video

### Phase 2 — Weeks 3–4 (Automation and Protection)

- [ ] Worker registration and profile creation (with Claude API onboarding)
- [ ] Policy creation with dynamic weekly premium calculation
- [ ] OpenWeatherMap and OpenAQ API integrations (live triggers)
- [ ] Platform downtime and curfew triggers (mocked)
- [ ] Auto-claim initiation pipeline (trigger → match → fraud check → payout)
- [ ] Basic fraud scoring model (GPS check + duplicate detection)
- [ ] Razorpay test mode integration for UPI payouts
- [ ] Worker-facing notifications (push + in-app)

**Deliverable:** Executable demo + 2-minute demo video

### Phase 3 — Weeks 5–6 (Scale and Optimise)

- [ ] Full fraud detection model (Isolation Forest) deployed
- [ ] Worker dashboard — earnings protected, payout history, coverage status
- [ ] Insurer admin dashboard — loss ratios, fraud queue, predictive analytics
- [ ] Disruption simulation mode (for demo — manually trigger a fake rain event)
- [ ] Multilingual support (Hindi + one regional language)
- [ ] Final pitch deck (PDF)
- [ ] 5-minute demo video with simulated disruption walkthrough

**Deliverable:** Final submission package — code + 5-minute video + pitch deck PDF

---

## Why This Works

The delivery partner insurance gap is not unsolved because it is technically hard. It is unsolved because conventional insurance companies design products for people with stable incomes, documented employment, and the time and literacy to navigate policy documents and claims processes.

GigShield is designed from the ground up for people who have none of those things. The premium is weekly because their income is weekly. The claim process requires zero effort because they do not have time to file claims. The payout is via UPI because that is how they already receive money. The onboarding is conversational because many of them are more comfortable talking than filling out forms.

The parametric model is the right model for this use case for one simple reason: the triggers are external and verifiable. There is no ambiguity about whether it rained. There is no ambiguity about whether the AQI was above 300. When the trigger condition is a number that anyone can look up, there is nothing to dispute. The claim process becomes a logistics problem, not an adjudication problem.

That is what makes this viable. That is what makes it useful. And that is what the 5 million delivery partners working across India's metros deserve.

--

## Team Neo

*University: Parul University*

---

## Repository Structure

```
gigshield/
├── client/                 # React PWA frontend
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── pages/          # Worker app + Admin dashboard pages
│   │   └── services/       # API client, auth
├── server/                 # Express API backend
│   ├── routes/             # Policy, claims, payouts, auth
│   ├── services/           # Trigger monitor, Razorpay, notifications
│   └── models/             # PostgreSQL schema and queries
├── ml-service/             # Python FastAPI microservice
│   ├── models/             # XGBoost premium model + fraud scorer
│   ├── training/           # Training scripts and synthetic data
│   └── api/                # FastAPI endpoints
├── mocks/                  # Simulated platform API and government alerts
├── docs/                   # Architecture diagrams, API documentation
└── README.md               # This file
```

---

*Guidewire DEVTrails 2026 · University Hackathon · Phase 1 Submission · March 2026*
