"use client"

import { Star, ThumbsUp, MessageCircle } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

const reviews = [
  {
    id: 1,
    author: "Helen M.",
    avatar: "/placeholder.svg?height=40&width=40",
    date: "Yesterday",
    rating: 5,
    content: "Excellent running shoes. It turns very sharply on the foot.",
    likes: 42,
    comments: 0,
  },
  {
    id: 2,
    author: "Ann D.",
    avatar: "/placeholder.svg?height=40&width=40",
    date: "2 days ago",
    rating: 4,
    content: "Good shoes",
    likes: 35,
    comments: 2,
  },
  {
    id: 3,
    author: "Andrew G.",
    avatar: "/placeholder.svg?height=40&width=40",
    date: "3 days ago",
    rating: 3,
    content: "Is it suitable for running?",
    likes: 18,
    comments: 5,
  },
]

export function ReviewsList() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Customer Reviews</h3>
        <Select defaultValue="newest">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="highest">Highest Rating</SelectItem>
            <SelectItem value="lowest">Lowest Rating</SelectItem>
            <SelectItem value="helpful">Most Helpful</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b border-border pb-6 last:border-0">
            <div className="flex items-start gap-4">
              <Avatar>
                <AvatarImage src={review.avatar || "/placeholder.svg"} alt={review.author} />
                <AvatarFallback>{review.author[0]}</AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-3">
                <div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{review.author}</p>
                      <p className="text-xs text-muted-foreground">{review.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "h-4 w-4",
                          i < review.rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200",
                        )}
                      />
                    ))}
                  </div>
                </div>

                <p className="text-sm leading-relaxed">{review.content}</p>

                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="sm" className="h-8 gap-2">
                    <ThumbsUp className="h-4 w-4" />
                    <span className="text-xs">{review.likes}</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 gap-2">
                    <MessageCircle className="h-4 w-4" />
                    <span className="text-xs">{review.comments}</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
