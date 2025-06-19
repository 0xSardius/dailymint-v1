"use client"

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { Flame, Coins, Trophy, Calendar, Zap, TrendingUp } from "lucide-react"

interface UserProfileProps {
  user: {
    username: string
    displayName: string
    pfpUrl?: string
    currentStreak: number
    longestStreak: number
    totalCreations: number
    totalTokens: number
    joinDate: string
  }
}

export function UserProfile({ user }: UserProfileProps) {
  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="border-4 border-black shadow-[8px_8px_0px_0px_#000] bg-white">
        <CardHeader className="bg-blue-400 border-b-4 border-black">
          <div className="flex items-center gap-4">
            <Avatar className="w-20 h-20 border-4 border-black shadow-[4px_4px_0px_0px_#000]">
              <AvatarImage src={user.pfpUrl || "/placeholder.svg"} alt={user.displayName} />
              <AvatarFallback className="text-2xl font-black bg-yellow-400">
                {user.displayName.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <h2 className="text-3xl font-black text-black">{user.displayName}</h2>
              <p className="text-xl font-bold text-black/80">@{user.username}</p>
              <p className="text-lg font-bold text-black/60">Creating since {user.joinDate}</p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-4 border-black shadow-[4px_4px_0px_0px_#000] bg-red-400">
          <CardContent className="p-4 text-center">
            <Flame className="w-8 h-8 mx-auto mb-2 text-black" />
            <div className="text-3xl font-black text-black">{user.currentStreak}</div>
            <div className="text-sm font-bold text-black/80">CURRENT STREAK</div>
          </CardContent>
        </Card>

        <Card className="border-4 border-black shadow-[4px_4px_0px_0px_#000] bg-yellow-400">
          <CardContent className="p-4 text-center">
            <Trophy className="w-8 h-8 mx-auto mb-2 text-black" />
            <div className="text-3xl font-black text-black">{user.longestStreak}</div>
            <div className="text-sm font-bold text-black/80">LONGEST STREAK</div>
          </CardContent>
        </Card>

        <Card className="border-4 border-black shadow-[4px_4px_0px_0px_#000] bg-green-400">
          <CardContent className="p-4 text-center">
            <Coins className="w-8 h-8 mx-auto mb-2 text-black" />
            <div className="text-3xl font-black text-black">{user.totalTokens}</div>
            <div className="text-sm font-bold text-black/80">DAILY TOKENS</div>
          </CardContent>
        </Card>

        <Card className="border-4 border-black shadow-[4px_4px_0px_0px_#000] bg-purple-400">
          <CardContent className="p-4 text-center">
            <Calendar className="w-8 h-8 mx-auto mb-2 text-black" />
            <div className="text-3xl font-black text-black">{user.totalCreations}</div>
            <div className="text-sm font-bold text-black/80">TOTAL MINTS</div>
          </CardContent>
        </Card>
      </div>

      {/* Achievements */}
      <Card className="border-4 border-black shadow-[8px_8px_0px_0px_#000] bg-white">
        <CardHeader className="bg-purple-400 border-b-4 border-black">
          <CardTitle className="text-2xl font-black text-black flex items-center">
            <Trophy className="w-6 h-6 mr-2" />
            ACHIEVEMENTS
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-3">
            {user.currentStreak >= 7 && (
              <Badge className="bg-red-400 border-2 border-black text-black font-black px-3 py-2 shadow-[2px_2px_0px_0px_#000]">
                🔥 WEEK WARRIOR
              </Badge>
            )}
            {user.currentStreak >= 30 && (
              <Badge className="bg-yellow-400 border-2 border-black text-black font-black px-3 py-2 shadow-[2px_2px_0px_0px_#000]">
                📅 MONTH MASTER
              </Badge>
            )}
            {user.totalTokens >= 1000 && (
              <Badge className="bg-green-400 border-2 border-black text-black font-black px-3 py-2 shadow-[2px_2px_0px_0px_#000]">
                💰 TOKEN COLLECTOR
              </Badge>
            )}
            {user.totalCreations >= 50 && (
              <Badge className="bg-blue-400 border-2 border-black text-black font-black px-3 py-2 shadow-[2px_2px_0px_0px_#000]">
                🎨 PROLIFIC CREATOR
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button className="text-xl font-black py-4 bg-blue-400 hover:bg-blue-500 text-black border-4 border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] transition-all">
          <Zap className="w-5 h-5 mr-2" />
          VIEW MY COLLECTIONS
        </Button>

        <Button
          variant="outline"
          className="text-xl font-black py-4 bg-white hover:bg-gray-100 text-black border-4 border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] transition-all"
        >
          <TrendingUp className="w-5 h-5 mr-2" />
          VIEW LEADERBOARD
        </Button>
      </div>
    </div>
  )
}
