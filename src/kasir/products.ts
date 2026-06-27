import { MENU } from '../data/menu'
import { parseRupiah } from './store'
import type { KasirProduct } from './types'

export const CATEGORY_LABELS: Record<string, string> = {
  all: 'Semua',
  bingsoo: 'Bingsoo',
  rice_bowl: 'Rice Bowl',
  bite: 'Bite',
  beverage: 'Minuman',
  toppings: 'Topping',
}

export const CATEGORY_ICONS: Record<string, string> = {
  all: '🍽️',
  bingsoo: '🍧',
  rice_bowl: '🍚',
  bite: '🍗',
  beverage: '🧋',
  toppings: '✨',
}

export const CATEGORIES = ['all', 'bingsoo', 'rice_bowl', 'bite', 'beverage', 'toppings']

export const PRODUCTS: KasirProduct[] = MENU.map((item, idx) => ({
  id: `${item.cat}-${idx}`,
  name: item.name,
  says: item.says,
  price: parseRupiah(item.price),
  category: item.cat,
  subCategory: item.sub,
  icon: item.icon,
  variants: item.variants?.map(v => ({
    label: v.label,
    price: parseRupiah(v.price),
  })),
}))
