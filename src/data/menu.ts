export type Category = 'bingsoo' | 'food' | 'drink'

export interface MenuItem {
  icon: string
  name: string
  says: string
  desc: string
  price: string
  fav?: boolean
  cat: Category
}

export const MENU: MenuItem[] = [
  // ---------- BINGSOO ----------
  {
    cat: 'bingsoo', icon: '🍓', name: 'Stralgi', says: '/ Strawberry', fav: true,
    desc: 'Bingsoo Korea lembut, stroberi segar, saus stroberi melimpah. Favorit semua orang.',
    price: 'Rp35.000',
  },
  {
    cat: 'bingsoo', icon: '🍵', name: 'Matcha', says: '/ Matcha',
    desc: 'Matcha asli ditabur almond di atas gunungan es yang lumer di mulut.',
    price: 'Rp35.000',
  },
  {
    cat: 'bingsoo', icon: '🍪', name: 'Biscoff', says: '/ Biscoff',
    desc: 'Krim biscoff karamel dengan remahan biskuit lotus. Manis yang pas.',
    price: 'Rp40.000',
  },
  {
    cat: 'bingsoo', icon: '🫐', name: 'Bleucurrent', says: '/ Blackcurrant',
    desc: 'Saus blackcurrant ungu yang asam-manis, super menyegarkan.',
    price: 'Rp35.000',
  },
  {
    cat: 'bingsoo', icon: '🍫', name: 'Chokollilst', says: '/ Cookies & Cream',
    desc: 'Cokelat lembut dengan cookies and cream yang renyah. Wajib coba.',
    price: 'Rp35.000',
  },
  // ---------- FOOD ----------
  {
    cat: 'food', icon: '🍗', name: 'Biteu Cikkin', says: '/ Spicy Chicken',
    desc: 'Ayam pedas lengkap dengan nasi dan salad. Berat tapi nagih.',
    price: 'Rp30.000',
  },
  {
    cat: 'food', icon: '🥩', name: 'Bifbluegogy', says: '/ Beef Bulgogi',
    desc: 'Beef bulgogi gurih khas Korea, disajikan dengan nasi hangat.',
    price: 'Rp30.000',
  },
  {
    cat: 'food', icon: '🔥', name: 'Hot Wigs', says: '/ Spicy Wings',
    desc: 'Sayap ayam saus pedas yang juicy. Cemilan paling laris.',
    price: 'Rp30.000',
  },
  {
    cat: 'food', icon: '🍯', name: 'Honey Wigs', says: '/ Honey Wings',
    desc: 'Sayap ayam saus madu — manis, lengket, bikin nambah.',
    price: 'Rp30.000',
  },
  {
    cat: 'food', icon: '🥟', name: 'Gyoza', says: '/ Dumpling',
    desc: 'Pangsit ayam panggang yang renyah di luar, juicy di dalam.',
    price: 'Rp25.000',
  },
  // ---------- DRINK ----------
  {
    cat: 'drink', icon: '🍹', name: 'Mojito', says: '/ Mango · Apple · Grape',
    desc: 'Minuman soda segar dengan pilihan rasa buah. Pelepas dahaga Bali.',
    price: 'Rp28.000',
  },
  {
    cat: 'drink', icon: '☕', name: 'Iced Coffee Latte', says: '/ Coffee',
    desc: 'Espresso dingin berlapis susu lembut. Teman kerja di kafe.',
    price: 'Rp28.000',
  },
  {
    cat: 'drink', icon: '🧋', name: 'Milky & Sweety', says: '/ Milk Series',
    desc: 'Susu segar dengan sentuhan manis. Pilihan favorit anak-anak.',
    price: 'Rp28.000',
  },
  {
    cat: 'drink', icon: '🍵', name: 'Tea', says: '/ Tea Series',
    desc: 'Teh segar berbagai varian, dingin maupun hangat.',
    price: 'Rp20.000',
  },
]
