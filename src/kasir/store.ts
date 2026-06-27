import type { Transaction } from './types'

const TXN_KEY = 'koneo_transactions'
const PIN_KEY = 'koneo_kasir_pin'
const CASHIER_KEY = 'koneo_cashier_name'

export function getPin(): string {
  return localStorage.getItem(PIN_KEY) ?? '1234'
}
export function setPin(pin: string) {
  localStorage.setItem(PIN_KEY, pin)
}

export function getCashierName(): string {
  return localStorage.getItem(CASHIER_KEY) ?? 'Kasir'
}
export function setCashierName(name: string) {
  localStorage.setItem(CASHIER_KEY, name)
}

export function getTransactions(): Transaction[] {
  try {
    return JSON.parse(localStorage.getItem(TXN_KEY) ?? '[]')
  } catch {
    return []
  }
}

export function saveTransaction(txn: Transaction) {
  const list = getTransactions()
  list.unshift(txn)
  localStorage.setItem(TXN_KEY, JSON.stringify(list))
}

export function generateReceiptNo(): string {
  const today = new Date()
  const prefix = `KNO${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}`
  const existing = getTransactions().filter(t => t.receiptNo.startsWith(prefix))
  const seq = String(existing.length + 1).padStart(4, '0')
  return `${prefix}-${seq}`
}

export function formatRupiah(amount: number): string {
  return 'Rp' + amount.toLocaleString('id-ID')
}

export function parseRupiah(str: string): number {
  return parseInt(str.replace(/[^\d]/g, ''), 10) || 0
}
