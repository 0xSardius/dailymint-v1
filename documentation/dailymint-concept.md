# DailyMint - Daily Creative Minting Miniapp

## Core Concept
A miniapp that encourages daily creative output with immediate minting capabilities on Zora, combining habit formation with onchain publishing.

## Key Features

### 1. Flexible Daily Prompts
- **Text Prompts**: "Write about something that surprised you today" (100-300 words)
- **Visual Prompts**: "Share a photo that captures your mood" 
- **Idea Prompts**: "3 solutions to a problem you noticed"
- **Micro-Fiction**: "Tell a story in exactly 55 words"

### 2. Instant Minting with Zora
```typescript
// Using Zora's create API
const mintDailyCreation = async (content: string, prompt: string) => {
  const metadata = {
    name: `Daily Creation - ${new Date().toLocaleDateString()}`,
    description: `Prompt: ${prompt}\n\n${content}`,
    content: content,
    attributes: [
      { trait_type: "Prompt Type", value: promptType },
      { trait_type: "Day Streak", value: userStreak },
      { trait_type: "Creation Date", value: new Date().toISOString() }
    ]
  };
  
  // Mint on Zora
  return await zoraCreate1155({
    metadata,
    quantity: 1,
    price: "0.000777" // Small mint fee
  });
};
```

### 3. Streak & Community Features
- **Streak Tracking**: Visual streak counter with onchain verification
- **Community Gallery**: Discover others' daily creations
- **Prompt Voting**: Community suggests tomorrow's prompts
- **Collection Building**: Monthly collections of your daily mints

### 4. Gamification Elements
- **Streak Rewards**: Special edition mints for 7, 30, 100 day streaks
- **Community Challenges**: Weekly themed challenges
- **Creator Spotlight**: Feature exceptional daily creators

## Technical Implementation

### Core Architecture
```typescript
// Main miniapp flow
const DailyMint = () => {
  const { user } = useFarcasterIdentity();
  const { streak, todayCompleted } = useUserStreak();
  const { prompt } = useDailyPrompt();
  
  return (
    <MiniKitProvider>
      {todayCompleted ? (
        <SuccessView streak={streak} />
      ) : (
        <CreateView prompt={prompt} onComplete={handleMint} />
      )}
    </MiniKitProvider>
  );
};
```

### Zora Integration
- Use Zora's 1155 contracts for efficient minting
- Leverage Zora's collection features for organizing daily series
- Implement creator rewards through Zora's protocol rewards

### Social Features
- **Farcaster Integration**: Auto-share completed streaks
- **Frame Actions**: "Add to Collection" button on shared creations
- **Notifications**: Daily reminder to create

## Why This Works

### For Users (Badass-Making)
1. **Low Barrier**: Short, achievable daily goals
2. **Immediate Gratification**: Instant minting creates ownership
3. **Progressive Difficulty**: Start with simple prompts, unlock complex ones
4. **Community**: Share and discover without algorithm pressure
5. **Permanent Value**: Builds an onchain portfolio of creativity

### For Hackathon Success
1. **Clear MVP**: Daily prompt → create → mint → share
2. **Zora Native**: Leverages their core minting infrastructure
3. **Viral Potential**: Streak sharing drives organic growth
4. **Monetization**: Small mint fees + creator rewards
5. **Scope-Contained**: Can build core flow in hackathon timeframe

## MVP Feature Priority

### Must-Have (Hackathon Core)
- [ ] Daily prompt generation
- [ ] Simple text/image creation interface
- [ ] Zora 1155 minting integration
- [ ] Streak tracking
- [ ] Basic Farcaster sharing

### Nice-to-Have (Post-Hackathon)
- [ ] Community gallery
- [ ] Prompt voting system
- [ ] Advanced streak rewards
- [ ] Collection organization
- [ ] Creator marketplace

## Competitive Advantages
1. **Habit-First**: Focus on consistency over perfection
2. **Onchain Native**: Every creation becomes a permanent asset
3. **Community Driven**: Prompts and discovery powered by users
4. **Micro-Monetization**: Sustainable through small fees
5. **Farcaster Integration**: Leverages existing social graph

## Success Metrics
- Daily Active Creators
- Mint Volume
- Average Streak Length
- Viral Coefficient (shares per creation)
- Creator Retention (7-day, 30-day)