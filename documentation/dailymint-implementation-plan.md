# DailyMint - Hackathon-Focused Implementation Plan 

## 🎯 Core Hackathon Goal
**Build the minimum viable social loop that gets people hooked and sharing:**
*Prompt → Create → Mint → Share → Repeat*

## 🚀 The "Demo Day Magic" Strategy
- Get it working, get it viral, get it demoed with REAL users
- Focus on the emotional hook: "I created something permanent today"
- Make sharing irresistible

---

## Day 1: Foundation That Works ⚡

### Morning (4 hours)
- [x] Next.js + Frame SDK basic setup
- [ ] **Supabase robust setup**: Production-ready database schema
  - `users` (id, fid, username, display_name, pfp_url, wallet_address, total_coins_earned, created_at, updated_at, last_login)
  - `daily_prompts` (id, date, prompt_text, prompt_type, created_by_user_id, is_community_generated, votes, created_at)
  - `creations` (id, user_id, prompt_id, content, content_type, zora_token_id, zora_contract_address, mint_hash, is_minted, coins_earned, is_public, created_at, updated_at)
  - `user_streaks` (id, user_id, current_streak, longest_streak, last_creation_date, total_creations, streak_start_date, updated_at)
  - `collections` (id, user_id, name, description, zora_collection_address, is_public, creation_count, total_coins_value, created_at, updated_at)
  - `collection_items` (id, collection_id, creation_id, added_at, sort_order)
  - `user_tokens` (id, user_id, token_balance, total_earned, total_spent, last_updated)
  - `token_transactions` (id, user_id, transaction_type, amount, description, creation_id, created_at)
  - `notifications` (id, user_id, type, title, message, is_read, created_at, data)
- [ ] **Row Level Security (RLS)**: Proper security policies for all tables
- [ ] **Database indexes**: Performance optimization for queries
- [ ] **Farcaster Quick Auth**: One-click sign in with Farcaster
- [ ] **Coins v4 integration**: Set up token contract and basic rewards
- [ ] **One hardcoded prompt**: "Write about something that surprised you today"

### Afternoon (4 hours)
- [ ] **Creation form**: Textarea + submit that saves to DB
- [ ] **Basic neobrutalism UI**: Make it look BOLD
- [ ] **Coins reward system**: Earn tokens for daily creations
- [ ] **Deploy to Vercel**: Get live URL working
- [ ] **Test in Warpcast**: Frame loads, auth works, accepts input

**End of Day 1 Goal**: User can sign in instantly, write something, save it, and earn coins. Robust database handles real users. Frame loads in Warpcast.

---

## Day 2: The Minting Magic + Token Economy ⛏️

### Morning (4 hours)
- [ ] **Zora setup**: One simple mint function that works
- [ ] **IPFS metadata**: Basic metadata upload via Pinata
- [ ] **Mint button**: Connect creation → Zora mint
- [ ] **Coins v4 rewards**: Earn tokens for minting (100 DAILY per creation)
- [ ] **Token transaction tracking**: Record all token earnings/spending
- [ ] **Transaction feedback**: "Minting..." → "Success! +100 DAILY earned"

### Afternoon (4 hours)
- [ ] **Claude integration**: Generate 1 daily prompt per day
- [ ] **Streak counter**: Robust streak calculation with edge cases
- [ ] **Token balance display**: Show user's DAILY token balance
- [ ] **Bonus rewards**: Streak multipliers (Day 7 = 200 DAILY, Day 15 = 300 DAILY)
- [ ] **Success screen**: Show NFT link + tokens earned + streak count
- [ ] **Enhanced sharing**: Auto-compose cast with creation + token rewards + streak
- [ ] **Notification system**: Basic in-app notifications for rewards

**End of Day 2 Goal**: Full loop works with robust token tracking. User creates → mints NFT → earns tracked tokens → notifications work → can share to Farcaster.

---

## Day 3: Social Virality + Token Utility 🌐

