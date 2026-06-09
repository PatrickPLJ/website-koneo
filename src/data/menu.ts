export type Category =
  | 'bingsoo'
  | 'rice_bowl'
  | 'bite'
  | 'coffee'
  | 'sweety'
  | 'tea'
  | 'milky'
  | 'mojito'
  | 'toppings'

export interface Variant {
  label: string
  price: string
}

export interface MenuItem {
  icon: string
  name: string
  says?: string
  desc?: string
  price: string
  variants?: Variant[]
  fav?: boolean
  cat: Category
}

export const MENU: MenuItem[] = [
  // ---------- BINGSOO ----------
  {
    cat: 'bingsoo', icon: '🤍', name: 'Orisinal', says: '/ Original',
    desc: 'Bingsoo polos lembut tanpa topping berlebih. Murni, bersih, menyegarkan.',
    price: 'Rp20.000',
    variants: [{ label: 'Lite', price: 'Rp20.000' }, { label: 'Regular', price: 'Rp25.000' }],
  },
  {
    cat: 'bingsoo', icon: '🍓', name: 'Stralgy', says: '/ Strawberry', fav: true,
    desc: 'Bingsoo Korea lembut, stroberi segar, saus stroberi melimpah. Favorit semua orang.',
    price: 'Rp25.000',
    variants: [{ label: 'Lite', price: 'Rp25.000' }, { label: 'Regular', price: 'Rp30.000' }],
  },
  {
    cat: 'bingsoo', icon: '🫐', name: 'Bleucurrent', says: '/ Blackcurrant',
    desc: 'Saus blackcurrant ungu yang asam-manis, super menyegarkan.',
    price: 'Rp25.000',
    variants: [{ label: 'Lite', price: 'Rp25.000' }, { label: 'Regular', price: 'Rp30.000' }],
  },
  {
    cat: 'bingsoo', icon: '🍪', name: 'Biscoff', says: '/ Biscoff',
    desc: 'Krim biscoff karamel dengan remahan biskuit lotus. Manis yang pas.',
    price: 'Rp25.000',
    variants: [{ label: 'Lite', price: 'Rp25.000' }, { label: 'Regular', price: 'Rp30.000' }],
  },
  {
    cat: 'bingsoo', icon: '🥭', name: 'Mango', says: '/ Mango',
    desc: 'Potongan mangga segar di atas bingsoo lembut. Manis tropis yang segar.',
    price: 'Rp25.000',
    variants: [{ label: 'Lite', price: 'Rp25.000' }, { label: 'Regular', price: 'Rp30.000' }],
  },
  {
    cat: 'bingsoo', icon: '☕', name: 'Tiramissu', says: '/ Tiramisu',
    desc: 'Krim tiramisu lembut dengan taburan cokelat di atas es yang dingin.',
    price: 'Rp25.000',
    variants: [{ label: 'Lite', price: 'Rp25.000' }, { label: 'Regular', price: 'Rp30.000' }],
  },
  {
    cat: 'bingsoo', icon: '🎨', name: 'Mix n Match', says: '/ Mix n Match',
    desc: 'Pilih topping favoritmu sendiri — bebas kombinasi sesuka hati.',
    price: 'Rp25.000',
    variants: [{ label: 'Lite', price: 'Rp25.000' }, { label: 'Regular', price: 'Rp30.000' }],
  },
  {
    cat: 'bingsoo', icon: '🍫', name: 'Chocollist', says: '/ Cookies & Cream',
    desc: 'Cokelat lembut dengan cookies and cream yang renyah. Wajib coba.',
    price: 'Rp25.000',
    variants: [{ label: 'Lite', price: 'Rp25.000' }, { label: 'Regular', price: 'Rp30.000' }],
  },
  {
    cat: 'bingsoo', icon: '🍦', name: 'Kukissnkrim', says: '/ Cookies n Cream',
    desc: 'Perpaduan kukis renyah dengan krim lembut di atas bingsoo segar.',
    price: 'Rp25.000',
    variants: [{ label: 'Lite', price: 'Rp25.000' }, { label: 'Regular', price: 'Rp30.000' }],
  },
  {
    cat: 'bingsoo', icon: '🍵', name: 'Matcha', says: '/ Matcha',
    desc: 'Matcha asli ditabur almond di atas gunungan es yang lumer di mulut.',
    price: 'Rp25.000',
    variants: [{ label: 'Lite', price: 'Rp25.000' }, { label: 'Regular', price: 'Rp30.000' }],
  },

  // ---------- RICE BOWL ----------
  {
    cat: 'rice_bowl', icon: '🍗', name: 'Katsui Cikkin', says: '/ Katsu Chicken',
    desc: 'Ayam katsu renyah dengan saus khas di atas nasi hangat.',
    price: 'Rp30.000',
  },
  {
    cat: 'rice_bowl', icon: '🍛', name: 'Katsui Kari', says: '/ Katsu Curry',
    desc: 'Ayam katsu dengan kuah kari gurih. Hangat dan mengenyangkan.',
    price: 'Rp35.000',
  },
  {
    cat: 'rice_bowl', icon: '🥚', name: 'Katsui Mentai', says: '/ Katsu Mentai',
    desc: 'Ayam katsu dengan saus mentai creamy yang kaya rasa.',
    price: 'Rp35.000',
  },
  {
    cat: 'rice_bowl', icon: '🌶️', name: 'Bitteu Cikkin', says: '/ Spicy Chicken',
    desc: 'Ayam pedas lengkap dengan nasi dan salad. Berat tapi nagih.',
    price: 'Rp30.000',
  },
  {
    cat: 'rice_bowl', icon: '🍄', name: 'Bitteu Truffle', says: '/ Truffle Chicken',
    desc: 'Ayam dengan aroma truffle mewah di atas nasi pulen.',
    price: 'Rp35.000',
  },
  {
    cat: 'rice_bowl', icon: '🥩', name: 'Bifbluegogy', says: '/ Beef Bulgogi',
    desc: 'Beef bulgogi gurih khas Korea, disajikan dengan nasi hangat.',
    price: 'Rp40.000',
  },

  // ---------- BITE ----------
  {
    cat: 'bite', icon: '🔥', name: 'Wigs Hot', says: '/ Spicy Wings',
    desc: 'Sayap ayam saus pedas yang juicy. Cemilan paling laris.',
    price: 'Rp28.000',
  },
  {
    cat: 'bite', icon: '🍯', name: 'Wigs Honey', says: '/ Honey Wings',
    desc: 'Sayap ayam saus madu — manis, lengket, bikin nambah.',
    price: 'Rp28.000',
  },
  {
    cat: 'bite', icon: '🧀', name: 'Wigs Cheese', says: '/ Cheese Wings',
    desc: 'Sayap ayam berlumur saus keju creamy yang melimpah.',
    price: 'Rp28.000',
  },
  {
    cat: 'bite', icon: '🥞', name: 'Hotteok', says: '/ Korean Pancake',
    desc: 'Pancake Korea isi gula merah dan kacang, crispy di luar lembut di dalam.',
    price: 'Rp25.000',
  },
  {
    cat: 'bite', icon: '🍟', name: 'Truffle Gamja', says: '/ Truffle Fries',
    desc: 'Kentang goreng renyah dengan aroma truffle yang harum.',
    price: 'Rp28.000',
  },
  {
    cat: 'bite', icon: '🥟', name: 'Gyoza', says: '/ Dumpling',
    desc: 'Pangsit ayam panggang yang renyah di luar, juicy di dalam.',
    price: 'Rp25.000',
  },
  {
    cat: 'bite', icon: '🧀', name: 'Gyoza Cheese', says: '/ Cheese Dumpling',
    desc: 'Gyoza isi ayam dengan lelehan keju yang creamy.',
    price: 'Rp28.000',
  },
  {
    cat: 'bite', icon: '🥚', name: 'Gyoza Mentai', says: '/ Mentai Dumpling',
    desc: 'Gyoza dengan saus mentai yang kaya dan gurih.',
    price: 'Rp28.000',
  },
  {
    cat: 'bite', icon: '🫐', name: 'Dimsum', says: '/ Dimsum',
    desc: 'Dimsum kukus lembut dengan isian ayam pilihan.',
    price: 'Rp25.000',
  },
  {
    cat: 'bite', icon: '✨', name: 'Dimsum Mentai', says: '/ Mentai Dimsum',
    desc: 'Dimsum spesial dengan topping saus mentai creamy.',
    price: 'Rp28.000',
  },
  {
    cat: 'bite', icon: '🧆', name: 'Cheeseball', says: '/ Cheese Ball',
    desc: 'Bola keju goreng yang meleleh di dalam. Snack favorit!',
    price: 'Rp28.000',
  },
  {
    cat: 'bite', icon: '🍗', name: 'Chicken Bite', says: '/ Chicken Bite',
    desc: 'Gigitan ayam crispy yang renyah dan gurih.',
    price: 'Rp28.000',
  },
  {
    cat: 'bite', icon: '🍗', name: 'K.F.C', says: '/ Korean Fried Chicken',
    desc: 'Korean Fried Chicken renyah dengan saus khas Koneo.',
    price: 'Rp28.000',
  },

  // ---------- COFFEE ----------
  {
    cat: 'coffee', icon: '☕', name: 'Americano', says: '/ Black Coffee',
    desc: 'Espresso murni yang bold dan segar.',
    price: 'Rp20.000',
  },
  {
    cat: 'coffee', icon: '☕', name: 'Latte', says: '/ Milk Coffee',
    desc: 'Espresso lembut dengan susu steamed yang creamy.',
    price: 'Rp25.000',
  },
  {
    cat: 'coffee', icon: '🍬', name: 'Brown Sugar', says: '/ Brown Sugar Latte',
    desc: 'Latte dengan sirup gula merah yang karamel dan manis.',
    price: 'Rp25.000',
  },
  {
    cat: 'coffee', icon: '🍯', name: 'Honicano', says: '/ Honey Americano',
    desc: 'Americano dengan sentuhan madu alami yang menyegarkan.',
    price: 'Rp28.000',
  },
  {
    cat: 'coffee', icon: '🫐', name: 'Bericano', says: '/ Berry Americano',
    desc: 'Americano dengan saus berry segar yang unik dan asam-manis.',
    price: 'Rp28.000',
  },
  {
    cat: 'coffee', icon: '🧊', name: 'Cold Brew', says: '/ Cold Brew',
    desc: 'Kopi cold brew yang diseduh 12 jam. Smooth dan pekat.',
    price: 'Rp20.000',
  },
  {
    cat: 'coffee', icon: '🌰', name: 'Month Blanc', says: '/ Mont Blanc Latte',
    desc: 'Latte dengan krim chestnut manis ala pastry Prancis.',
    price: 'Rp30.000',
  },
  {
    cat: 'coffee', icon: '🍵', name: 'Dirty Matcha', says: '/ Dirty Matcha',
    desc: 'Espresso shot di atas matcha latte — pahit dan harum.',
    price: 'Rp28.000',
  },

  // ---------- SWEETY ----------
  {
    cat: 'sweety', icon: '❤️', name: 'Red Velvet', says: '/ Red Velvet',
    desc: 'Minuman creamy dengan rasa red velvet yang mewah.',
    price: 'Rp25.000',
  },
  {
    cat: 'sweety', icon: '🍫', name: 'Chocolatte', says: '/ Chocolate Latte',
    desc: 'Latte cokelat lembut yang kaya rasa dan menghangatkan.',
    price: 'Rp25.000',
  },
  {
    cat: 'sweety', icon: '🟣', name: 'Taro', says: '/ Taro',
    desc: 'Minuman taro ungu yang creamy dan manis alami.',
    price: 'Rp25.000',
  },
  {
    cat: 'sweety', icon: '🍵', name: 'Strawberry Matcha', says: '/ Strawberry Matcha',
    desc: 'Matcha segar dipadukan dengan stroberi — manis seimbang.',
    price: 'Rp28.000',
  },

  // ---------- TEA ----------
  {
    cat: 'tea', icon: '🍵', name: 'Orisinal Tea', says: '/ Original Tea',
    desc: 'Teh tawar segar, murni tanpa tambahan rasa.',
    price: 'Rp20.000',
  },
  {
    cat: 'tea', icon: '🍈', name: 'Lychee Tea', says: '/ Lychee Tea',
    desc: 'Teh dengan aroma lychee yang harum dan menyegarkan.',
    price: 'Rp25.000',
  },
  {
    cat: 'tea', icon: '🍋', name: 'Lemon Tea', says: '/ Lemon Tea',
    desc: 'Teh lemon asam-segar yang cocok untuk cuaca panas Bali.',
    price: 'Rp25.000',
  },
  {
    cat: 'tea', icon: '🥭', name: 'Manggo Tea', says: '/ Mango Tea',
    desc: 'Teh dengan rasa mangga manis tropis yang segar.',
    price: 'Rp25.000',
  },
  {
    cat: 'tea', icon: '🧋', name: 'Milk Tea', says: '/ Milk Tea',
    desc: 'Teh susu klasik yang creamy dan menenangkan.',
    price: 'Rp28.000',
  },

  // ---------- MILKY ----------
  {
    cat: 'milky', icon: '🍓', name: 'Strawberry Milk', says: '/ Strawberry',
    desc: 'Susu segar dengan rasa stroberi yang manis dan lembut.',
    price: 'Rp25.000',
  },
  {
    cat: 'milky', icon: '🥭', name: 'Manggo Milk', says: '/ Mango',
    desc: 'Susu mangga tropis yang manis dan menyegarkan.',
    price: 'Rp25.000',
  },

  // ---------- MOJITO ----------
  {
    cat: 'mojito', icon: '🍎', name: 'Apple Mojito', says: '/ Apple',
    desc: 'Mojito soda segar dengan rasa apel yang ringan.',
    price: 'Rp25.000',
  },
  {
    cat: 'mojito', icon: '🥭', name: 'Manggo Mojito', says: '/ Mango',
    desc: 'Mojito mangga tropis — segar dan bikin semangat.',
    price: 'Rp25.000',
  },
  {
    cat: 'mojito', icon: '🍇', name: 'Grape Mojito', says: '/ Grape',
    desc: 'Mojito anggur ungu dengan rasa asam-manis yang unik.',
    price: 'Rp25.000',
  },
  {
    cat: 'mojito', icon: '🍓', name: 'Strawberry Mojito', says: '/ Strawberry',
    desc: 'Mojito stroberi segar yang melepas dahaga di Bali.',
    price: 'Rp25.000',
  },
  {
    cat: 'mojito', icon: '🍈', name: 'Lychee Mojito', says: '/ Lychee',
    desc: 'Mojito lychee harum yang ringan dan menyegarkan.',
    price: 'Rp25.000',
  },

  // ---------- TOPPINGS ----------
  { cat: 'toppings', icon: '🍓', name: 'Strawberry Fruits', price: 'Rp5.000' },
  { cat: 'toppings', icon: '🥭', name: 'Manggo Fruits', price: 'Rp5.000' },
  { cat: 'toppings', icon: '🌈', name: 'Fruit Loops', price: 'Rp5.000' },
  { cat: 'toppings', icon: '🍓', name: 'Strawberry Jam', price: 'Rp5.000' },
  { cat: 'toppings', icon: '🥭', name: 'Manggo Jam', price: 'Rp5.000' },
  { cat: 'toppings', icon: '🫐', name: 'Blueberry Jam', price: 'Rp5.000' },
  { cat: 'toppings', icon: '🍫', name: 'Choco Jam', price: 'Rp5.000' },
  { cat: 'toppings', icon: '🌰', name: 'Almond', price: 'Rp5.000' },
  { cat: 'toppings', icon: '🥜', name: 'Peanut', price: 'Rp5.000' },
  { cat: 'toppings', icon: '🖤', name: 'Oreo', price: 'Rp5.000' },
  { cat: 'toppings', icon: '🍪', name: 'Oreo Crumb', price: 'Rp5.000' },
  { cat: 'toppings', icon: '🍪', name: 'Biscoff', price: 'Rp5.000' },
  { cat: 'toppings', icon: '🍘', name: 'Regal Crumb', price: 'Rp5.000' },
  { cat: 'toppings', icon: '🤍', name: 'Nata de Coco', price: 'Rp5.000' },
  { cat: 'toppings', icon: '🍮', name: 'Caramel Crumb', price: 'Rp5.000' },
  { cat: 'toppings', icon: '🫧', name: 'Fruits Popping', price: 'Rp5.000' },
]
