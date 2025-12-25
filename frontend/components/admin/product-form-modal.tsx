"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Product } from "@/lib/mock-data"
import { Upload, X } from "lucide-react"
import Image from "next/image"
import { toast } from "sonner"

interface ProductFormModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  product?: Product | null
  onSave: (product: Partial<Product>) => void
}

export function ProductFormModal({ open, onOpenChange, product, onSave }: ProductFormModalProps) {
  const [formData, setFormData] = useState<Partial<Product>>({
    name: "",
    brand: "",
    category: "",
    price: 0,
    salePrice: undefined,
    stock: 0,
    description: "",
    status: "active",
    sizes: [],
    colors: [],
    images: [],
  })

  const [imagePreview, setImagePreview] = useState<string>("")

  useEffect(() => {
    if (product) {
      setFormData(product)
      setImagePreview(product.images[0] || "")
    } else {
      setFormData({
        name: "",
        brand: "",
        category: "",
        price: 0,
        stock: 0,
        description: "",
        status: "active",
        sizes: [],
        colors: [],
        images: [],
      })
      setImagePreview("")
    }
  }, [product])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.brand || !formData.category) {
      toast.error("Please fill in all required fields")
      return
    }

    onSave(formData)
    toast.success(product ? "Product updated successfully" : "Product created successfully")
    onOpenChange(false)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        setImagePreview(result)
        setFormData({ ...formData, images: [result, ...(formData.images || [])] })
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-[#0a0a0a] border-[#222] text-white">
        <DialogHeader>
          <DialogTitle className="text-xl">{product ? "Edit Product" : "Add New Product"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div className="space-y-2">
            <Label>Product Images</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                {imagePreview ? (
                  <div className="relative w-full h-48 bg-[#111] rounded-lg overflow-hidden group">
                    <Image src={imagePreview || "/placeholder.svg"} alt="Preview" fill className="object-cover" />
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview("")
                        setFormData({ ...formData, images: [] })
                      }}
                      className="absolute top-2 right-2 p-1 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-4 w-4 text-white" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-48 bg-[#111] border-2 border-dashed border-[#333] rounded-lg cursor-pointer hover:border-[#555] transition-colors">
                    <Upload className="h-8 w-8 text-gray-500 mb-2" />
                    <span className="text-sm text-gray-500">Click to upload image</span>
                    <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                  </label>
                )}
              </div>
            </div>
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">
                Product Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-[#111] border-[#222] text-white"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="brand">
                Brand <span className="text-red-500">*</span>
              </Label>
              <Input
                id="brand"
                value={formData.brand}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                className="bg-[#111] border-[#222] text-white"
                required
              />
            </div>
          </div>

          {/* Category & Status */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">
                Category <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger className="bg-[#111] border-[#222] text-white">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-[#111] border-[#222]">
                  <SelectItem value="Running">Running</SelectItem>
                  <SelectItem value="Lifestyle">Lifestyle</SelectItem>
                  <SelectItem value="Basketball">Basketball</SelectItem>
                  <SelectItem value="Training">Training</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData({ ...formData, status: value as Product["status"] })}
              >
                <SelectTrigger className="bg-[#111] border-[#222] text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#111] border-[#222]">
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Pricing */}
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">
                Price <span className="text-red-500">*</span>
              </Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number.parseFloat(e.target.value) })}
                className="bg-[#111] border-[#222] text-white"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="salePrice">Sale Price</Label>
              <Input
                id="salePrice"
                type="number"
                value={formData.salePrice || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    salePrice: e.target.value ? Number.parseFloat(e.target.value) : undefined,
                  })
                }
                className="bg-[#111] border-[#222] text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="stock">
                Stock <span className="text-red-500">*</span>
              </Label>
              <Input
                id="stock"
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: Number.parseInt(e.target.value) })}
                className="bg-[#111] border-[#222] text-white"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="bg-[#111] border-[#222] text-white min-h-[100px]"
            />
          </div>

          {/* Sizes & Colors */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sizes">Sizes (comma separated)</Label>
              <Input
                id="sizes"
                value={formData.sizes?.join(", ")}
                onChange={(e) => setFormData({ ...formData, sizes: e.target.value.split(",").map((s) => s.trim()) })}
                placeholder="7, 8, 9, 10, 11, 12"
                className="bg-[#111] border-[#222] text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="colors">Colors (comma separated)</Label>
              <Input
                id="colors"
                value={formData.colors?.join(", ")}
                onChange={(e) => setFormData({ ...formData, colors: e.target.value.split(",").map((c) => c.trim()) })}
                placeholder="Black, White, Grey"
                className="bg-[#111] border-[#222] text-white"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-[#222] text-gray-300 hover:bg-[#1a1a1a]"
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-white text-black hover:bg-gray-200">
              {product ? "Update Product" : "Create Product"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