### Morning (4 hours)
- [ ] **Perfect the share**: Compelling cast text + embed + token earnings
- [ ] **Token utility**: Spend DAILY tokens for premium prompts or features
- [ ] **Collections system**: Users can organize creations into collections
- [ ] **Leaderboards**: Top creators by tokens earned this week/month
- [ ] **Notifications**: Push notifications for streak reminders and rewards
- [ ] **Basic discovery**: Show other users' creations + their token earnings

### Afternoon (4 hours)
- [ ] **Polish the UI**: Make it screenshot-worthy
- [ ] **Token animations**: Satisfying token earn animations
- [ ] **Farcaster Quick Auth polish**: Seamless one-tap sign in
- [ ] **User profiles**: Basic profile pages showing stats and collections
- [ ] **Add personality**: Fun copy, emojis, attitude about earning/creating
- [ ] **Mobile optimization**: Works perfectly on phone
- [ ] **Error handling**: Graceful failures with user-friendly messages
- [ ] **Performance optimization**: Fast loading, smooth interactions

**End of Day 3 Goal**: App feels polished and user-ready. Token economy creates engagement hooks. Collections and profiles work. Ready for real users.

---

## Day 4: Demo Day Prep & Beta Testing 🏆

### Morning (4 hours)
- [ ] **Get 10 beta users**: Friends, FC community, etc.
- [ ] **Fix critical bugs**: Based on real usage
- [ ] **Analytics setup**: Track key metrics for demo
- [ ] **Demo materials**: Screenshots, user testimonials

### Afternoon (4 hours)
- [ ] **Demo script**: Perfect the 3-minute pitch
- [ ] **Live demo prep**: Have real users creating during demo
- [ ] **Backup plans**: Screenshots if live demo fails
- [ ] **Final polish**: Last-minute UX improvements

**End of Day 4 Goal**: Ready to demo with confidence. Real users creating content.

---

## 🎯 The Absolute MVP Feature Set

### Must-Have (Core Loop)
1. **Farcaster Quick Auth**: Instant sign-in with FC account
2. **Daily Prompt**: One prompt per day (can be hardcoded initially)
3. **Creation Form**: Text input that works on mobile
4. **Zora Minting**: Turn creation into NFT
5. **Coins v4 Rewards**: Earn DAILY tokens for each creation
6. **Streak Counter**: Visual feedback + token multipliers
7. **Share to FC**: One-click sharing with token earnings
8. **Frame UI**: Works in Warpcast mobile/desktop

### Should-Have (Polish)
9. **Neobrutalism Design**: Bold, memorable visual style
10. **Claude Prompts**: AI-generated daily prompts
11. **Token Leaderboards**: See top earners
12. **Basic Discovery**: See others' creations + earnings
13. **Notifications**: Streak reminders with token incentives

### Could-Have (Stretch Goals)
14. **Token Utility**: Spend tokens for premium features
15. **Collections**: Monthly NFT collections
16. **Community Prompts**: User-suggested prompts (costs tokens)
17. **Advanced Streaks**: Special NFT rewards for long streaks
18. **Creator Marketplace**: Trade tokens for special prompts

---

## 🚨 Critical Success Factors

### For Demo Day
- [ ] **Live Usage**: Have 20+ real creations minted during hackathon
- [ ] **Social Proof**: Screenshots of shares in FC feeds
- [ ] **Mobile Perfect**: Flawless experience on phones (where FC lives)
- [ ] **Story Arc**: Show user journey from Day 1 → Day 30 streak

### Technical Non-Negotiables
- [ ] **Frame SDK**: Perfect integration, loads instantly
- [ ] **Farcaster Quick Auth**: One-tap sign in experience
- [ ] **Coins v4**: Smooth token earning/spending flow
- [ ] **Mobile Responsive**: Optimized for FC mobile clients
- [ ] **Error Handling**: Graceful failures, never breaks
- [ ] **Performance**: <2s load times, smooth interactions

### Viral Mechanics
- [ ] **Irresistible Sharing**: Make people WANT to share their streak
- [ ] **FOMO Creation**: "Don't break your streak!"
- [ ] **Social Proof**: Show other people's amazing streaks
- [ ] **Discovery Loop**: Shared creations bring new users

