"use client"

import { useState } from "react"
import { Button } from "~/components/ui/Button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { Badge } from "~/components/ui/badge"
import { Textarea } from "~/components/ui/textarea"
import { Flame, Coins, Zap, Share2, Trophy } from "lucide-react"

// Mock data - replace with your actual hooks
const mockUser = {
  username: "creator123",
  streak: 7,
  tokensEarned: 850,
  todaysCreation: null,
}

const mockPrompt = {
  text: "Write about something that surprised you today",
  type: "text",
  date: new Date().toLocaleDateString(),
}

export default function DailyMintApp() {
  const [content, setContent] = useState("")
  const [isCreating, setIsCreating] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSubmit = async () => {
    setIsCreating(true)
    // Simulate creation process
    setTimeout(() => {
      setIsCreating(false)
      setShowSuccess(true)
    }, 2000)
  }

  const isValidLength = content.length >= 50 && content.length <= 500

  if (showSuccess) {
    return <SuccessView streak={mockUser.streak + 1} tokensEarned={150} />
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Header with yellow accent bar */}
      <header className="mb-6">
        <div className="bg-yellow-400 border-4 border-black shadow-[4px_4px_0px_0px_#000] p-6 mb-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-4">
              <h1 className="text-5xl font-black text-black mb-2 tracking-tight">DAILYMINT</h1>
              <p className="text-lg font-bold text-black/80">CREATE • MINT • EARN • REPEAT</p>
            </div>

            <div className="flex items-center justify-center gap-3 flex-wrap">
              <Badge
                variant="outline"
                className="bg-white border-4 border-black text-black font-black text-lg px-4 py-2 shadow-[4px_4px_0px_0px_#000]"
              >
                <Flame className="w-5 h-5 mr-2 text-red-500" />
                DAY {mockUser.streak}
              </Badge>

              <Badge
                variant="outline"
                className="bg-green-400 border-4 border-black text-black font-black text-lg px-4 py-2 shadow-[4px_4px_0px_0px_#000]"
              >
                <Coins className="w-5 h-5 mr-2" />
                {mockUser.tokensEarned} DAILY
              </Badge>

              {mockUser.streak >= 7 && (
                <Badge
                  variant="outline"
                  className="bg-red-400 border-4 border-black text-black font-black text-lg px-4 py-2 shadow-[4px_4px_0px_0px_#000] animate-pulse"
                >
                  <Trophy className="w-5 h-5 mr-2" />
                  ON FIRE!
                </Badge>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto">
        <Card className="border-4 border-black shadow-[8px_8px_0px_0px_#000] bg-white">
          <CardHeader className="bg-purple-400 border-b-4 border-black">
            <div className="flex items-center justify-between">
              <CardTitle className="text-3xl font-black text-black">TODAY'S PROMPT</CardTitle>
              <Badge variant="outline" className="bg-white border-2 border-black font-black px-3 py-1">
                {mockPrompt.type.toUpperCase()}
              </Badge>
            </div>
            <CardDescription className="text-xl font-bold text-black/80 mt-2">{mockPrompt.text}</CardDescription>
          </CardHeader>

          <CardContent className="p-6 space-y-6">
            <div className="space-y-4">
              <Textarea
                value={content}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
                placeholder="Start writing your response... Make it count! 🎨"
                className="min-h-[150px] text-lg border-4 border-black shadow-[4px_4px_0px_0px_#000] font-mono resize-none focus:shadow-[2px_2px_0px_0px_#000] transition-all"
              />

              <div className="flex justify-between items-center">
                <span className={`text-lg font-black ${isValidLength ? "text-green-600" : "text-red-600"}`}>
                  {content.length}/500 characters
                </span>

                {isValidLength && (
                  <Badge variant="outline" className="bg-green-400 border-2 border-black font-black animate-bounce">
                    <Zap className="w-4 h-4 mr-1" />
                    READY TO MINT!
                  </Badge>
                )}
              </div>
            </div>

            {/* Reward Preview */}
            {isValidLength && (
              <div className="bg-yellow-100 border-4 border-black p-4 shadow-[4px_4px_0px_0px_#000]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-black text-lg text-black">REWARD PREVIEW</p>
                    <p className="font-bold text-black/80">
                      Base: 100 DAILY + Streak Bonus: {mockUser.streak * 10} DAILY
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-black text-green-600">+{100 + mockUser.streak * 10} DAILY</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>

          <CardFooter className="p-6 bg-gray-100 border-t-4 border-black">
            <Button
              onClick={handleSubmit}
              disabled={!isValidLength || isCreating}
              size="lg"
              className="w-full text-2xl font-black py-6 bg-blue-400 hover:bg-blue-500 text-black border-4 border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isCreating ? (
                <>
                  <Zap className="w-6 h-6 mr-2 animate-spin" />
                  MINTING YOUR CREATION...
                </>
              ) : (
                <>
                  <Zap className="w-6 h-6 mr-2" />
                  CREATE & MINT NFT
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

function SuccessView({ streak, tokensEarned }: { streak: number; tokensEarned: number }) {
  return (
    <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-black text-black mb-4">SUCCESS! 🎉</h1>
          <p className="text-2xl font-bold text-black/80">Your creation is now immortalized on the blockchain!</p>
        </div>

        <Card className="border-4 border-black shadow-[8px_8px_0px_0px_#000] bg-white mb-6">
          <CardContent className="p-8">
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-4xl font-black text-black mb-2">DAY {streak}</div>
                <div className="text-lg font-bold text-black/80">STREAK ACHIEVED</div>
              </div>

              <div className="text-center">
                <div className="text-4xl font-black text-green-600 mb-2">+{tokensEarned}</div>
                <div className="text-lg font-bold text-black/80">DAILY TOKENS</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Button className="w-full text-xl font-black py-4 bg-purple-400 hover:bg-purple-500 text-black border-4 border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] transition-all">
            <Share2 className="w-5 h-5 mr-2" />
            SHARE YOUR STREAK
          </Button>

          <Button
            variant="outline"
            className="w-full text-xl font-black py-4 bg-white hover:bg-gray-100 text-black border-4 border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] transition-all"
          >
            VIEW YOUR NFT
          </Button>
        </div>

        <div className="mt-8 p-4 bg-black/10 border-4 border-black shadow-[4px_4px_0px_0px_#000]">
          <p className="text-lg font-bold text-black">Come back tomorrow to continue your streak! 🔥</p>
        </div>
      </div>
    </div>
  )
}
