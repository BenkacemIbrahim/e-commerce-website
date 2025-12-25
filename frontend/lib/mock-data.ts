// Mock data for admin panel

export type Product = {
  id: string
  name: string
  slug: string
  price: number
  salePrice?: number
  category: string
  brand: string
  stock: number
  images: string[]
  description: string
  sizes: string[]
  colors: string[]
  featured: boolean
  status: "active" | "draft" | "archived"
  createdAt: string
  updatedAt: string
}

export type Order = {
  id: string
  orderNumber: string
  customer: {
    id: string
    name: string
    email: string
  }
  items: {
    productId: string
    productName: string
    quantity: number
    price: number
    size: string
    color: string
  }[]
  total: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  paymentStatus: "pending" | "paid" | "failed" | "refunded"
  shippingAddress: {
    street: string
    city: string
    state: string
    zip: string
    country: string
  }
  createdAt: string
  updatedAt: string
}

export type Customer = {
  id: string
  name: string
  email: string
  phone?: string
  totalOrders: number
  totalSpent: number
  createdAt: string
  lastOrderDate?: string
}

export type Category = {
  id: string
  name: string
  slug: string
  description: string
  productCount: number
  image?: string
  parent?: string
  status: "active" | "inactive"
}

// Mock products data
export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Reebok Zig Kinetica",
    slug: "reebok-zig-kinetica",
    price: 120,
    salePrice: 99,
    category: "Running",
    brand: "Reebok",
    stock: 45,
    images: ["/reebok-zig-kinetica-side.jpg", "/reebok-zig-kinetica-back.jpg"],
    description: "Innovative running shoe with zig energy technology",
    sizes: ["7", "8", "9", "10", "11", "12"],
    colors: ["Black", "White", "Grey"],
    featured: true,
    status: "active",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-02-20T14:30:00Z",
  },
  {
    id: "2",
    name: "Nike Air Max 270",
    slug: "nike-air-max-270",
    price: 150,
    category: "Lifestyle",
    brand: "Nike",
    stock: 32,
    images: ["/blue-sneakers.jpg"],
    description: "Iconic Air Max comfort with modern style",
    sizes: ["7", "8", "9", "10", "11"],
    colors: ["Blue", "Black", "White"],
    featured: true,
    status: "active",
    createdAt: "2024-01-20T10:00:00Z",
    updatedAt: "2024-02-18T12:00:00Z",
  },
  {
    id: "3",
    name: "Adidas Ultraboost",
    slug: "adidas-ultraboost",
    price: 180,
    category: "Running",
    brand: "Adidas",
    stock: 18,
    images: ["/adidas-ultraboost-white.jpg", "/adidas-ultraboost-black-running-shoes.jpg"],
    description: "Premium running performance with Boost technology",
    sizes: ["7", "8", "9", "10", "11", "12"],
    colors: ["White", "Black", "Grey"],
    featured: true,
    status: "active",
    createdAt: "2024-01-25T10:00:00Z",
    updatedAt: "2024-02-22T16:00:00Z",
  },
  {
    id: "4",
    name: "New Balance 990v5",
    slug: "new-balance-990v5",
    price: 175,
    category: "Lifestyle",
    brand: "New Balance",
    stock: 8,
    images: ["/grey-new-balance-990.jpg"],
    description: "Classic American craftsmanship meets modern comfort",
    sizes: ["7", "8", "9", "10", "11"],
    colors: ["Grey", "Navy", "Black"],
    featured: false,
    status: "active",
    createdAt: "2024-02-01T10:00:00Z",
    updatedAt: "2024-02-15T10:00:00Z",
  },
]

// Mock orders data
export const mockOrders: Order[] = [
  {
    id: "1",
    orderNumber: "ORD-2024-0001",
    customer: {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
    },
    items: [
      {
        productId: "1",
        productName: "Reebok Zig Kinetica",
        quantity: 1,
        price: 99,
        size: "10",
        color: "Black",
      },
    ],
    total: 99,
    status: "delivered",
    paymentStatus: "paid",
    shippingAddress: {
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "USA",
    },
    createdAt: "2024-02-15T10:00:00Z",
    updatedAt: "2024-02-20T14:00:00Z",
  },
  {
    id: "2",
    orderNumber: "ORD-2024-0002",
    customer: {
      id: "2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
    },
    items: [
      {
        productId: "2",
        productName: "Nike Air Max 270",
        quantity: 2,
        price: 150,
        size: "8",
        color: "Blue",
      },
    ],
    total: 300,
    status: "processing",
    paymentStatus: "paid",
    shippingAddress: {
      street: "456 Oak Ave",
      city: "Los Angeles",
      state: "CA",
      zip: "90001",
      country: "USA",
    },
    createdAt: "2024-02-20T12:00:00Z",
    updatedAt: "2024-02-21T10:00:00Z",
  },
  {
    id: "3",
    orderNumber: "ORD-2024-0003",
    customer: {
      id: "3",
      name: "Mike Johnson",
      email: "mike.johnson@example.com",
    },
    items: [
      {
        productId: "3",
        productName: "Adidas Ultraboost",
        quantity: 1,
        price: 180,
        size: "11",
        color: "White",
      },
    ],
    total: 180,
    status: "pending",
    paymentStatus: "pending",
    shippingAddress: {
      street: "789 Pine St",
      city: "Chicago",
      state: "IL",
      zip: "60601",
      country: "USA",
    },
    createdAt: "2024-02-22T15:00:00Z",
    updatedAt: "2024-02-22T15:00:00Z",
  },
]

// Mock customers data
export const mockCustomers: Customer[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    totalOrders: 5,
    totalSpent: 875,
    createdAt: "2023-11-15T10:00:00Z",
    lastOrderDate: "2024-02-15T10:00:00Z",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1 (555) 234-5678",
    totalOrders: 3,
    totalSpent: 520,
    createdAt: "2023-12-01T10:00:00Z",
    lastOrderDate: "2024-02-20T12:00:00Z",
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike.johnson@example.com",
    totalOrders: 1,
    totalSpent: 180,
    createdAt: "2024-01-10T10:00:00Z",
    lastOrderDate: "2024-02-22T15:00:00Z",
  },
]

// Mock categories data
export const mockCategories: Category[] = [
  {
    id: "1",
    name: "Running",
    slug: "running",
    description: "High-performance running shoes",
    productCount: 28,
    status: "active",
  },
  {
    id: "2",
    name: "Lifestyle",
    slug: "lifestyle",
    description: "Casual and everyday sneakers",
    productCount: 45,
    status: "active",
  },
  {
    id: "3",
    name: "Basketball",
    slug: "basketball",
    description: "Court-ready basketball shoes",
    productCount: 22,
    status: "active",
  },
  {
    id: "4",
    name: "Training",
    slug: "training",
    description: "Versatile training footwear",
    productCount: 18,
    status: "active",
  },
]