---

## 🔥 "10/10 Demo" Secret Weapons

### During Presentation
1. **Live Community**: Have users creating DURING your demo
2. **Real NFTs**: Show actual minted NFTs on OpenSea
3. **Social Feed**: Display real FC shares happening live
4. **Progression Story**: Show someone's journey from Day 1 to Day 15

### Memorable Moments
1. **The Streak**: "Sarah hasn't missed a day in 23 days"
2. **The Collection**: "Here's her entire month as NFTs"
3. **The Community**: "Look at today's creations from 30 users"
4. **The Growth**: "We've seen 500 creations in 4 days"

### Technical Wow Factors
1. **Instant Minting**: <30 second creation to NFT
2. **Perfect Mobile**: Buttery smooth on phone
3. **Smart Prompts**: Claude generates personalized prompts
4. **Social Integration**: Seamless FC experience

---

## 🎪 Demo Day Script (3 minutes)

### Hook (30 seconds)
"How many of you have tried to build a creative habit and failed? Writing daily, drawing, anything? DailyMint solves this by making your creativity permanent, social, AND rewarding."

### Problem/Solution (60 seconds)
"The problem: Creative habits die because there's no accountability or reward. The solution: Every day you create something, we mint it as an NFT AND you earn DAILY tokens. Your streak becomes a permanent collection plus real value. Miss a day? Break the chain and lose your multiplier."

### Live Demo (60 seconds)
"Watch this - [open app] [quick auth with FC] Today's prompt: 'Write about something that surprised you.' [type quickly] 'I was surprised by...' [submit] [mint] Boom - that's now an NFT, plus I earned 150 DAILY tokens for my 3-day streak. [share to FC] And now it's in the social feed with my earnings."

### Traction/Vision (30 seconds)
"In 4 days of beta: 47 users, 312 creations minted, 15,000 DAILY tokens earned, 89% daily retention. This isn't just an app - it's a new creative economy. We're making creativity permanent, social, and profitable."

---

## ⚠️ What We're NOT Building (Scope Creep Killers)

### Avoid These Temptations
- ❌ Complex user profiles
- ❌ Advanced analytics dashboards  
- ❌ Multiple content types (just text for MVP)
- ❌ Elaborate reward systems
- ❌ Complex friend systems
- ❌ Advanced admin tools
- ❌ Multiple languages
- ❌ Complex authentication flows

### Technical Debt We Accept
- ❌ Perfect type coverage (get it working first)
- ❌ 100% test coverage (manual test the happy path)
- ❌ Perfect error handling (handle main cases)
- ❌ Advanced performance optimization
- ❌ Perfect accessibility (basic is fine)

---

## 🎯 Success Metrics That Matter

### For Judging
- **Daily Active Users**: How many people actually use it daily?
- **Retention Rate**: Do people come back tomorrow?
- **Social Sharing**: How viral is it?
- **NFT Minting**: Are people actually minting?

### For Demo Impact
- **Live Usage**: People using it during presentation
- **Social Proof**: Real shares in FC feeds
- **Community**: Growing user base
- **Technical Excellence**: Works flawlessly on mobile

---

## 💡 Hackathon Mindset Shifts

### From Enterprise → Hackathon
- **Documentation**: Comments in code, not extensive docs
- **Testing**: Manual testing of core flow, not unit tests
- **Types**: Basic TypeScript, not perfect coverage
- **Architecture**: Simple and working, not perfect patterns
- **Features**: Core loop only, not feature-complete

### From Perfect → Demo-Ready
- **Polish over Performance**: Better to look amazing and be slightly slow
- **Stories over Stats**: User testimonials > analytics dashboards
- **Social over Solo**: Viral features > individual optimization
- **Mobile over Desktop**: Most FC usage is mobile

### Hackathon Mantra
**"Does it work? Does it wow? Can people use it? Does it spread?"**

If yes to all four → you win. Everything else is nice-to-have.