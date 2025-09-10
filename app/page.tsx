"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  Home,
  Package,
  Users,
  ShoppingCart,
  Package2,
  Receipt,
  BarChart3,
  ChefHat,
  Settings,
  Plus,
  Search,
  Eye,
  Edit,
  Trash2,
  Clock,
  AlertTriangle,
  Download,
  FileText,
  DollarSign,
  TrendingUp,
  Calendar,
  ChevronDown,
  CreditCard,
  FileSpreadsheet,
} from "lucide-react"

interface IUser {
  id: number
  email: string
  password: string
  role: "admin" | "mesero" | "cajero"
  name: string
}

interface Category {
  id: number
  code: string
  name: string
  description: string
}

interface Group {
  id: number
  code: string
  name: string
  description: string
  categoryId: number
}

interface Subgroup {
  id: number
  code: string
  name: string
  description: string
  groupId: number
}

interface Product {
  id: number
  code: string
  name: string
  description: string
  price: number
  categoryId: number
  groupId: number
  subgroupId: number
  requiresPreparation: boolean
  preparationTime: number
  taxRate: number
  stock?: number
  taxType?: string
}

interface InventoryItem {
  id: number
  name: string
  description: string
  currentStock: number
  minStock: number
  maxStock: number
  unitCost: number
  supplier: string
  expiryDate?: Date
  unit: string
  group: string
}

interface Table {
  id: number
  name: string
  capacity: number
  status: "available" | "occupied" | "reserved" | "cleaning"
  location: string
  currentOrder?: number
  reservationTime?: Date
  customerName?: string
  customerCount?: number
  number?: number
}

interface OrderItem {
  id: number
  productId: number
  quantity: number
  notes: string
  product: Product
  startTime?: Date
}

interface Order {
  id: number
  customerName: string
  tableNumber?: string
  items: OrderItem[]
  total: number
  status: "pending" | "preparing" | "ready" | "delivered" | "paid"
  createdAt: Date
  waiterName?: string
  estimatedTime?: number
}

interface Invoice {
  id: string
  orderId: number
  customerName: string
  tableNumber?: string
  total: number
  subtotal: number
  tax: number
  date: Date
  status: "paid" | "pending"
  paymentMethod: "cash" | "card" | "transfer"
  items: OrderItem[]
}

interface CashRegister {
  id: number
  openTime: Date
  closeTime?: Date
  initialAmount: number
  finalAmount?: number
  totalSales: number
  status: "open" | "closed"
}

interface TaxConfig {
  id: number
  name: string
  rate: number
  isDefault: boolean
}

interface RestaurantConfig {
  name: string
  phone: string
  email: string
  ruc: string
  address: string
  taxRate: number
  serviceCharge: number
}

