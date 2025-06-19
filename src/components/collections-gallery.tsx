"use client"

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Button } from "~/components/ui/button"
import { Badge } from "~/components/ui/badge"
import { Calendar, Eye, Share2, ExternalLink, Coins } from "lucide-react"

interface Creation {
  id: string
  content: string
  prompt: string
  date: string
  tokenId?: string
  tokensEarned: number
}

interface Collection {
  id: string
  name: string
  description: string
  creations: Creation[]
  totalValue: number
  isPublic: boolean
}

const mockCollections: Collection[] = [
  {
    id: "1",
    name: "November 2024 Creations",
    description: "My daily creative journey through November",
    totalValue: 1250,
    isPublic: true,
    creations: [
      {
        id: "1",
        content:
          "Today I was surprised by the way morning light hit my coffee cup, creating perfect shadows that looked like abstract art...",
        prompt: "Write about something that surprised you today",
        date: "2024-11-15",
        tokensEarned: 120,
      },
      {
        id: "2",
        content:
          "The solution to traffic jams: 1) Flexible work hours, 2) Better public transit, 3) Incentivized carpooling apps...",
        prompt: "3 solutions to a problem you noticed",
        date: "2024-11-14",
        tokensEarned: 110,
      },
    ],
  },
]

export function CollectionsGallery() {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-black text-black mb-2">MY COLLECTIONS</h1>
        <p className="text-xl font-bold text-black/80">Your creative journey, permanently stored on-chain</p>
      </div>

      {mockCollections.map((collection) => (
        <Card key={collection.id} className="border-4 border-black shadow-[8px_8px_0px_0px_#000] bg-white">
          <CardHeader className="bg-blue-400 border-b-4 border-black">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-black text-black">{collection.name}</CardTitle>
                <p className="text-lg font-bold text-black/80 mt-1">{collection.description}</p>
              </div>
              <div className="text-right">
                <Badge className="bg-green-400 border-2 border-black text-black font-black px-3 py-2 shadow-[2px_2px_0px_0px_#000] mb-2">
                  <Coins className="w-4 h-4 mr-1" />
                  {collection.totalValue} DAILY
                </Badge>
                <div className="text-sm font-bold text-black/80">{collection.creations.length} NFTs</div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            <div className="grid gap-4">
              {collection.creations.map((creation) => (
                <Card key={creation.id} className="border-2 border-black shadow-[4px_4px_0px_0px_#000] bg-yellow-100">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-black" />
                        <span className="font-bold text-black">{creation.date}</span>
                      </div>
                      <Badge className="bg-green-400 border border-black text-black font-bold px-2 py-1">
                        +{creation.tokensEarned} DAILY
                      </Badge>
                    </div>

                    <div className="mb-3">
                      <p className="text-sm font-bold text-black/80 mb-2">Prompt: {creation.prompt}</p>
                      <p className="text-black font-mono text-sm leading-relaxed">
                        {creation.content.length > 150 ? `${creation.content.slice(0, 150)}...` : creation.content}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="bg-purple-400 hover:bg-purple-500 text-black border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:shadow-[1px_1px_0px_0px_#000] font-bold"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        VIEW NFT
                      </Button>

                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-white hover:bg-gray-100 text-black border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:shadow-[1px_1px_0px_0px_#000] font-bold"
                      >
                        <Share2 className="w-4 h-4 mr-1" />
                        SHARE
                      </Button>

                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-white hover:bg-gray-100 text-black border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:shadow-[1px_1px_0px_0px_#000] font-bold"
                      >
                        <ExternalLink className="w-4 h-4 mr-1" />
                        OPENSEA
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-6 flex gap-4">
              <Button className="flex-1 text-lg font-black py-3 bg-blue-400 hover:bg-blue-500 text-black border-4 border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] transition-all">
                VIEW FULL COLLECTION
              </Button>

              <Button
                variant="outline"
                className="flex-1 text-lg font-black py-3 bg-white hover:bg-gray-100 text-black border-4 border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] transition-all"
              >
                <Share2 className="w-5 h-5 mr-2" />
                SHARE COLLECTION
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Create New Collection CTA */}
      <Card className="border-4 border-black shadow-[8px_8px_0px_0px_#000] bg-gradient-to-r from-pink-400 to-purple-400">
        <CardContent className="p-8 text-center">
          <h3 className="text-3xl font-black text-black mb-4">START A NEW COLLECTION</h3>
          <p className="text-xl font-bold text-black/90 mb-6">
            Organize your creations by theme, month, or any way you like!
          </p>
          <Button className="text-xl font-black py-4 px-8 bg-yellow-400 hover:bg-yellow-500 text-black border-4 border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] transition-all">
            CREATE COLLECTION
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
