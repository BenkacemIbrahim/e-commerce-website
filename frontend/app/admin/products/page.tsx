"use client"

import { useState } from "react"
import { ProtectedAdminLayout } from "@/components/admin/protected-admin-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { mockProducts, type Product } from "@/lib/mock-data"
import { Plus, Search, Edit, Trash2, Filter, Download } from "lucide-react"
import Image from "next/image"
import { ProductFormModal } from "@/components/admin/product-form-modal"
import { DeleteConfirmationModal } from "@/components/admin/delete-confirmation-modal"
import { toast } from "sonner"

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>(mockProducts)
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState<string | null>(null)

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter
    const matchesStatus = statusFilter === "all" || product.status === statusFilter
    return matchesSearch && matchesCategory && matchesStatus
  })

  const handleSaveProduct = (productData: Partial<Product>) => {
    if (editingProduct) {
      // Update existing product
      setProducts(
        products.map((p) =>
          p.id === editingProduct.id ? { ...p, ...productData, updatedAt: new Date().toISOString() } : p,
        ),
      )
    } else {
      // Create new product
      const newProduct: Product = {
        id: String(products.length + 1),
        slug: productData.name?.toLowerCase().replace(/\s+/g, "-") || "",
        featured: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...productData,
      } as Product
      setProducts([newProduct, ...products])
    }
    setEditingProduct(null)
  }

  const handleDelete = (id: string) => {
    setProducts(products.filter((p) => p.id !== id))
    toast.success("Product deleted successfully")
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setIsFormOpen(true)
  }

  const handleAddNew = () => {
    setEditingProduct(null)
    setIsFormOpen(true)
  }

  return (
    <ProtectedAdminLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-white mb-1">Products</h1>
            <p className="text-sm text-gray-400">
              {filteredProducts.length} of {products.length} products
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="border-[#222] text-gray-300 hover:bg-[#1a1a1a] bg-transparent">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button onClick={handleAddNew} className="bg-white text-black hover:bg-gray-200">
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card className="bg-[#111] border-[#222] p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-[#0a0a0a] border-[#222] text-white placeholder:text-gray-600"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-[180px] bg-[#0a0a0a] border-[#222] text-white">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="bg-[#111] border-[#222]">
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Running">Running</SelectItem>
                <SelectItem value="Lifestyle">Lifestyle</SelectItem>
                <SelectItem value="Basketball">Basketball</SelectItem>
                <SelectItem value="Training">Training</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[150px] bg-[#0a0a0a] border-[#222] text-white">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-[#111] border-[#222]">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Products Table */}
        <Card className="bg-[#111] border-[#222]">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#0a0a0a]">
                <tr className="border-b border-[#1a1a1a]">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1a1a1a]">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-[#0a0a0a] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 bg-[#1a1a1a] rounded overflow-hidden flex-shrink-0">
                          <Image
                            src={product.images[0] || "/placeholder.svg"}
                            alt={product.name}
                            width={48}
                            height={48}
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-white">{product.name}</div>
                          <div className="text-xs text-gray-500">{product.brand}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">{product.category}</td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-white font-medium">${product.price}</div>
                      {product.salePrice && <div className="text-xs text-green-400">${product.salePrice} sale</div>}
                    </td>
                    <td className="px-6 py-4">
                      <div
                        className={`text-sm font-medium ${product.stock < 20 ? "text-orange-400" : "text-gray-300"}`}
                      >
                        {product.stock} units
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        variant={product.status === "active" ? "default" : "secondary"}
                        className={
                          product.status === "active"
                            ? "bg-green-500/10 text-green-400 border-green-500/20"
                            : product.status === "draft"
                              ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                              : "bg-gray-500/10 text-gray-400 border-gray-500/20"
                        }
                      >
                        {product.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-gray-400 hover:text-white hover:bg-[#1a1a1a]"
                          onClick={() => handleEdit(product)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setProductToDelete(product.id)
                            setDeleteModalOpen(true)
                          }}
                          className="h-8 w-8 text-gray-400 hover:text-red-400 hover:bg-red-500/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Modals */}
      <ProductFormModal
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        product={editingProduct}
        onSave={handleSaveProduct}
      />

      <DeleteConfirmationModal
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        onConfirm={() => productToDelete && handleDelete(productToDelete)}
        title="Delete Product?"
        description="This will permanently delete this product from your store. This action cannot be undone."
      />
    </ProtectedAdminLayout>
  )
}
