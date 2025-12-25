"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { ZoomIn } from "lucide-react"

interface ProductImageGalleryProps {
  images: string[]
  productName: string
}

export function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)

  return (
    <div className="space-y-4">
      <div className="aspect-square rounded-lg overflow-hidden bg-secondary/30 relative group">
        <Image
          src={images[selectedImage] || "/placeholder.svg"}
          alt={productName}
          width={700}
          height={700}
          className="w-full h-full object-cover"
          priority
        />
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-background/90 rounded-full p-3">
            <ZoomIn className="h-5 w-5" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={cn(
              "aspect-square rounded-lg overflow-hidden bg-secondary/30 border-2 transition-all hover:scale-105",
              selectedImage === index ? "border-foreground shadow-lg" : "border-transparent",
            )}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={`${productName} view ${index + 1}`}
              width={150}
              height={150}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
