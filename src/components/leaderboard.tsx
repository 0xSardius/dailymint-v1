"use client"

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Badge } from "~/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { Trophy, Flame, Coins, Medal, Crown } from "lucide-react"

interface LeaderboardUser {
  rank: number
  username: string
  displayName: string
  pfpUrl?: string
  currentStreak: number
  totalTokens: number
  totalCreations: number
}

const mockLeaderboard: LeaderboardUser[] = [
  {
    rank: 1,
    username: "streakmaster",
    displayName: "Streak Master",
    currentStreak: 45,
    totalTokens: 4500,
    totalCreations: 45,
  },
  {
    rank: 2,
    username: "dailycreator",
    displayName: "Daily Creator",
    currentStreak: 32,
    totalTokens: 3800,
    totalCreations: 38,
  },
  {
    rank: 3,
    username: "mintqueen",
    displayName: "Mint Queen",
    currentStreak: 28,
    totalTokens: 3200,
    totalCreations: 35,
  },
  {
    rank: 4,
    username: "artflow",
    displayName: "Art Flow",
    currentStreak: 25,
    totalTokens: 2900,
    totalCreations: 31,
  },
  {
    rank: 5,
    username: "wordsmith",
    displayName: "Word Smith",
    currentStreak: 22,
    totalTokens: 2600,
    totalCreations: 28,
  },
]

export function Leaderboard() {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-600" />
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />
      case 3:
        return <Medal className="w-6 h-6 text-amber-600" />
      default:
        return <Trophy className="w-6 h-6 text-black" />
    }
  }

  const getRankBg = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-yellow-400"
      case 2:
        return "bg-gray-300"
      case 3:
        return "bg-amber-400"
      default:
        return "bg-white"
    }
  }

  return (
    <div className="space-y-6">
      <Card className="border-4 border-black shadow-[8px_8px_0px_0px_#000] bg-white">
        <CardHeader className="bg-purple-400 border-b-4 border-black">
          <CardTitle className="text-3xl font-black text-black text-center flex items-center justify-center">
            <Trophy className="w-8 h-8 mr-3" />
            DAILY CREATORS LEADERBOARD
            <Trophy className="w-8 h-8 ml-3" />
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {mockLeaderboard.map((user) => (
            <div
              key={user.username}
              className={`flex items-center p-6 border-b-4 border-black last:border-b-0 ${getRankBg(user.rank)} hover:bg-opacity-80 transition-all`}
            >
              {/* Rank */}
              <div className="flex items-center justify-center w-16 h-16 mr-4">
                <div className="flex flex-col items-center">
                  {getRankIcon(user.rank)}
                  <span className="text-2xl font-black text-black">#{user.rank}</span>
                </div>
              </div>

              {/* Avatar */}
              <Avatar className="w-16 h-16 mr-4 border-4 border-black shadow-[4px_4px_0px_0px_#000]">
                <AvatarImage src={user.pfpUrl || "/placeholder.svg"} alt={user.displayName} />
                <AvatarFallback className="text-xl font-black bg-blue-400">
                  {user.displayName.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              {/* User Info */}
              <div className="flex-1">
                <h3 className="text-2xl font-black text-black">{user.displayName}</h3>
                <p className="text-lg font-bold text-black/80">@{user.username}</p>
              </div>

              {/* Stats */}
              <div className="flex gap-4 text-right">
                <div className="flex flex-col items-center">
                  <div className="flex items-center mb-1">
                    <Flame className="w-5 h-5 mr-1 text-red-500" />
                    <span className="text-2xl font-black text-black">{user.currentStreak}</span>
                  </div>
                  <span className="text-sm font-bold text-black/80">STREAK</span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="flex items-center mb-1">
                    <Coins className="w-5 h-5 mr-1 text-green-600" />
                    <span className="text-2xl font-black text-black">{user.totalTokens}</span>
                  </div>
                  <span className="text-sm font-bold text-black/80">TOKENS</span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="flex items-center mb-1">
                    <Trophy className="w-5 h-5 mr-1 text-purple-600" />
                    <span className="text-2xl font-black text-black">{user.totalCreations}</span>
                  </div>
                  <span className="text-sm font-bold text-black/80">MINTS</span>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Weekly Challenge */}
      <Card className="border-4 border-black shadow-[8px_8px_0px_0px_#000] bg-gradient-to-r from-pink-400 to-purple-400">
        <CardHeader className="border-b-4 border-black bg-white">
          <CardTitle className="text-2xl font-black text-black text-center">🏆 WEEKLY CHALLENGE 🏆</CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-center">
          <h3 className="text-3xl font-black text-black mb-2">&quot;GRATITUDE WEEK&quot;</h3>
          <p className="text-xl font-bold text-black/90 mb-4">
            Write about something you&apos;re grateful for each day this week
          </p>
          <Badge className="bg-yellow-400 border-2 border-black text-black font-black px-4 py-2 shadow-[2px_2px_0px_0px_#000] text-lg">
            BONUS: +50 DAILY TOKENS PER DAY
          </Badge>
        </CardContent>
      </Card>
    </div>
  )
}
