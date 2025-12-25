import { Star } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

const ratingData = [
  { stars: 5, count: 28, percentage: 70 },
  { stars: 4, count: 9, percentage: 23 },
  { stars: 3, count: 4, percentage: 10 },
  { stars: 2, count: 0, percentage: 0 },
  { stars: 1, count: 1, percentage: 3 },
]

export function RatingBreakdown() {
  const totalReviews = ratingData.reduce((sum, item) => sum + item.count, 0)
  const averageRating = 4.8

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={cn(
                "h-6 w-6",
                i < Math.floor(averageRating) ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200",
              )}
            />
          ))}
        </div>
        <div className="text-3xl font-bold">{averageRating}</div>
        <p className="text-sm text-muted-foreground">{totalReviews} reviews</p>
      </div>

      <div className="space-y-3">
        {ratingData.map((item) => (
          <div key={item.stars} className="flex items-center gap-3">
            <span className="text-sm w-4">{item.stars}</span>
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <Progress value={item.percentage} className="flex-1" />
            <span className="text-sm font-medium w-8 text-right">{item.count}</span>
          </div>
        ))}
      </div>

      <div className="pt-4">
        <p className="text-sm text-muted-foreground text-center">It turns very sharply on the foot.</p>
      </div>
    </div>
  )
}
