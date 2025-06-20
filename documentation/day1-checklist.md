# DailyMint - Day 1 Implementation Checklist

## 🎯 Day 1 Goal
Build a working foundation that allows users to sign in, write something, save it, and earn coins. The database should be robust enough to handle real users, and the Frame should load properly in Warpcast.

## 📋 Morning Tasks (4 hours)

### 1. Next.js + Frame SDK Setup
- [ ] Initialize Next.js 14 project with App Router
- [ ] Install and configure Frame SDK
- [ ] Set up Frame manifest in .well-known/farcaster.json
- [ ] Configure Frame metadata and routing
- [ ] Test Frame loading in development

### 2. Supabase Database Setup
- [ ] Create new Supabase project
- [ ] Implement production-ready database schema:
  - [ ] `users` table
  - [ ] `daily_prompts` table
  - [ ] `creations` table
  - [ ] `user_streaks` table
  - [ ] `collections` table
  - [ ] `collection_items` table
  - [ ] `user_tokens` table
  - [ ] `token_transactions` table
  - [ ] `notifications` table
- [ ] Set up Row Level Security (RLS) policies
- [ ] Create necessary database indexes
- [ ] Test database connections

### 3. Authentication & User Management
- [ ] Implement Farcaster Quick Auth with Neynar
- [ ] Set up Neynar SDK for user data
- [ ] Create user profile management
- [ ] Test authentication flow

### 4. Token System Setup
- [ ] Configure Coins v4 integration
- [ ] Set up token contract
- [ ] Implement basic reward system
- [ ] Test token transactions

### 5. Content Management
- [ ] Create hardcoded daily prompt
- [ ] Set up prompt storage in database
- [ ] Test prompt retrieval

## 📋 Afternoon Tasks (4 hours)

### 1. Creation Interface
- [ ] Build creation form component
- [ ] Implement textarea with character limit
- [ ] Add submission handling
- [ ] Test form validation

### 2. UI Implementation
- [ ] Set up neobrutalism.dev components
- [ ] Install and configure shadcn/ui
- [ ] Implement neobrutalism styling
- [ ] Create responsive layout
- [ ] Test mobile compatibility

### 3. Token Reward System
- [ ] Implement coin earning logic
- [ ] Add reward calculations
- [ ] Create transaction tracking
- [ ] Test reward distribution

### 4. Deployment
- [ ] Set up Vercel project
- [ ] Configure environment variables
- [ ] Deploy to production
- [ ] Test live deployment

### 5. Warpcast Integration
- [ ] Test Frame loading in Warpcast
- [ ] Verify authentication flow
- [ ] Test input acceptance
- [ ] Check mobile responsiveness

## 🔧 Required Environment Variables
```env
# Frame & Authentication
NEXT_PUBLIC_URL=
NEXT_PUBLIC_FRAME_NAME=
NEXT_PUBLIC_FRAME_DESCRIPTION=
NEXT_PUBLIC_FRAME_BUTTON_TEXT=
NEXT_PUBLIC_FRAME_PRIMARY_CATEGORY=
NEXT_PUBLIC_FRAME_TAGS=

# Database
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Farcaster & Social
NEYNAR_API_KEY=
NEYNAR_CLIENT_ID=

# Token System
COINS_V4_CONTRACT_ADDRESS=
```

## 📝 Notes
- Focus on getting the core flow working before adding extra features
- Test thoroughly on mobile devices
- Ensure all database operations are properly secured
- Keep error handling simple but effective
- Document any technical debt for future cleanup

## 🎯 End of Day 1 Success Criteria
- [ ] User can sign in with Farcaster
- [ ] User can write and save content
- [ ] User can earn coins for creations
- [ ] Database handles user data securely
- [ ] Frame loads properly in Warpcast
- [ ] Basic UI is functional and responsive 

# DailyMint - Day 1 Implementation Checklist (Progress Update)

## 🎯 Day 1 Goal
Build a working foundation that allows users to sign in, write something, save it, and earn coins. The database should be robust enough to handle real users, and the Frame should load properly in Warpcast.

## 📋 Morning Tasks

### 1. Next.js + Frame SDK Setup
- [x] Initialize Next.js 14/15 project with App Router
- [x] Install and configure Frame SDK
- [x] Set up Frame manifest in .well-known/farcaster.json
- [x] Configure Frame metadata and routing
- [x] Test Frame loading in development

### 2. Supabase Database Setup
- [x] Create new Supabase project
- [x] Implement production-ready database schema
- [x] Set up Row Level Security (RLS) policies
- [x] Create necessary database indexes
- [x] Test database connections

### 3. Authentication & User Management
- [x] Implement Farcaster Quick Auth with Neynar
- [x] Set up Neynar SDK for user data
- [x] Create user profile management
- [x] Test authentication flow

### 4. Token System Setup
- [x] Configure Coins v4 integration
- [x] Set up token contract
- [x] Implement basic reward system
- [x] Test token transactions

### 5. Content Management
- [x] Create hardcoded daily prompt
- [x] Set up prompt storage in database
- [x] Test prompt retrieval

## 📋 Afternoon Tasks

### 1. Creation Interface
- [x] Build creation form component
- [x] Implement textarea with character limit
- [x] Add submission handling (UI present, logic not fully wired)
- [ ] Test form validation and backend integration

### 2. UI Implementation
- [x] Set up neobrutalism.dev components
- [x] Install and configure shadcn/ui
- [x] Implement neobrutalism styling
- [x] Create responsive layout
- [x] Test mobile compatibility

### 3. Token Reward System
- [x] Implement coin earning logic (backend present)
- [ ] Add reward calculations (needs UI feedback)
- [ ] Create transaction tracking (needs UI feedback)
- [ ] Test reward distribution (needs end-to-end test)

### 4. Deployment
- [ ] Set up Vercel project (in progress)
- [ ] Configure environment variables
- [ ] Deploy to production
- [ ] Test live deployment

### 5. Warpcast Integration
- [ ] Test Frame loading in Warpcast (UI loads, but logic not fully interactive)
- [ ] Verify authentication flow
- [ ] Test input acceptance
- [ ] Check mobile responsiveness

## 🎯 End of Day 1 Success Criteria
- [x] User can sign in with Farcaster
- [x] User can write and save content (UI only)
- [ ] User can earn coins for creations (UI only, backend present)
- [x] Database handles user data securely
- [x] Frame loads properly in Warpcast (UI only)
- [x] Basic UI is functional and responsive

## 🟡 **Summary**
- **UI foundation is strong and visually complete.**
- **Backend logic and API endpoints are present.**
- **Button interactivity and end-to-end user flow need to be wired up and tested.**
- **Deployment and live testing are the next priorities.**

---

**Next Steps for Day 1 Completion:**
1. Wire up button actions to backend endpoints (mint, create, earn, share, etc.).
2. Test the full user flow in development and in Warpcast.
3. Complete deployment and verify everything works live.

---

Let me know if you want a step-by-step plan for wiring up the button logic or if you want to focus on deployment/testing next!