export default function DineNetManagement() {
  const [currentUser, setCurrentUser] = useState<IUser | null>(null)
  const [loginForm, setLoginForm] = useState({ email: "", password: "" })
  const [activeTab, setActiveTab] = useState("dashboard")
  const [isMobile, setIsMobile] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth >= 768) {
        setSidebarOpen(false)
      }
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const [users] = useState<IUser[]>([
    { id: 1, email: "admin@dinenet.com", password: "123456", role: "admin", name: "Admin Usuario" },
    { id: 2, email: "mesero@dinenet.com", password: "123456", role: "mesero", name: "Juan Mesero" },
    { id: 3, email: "cajero@dinenet.com", password: "123456", role: "cajero", name: "María Cajero" },
  ])

  const [categories, setCategories] = useState<Category[]>([
    { id: 1, code: "CAT00", name: "Bebidas", description: "Bebidas frías y calientes" },
    { id: 2, code: "CAT01", name: "Comidas", description: "Platos principales y entradas" },
  ])

  const [groups, setGroups] = useState<Group[]>([
    { id: 1, code: "GRP00", name: "Bebidas Frías", description: "Refrescos y jugos", categoryId: 1 },
    { id: 2, code: "GRP01", name: "Pizzas", description: "Pizzas artesanales", categoryId: 2 },
  ])

  const [subgroups, setSubgroups] = useState<Subgroup[]>([
    { id: 1, code: "SUB00", name: "Gaseosas", description: "Bebidas gaseosas", groupId: 1 },
    { id: 2, code: "SUB01", name: "Pizza Margherita", description: "Pizzas clásicas", groupId: 2 },
  ])

  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      code: "PRD00000001",
      name: "Coca Cola",
      description: "Refresco de cola 350ml",
      price: 3500,
      categoryId: 1,
      groupId: 1,
      subgroupId: 1,
      requiresPreparation: false,
      preparationTime: 0,
      taxRate: 19,
      stock: 50,
      taxType: "iva_general",
    },
    {
      id: 2,
      code: "PRD00000002",
      name: "Pizza Margherita",
      description: "Pizza con tomate, mozzarella y albahaca",
      price: 25000,
      categoryId: 2,
      groupId: 2,
      subgroupId: 2,
      requiresPreparation: true,
      preparationTime: 15,
      taxRate: 8,
      stock: 20,
      taxType: "iva_reducido",
    },
  ])

  const [taxConfigs, setTaxConfigs] = useState<TaxConfig[]>([
    { id: 1, name: "IVA General (19%)", rate: 19, isDefault: true },
    { id: 2, name: "IVA Reducido (8%)", rate: 8, isDefault: false },
    { id: 3, name: "Exento (0%)", rate: 0, isDefault: false },
  ])

  const [tables, setTables] = useState<Table[]>([
    { id: 1, name: "Mesa 1", capacity: 4, status: "available", location: "Ventana", number: 1 },
    {
      id: 2,
      name: "Mesa 2",
      capacity: 2,
      status: "occupied",
      location: "Centro",
      customerName: "Juan Pérez",
      customerCount: 2,
      number: 2,
    },
    {
      id: 3,
      name: "Mesa 3",
      capacity: 6,
      status: "reserved",
      location: "Terraza",
      customerName: "María García",
      customerCount: 4,
      number: 3,
    },
    { id: 4, name: "Mesa 4", capacity: 4, status: "cleaning", location: "Ventana", number: 4 },
    { id: 5, name: "Mesa 5", capacity: 2, status: "available", location: "Centro", number: 5 },
    {
      id: 6,
      name: "Mesa 6",
      capacity: 8,
      status: "occupied",
      location: "Privado",
      customerName: "Carlos López",
      customerCount: 6,
      number: 6,
    },
  ])

  const [inventory, setInventory] = useState<InventoryItem[]>([
    {
      id: 1,
      name: "Harina de Trigo",
      description: "Harina para pizza y pan",
      currentStock: 25,
      minStock: 10,
      maxStock: 50,
      unitCost: 2500,
      supplier: "Molinos del Sur",
      unit: "kg",
      group: "Harinas",
    },
    {
      id: 2,
      name: "Queso Mozzarella",
      description: "Queso mozzarella para pizzas",
      currentStock: 8,
      minStock: 15,
      maxStock: 30,
      unitCost: 12000,
      supplier: "Lácteos Premium",
      unit: "kg",
      group: "Lácteos",
    },
    {
      id: 3,
      name: "Tomates",
      description: "Tomates frescos para salsa",
      currentStock: 12,
      minStock: 8,
      maxStock: 25,
      unitCost: 3500,
      supplier: "Verduras Frescas",
      expiryDate: new Date("2025-12-09"),
      unit: "kg",
      group: "Verduras",
    },
  ])

  const [orders, setOrders] = useState<Order[]>([
    {
      id: 1,
      customerName: "Juan Pérez",
      tableNumber: "Mesa 2",
      items: [
        {
          id: 1,
          productId: 2,
          quantity: 1,
          notes: "",
          product: products[1],
          startTime: new Date(Date.now() - 15 * 60 * 1000),
        },
      ],
      total: 25000,
      status: "preparing",
      createdAt: new Date(Date.now() - 15 * 60 * 1000),
      waiterName: "Juan Mesero",
    },
    {
      id: 2,
      customerName: "Familia Rodríguez",
      tableNumber: "Mesa 6",
      items: [
        {
          id: 2,
          productId: 1,
          quantity: 2,
          notes: "",
          product: products[0],
        },
      ],
      total: 7000,
      status: "delivered",
      createdAt: new Date(Date.now() - 30 * 60 * 1000),
      waiterName: "Juan Mesero",
    },
    {
      id: 3,
      customerName: "Mesa 8",
      tableNumber: undefined,
      items: [
        {
          id: 3,
          productId: 2,
          quantity: 1,
          notes: "Sin cebolla",
          product: products[1],
          startTime: new Date(Date.now() - 5 * 60 * 1000),
        },
      ],
      total: 25000,
      status: "preparing",
      createdAt: new Date(Date.now() - 5 * 60 * 1000),
      waiterName: "Juan Mesero",
    },
  ])

  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: "FAC-2024-001",
      orderId: 2,
      customerName: "Juan Pérez",
      tableNumber: "Mesa 2",
      subtotal: 52250,
      tax: 9405,
      total: 61655,
      date: new Date("2025-09-09"),
      status: "paid",
      paymentMethod: "cash",
      items: [
        {
          id: 1,
          productId: 2,
          quantity: 1,
          notes: "",
          product: products[1],
        },
        {
          id: 2,
          productId: 1,
          quantity: 2,
          notes: "",
          product: products[0],
        },
      ],
    },
  ])

  const [cashRegister, setCashRegister] = useState<CashRegister>({
    id: 1,
    openTime: new Date("2025-01-09T08:00:00"),
    initialAmount: 100000,
    totalSales: 152250,
    status: "open",
  })

  const [restaurantConfig, setRestaurantConfig] = useState<RestaurantConfig>({
    name: "Mi Restaurante",
    phone: "+1 234 567 8900",
    email: "contacto@mirestaurante.com",
    ruc: "12345678-9",
    address: "Calle Principal 123, Ciudad",
    taxRate: 18,
    serviceCharge: 10,
  })

  // Form states
  const [newCategory, setNewCategory] = useState({ name: "", description: "" })
  const [newGroup, setNewGroup] = useState({ name: "", description: "", categoryId: 0 })
  const [newSubgroup, setNewSubgroup] = useState({ name: "", description: "", groupId: 0 })
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: 0,
    categoryId: 0,
    groupId: 0,
    subgroupId: 0,
    requiresPreparation: false,
    preparationTime: 0,
    taxRate: 19,
    stock: 0,
    taxType: "iva_general",
  })
  const [newTable, setNewTable] = useState({ name: "", capacity: 4, location: "" })
  const [newInventoryItem, setNewInventoryItem] = useState({
    name: "",
    description: "",
    currentStock: 0,
    minStock: 0,
    maxStock: 0,
    unitCost: 0,
    supplier: "",
    unit: "kg",
    group: "",
  })

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState("")
  const [orderFilter, setOrderFilter] = useState("all")
  const [inventoryFilter, setInventoryFilter] = useState("all")
  const [invoiceSearch, setInvoiceSearch] = useState("")
  const [menuSearch, setMenuSearch] = useState("")
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null)

  // Menu manager states
  const [activeMenuTab, setActiveMenuTab] = useState("categories")
  const [categoryStep, setCategoryStep] = useState(1)
  const [groupStep, setGroupStep] = useState(false)
  const [subgroupStep, setSubgroupStep] = useState(false)
  const [showNewTableModal, setShowNewTableModal] = useState(false)
  const [showNewOrderModal, setShowNewOrderModal] = useState(false)
  const [showNewInventoryModal, setShowNewInventoryModal] = useState(false)
  const [showInvoiceModal, setShowInvoiceModal] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)
  const [showTableEditModal, setShowTableEditModal] = useState(false)
  const [editingTable, setEditingTable] = useState<Table | null>(null)
  const [showOrderViewModal, setShowOrderViewModal] = useState(false)
  const [viewingOrder, setViewingOrder] = useState<Order | null>(null)
  const [showInventoryEditModal, setShowInventoryEditModal] = useState(false)

  // Configuration states
  const [configTab, setConfigTab] = useState("general")
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<"cash" | "debit" | "credit" | "voucher">("cash")
  const [initialCashAmount, setInitialCashAmount] = useState("")
  const [taxConfig, setTaxConfig] = useState({
    tax1: { name: "IVA General", rate: 19 },
    tax2: { name: "IVA Reducido", rate: 8 },
    tax3: { name: "Exento", rate: 0 },
  })

  // Code generation functions
  const generateCategoryCode = () => {
    const maxCode =
      categories.length > 0 ? Math.max(...categories.map((c) => Number.parseInt(c.code.replace("CAT", "")))) : -1
    return `CAT${String(maxCode + 1).padStart(2, "0")}`
  }

  const generateGroupCode = () => {
    const maxCode = groups.length > 0 ? Math.max(...groups.map((g) => Number.parseInt(g.code.replace("GRP", "")))) : -1
    return `GRP${String(maxCode + 1).padStart(2, "0")}`
  }

  const generateSubgroupCode = () => {
    const maxCode =
      subgroups.length > 0 ? Math.max(...subgroups.map((s) => Number.parseInt(s.code.replace("SUB", "")))) : -1
    return `SUB${String(maxCode + 1).padStart(2, "0")}`
  }

  const generateProductCode = (product: any) => {
    const category = categories.find((c) => c.id === product.categoryId)
    const group = groups.find((g) => g.id === product.groupId)
    const subgroup = subgroups.find((s) => s.id === product.subgroupId)
    const maxCode =
      products.length > 0 ? Math.max(...products.map((p) => Number.parseInt(p.code.replace("PRD", "")))) : 0
    return `PRD${String(maxCode + 1).padStart(8, "0")}`
  }

  // CRUD functions
  const addCategory = () => {
    if (newCategory.name.trim()) {
      const code = generateCategoryCode()
      const category = {
        id: categories.length + 1,
        code,
        name: newCategory.name,
        description: newCategory.description,
      }
      setCategories([...categories, category])
      setNewCategory({ name: "", description: "" })
      setGroupStep(true) // Enable next step
    }
  }

  const addGroup = () => {
    if (newGroup.name.trim() && newGroup.categoryId) {
      const code = generateGroupCode()
      const group = {
        id: groups.length + 1,
        code,
        name: newGroup.name,
        description: newGroup.description,
        categoryId: newGroup.categoryId,
      }
      setGroups([...groups, group])
      setNewGroup({ name: "", description: "", categoryId: 0 })
      setSubgroupStep(true) // Enable next step
    }
  }

  const addSubgroup = () => {
    if (newSubgroup.name.trim() && newSubgroup.groupId > 0) {
      const newId = subgroups.length > 0 ? Math.max(...subgroups.map((s) => s.id)) + 1 : 1
      const code = generateSubgroupCode()
      setSubgroups([
        ...subgroups,
        {
          id: newId,
          code,
          name: newSubgroup.name,
          description: newSubgroup.description,
          groupId: newSubgroup.groupId,
        },
      ])
      setNewSubgroup({ name: "", description: "", groupId: 0 })
    }
  }

  const addProduct = () => {
    if (newProduct.name.trim() && newProduct.categoryId) {
      const newId = products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1
      const code = generateProductCode(newProduct)

      setProducts([
        ...products,
        {
          ...newProduct,
          id: newId,
          code,
        },
      ])
      setNewProduct({
        name: "",
        description: "",
        price: 0,
        categoryId: 0,
        groupId: 0,
        subgroupId: 0,
        requiresPreparation: false,
        preparationTime: 0,
        taxRate: 19,
        stock: 0,
        taxType: "iva_general",
      })
    }
  }

  const addTable = () => {
    if (newTable.name.trim()) {
      const newId = tables.length > 0 ? Math.max(...tables.map((t) => t.id)) + 1 : 1
      setTables([
        ...tables,
        {
          id: newId,
          name: newTable.name,
          capacity: newTable.capacity,
          status: "available",
          location: newTable.location,
        },
      ])
      setNewTable({ name: "", capacity: 4, location: "" })
      setShowNewTableModal(false)
    }
  }

  const [newOrder, setNewOrder] = useState({
    customerName: "",
    tableNumber: "",
    items: [] as { product: Product; quantity: number }[],
  })
  const [editingInventoryItem, setEditingInventoryItem] = useState<InventoryItem | null>(null)
  const [showInventoryTransactionModal, setShowInventoryTransactionModal] = useState(false)
  const [transactionType, setTransactionType] = useState<"in" | "out">("in")
  const [transactionAmount, setTransactionAmount] = useState(0)
  const [transactionReason, setTransactionReason] = useState("")

  const [inventoryGroups, setInventoryGroups] = useState<string[]>([...new Set(inventory.map((item) => item.group))])

  const addInventoryItem = () => {
    if (newInventoryItem.name.trim()) {
      const newId = inventory.length > 0 ? Math.max(...inventory.map((i) => i.id)) + 1 : 1
      const newItem = {
        ...newInventoryItem,
        id: newId,
      }
      setInventory([...inventory, newItem])

      // Update inventory groups if new group is added
      if (newInventoryItem.group && !inventoryGroups.includes(newInventoryItem.group)) {
        setInventoryGroups([...inventoryGroups, newInventoryItem.group])
      }

      setNewInventoryItem({
        name: "",
        description: "",
        currentStock: 0,
        minStock: 0,
        maxStock: 0,
        unitCost: 0,
        supplier: "",
        unit: "kg",
        group: "",
      })
      setShowNewInventoryModal(false)
    }
  }

  const handleInventoryTransaction = () => {
    if (editingInventoryItem && transactionAmount > 0) {
      const updatedInventory = inventory.map((item) => {
        if (item.id === editingInventoryItem.id) {
          const newStock =
            transactionType === "in"
              ? item.currentStock + transactionAmount
              : Math.max(0, item.currentStock - transactionAmount)
          return { ...item, currentStock: newStock }
        }
        return item
      })
      setInventory(updatedInventory)
      setShowInventoryTransactionModal(false)
      setEditingInventoryItem(null)
      setTransactionAmount(0)
      setTransactionReason("")
    }
  }

  const createOrder = () => {
    if (newOrder.customerName.trim() && newOrder.tableNumber && newOrder.items.length > 0) {
      const orderId = orders.length > 0 ? Math.max(...orders.map((o) => o.id)) + 1 : 1
      const subtotal = newOrder.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
      const tax = subtotal * (restaurantConfig.taxRate / 100)
      const total = subtotal + tax

      const order: Order = {
        id: orderId,
        customerName: newOrder.customerName,
        tableNumber: newOrder.tableNumber,
        items: newOrder.items,
        status: "pending",
        total,
        createdAt: new Date(),
        estimatedTime: 15,
      }

      setOrders([...orders, order])

      // Create invoice
      const invoice: Invoice = {
        id: `FAC-2024-${String(orderId).padStart(3, "0")}`,
        customerName: newOrder.customerName,
        tableNumber: newOrder.tableNumber,
        items: newOrder.items,
        subtotal,
        tax,
        total,
        date: new Date(),
        paymentMethod: "cash",
      }

      setInvoices([...invoices, invoice])

      // Reset form
      setNewOrder({
        customerName: "",
        tableNumber: "",
        items: [],
      })
      setShowNewOrderModal(false)
    }
  }

  const addProductToOrder = (product: Product) => {
    const existingItem = newOrder.items.find((item) => item.product.id === product.id)
    if (existingItem) {
      setNewOrder({
        ...newOrder,
        items: newOrder.items.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        ),
      })
    } else {
      setNewOrder({
        ...newOrder,
        items: [...newOrder.items, { product, quantity: 1 }],
      })
    }
  }

  const handleTableClick = (table: Table) => {
    setEditingTable(table)
    setShowTableEditModal(true)
  }

  const updateTable = () => {
    if (editingTable) {
      setTables(tables.map((t) => (t.id === editingTable.id ? editingTable : t)))
      setShowTableEditModal(false)
      setEditingTable(null)
    }
  }

  const viewTableOrder = (tableId: number) => {
    const order = orders.find((o) => o.tableNumber === `Mesa ${tableId}`)
    if (order) {
      setViewingOrder(order)
      setShowOrderViewModal(true)
    }
  }

  const editInventoryItem = (item: InventoryItem) => {
    setEditingInventoryItem(item)
    setShowInventoryEditModal(true)
  }

  const updateInventoryItem = () => {
    if (editingInventoryItem) {
      setInventory(inventory.map((item) => (item.id === editingInventoryItem.id ? editingInventoryItem : item)))
      setShowInventoryEditModal(false)
      setEditingInventoryItem(null)
    }
  }

  const openCashRegister = () => {
    const amount = Number.parseFloat(initialCashAmount) || 0
    setCashRegister({
      status: "open",
      initialAmount: amount,
      totalSales: 0,
      openedAt: new Date(),
    })
    setInitialCashAmount("")
  }

  const generateInvoicePDF = (invoice: Invoice) => {
    // Create a new window for printing
    const printWindow = window.open("", "_blank")
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Factura ${invoice.id}</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              .header { text-align: center; margin-bottom: 30px; }
              .logo { color: #1B2A49; font-size: 24px; font-weight: bold; }
              .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px; }
              .table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
              .table th, .table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
              .table th { background-color: #f5f5f5; }
              .totals { text-align: right; }
              .total-line { display: flex; justify-content: space-between; margin: 5px 0; }
              .total-final { font-weight: bold; font-size: 18px; border-top: 2px solid #1B2A49; padding-top: 10px; }
            </style>
          </head>
          <body>
            <div class="header">
              <div class="logo">DineNet</div>
              <p>La nueva era en gestión gastronómica</p>
            </div>
            
            <div class="info-grid">
              <div>
                <h3>Información del Restaurante</h3>
                <p>${restaurantConfig.name}</p>
                <p>${restaurantConfig.address}</p>
                <p>Tel: ${restaurantConfig.phone}</p>
                <p>RUC: ${restaurantConfig.ruc}</p>
              </div>
              <div>
                <h3>Información del Cliente</h3>
                <p><strong>Cliente:</strong> ${invoice.customerName}</p>
                <p><strong>Mesa:</strong> ${invoice.tableNumber}</p>
                <p><strong>Fecha:</strong> ${invoice.date.toLocaleDateString()}</p>
                <p><strong>Factura:</strong> ${invoice.id}</p>
              </div>
            </div>
            
            <h3>Detalles del Pedido</h3>
            <table class="table">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Precio Unitario</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                ${invoice.items
                  .map(
                    (item) => `
                  <tr>
                    <td>${item.product.name}</td>
                    <td>${item.quantity}</td>
                    <td>${formatPrice(item.product.price)}</td>
                    <td>${formatPrice(item.product.price * item.quantity)}</td>
                  </tr>
                `,
                  )
                  .join("")}
              </tbody>
            </table>
            
            <div class="totals">
              <div class="total-line">
                <span>Subtotal:</span>
                <span>${formatPrice(invoice.subtotal)}</span>
              </div>
              <div class="total-line">
                <span>Impuestos (${restaurantConfig.taxRate}%):</span>
                <span>${formatPrice(invoice.tax)}</span>
              </div>
              <div class="total-line total-final">
                <span>Total:</span>
                <span>${formatPrice(invoice.total)}</span>
              </div>
            </div>
            
            <script>
              window.onload = function() {
                window.print();
                window.onafterprint = function() {
                  window.close();
                }
              }
            </script>
          </body>
        </html>
      `)
      printWindow.document.close()
    }
  }

  const exportToExcel = () => {
    // Simulate Excel export
    alert("Exportando reporte a Excel...")
  }

  const exportToPDF = () => {
    // Simulate PDF export
    alert("Exportando reporte a PDF...")
  }

  // Utility functions
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const getElapsedTime = (startTime: Date) => {
    const now = new Date()
    const elapsed = Math.floor((now.getTime() - startTime.getTime()) / 1000 / 60)
    return elapsed
  }

  const getGroupsByCategory = (categoryId: number) => {
    return groups.filter((group) => group.categoryId === categoryId)
  }

  const getSubgroupsByGroup = (groupId: number) => {
    return subgroups.filter((subgroup) => subgroup.groupId === groupId)
  }

  const updateTableStatus = (
    tableId: number,
    status: Table["status"],
    customerName?: string,
    customerCount?: number,
  ) => {
    setTables(
      tables.map((table) =>
        table.id === tableId
          ? {
              ...table,
              status,
              customerName,
              customerCount,
              reservationTime: status === "reserved" ? new Date() : undefined,
            }
          : table,
      ),
    )
  }

  const getTableStatusColor = (status: Table["status"]) => {
    switch (status) {
      case "available":
        return "bg-green-500"
      case "occupied":
        return "bg-red-500"
      case "reserved":
        return "bg-yellow-500"
      case "cleaning":
        return "bg-gray-500"
      default:
        return "bg-gray-300"
    }
  }

  const getDashboardStats = () => {
    const occupiedTables = tables.filter((t) => t.status === "occupied").length
    const todayOrders = orders.length
    const todayRevenue = orders.reduce((sum, order) => sum + order.total, 0)
    const lowStockItems = inventory.filter((item) => item.currentStock <= item.minStock).length

    return {
      occupiedTables,
      totalTables: tables.length,
      todayOrders,
      todayRevenue,
      lowStockItems,
    }
  }

  const getNavigationItems = () => {
    const baseItems = [{ id: "dashboard", label: "Dashboard", icon: Home }]

    if (currentUser?.role === "admin") {
      return [
        ...baseItems,
        { id: "menu-manager", label: "Gestor de Menú", icon: Package },
        { id: "tables", label: "Mesas", icon: Users },
        { id: "orders", label: "Pedidos", icon: ShoppingCart },
        { id: "inventory", label: "Inventario", icon: Package2 },
        { id: "billing", label: "Facturación", icon: Receipt },
        { id: "reports", label: "Reportes", icon: BarChart3 },
        { id: "kitchen", label: "Cocina", icon: ChefHat },
        { id: "settings", label: "Configuración", icon: Settings },
      ]
    } else if (currentUser?.role === "mesero") {
      return [
        ...baseItems,
        { id: "tables", label: "Mesas", icon: Users },
        { id: "orders", label: "Pedidos", icon: ShoppingCart },
        { id: "kitchen", label: "Cocina", icon: ChefHat },
      ]
    } else if (currentUser?.role === "cajero") {
      return [
        ...baseItems,
        { id: "orders", label: "Pedidos", icon: ShoppingCart },
        { id: "billing", label: "Facturación", icon: Receipt },
        { id: "reports", label: "Reportes", icon: BarChart3 },
      ]
    }
    return baseItems
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    const user = users.find((u) => u.email === loginForm.email && u.password === loginForm.password)
    if (user) {
      setCurrentUser(user)
      setActiveTab("dashboard")
    } else {
      alert("Credenciales incorrectas")
    }
  }

  const handleLogout = () => {
    setCurrentUser(null)
    setLoginForm({ email: "", password: "" })
    setActiveTab("dashboard")
  }

  const updateOrderStatus = (orderId: number, status: Order["status"]) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status,
            }
          : order,
      ),
    )
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-900 to-blue-700 rounded-full flex items-center justify-center">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
                <span className="text-blue-900 font-bold text-lg">D</span>
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-blue-900">DineNet</h1>
              <p className="text-slate-600">Ingresa tus credenciales para acceder al sistema</p>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  className="mt-1"
                />
              </div>
              <Button type="submit" className="w-full bg-blue-900 hover:bg-blue-800">
                Iniciar Sesión
              </Button>
            </form>

            <div className="mt-6 p-4 bg-slate-50 rounded-lg">
              <p className="text-sm font-medium text-slate-700 mb-2">Usuarios de prueba:</p>
              <div className="space-y-1 text-xs text-slate-600">
                <div>
                  <strong>Admin:</strong> admin@dinenet.com / 123456
                </div>
                <div>
                  <strong>Mesero:</strong> mesero@dinenet.com / 123456
                </div>
                <div>
                  <strong>Cajero:</strong> cajero@dinenet.com / 123456
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const stats = getDashboardStats()

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 px-4 lg:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {isMobile && (
            <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden">
              <Package className="w-5 h-5" />
            </Button>
          )}
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">D</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">DineNet</h1>
              <p className="text-xs text-slate-600">La nueva era en gestión gastronómica</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-900 font-medium text-sm">{currentUser.name.charAt(0)}</span>
            </div>
            <div className="text-sm">
              <div className="font-medium text-slate-900">{currentUser.name}</div>
              <div className="text-slate-500 capitalize">{currentUser.role}</div>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            Cerrar Sesión
          </Button>
        </div>
      </header>

      <div className="flex">
        <aside
          className={`${
            isMobile
              ? `fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transform transition-transform ${
                  sidebarOpen ? "translate-x-0" : "-translate-x-full"
                }`
              : "w-64 bg-white border-r border-slate-200"
          } ${isMobile ? "top-16" : ""}`}
        >
          {isMobile && sidebarOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setSidebarOpen(false)} />
          )}
          <nav className={`p-4 space-y-2 ${isMobile ? "relative z-50 bg-white h-full" : ""}`}>
            {getNavigationItems().map((item) => (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "ghost"}
                className={`w-full justify-start ${
                  activeTab === item.id
                    ? "bg-blue-900 hover:bg-blue-800 text-white"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
                onClick={() => {
                  setActiveTab(item.id)
                  if (isMobile) setSidebarOpen(false)
                }}
              >
                <item.icon className="w-4 h-4 mr-3" />
                {item.label}
              </Button>
            ))}
          </nav>
        </aside>

        <main className={`flex-1 p-4 lg:p-6 ${isMobile ? "w-full" : ""}`}>
          {/* Dashboard */}
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">¡Bienvenido, {currentUser.name}!</h1>
                <p className="text-slate-600">Resumen de actividad del restaurante</p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                <Card>
                  <CardContent className="p-4 lg:p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-600">Mesas Ocupadas</p>
                        <p className="text-2xl font-bold text-slate-900">
                          {stats.occupiedTables}/{stats.totalTables}
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Users className="w-6 h-6 text-blue-900" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 lg:p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-600">Pedidos Hoy</p>
                        <p className="text-2xl font-bold text-slate-900">{stats.todayOrders}</p>
                      </div>
                      <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                        <ShoppingCart className="w-6 h-6 text-amber-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 lg:p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-600">Ingresos Hoy</p>
                        <p className="text-2xl font-bold text-slate-900">{formatPrice(stats.todayRevenue)}</p>
                      </div>
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <DollarSign className="w-6 h-6 text-green-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 lg:p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-600">Stock Bajo</p>
                        <p className="text-2xl font-bold text-slate-900">{stats.lowStockItems}</p>
                      </div>
                      <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                        <AlertTriangle className="w-6 h-6 text-red-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Orders and Day Summary */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-slate-900">Pedidos Recientes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {orders.slice(0, 3).map((order) => (
                        <div key={order.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                          <div>
                            <p className="font-medium text-slate-900">ORD-{String(order.id).padStart(3, "0")}</p>
                            <p className="text-sm text-slate-600">{order.customerName}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-slate-900">{formatPrice(order.total)}</p>
                            <Badge variant={order.status === "delivered" ? "default" : "secondary"}>
                              {order.status === "preparing"
                                ? "Preparando"
                                : order.status === "delivered"
                                  ? "Entregado"
                                  : order.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-slate-900">Resumen del Día</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Ventas Totales:</span>
                        <span className="font-medium text-slate-900">{formatPrice(cashRegister.totalSales)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Pedidos Completados:</span>
                        <span className="font-medium text-slate-900">
                          {orders.filter((o) => o.status === "delivered").length}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Ticket Promedio:</span>
                        <span className="font-medium text-slate-900">
                          {formatPrice(stats.todayOrders > 0 ? stats.todayRevenue / stats.todayOrders : 0)}
                        </span>
                      </div>
                      <Separator />
                      <div className="flex justify-between text-lg font-semibold">
                        <span className="text-slate-900">Total del Día:</span>
                        <span className="text-blue-900">{formatPrice(cashRegister.totalSales)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Menu Manager */}
          {activeTab === "menu-manager" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">Gestor de Menú</h1>
                <p className="text-slate-600">Administra categorías, grupos, subgrupos y productos</p>
              </div>

              <Tabs value={activeMenuTab} onValueChange={setActiveMenuTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="categories">Gestionar Categorías y Grupos</TabsTrigger>
                  <TabsTrigger value="products">Gestionar Productos</TabsTrigger>
                  <TabsTrigger value="menu">Ver Menú</TabsTrigger>
                </TabsList>

                {/* Categories and Groups Management */}
                <TabsContent value="categories" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Gestionar Categorías y Grupos</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Step 1: Create Category */}
                      <Collapsible open={categoryStep >= 1}>
                        <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-blue-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-900 text-white rounded-full flex items-center justify-center text-sm font-medium">
                              1
                            </div>
                            <span className="font-medium text-slate-900">Paso 1: Crear Categoría</span>
                          </div>
                          <ChevronDown className="w-5 h-5 text-slate-600" />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="p-4 border border-t-0 rounded-b-lg">
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="categoryName">Nombre de la Categoría</Label>
                              <Input
                                id="categoryName"
                                placeholder="Ej: Bebidas, Comida, Snacks"
                                value={newCategory.name}
                                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                                className="mt-1"
                              />
                            </div>
                            <div>
                              <Label htmlFor="categoryDescription">Descripción (opcional)</Label>
                              <Textarea
                                id="categoryDescription"
                                placeholder="Descripción de la categoría"
                                value={newCategory.description}
                                onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                                className="mt-1"
                              />
                            </div>
                            <Button onClick={addCategory} className="bg-blue-900 hover:bg-blue-800">
                              <Plus className="w-4 h-4 mr-2" />
                              Añadir Categoría
                            </Button>
                          </div>
                        </CollapsibleContent>
                      </Collapsible>

                      {/* Step 2: Create Group */}
                      <Collapsible open={groupStep}>
                        <CollapsibleTrigger
                          className="flex items-center justify-between w-full p-4 bg-slate-50 rounded-lg"
                          onClick={() => setGroupStep(!groupStep)}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-slate-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                              2
                            </div>
                            <span className="font-medium text-slate-900">Paso 2: Crear Grupo</span>
                          </div>
                          <ChevronDown className="w-5 h-5 text-slate-600" />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="p-4 border border-t-0 rounded-b-lg">
                          <div className="space-y-4">
                            <div>
                              <Label>Categoría</Label>
                              <Select
                                value={newGroup.categoryId.toString()}
                                onValueChange={(value) =>
                                  setNewGroup({ ...newGroup, categoryId: Number.parseInt(value) })
                                }
                              >
                                <SelectTrigger className="mt-1">
                                  <SelectValue placeholder="Seleccionar categoría" />
                                </SelectTrigger>
                                <SelectContent>
                                  {categories.map((category) => (
                                    <SelectItem key={category.id} value={category.id.toString()}>
                                      {category.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label>Nombre del Grupo</Label>
                              <Input
                                placeholder="Ej: Bebidas Calientes, Pizzas"
                                value={newGroup.name}
                                onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
                                className="mt-1"
                              />
                            </div>
                            <div>
                              <Label>Descripción (opcional)</Label>
                              <Textarea
                                placeholder="Descripción del grupo"
                                value={newGroup.description}
                                onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })}
                                className="mt-1"
                              />
                            </div>
                            <Button onClick={addGroup} className="bg-blue-900 hover:bg-blue-800">
                              <Plus className="w-4 h-4 mr-2" />
                              Añadir Grupo
                            </Button>
                          </div>
                        </CollapsibleContent>
                      </Collapsible>

                      {/* Step 3: Create Subgroup */}
                      <Collapsible open={subgroupStep}>
                        <CollapsibleTrigger
                          className="flex items-center justify-between w-full p-4 bg-slate-50 rounded-lg"
                          onClick={() => setSubgroupStep(!subgroupStep)}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-slate-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                              3
                            </div>
                            <span className="font-medium text-slate-900">Paso 3: Crear Subgrupo</span>
                          </div>
                          <ChevronDown className="w-5 h-5 text-slate-600" />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="p-4 border border-t-0 rounded-b-lg">
                          <div className="space-y-4">
                            <div>
                              <Label>Grupo</Label>
                              <Select
                                value={newSubgroup.groupId.toString()}
                                onValueChange={(value) =>
                                  setNewSubgroup({ ...newSubgroup, groupId: Number.parseInt(value) })
                                }
                              >
                                <SelectTrigger className="mt-1">
                                  <SelectValue placeholder="Seleccionar grupo" />
                                </SelectTrigger>
                                <SelectContent>
                                  {groups.map((group) => (
                                    <SelectItem key={group.id} value={group.id.toString()}>
                                      {group.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label>Nombre del Subgrupo</Label>
                              <Input
                                placeholder="Ej: Café, Té, Pizza Familiar"
                                value={newSubgroup.name}
                                onChange={(e) => setNewSubgroup({ ...newSubgroup, name: e.target.value })}
                                className="mt-1"
                              />
                            </div>
                            <div>
                              <Label>Descripción (opcional)</Label>
                              <Textarea
                                placeholder="Descripción del subgrupo"
                                value={newSubgroup.description}
                                onChange={(e) => setNewSubgroup({ ...newSubgroup, description: e.target.value })}
                                className="mt-1"
                              />
                            </div>
                            <Button onClick={addSubgroup} className="bg-blue-900 hover:bg-blue-800">
                              <Plus className="w-4 h-4 mr-2" />
                              Añadir Subgrupo
                            </Button>
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Products Management */}
                <TabsContent value="products" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Registrar Nuevo Producto</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="productName">Nombre del Producto</Label>
                              <Input
                                id="productName"
                                value={newProduct.name}
                                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                                className="mt-1"
                              />
                            </div>
                            <div>
                              <Label htmlFor="productPrice">Precio ($)</Label>
                              <Input
                                id="productPrice"
                                type="number"
                                value={newProduct.price}
                                onChange={(e) =>
                                  setNewProduct({ ...newProduct, price: Number.parseInt(e.target.value) || 0 })
                                }
                                className="mt-1"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="productStock">Stock Inicial</Label>
                              <Input
                                id="productStock"
                                type="number"
                                value={newProduct.stock}
                                onChange={(e) =>
                                  setNewProduct({ ...newProduct, stock: Number.parseInt(e.target.value) || 0 })
                                }
                                className="mt-1"
                              />
                            </div>
                            <div>
                              <Label htmlFor="productTax">Impuesto</Label>
                              <Select
                                value={newProduct.taxType}
                                onChange={(value) => {
                                  const tax = taxConfigs.find((t) => t.name.toLowerCase().includes(value.split("_")[1]))
                                  setNewProduct({
                                    ...newProduct,
                                    taxType: value,
                                    taxRate: tax?.rate || 19,
                                  })
                                }}
                              >
                                <SelectTrigger className="mt-1">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {taxConfigs.map((tax) => (
                                    <SelectItem
                                      key={tax.id}
                                      value={`iva_${tax.name.toLowerCase().includes("general") ? "general" : tax.name.toLowerCase().includes("reducido") ? "reducido" : "exento"}`}
                                    >
                                      {tax.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div>
                            <Label htmlFor="productCategory">Categoría</Label>
                            <Select
                              value={newProduct.categoryId.toString()}
                              onChange={(value) => {
                                setNewProduct({
                                  ...newProduct,
                                  categoryId: Number.parseInt(value),
                                  groupId: 0,
                                  subgroupId: 0,
                                })
                              }}
                            >
                              <SelectTrigger className="mt-1">
                                <SelectValue placeholder="Selecciona una categoría" />
                              </SelectTrigger>
                              <SelectContent>
                                {categories.map((category) => (
                                  <SelectItem key={category.id} value={category.id.toString()}>
                                    {category.code} - {category.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="productGroup">Grupo</Label>
                              <Select
                                value={newProduct.groupId.toString()}
                                onChange={(value) => {
                                  setNewProduct({
                                    ...newProduct,
                                    groupId: Number.parseInt(value),
                                    subgroupId: 0,
                                  })
                                }}
                                disabled={!newProduct.categoryId}
                              >
                                <SelectTrigger className="mt-1">
                                  <SelectValue placeholder="Selecciona un grupo" />
                                </SelectTrigger>
                                <SelectContent>
                                  {getGroupsByCategory(newProduct.categoryId).map((group) => (
                                    <SelectItem key={group.id} value={group.id.toString()}>
                                      {group.code} - {group.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label htmlFor="productSubgroup">Subgrupo</Label>
                              <Select
                                value={newProduct.subgroupId.toString()}
                                onChange={(value) =>
                                  setNewProduct({ ...newProduct, subgroupId: Number.parseInt(value) })
                                }
                                disabled={!newProduct.groupId}
                              >
                                <SelectTrigger className="mt-1">
                                  <SelectValue placeholder="Selecciona un subgrupo" />
                                </SelectTrigger>
                                <SelectContent>
                                  {getSubgroupsByGroup(newProduct.groupId).map((subgroup) => (
                                    <SelectItem key={subgroup.id} value={subgroup.id.toString()}>
                                      {subgroup.code} - {subgroup.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div>
                            <Label htmlFor="productCode">Código Automático</Label>
                            <Input
                              id="productCode"
                              value={generateProductCode(newProduct)}
                              disabled
                              className="mt-1 bg-slate-50"
                            />
                          </div>

                          <div>
                            <Label htmlFor="productDescription">Descripción (opcional)</Label>
                            <Textarea
                              id="productDescription"
                              value={newProduct.description}
                              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                              className="mt-1"
                            />
                          </div>

                          <div className="flex items-center space-x-2">
                            <Switch
                              id="requiresPreparation"
                              checked={newProduct.requiresPreparation}
                              onCheckedChange={(checked) =>
                                setNewProduct({ ...newProduct, requiresPreparation: checked })
                              }
                            />
                            <Label htmlFor="requiresPreparation">Requiere preparación</Label>
                          </div>

                          {newProduct.requiresPreparation && (
                            <div>
                              <Label htmlFor="preparationTime">Tiempo de preparación (minutos)</Label>
                              <Input
                                id="preparationTime"
                                type="number"
                                value={newProduct.preparationTime}
                                onChange={(e) =>
                                  setNewProduct({
                                    ...newProduct,
                                    preparationTime: Number.parseInt(e.target.value) || 0,
                                  })
                                }
                                className="mt-1"
                              />
                            </div>
                          )}

                          <Button
                            onClick={addProduct}
                            disabled={!newProduct.name || !newProduct.categoryId}
                            className="w-full bg-blue-900 hover:bg-blue-800"
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Crear Producto
                          </Button>
                        </div>

                        <div>
                          <h3 className="font-medium text-slate-900 mb-4">Productos Existentes</h3>
                          <div className="space-y-3 max-h-96 overflow-y-auto">
                            {products.map((product) => {
                              const category = categories.find((c) => c.id === product.categoryId)
                              const group = groups.find((g) => g.id === product.groupId)
                              const subgroup = subgroups.find((s) => s.id === product.subgroupId)

                              return (
                                <Card key={product.id} className="p-4">
                                  <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                      <h4 className="font-medium text-slate-900">{product.name}</h4>
                                      <p className="text-sm text-slate-600">{product.description}</p>
                                      <p className="text-lg font-semibold text-blue-900 mt-1">
                                        {formatPrice(product.price)}
                                      </p>
                                      <div className="flex flex-wrap gap-1 mt-2">
                                        <Badge variant="outline">{category?.name}</Badge>
                                        <Badge variant="outline">{group?.name}</Badge>
                                        <Badge variant="outline">{subgroup?.name}</Badge>
                                        {product.requiresPreparation && (
                                          <Badge variant="secondary">
                                            <Clock className="w-3 h-3 mr-1" />
                                            {product.preparationTime}min
                                          </Badge>
                                        )}
                                      </div>
                                    </div>
                                    <Button variant="ghost" size="sm">
                                      <Trash2 className="w-4 h-4 text-red-500" />
                                    </Button>
                                  </div>
                                </Card>
                              )
                            })}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Menu View */}
                <TabsContent value="menu" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Visualizar Menú</CardTitle>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                          <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                            <Input
                              placeholder="Buscar productos por nombre o código..."
                              value={menuSearch}
                              onChange={(e) => setMenuSearch(e.target.value)}
                              className="pl-10"
                            />
                          </div>
                        </div>
                        <Select
                          value={selectedGroup?.toString() || "all"}
                          onChange={(value) => setSelectedGroup(value === "all" ? null : Number.parseInt(value))}
                        >
                          <SelectTrigger className="w-full sm:w-48">
                            <SelectValue placeholder="Filtrar por grupo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Todos los grupos</SelectItem>
                            {groups.map((group) => (
                              <SelectItem key={group.id} value={group.id.toString()}>
                                {group.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {categories.map((category) => {
                          const categoryGroups = groups.filter((g) => g.categoryId === category.id)

                          return (
                            <div key={category.id}>
                              <h3 className="text-xl font-semibold text-slate-900 mb-4">{category.name}</h3>

                              {categoryGroups.map((group) => {
                                const groupProducts = products.filter(
                                  (p) =>
                                    p.groupId === group.id &&
                                    (!selectedGroup || p.groupId === selectedGroup) &&
                                    (!menuSearch ||
                                      p.name.toLowerCase().includes(menuSearch.toLowerCase()) ||
                                      p.code.toLowerCase().includes(menuSearch.toLowerCase())),
                                )

                                if (groupProducts.length === 0) return null

                                return (
                                  <Collapsible key={group.id} defaultOpen>
                                    <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-slate-50 rounded-lg mb-3">
                                      <span className="font-medium text-slate-900">{group.name}</span>
                                      <div className="flex items-center gap-2">
                                        <Badge variant="secondary">{groupProducts.length} productos</Badge>
                                        <ChevronDown className="w-4 h-4" />
                                      </div>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                                        {groupProducts.map((product) => (
                                          <Card key={product.id}>
                                            <CardContent className="p-4">
                                              <div className="space-y-2">
                                                <div className="flex justify-between items-start">
                                                  <h4 className="font-medium text-slate-900">{product.name}</h4>
                                                  <Badge variant="outline" className="text-xs">
                                                    {product.code}
                                                  </Badge>
                                                </div>
                                                <p className="text-sm text-slate-600">{product.description}</p>
                                                <div className="flex justify-between items-center">
                                                  <span className="text-lg font-semibold text-blue-900">
                                                    {formatPrice(product.price)}
                                                  </span>
                                                  {product.requiresPreparation && (
                                                    <Badge variant="secondary">
                                                      <Clock className="w-3 h-3 mr-1" />
                                                      {product.preparationTime}min
                                                    </Badge>
                                                  )}
                                                </div>
                                              </div>
                                            </CardContent>
                                          </Card>
                                        ))}
                                      </div>
                                    </CollapsibleContent>
                                  </Collapsible>
                                )
                              })}
                            </div>
                          )
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}

          {/* Tables Management */}
          {activeTab === "tables" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">Gestión de Mesas</h1>
                  <p className="text-slate-600">Administra el estado y ocupación de las mesas</p>
                </div>
                <Button onClick={() => setShowNewTableModal(true)} className="bg-blue-900 hover:bg-blue-800">
                  <Plus className="w-4 h-4 mr-2" />
                  Nueva Mesa
                </Button>
              </div>

              {/* Table Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-slate-900">{tables.length}</div>
                    <div className="text-sm text-slate-600">Total</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {tables.filter((t) => t.status === "available").length}
                    </div>
                    <div className="text-sm text-slate-600">Disponibles</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-red-600">
                      {tables.filter((t) => t.status === "occupied").length}
                    </div>
                    <div className="text-sm text-slate-600">Ocupadas</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-yellow-600">
                      {tables.filter((t) => t.status === "reserved").length}
                    </div>
                    <div className="text-sm text-slate-600">Reservadas</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-slate-600">
                      {tables.filter((t) => t.status === "cleaning").length}
                    </div>
                    <div className="text-sm text-slate-600">Limpieza</div>
                  </CardContent>
                </Card>
              </div>

              {/* Restaurant Layout */}
              <Card>
                <CardHeader>
                  <CardTitle>Plano del Restaurante</CardTitle>
                  <p className="text-sm text-slate-600">Haz clic en una mesa para cambiar su estado</p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4 p-6 bg-slate-50 rounded-lg">
                    {tables.map((table) => (
                      <div
                        key={table.id}
                        onClick={() => handleTableClick(table)}
                        className={`
                          relative p-4 rounded-lg text-center cursor-pointer transition-all hover:scale-105
                          ${table.status === "available" ? "bg-green-500 text-white" : ""}
                          ${table.status === "occupied" ? "bg-red-500 text-white" : ""}
                          ${table.status === "reserved" ? "bg-yellow-500 text-white" : ""}
                          ${table.status === "cleaning" ? "bg-slate-500 text-white" : ""}
                        `}
                      >
                        <div className="font-bold">{table.name}</div>
                        <div className="text-xs opacity-90">{table.capacity} personas</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Occupied Tables and Reservations */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      Mesas Ocupadas
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {tables
                        .filter((table) => table.status === "occupied")
                        .map((table) => {
                          const tableOrder = orders.find((o) => o.tableNumber === table.name)
                          return (
                            <div
                              key={table.id}
                              className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                            >
                              <div>
                                <div className="font-medium">{table.name}</div>
                                <div className="text-sm text-slate-600">{table.capacity} personas</div>
                                {tableOrder && <div className="text-sm text-blue-600">Pedido: {tableOrder.id}</div>}
                              </div>
                              <div className="flex gap-2">
                                {tableOrder && (
                                  <Button variant="outline" size="sm" onClick={() => viewTableOrder(table.id)}>
                                    <Eye className="w-4 h-4" />
                                  </Button>
                                )}
                                <Button variant="outline" size="sm" onClick={() => handleTableClick(table)}>
                                  <Edit className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          )
                        })}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      Reservas
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {tables
                        .filter((t) => t.status === "reserved")
                        .map((table) => (
                          <div key={table.id} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                            <div>
                              <p className="font-medium text-slate-900">{table.name}</p>
                              <p className="text-sm text-slate-600">
                                {table.customerName} ({table.customerCount} personas)
                              </p>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                updateTableStatus(table.id, "occupied", table.customerName, table.customerCount)
                              }
                            >
                              Confirmar
                            </Button>
                          </div>
                        ))}
                      {tables.filter((t) => t.status === "reserved").length === 0 && (
                        <p className="text-slate-500 text-center py-4">No hay reservas</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* New Table Modal */}
              {showNewTableModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                  <Card className="w-full max-w-md">
                    <CardHeader>
                      <CardTitle>Nueva Mesa</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="tableName">Nombre de la Mesa</Label>
                        <Input
                          id="tableName"
                          value={newTable.name}
                          onChange={(e) => setNewTable({ ...newTable, name: e.target.value })}
                          placeholder="Ej: Mesa 7"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="tableCapacity">Capacidad</Label>
                        <Input
                          id="tableCapacity"
                          type="number"
                          value={newTable.capacity}
                          onChange={(e) => setNewTable({ ...newTable, capacity: Number.parseInt(e.target.value) || 4 })}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="tableLocation">Ubicación</Label>
                        <Input
                          id="tableLocation"
                          value={newTable.location}
                          onChange={(e) => setNewTable({ ...newTable, location: e.target.value })}
                          placeholder="Ej: Ventana, Centro, Terraza"
                          className="mt-1"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={addTable} className="flex-1 bg-blue-900 hover:bg-blue-800">
                          Crear Mesa
                        </Button>
                        <Button variant="outline" onClick={() => setShowNewTableModal(false)} className="flex-1">
                          Cancelar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          )}

          {/* Orders */}
          {activeTab === "orders" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">Pedidos</h1>
                  <p className="text-slate-600">Gestiona todos los pedidos del restaurante</p>
                </div>
                <Button onClick={() => setShowNewOrderModal(true)} className="bg-blue-900 hover:bg-blue-800">
                  <Plus className="w-4 h-4 mr-2" />
                  Nuevo Pedido
                </Button>
              </div>

              {/* Order Filters */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      placeholder="Buscar por ID o cliente..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <Select value={orderFilter} onChange={setOrderFilter}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Todos los estados" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los estados</SelectItem>
                    <SelectItem value="pending">Pendiente</SelectItem>
                    <SelectItem value="preparing">Preparando</SelectItem>
                    <SelectItem value="ready">Listo</SelectItem>
                    <SelectItem value="delivered">Entregado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Orders Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {orders
                  .filter(
                    (order) =>
                      (orderFilter === "all" || order.status === orderFilter) &&
                      (searchTerm === "" ||
                        order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        `ORD-${String(order.id).padStart(3, "0")}`.toLowerCase().includes(searchTerm.toLowerCase())),
                  )
                  .map((order) => (
                    <Card key={order.id} className="overflow-hidden">
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">ORD-{String(order.id).padStart(3, "0")}</CardTitle>
                            <p className="text-sm text-slate-600">
                              {order.tableNumber ? `Mesa ${order.tableNumber}` : "Para llevar"} • En restaurante
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-slate-400" />
                          <span className="text-sm">{order.customerName} (1 personas)</span>
                        </div>

                        <div className="text-2xl font-bold text-blue-900">{formatPrice(order.total)}</div>

                        <div
                          className={`px-3 py-1 rounded-full text-sm font-medium text-center ${
                            order.status === "preparing"
                              ? "bg-yellow-100 text-yellow-800"
                              : order.status === "delivered"
                                ? "bg-green-100 text-green-800"
                                : order.status === "ready"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-slate-100 text-slate-800"
                          }`}
                        >
                          {order.status === "preparing"
                            ? "En preparación"
                            : order.status === "delivered"
                              ? "Servido"
                              : order.status === "ready"
                                ? "Listo"
                                : order.status}
                        </div>

                        {order.status === "preparing" && order.items[0]?.startTime && (
                          <div className="text-center">
                            <p className="text-sm text-slate-600">Tiempo estimado:</p>
                            <p className="font-medium text-amber-600">
                              {Math.max(
                                0,
                                order.items[0].product.preparationTime - getElapsedTime(order.items[0].startTime),
                              )}{" "}
                              minutos
                            </p>
                          </div>
                        )}

                        <div className="text-xs text-slate-500">{order.items.length} ítems</div>
                      </CardContent>
                    </Card>
                  ))}
              </div>

              {/* New Order Modal */}
              {showNewOrderModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                  <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                    <CardHeader>
                      <CardTitle>Nuevo Pedido</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="customerName">Nombre del Cliente</Label>
                          <Input
                            id="customerName"
                            value={newOrder.customerName}
                            onChange={(e) => setNewOrder({ ...newOrder, customerName: e.target.value })}
                            placeholder="Nombre del cliente"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="tableNumber">Mesa</Label>
                          <Select
                            value={newOrder.tableNumber}
                            onChange={(value) => setNewOrder({ ...newOrder, tableNumber: value })}
                          >
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Seleccionar mesa" />
                            </SelectTrigger>
                            <SelectContent>
                              {tables
                                .filter((table) => table.status === "available")
                                .map((table) => (
                                  <SelectItem key={table.id} value={`Mesa ${table.number}`}>
                                    Mesa {table.number}
                                  </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label>Productos</Label>
                        <div className="mt-2 space-y-2 max-h-40 overflow-y-auto">
                          {products.map((product) => (
                            <div key={product.id} className="flex items-center justify-between p-2 border rounded">
                              <div>
                                <span className="font-medium">{product.name}</span>
                                <span className="text-slate-600 ml-2">{formatPrice(product.price)}</span>
                              </div>
                              <Button
                                size="sm"
                                onClick={() => addProductToOrder(product)}
                                className="bg-blue-900 hover:bg-blue-800"
                              >
                                <Plus className="w-4 h-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>

                      {newOrder.items.length > 0 && (
                        <div>
                          <Label>Items del Pedido</Label>
                          <div className="mt-2 space-y-2">
                            {newOrder.items.map((item, index) => (
                              <div key={index} className="flex items-center justify-between p-2 bg-slate-50 rounded">
                                <span>
                                  {item.product.name} x{item.quantity}
                                </span>
                                <span>{formatPrice(item.product.price * item.quantity)}</span>
                              </div>
                            ))}
                            <div className="text-right font-semibold">
                              Total:{" "}
                              {formatPrice(
                                newOrder.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="flex gap-2">
                        <Button onClick={createOrder} className="flex-1 bg-blue-900 hover:bg-blue-800">
                          Crear Pedido
                        </Button>
                        <Button variant="outline" onClick={() => setShowNewOrderModal(false)} className="flex-1">
                          Cancelar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          )}

          {/* Inventory */}
          {activeTab === "inventory" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">Inventario</h1>
                  <p className="text-slate-600">Gestiona el stock de ingredientes y suministros por grupos</p>
                </div>
                <Button onClick={() => setShowNewInventoryModal(true)} className="bg-blue-900 hover:bg-blue-800">
                  <Plus className="w-4 h-4 mr-2" />
                  Nuevo Item
                </Button>
              </div>

              {/* Stock Alerts */}
              <Card className="border-amber-200 bg-amber-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-amber-700">
                    <AlertTriangle className="w-5 h-5" />
                    Alertas de Stock
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {inventory
                      .filter((item) => item.currentStock <= item.minStock)
                      .map((item) => (
                        <div key={item.id} className="text-sm text-amber-700">
                          • {item.name} está por debajo del stock mínimo ({item.currentStock} {item.unit} ≤{" "}
                          {item.minStock} {item.unit})
                        </div>
                      ))}
                    {inventory
                      .filter(
                        (item) =>
                          item.expiryDate &&
                          new Date(item.expiryDate) <= new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                      )
                      .map((item) => (
                        <div key={`exp-${item.id}`} className="text-sm text-amber-700">
                          • {item.name} expira en 3 días
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              {/* Inventory Filters */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      placeholder="Buscar ítems..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <Select value={inventoryFilter} onChange={setInventoryFilter}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Todos los grupos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los grupos</SelectItem>
                    <SelectItem value="Harinas">Harinas</SelectItem>
                    <SelectItem value="Lácteos">Lácteos</SelectItem>
                    <SelectItem value="Verduras">Verduras</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Inventory Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {inventory
                  .filter(
                    (item) =>
                      (inventoryFilter === "all" || item.group === inventoryFilter) &&
                      (searchTerm === "" || item.name.toLowerCase().includes(searchTerm.toLowerCase())),
                  )
                  .map((item) => (
                    <Card key={item.id}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">{item.name}</CardTitle>
                            <p className="text-sm text-slate-600">{item.description}</p>
                            <Badge variant="outline" className="mt-1">
                              {item.group}
                            </Badge>
                          </div>
                          {item.expiryDate && (
                            <Badge variant="destructive" className="text-xs">
                              Expira: {new Date(item.expiryDate).toLocaleDateString()}
                            </Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="text-center">
                          <div
                            className={`text-3xl font-bold ${
                              item.currentStock <= item.minStock ? "text-red-600" : "text-slate-900"
                            }`}
                          >
                            {item.currentStock} {item.unit}
                          </div>
                          <div
                            className={`text-sm px-2 py-1 rounded-full inline-block mt-1 ${
                              item.currentStock <= item.minStock
                                ? "bg-red-100 text-red-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {item.currentStock <= item.minStock ? "Stock Bajo" : "Normal"}
                          </div>
                        </div>

                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-slate-600">Mínimo:</span>
                            <span>
                              {item.minStock} {item.unit}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">Máximo:</span>
                            <span>
                              {item.maxStock} {item.unit}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">Costo unitario:</span>
                            <span>{formatPrice(item.unitCost)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">Proveedor:</span>
                            <span className="text-right">{item.supplier}</span>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setEditingInventoryItem(item)
                              setShowInventoryTransactionModal(true)
                            }}
                            className="flex items-center gap-1"
                          >
                            <TrendingUp className="w-4 h-4" />
                            Transacción
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => editInventoryItem(item)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>

              {/* New Inventory Item Modal */}
              {showNewInventoryModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                  <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
                    <CardHeader>
                      <CardTitle>Nuevo Item de Inventario</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="itemName">Nombre del Item</Label>
                        <Input
                          id="itemName"
                          value={newInventoryItem.name}
                          onChange={(e) => setNewInventoryItem({ ...newInventoryItem, name: e.target.value })}
                          placeholder="Ej: Harina de Trigo"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="itemDescription">Descripción</Label>
                        <Textarea
                          id="itemDescription"
                          value={newInventoryItem.description}
                          onChange={(e) => setNewInventoryItem({ ...newInventoryItem, description: e.target.value })}
                          placeholder="Descripción del item"
                          className="mt-1"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="currentStock">Stock Actual</Label>
                          <Input
                            id="currentStock"
                            type="number"
                            value={newInventoryItem.currentStock}
                            onChange={(e) =>
                              setNewInventoryItem({
                                ...newInventoryItem,
                                currentStock: Number.parseInt(e.target.value) || 0,
                              })
                            }
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="unit">Unidad</Label>
                          <Select
                            value={newInventoryItem.unit}
                            onChange={(value) => setNewInventoryItem({ ...newInventoryItem, unit: value })}
                          >
                            <SelectTrigger className="mt-1">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="kg">kg</SelectItem>
                              <SelectItem value="g">g</SelectItem>
                              <SelectItem value="l">l</SelectItem>
                              <SelectItem value="ml">ml</SelectItem>
                              <SelectItem value="unidad">unidad</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="minStock">Stock Mínimo</Label>
                          <Input
                            id="minStock"
                            type="number"
                            value={newInventoryItem.minStock}
                            onChange={(e) =>
                              setNewInventoryItem({
                                ...newInventoryItem,
                                minStock: Number.parseInt(e.target.value) || 0,
                              })
                            }
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="maxStock">Stock Máximo</Label>
                          <Input
                            id="maxStock"
                            type="number"
                            value={newInventoryItem.maxStock}
                            onChange={(e) =>
                              setNewInventoryItem({
                                ...newInventoryItem,
                                maxStock: Number.parseInt(e.target.value) || 0,
                              })
                            }
                            className="mt-1"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="unitCost">Costo Unitario</Label>
                        <Input
                          id="unitCost"
                          type="number"
                          value={newInventoryItem.unitCost}
                          onChange={(e) =>
                            setNewInventoryItem({ ...newInventoryItem, unitCost: Number.parseInt(e.target.value) || 0 })
                          }
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="supplier">Proveedor</Label>
                        <Input
                          id="supplier"
                          value={newInventoryItem.supplier}
                          onChange={(e) => setNewInventoryItem({ ...newInventoryItem, supplier: e.target.value })}
                          placeholder="Nombre del proveedor"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="group">Grupo</Label>
                        <Input
                          id="group"
                          value={newInventoryItem.group}
                          onChange={(e) => setNewInventoryItem({ ...newInventoryItem, group: e.target.value })}
                          placeholder="Ej: Harinas, Lácteos, Verduras"
                          className="mt-1"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={addInventoryItem} className="flex-1 bg-blue-900 hover:bg-blue-800">
                          Crear Item
                        </Button>
                        <Button variant="outline" onClick={() => setShowNewInventoryModal(false)} className="flex-1">
                          Cancelar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          )}

          {showInventoryTransactionModal && editingInventoryItem && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <Card className="w-full max-w-md">
                <CardHeader>
                  <CardTitle>Transacción de Inventario</CardTitle>
                  <p className="text-sm text-slate-600">{editingInventoryItem.name}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Tipo de Transacción</Label>
                    <Select value={transactionType} onChange={(value: "in" | "out") => setTransactionType(value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="in">Entrada</SelectItem>
                        <SelectItem value="out">Salida</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Cantidad</Label>
                    <Input
                      type="number"
                      value={transactionAmount}
                      onChange={(e) => setTransactionAmount(Number(e.target.value) || 0)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Motivo</Label>
                    <Input
                      value={transactionReason}
                      onChange={(e) => setTransactionReason(e.target.value)}
                      placeholder="Motivo de la transacción"
                      className="mt-1"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleInventoryTransaction} className="flex-1 bg-blue-900 hover:bg-blue-800">
                      Confirmar
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowInventoryTransactionModal(false)}
                      className="flex-1"
                    >
                      Cancelar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Billing */}
          {activeTab === "billing" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">Facturación</h1>
                  <p className="text-slate-600">Gestiona facturas y caja registradora</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Invoices */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Receipt className="w-5 h-5" />
                      Facturas
                    </CardTitle>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                      <Input
                        placeholder="Buscar por número de factura o cliente..."
                        className="pl-10"
                        value={invoiceSearch}
                        onChange={(e) => setInvoiceSearch(e.target.value)}
                      />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {invoices
                        .filter(
                          (invoice) =>
                            invoiceSearch === "" ||
                            invoice.id.toLowerCase().includes(invoiceSearch.toLowerCase()) ||
                            invoice.customerName.toLowerCase().includes(invoiceSearch.toLowerCase()),
                        )
                        .map((invoice) => (
                          <div key={invoice.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                              <p className="font-medium text-slate-900">{invoice.id}</p>
                              <p className="text-sm text-slate-600">Cliente: {invoice.customerName}</p>
                              <p className="text-sm text-slate-600">
                                {invoice.tableNumber} • Total: {formatPrice(invoice.total)}
                              </p>
                              <p className="text-xs text-slate-500">Fecha: {invoice.date.toLocaleDateString()}</p>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setSelectedInvoice(invoice)
                                  setShowInvoiceModal(true)
                                }}
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => generateInvoicePDF(invoice)}>
                                <Download className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Cash Register */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5" />
                      Caja Registradora
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {cashRegister.status === "closed" ? (
                      <div className="text-center py-8">
                        <Clock className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                        <p className="text-slate-600 mb-4">No hay caja abierta</p>
                        <div className="space-y-2">
                          <Label htmlFor="initialAmount">Monto Inicial</Label>
                          <Input
                            id="initialAmount"
                            type="number"
                            value={initialCashAmount}
                            onChange={(e) => setInitialCashAmount(e.target.value)}
                            placeholder="Ingrese monto inicial"
                            className="text-center"
                          />
                        </div>
                        <Button
                          onClick={openCashRegister}
                          className="w-full mt-4 bg-blue-900 hover:bg-blue-800"
                          disabled={!initialCashAmount}
                        >
                          Abrir Caja
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="text-center">
                          <p className="text-sm text-slate-600">Monto Inicial</p>
                          <p className="text-2xl font-bold text-slate-900">{formatPrice(cashRegister.initialAmount)}</p>
                        </div>

                        <Button className="w-full bg-blue-900 hover:bg-blue-800">Abrir Caja</Button>

                        <div className="space-y-3">
                          <h4 className="font-medium text-slate-900">Cajas del Día</h4>
                          <div className="p-3 bg-slate-50 rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-medium text-slate-900">Cerrada</span>
                              <span className="text-sm text-slate-600">01:20 p. m. - 08:20 p. m.</span>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-slate-600">Inicial:</span>
                                <div className="font-medium">{formatPrice(cashRegister.initialAmount)}</div>
                              </div>
                              <div>
                                <span className="text-slate-600">Ventas:</span>
                                <div className="font-medium">{formatPrice(cashRegister.totalSales)}</div>
                              </div>
                              <div>
                                <span className="text-slate-600">Efectivo:</span>
                                <div className="font-medium">{formatPrice(cashRegister.totalSales)}</div>
                              </div>
                              <div>
                                <span className="text-slate-600">Cierre:</span>
                                <div className="font-medium">{formatPrice(cashRegister.totalSales)}</div>
                              </div>
                              <div className="col-span-2">
                                <span className="text-slate-600">Diferencia:</span>
                                <div className="font-medium text-green-600">{formatPrice(52250)}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Invoice Modal */}
              {showInvoiceModal && selectedInvoice && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                  <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>Factura {selectedInvoice.id}</CardTitle>
                          <p className="text-slate-600">DineNet - Sistema de Restaurante</p>
                        </div>
                        <Button
                          variant="ghost"
                          onClick={() => setShowInvoiceModal(false)}
                          className="absolute top-4 right-4"
                        >
                          ✕
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium text-slate-900 mb-2">Información del Restaurante</h4>
                          <div className="text-sm text-slate-600 space-y-1">
                            <p>{restaurantConfig.name}</p>
                            <p>{restaurantConfig.address}</p>
                            <p>Tel: {restaurantConfig.phone}</p>
                            <p>RUC: {restaurantConfig.ruc}</p>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-900 mb-2">Información del Cliente</h4>
                          <div className="text-sm text-slate-600 space-y-1">
                            <p>
                              <strong>Cliente:</strong> {selectedInvoice.customerName}
                            </p>
                            <p>
                              <strong>Mesa:</strong> {selectedInvoice.tableNumber}
                            </p>
                            <p>
                              <strong>Fecha:</strong> {selectedInvoice.date.toLocaleDateString()}
                            </p>
                            {/* Payment Method Selection */}
                            <p>
                              <strong>Método de Pago:</strong>{" "}
                              <Select value={selectedPaymentMethod} onChange={setSelectedPaymentMethod}>
                                <SelectTrigger className="w-32 inline-flex">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="cash">Efectivo</SelectItem>
                                  <SelectItem value="debit">Tarjeta Débito</SelectItem>
                                  <SelectItem value="credit">Tarjeta Crédito</SelectItem>
                                  <SelectItem value="voucher">Bono</SelectItem>
                                </SelectContent>
                              </Select>
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-slate-900 mb-3">Detalles del Pedido</h4>
                        <div className="border rounded-lg overflow-hidden">
                          <table className="w-full">
                            <thead className="bg-slate-50">
                              <tr>
                                <th className="text-left p-3 text-sm font-medium text-slate-900">Producto</th>
                                <th className="text-center p-3 text-sm font-medium text-slate-900">Cant.</th>
                                <th className="text-right p-3 text-sm font-medium text-slate-900">Precio Unit.</th>
                                <th className="text-right p-3 text-sm font-medium text-slate-900">Total</th>
                              </tr>
                            </thead>
                            <tbody>
                              {selectedInvoice.items.map((item, index) => (
                                <tr key={index} className="border-t">
                                  <td className="p-3 text-sm">{item.product.name}</td>
                                  <td className="p-3 text-sm text-center">{item.quantity}</td>
                                  <td className="p-3 text-sm text-right">{formatPrice(item.product.price)}</td>
                                  <td className="p-3 text-sm text-right">
                                    {formatPrice(item.product.price * item.quantity)}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div className="border-t pt-4">
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Subtotal:</span>
                            <span>{formatPrice(selectedInvoice.subtotal)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Impuestos ({restaurantConfig.taxRate}%):</span>
                            <span>{formatPrice(selectedInvoice.tax)}</span>
                          </div>
                          <div className="flex justify-between text-lg font-semibold border-t pt-2">
                            <span>Total:</span>
                            <span>{formatPrice(selectedInvoice.total)}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          className="flex-1 bg-blue-900 hover:bg-blue-800"
                          onClick={() => generateInvoicePDF(selectedInvoice)}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Descargar PDF
                        </Button>
                        <Button
                          variant="outline"
                          className="flex-1 bg-transparent"
                          onClick={() => generateInvoicePDF(selectedInvoice)}
                        >
                          <FileText className="w-4 h-4 mr-2" />
                          Imprimir
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          )}

          {/* Reports */}
          {activeTab === "reports" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">Reportes</h1>
                  <p className="text-slate-600">Análisis y estadísticas del restaurante</p>
                </div>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Exportar
                </Button>
              </div>

              {/* Report Filters */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Filtros de Reporte
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <Label htmlFor="period">Período</Label>
                      <Select defaultValue="today">
                        <SelectTrigger className="w-48 mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="today">Hoy</SelectItem>
                          <SelectItem value="week">Esta Semana</SelectItem>
                          <SelectItem value="month">Este Mes</SelectItem>
                          <SelectItem value="year">Este Año</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={exportToExcel} className="bg-green-600 hover:bg-green-700 text-white">
                        <FileSpreadsheet className="w-4 h-4 mr-2" />
                        Excel
                      </Button>
                      <Button onClick={exportToPDF} className="bg-red-600 hover:bg-red-700 text-white">
                        <FileText className="w-4 h-4 mr-2" />
                        PDF
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Report Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <DollarSign className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="text-2xl font-bold text-slate-900">{formatPrice(stats.todayRevenue)}</div>
                    <div className="text-sm text-slate-600">Ingresos Totales</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <ShoppingCart className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="text-2xl font-bold text-slate-900">{stats.todayOrders}</div>
                    <div className="text-sm text-slate-600">Total Órdenes</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <TrendingUp className="w-6 h-6 text-amber-600" />
                    </div>
                    <div className="text-2xl font-bold text-slate-900">
                      {formatPrice(stats.todayOrders > 0 ? stats.todayRevenue / stats.todayOrders : 0)}
                    </div>
                    <div className="text-sm text-slate-600">Ticket Promedio</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Users className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="text-2xl font-bold text-slate-900">
                      {orders.filter((o) => o.status === "delivered").length}
                    </div>
                    <div className="text-sm text-slate-600">Órdenes Completadas</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <AlertTriangle className="w-6 h-6 text-red-600" />
                    </div>
                    <div className="text-2xl font-bold text-slate-900">{stats.lowStockItems}</div>
                    <div className="text-sm text-slate-600">Stock Bajo</div>
                  </CardContent>
                </Card>
              </div>

              {/* Report Tabs */}
              <Tabs defaultValue="sales" className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="sales">Ventas</TabsTrigger>
                  <TabsTrigger value="products">Productos</TabsTrigger>
                  <TabsTrigger value="payments">Pagos</TabsTrigger>
                  <TabsTrigger value="tables">Mesas</TabsTrigger>
                  <TabsTrigger value="inventory">Inventario</TabsTrigger>
                </TabsList>

                <TabsContent value="sales" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Ventas por Día</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 flex items-center justify-center text-slate-500">
                        Gráfico de ventas por día
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="products" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Productos Más Vendidos</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {products.slice(0, 5).map((product, index) => (
                          <div
                            key={product.id}
                            className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-medium text-blue-900">
                                {index + 1}
                              </div>
                              <div>
                                <p className="font-medium text-slate-900">{product.name}</p>
                                <p className="text-sm text-slate-600">{formatPrice(product.price)}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-medium text-slate-900">15 vendidos</p>
                              <p className="text-sm text-slate-600">{formatPrice(product.price * 15)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="payments" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Métodos de Pago</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">{formatPrice(120000)}</div>
                          <div className="text-sm text-slate-600">Efectivo</div>
                        </div>
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">{formatPrice(32250)}</div>
                          <div className="text-sm text-slate-600">Tarjeta</div>
                        </div>
                        <div className="text-center p-4 bg-purple-50 rounded-lg">
                          <div className="text-2xl font-bold text-purple-600">{formatPrice(0)}</div>
                          <div className="text-sm text-slate-600">Transferencia</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="tables" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Mesas Más Frecuentadas</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 flex items-center justify-center text-slate-500">
                        Gráfico de mesas más frecuentadas
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="inventory" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Inventario Utilizado</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 flex items-center justify-center text-slate-500">
                        Gráfico de inventario utilizado
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}

          {/* Kitchen */}
          {activeTab === "kitchen" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">Cocina</h1>
                <p className="text-slate-600">Gestiona los pedidos en preparación</p>
              </div>

              {/* Order Filters */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      placeholder="Buscar por ID o cliente..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <Select value={orderFilter} onChange={setOrderFilter}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Todos los estados" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los estados</SelectItem>
                    <SelectItem value="pending">Pendiente</SelectItem>
                    <SelectItem value="preparing">Preparando</SelectItem>
                    <SelectItem value="ready">Listo</SelectItem>
                    <SelectItem value="delivered">Entregado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Orders Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {orders
                  .filter(
                    (order) =>
                      (orderFilter === "all" || order.status === orderFilter) &&
                      (searchTerm === "" ||
                        order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        `ORD-${String(order.id).padStart(3, "0")}`.toLowerCase().includes(searchTerm.toLowerCase())),
                  )
                  .map((order) => (
                    <Card key={order.id} className="overflow-hidden">
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">ORD-{String(order.id).padStart(3, "0")}</CardTitle>
                            <p className="text-sm text-slate-600">
                              {order.tableNumber ? `Mesa ${order.tableNumber}` : "Para llevar"} • En restaurante
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-slate-400" />
                          <span className="text-sm">{order.customerName} (1 personas)</span>
                        </div>

                        <div className="text-2xl font-bold text-blue-900">{formatPrice(order.total)}</div>

                        <div
                          className={`px-3 py-1 rounded-full text-sm font-medium text-center ${
                            order.status === "preparing"
                              ? "bg-yellow-100 text-yellow-800"
                              : order.status === "delivered"
                                ? "bg-green-100 text-green-800"
                                : order.status === "ready"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-slate-100 text-slate-800"
                          }`}
                        >
                          {order.status === "preparing"
                            ? "En preparación"
                            : order.status === "delivered"
                              ? "Servido"
                              : order.status === "ready"
                                ? "Listo"
                                : order.status}
                        </div>

                        {order.status === "preparing" && order.items[0]?.startTime && (
                          <div className="text-center">
                            <p className="text-sm text-slate-600">Tiempo estimado:</p>
                            <p className="font-medium text-amber-600">
                              {Math.max(
                                0,
                                order.items[0].product.preparationTime - getElapsedTime(order.items[0].startTime),
                              )}{" "}
                              minutos
                            </p>
                          </div>
                        )}

                        <div className="text-xs text-slate-500">{order.items.length} ítems</div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          )}

          {/* Settings */}
          {activeTab === "settings" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">Configuración</h1>
                <p className="text-slate-600">Ajustes generales del restaurante</p>
              </div>

              <Tabs value={configTab} onValueChange={setConfigTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="general">General</TabsTrigger>
                  <TabsTrigger value="taxes">Impuestos</TabsTrigger>
                </TabsList>

                <TabsContent value="general" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Información del Restaurante</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="restaurantName">Nombre del Restaurante</Label>
                        <Input
                          id="restaurantName"
                          value={restaurantConfig.name}
                          onChange={(e) => setRestaurantConfig({ ...restaurantConfig, name: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="restaurantPhone">Teléfono</Label>
                        <Input
                          id="restaurantPhone"
                          value={restaurantConfig.phone}
                          onChange={(e) => setRestaurantConfig({ ...restaurantConfig, phone: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="restaurantEmail">Email</Label>
                        <Input
                          id="restaurantEmail"
                          type="email"
                          value={restaurantConfig.email}
                          onChange={(e) => setRestaurantConfig({ ...restaurantConfig, email: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="restaurantRUC">RUC</Label>
                        <Input
                          id="restaurantRUC"
                          value={restaurantConfig.ruc}
                          onChange={(e) => setRestaurantConfig({ ...restaurantConfig, ruc: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="restaurantAddress">Dirección</Label>
                        <Input
                          id="restaurantAddress"
                          value={restaurantConfig.address}
                          onChange={(e) => setRestaurantConfig({ ...restaurantConfig, address: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="restaurantServiceCharge">Cargo por Servicio (%)</Label>
                        <Input
                          id="restaurantServiceCharge"
                          type="number"
                          value={restaurantConfig.serviceCharge}
                          onChange={(e) =>
                            setRestaurantConfig({
                              ...restaurantConfig,
                              serviceCharge: Number.parseInt(e.target.value) || 0,
                            })
                          }
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="taxes" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Configuración de Impuestos</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="tax1Name">IVA General (19%)</Label>
                        <Input
                          id="tax1Name"
                          value={taxConfig.tax1.name}
                          onChange={(e) =>
                            setTaxConfig({
                              ...taxConfig,
                              tax1: { ...taxConfig.tax1, name: e.target.value },
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="tax2Name">IVA Reducido (8%)</Label>
                        <Input
                          id="tax2Name"
                          value={taxConfig.tax2.name}
                          onChange={(e) =>
                            setTaxConfig({
                              ...taxConfig,
                              tax2: { ...taxConfig.tax2, name: e.target.value },
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="tax3Name">Exento (0%)</Label>
                        <Input
                          id="tax3Name"
                          value={taxConfig.tax3.name}
                          onChange={(e) =>
                            setTaxConfig({
                              ...taxConfig,
                              tax3: { ...taxConfig.tax3, name: e.target.value },
                            })
                          }
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </main>
      </div>

      {/* Edit Table Modal */}
      {showTableEditModal && editingTable && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Editar Mesa</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="tableName">Nombre de la Mesa</Label>
                <Input
                  id="tableName"
                  value={editingTable.name}
                  onChange={(e) => setEditingTable({ ...editingTable, name: e.target.value })}
                  placeholder="Ej: Mesa 7"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="tableCapacity">Capacidad</Label>
                <Input
                  id="tableCapacity"
                  type="number"
                  value={editingTable.capacity}
                  onChange={(e) => setEditingTable({ ...editingTable, capacity: Number.parseInt(e.target.value) || 4 })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="tableLocation">Ubicación</Label>
                <Input
                  id="tableLocation"
                  value={editingTable.location}
                  onChange={(e) => setEditingTable({ ...editingTable, location: e.target.value })}
                  placeholder="Ej: Ventana, Centro, Terraza"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="tableStatus">Estado</Label>
                <Select
                  value={editingTable.status}
                  onValueChange={(value) => setEditingTable({ ...editingTable, status: value as Table["status"] })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Seleccionar estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">Disponible</SelectItem>
                    <SelectItem value="occupied">Ocupada</SelectItem>
                    <SelectItem value="reserved">Reservada</SelectItem>
                    <SelectItem value="cleaning">Limpieza</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2">
                <Button onClick={updateTable} className="flex-1 bg-blue-900 hover:bg-blue-800">
                  Guardar
                </Button>
                <Button variant="outline" onClick={() => setShowTableEditModal(false)} className="flex-1">
                  Cancelar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* View Order Modal */}
      {showOrderViewModal && viewingOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Pedido {viewingOrder.id}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Cliente</Label>
                <Input value={viewingOrder.customerName} disabled className="bg-slate-50" />
              </div>
              <div>
                <Label>Mesa</Label>
                <Input value={viewingOrder.tableNumber} disabled className="bg-slate-50" />
              </div>
              <div>
                <Label>Items</Label>
                <div className="space-y-2">
                  {viewingOrder.items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center p-2 bg-slate-50 rounded-lg">
                      <div>
                        {item.product.name} x {item.quantity}
                      </div>
                      <div>{formatPrice(item.product.price * item.quantity)}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <Label>Total</Label>
                <Input value={formatPrice(viewingOrder.total)} disabled className="bg-slate-50" />
              </div>
              <Button variant="outline" onClick={() => setShowOrderViewModal(false)}>
                Cerrar
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Edit Inventory Item Modal */}
      {showInventoryEditModal && editingInventoryItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Editar Item de Inventario</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="itemName">Nombre del Item</Label>
                <Input
                  id="itemName"
                  value={editingInventoryItem.name}
                  onChange={(e) => setEditingInventoryItem({ ...editingInventoryItem, name: e.target.value })}
                  placeholder="Ej: Harina de Trigo"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="itemDescription">Descripción</Label>
                <Textarea
                  id="itemDescription"
                  value={editingInventoryItem.description}
                  onChange={(e) => setEditingInventoryItem({ ...editingInventoryItem, description: e.target.value })}
                  placeholder="Descripción del item"
                  className="mt-1"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="currentStock">Stock Actual</Label>
                  <Input
                    id="currentStock"
                    type="number"
                    value={editingInventoryItem.currentStock}
                    onChange={(e) =>
                      setEditingInventoryItem({
                        ...editingInventoryItem,
                        currentStock: Number.parseInt(e.target.value) || 0,
                      })
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="unit">Unidad</Label>
                  <Select
                    value={editingInventoryItem.unit}
                    onChange={(value) => setEditingInventoryItem({ ...editingInventoryItem, unit: value })}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kg">kg</SelectItem>
                      <SelectItem value="g">g</SelectItem>
                      <SelectItem value="l">l</SelectItem>
                      <SelectItem value="ml">ml</SelectItem>
                      <SelectItem value="unidad">unidad</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="minStock">Stock Mínimo</Label>
                  <Input
                    id="minStock"
                    type="number"
                    value={editingInventoryItem.minStock}
                    onChange={(e) =>
                      setEditingInventoryItem({
                        ...editingInventoryItem,
                        minStock: Number.parseInt(e.target.value) || 0,
                      })
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="maxStock">Stock Máximo</Label>
                  <Input
                    id="maxStock"
                    type="number"
                    value={editingInventoryItem.maxStock}
                    onChange={(e) =>
                      setEditingInventoryItem({
                        ...editingInventoryItem,
                        maxStock: Number.parseInt(e.target.value) || 0,
                      })
                    }
                    className="mt-1"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="unitCost">Costo Unitario</Label>
                <Input
                  id="unitCost"
                  type="number"
                  value={editingInventoryItem.unitCost}
                  onChange={(e) =>
                    setEditingInventoryItem({ ...editingInventoryItem, unitCost: Number.parseInt(e.target.value) || 0 })
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="supplier">Proveedor</Label>
                <Input
                  id="supplier"
                  value={editingInventoryItem.supplier}
                  onChange={(e) => setEditingInventoryItem({ ...editingInventoryItem, supplier: e.target.value })}
                  placeholder="Nombre del proveedor"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="group">Grupo</Label>
                <Input
                  id="group"
                  value={editingInventoryItem.group}
                  onChange={(e) => setEditingInventoryItem({ ...editingInventoryItem, group: e.target.value })}
                  placeholder="Ej: Harinas, Lácteos, Verduras"
                  className="mt-1"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={updateInventoryItem} className="flex-1 bg-blue-900 hover:bg-blue-800">
                  Guardar
                </Button>
                <Button variant="outline" onClick={() => setShowInventoryEditModal(false)} className="flex-1">
                  Cancelar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
