export interface KasirProduct {
  id: string
  name: string
  says?: string
  price: number
  category: string
  subCategory?: string
  variants?: { label: string; price: number }[]
  icon: string
}

export interface CartItem {
  product: KasirProduct
  variantLabel?: string
  variantPrice?: number
  qty: number
  note?: string
}

export interface Transaction {
  id: string
  date: string // ISO
  items: CartItem[]
  subtotal: number
  discount: number
  tax: number
  total: number
  paymentMethod: 'cash' | 'qris' | 'transfer'
  cashPaid?: number
  cashChange?: number
  cashier: string
  tableNo?: string
  orderType: 'dine_in' | 'takeaway'
  receiptNo: string
}

export type KasirPage = 'pos' | 'history' | 'dashboard'
