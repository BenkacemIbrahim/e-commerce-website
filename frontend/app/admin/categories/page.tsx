"use client"

import { useState } from "react"
import { ProtectedAdminLayout } from "@/components/admin/protected-admin-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { mockCategories, type Category } from "@/lib/mock-data"
import { Plus, Edit, Trash2, Package } from "lucide-react"
import { CategoryFormModal } from "@/components/admin/category-form-modal"
import { DeleteConfirmationModal } from "@/components/admin/delete-confirmation-modal"
import { toast } from "sonner"

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(mockCategories)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null)

  const handleSaveCategory = (categoryData: Partial<Category>) => {
    if (editingCategory) {
      // Update existing category
      setCategories(categories.map((c) => (c.id === editingCategory.id ? { ...c, ...categoryData } : c)))
    } else {
      // Create new category
      const newCategory: Category = {
        id: String(categories.length + 1),
        slug: categoryData.slug || "",
        productCount: 0,
        ...categoryData,
      } as Category
      setCategories([newCategory, ...categories])
    }
    setEditingCategory(null)
  }

  const handleDelete = (id: string) => {
    setCategories(categories.filter((c) => c.id !== id))
    toast.success("Category deleted successfully")
  }

  const handleEdit = (category: Category) => {
    setEditingCategory(category)
    setIsFormOpen(true)
  }

  const handleAddNew = () => {
    setEditingCategory(null)
    setIsFormOpen(true)
  }

  return (
    <ProtectedAdminLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-white mb-1">Categories</h1>
            <p className="text-sm text-gray-400">{categories.length} total categories</p>
          </div>
          <Button onClick={handleAddNew} className="bg-white text-black hover:bg-gray-200">
            <Plus className="h-4 w-4 mr-2" />
            Add Category
          </Button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <Card key={category.id} className="bg-[#111] border-[#222] p-6 hover:border-[#333] transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="h-12 w-12 bg-[#1a1a1a] rounded-lg flex items-center justify-center">
                  <Package className="h-6 w-6 text-gray-400" />
                </div>
                <Badge
                  className={
                    category.status === "active"
                      ? "bg-green-500/10 text-green-400 border-green-500/20"
                      : "bg-gray-500/10 text-gray-400 border-gray-500/20"
                  }
                >
                  {category.status}
                </Badge>
              </div>

              <h3 className="text-lg font-semibold text-white mb-2">{category.name}</h3>
              <p className="text-sm text-gray-400 mb-4 line-clamp-2">{category.description}</p>

              <div className="flex items-center justify-between pt-4 border-t border-[#1a1a1a]">
                <span className="text-sm text-gray-400">{category.productCount} products</span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(category)}
                    className="h-8 w-8 text-gray-400 hover:text-white hover:bg-[#1a1a1a]"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setCategoryToDelete(category.id)
                      setDeleteModalOpen(true)
                    }}
                    className="h-8 w-8 text-gray-400 hover:text-red-400 hover:bg-red-500/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Modals */}
      <CategoryFormModal
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        category={editingCategory}
        onSave={handleSaveCategory}
      />

      <DeleteConfirmationModal
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        onConfirm={() => categoryToDelete && handleDelete(categoryToDelete)}
        title="Delete Category?"
        description="This will permanently delete this category. Products in this category will not be deleted."
      />
    </ProtectedAdminLayout>
  )
}
