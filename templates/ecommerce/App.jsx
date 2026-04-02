import { useState, useEffect, useCallback } from 'react'
import {
  ShoppingBag, Search, ShoppingCart, User, ChevronRight, Star,
  Truck, Shield, RefreshCw, Headphones, Clock, Zap, Heart,
  Smartphone, Shirt, Home, Dumbbell, Sparkles, Car, BookOpen,
  Apple, Package, MapPin, Store, ChevronDown, ArrowRight,
  Monitor, Gamepad2, Baby, Leaf, X, Plus, Minus, Trash2, Check,
  ChevronLeft, Filter, SlidersHorizontal, Eye, LogOut, Settings, UserCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ThemeSwitcher } from '@/components/shared/ThemeSwitcher'
import { useAuth } from '@/context/AuthContext'

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const categories = [
  { name: 'All', icon: ShoppingBag, items: '100K+' },
  { name: 'Electronics', icon: Smartphone, items: '24K' },
  { name: 'Fashion', icon: Shirt, items: '18K' },
  { name: 'Home & Garden', icon: Home, items: '12K' },
  { name: 'Sports', icon: Dumbbell, items: '8K' },
  { name: 'Beauty', icon: Sparkles, items: '15K' },
  { name: 'Toys', icon: Gamepad2, items: '6K' },
  { name: 'Automotive', icon: Car, items: '5K' },
  { name: 'Books', icon: BookOpen, items: '9K' },
  { name: 'Health', icon: Apple, items: '11K' },
  { name: 'Groceries', icon: Leaf, items: '7K' },
]

/* flashDeals and featuredProducts are now fetched from the API */

const topSellers = [
  { name: 'TechZone', rating: 4.9, products: 1240, avatar: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop' },
  { name: 'FashionHub', rating: 4.8, products: 3420, avatar: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&h=100&fit=crop' },
  { name: 'HomeStyle', rating: 4.7, products: 890, avatar: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=100&h=100&fit=crop' },
  { name: 'SportsPro', rating: 4.8, products: 675, avatar: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=100&h=100&fit=crop' },
  { name: 'BeautyBox', rating: 4.9, products: 2100, avatar: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=100&h=100&fit=crop' },
  { name: 'BookWorld', rating: 4.6, products: 5600, avatar: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=100&h=100&fit=crop' },
]

const recentlyViewed = [
  { id: 'rv1', name: 'USB-C Hub 7-in-1', price: 35.99, image: 'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=300&h=300&fit=crop' },
  { id: 'rv2', name: 'Linen Throw Pillow', price: 22.00, image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=300&h=300&fit=crop' },
  { id: 'rv3', name: 'Running Shorts', price: 28.99, image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=300&h=300&fit=crop' },
  { id: 'rv4', name: 'Face Moisturizer', price: 15.50, image: 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=300&h=300&fit=crop' },
  { id: 'rv5', name: 'Notebook Journal', price: 12.99, image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=300&h=300&fit=crop' },
  { id: 'rv6', name: 'Sunglasses Polarized', price: 39.99, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&h=300&fit=crop' },
]

/* ------------------------------------------------------------------ */
/*  HELPER: Star Rating                                                */
/* ------------------------------------------------------------------ */

function StarRating({ rating, size = 'sm' }) {
  const full = Math.floor(rating)
  const half = rating % 1 >= 0.5
  const iconSize = size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4'
  return (
    <span className="inline-flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`${iconSize} ${i < full ? 'fill-amber-400 text-amber-400' : i === full && half ? 'fill-amber-400/50 text-amber-400' : 'text-gray-300 dark:text-gray-600'}`}
        />
      ))}
    </span>
  )
}

/* ------------------------------------------------------------------ */
/*  HELPER: Countdown Timer                                            */
/* ------------------------------------------------------------------ */

function useCountdown() {
  const [time, setTime] = useState({ hours: 5, minutes: 23, seconds: 41 })

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => {
        let { hours, minutes, seconds } = prev
        seconds--
        if (seconds < 0) { seconds = 59; minutes-- }
        if (minutes < 0) { minutes = 59; hours-- }
        if (hours < 0) { hours = 23; minutes = 59; seconds = 59 }
        return { hours, minutes, seconds }
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return time
}

/* ------------------------------------------------------------------ */
/*  COMPONENT: Product Detail Modal                                    */
/* ------------------------------------------------------------------ */

function ProductModal({ product, onClose, onAddToCart, isInWishlist, onToggleWishlist }) {
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('description')
  const [addedToCart, setAddedToCart] = useState(false)

  if (!product) return null

  const handleAddToCart = () => {
    onAddToCart(product, quantity)
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'specs', label: 'Specifications' },
    { id: 'reviews', label: `Reviews (${product.reviews?.toLocaleString() || 0})` },
    { id: 'shipping', label: 'Shipping' },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative bg-white dark:bg-gray-900 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid md:grid-cols-2 gap-0">
          {/* Image */}
          <div className="relative aspect-square bg-gray-100 dark:bg-gray-800 rounded-tl-2xl md:rounded-bl-2xl overflow-hidden">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            {product.discount && (
              <Badge className="absolute top-4 left-4 bg-red-500 text-white border-0 text-sm font-bold px-3 py-1">
                -{product.discount}% OFF
              </Badge>
            )}
            {product.freeShipping && (
              <Badge className="absolute top-4 left-4 bg-green-500 text-white border-0 text-sm px-3 py-1">
                <Truck className="h-3.5 w-3.5 mr-1" /> Free Shipping
              </Badge>
            )}
          </div>

          {/* Details */}
          <div className="p-6 flex flex-col">
            {product.category && (
              <span className="text-xs font-medium text-orange-500 uppercase tracking-wider">{product.category}</span>
            )}
            <h2 className="text-xl font-bold mt-1">{product.name}</h2>

            <div className="flex items-center gap-2 mt-2">
              <StarRating rating={product.rating} size="md" />
              <span className="text-sm text-gray-500">({product.reviews?.toLocaleString() || product.sold?.toLocaleString() || 0})</span>
            </div>

            <div className="flex items-baseline gap-3 mt-4">
              <span className="text-3xl font-bold text-orange-500">${product.price.toFixed(2)}</span>
              {product.original && (
                <span className="text-lg text-gray-400 line-through">${product.original.toFixed(2)}</span>
              )}
            </div>

            {product.seller && (
              <div className="flex items-center gap-2 mt-3 text-sm text-gray-500 dark:text-gray-400">
                <Store className="h-4 w-4" />
                <span>{product.seller}</span>
                <span className="mx-1">·</span>
                <MapPin className="h-4 w-4" />
                <span>{product.location}</span>
              </div>
            )}

            {/* Quantity */}
            <div className="flex items-center gap-3 mt-6">
              <span className="text-sm font-medium">Qty:</span>
              <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-lg">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-l-lg transition-colors"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-4 py-2 text-sm font-medium min-w-[40px] text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => Math.min(10, q + 1))}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-r-lg transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-6">
              <Button
                onClick={handleAddToCart}
                className={`flex-1 h-12 text-base font-semibold transition-all ${addedToCart ? 'bg-green-500 hover:bg-green-600' : 'bg-orange-500 hover:bg-orange-600'} text-white`}
              >
                {addedToCart ? (
                  <><Check className="h-5 w-5 mr-2" /> Added!</>
                ) : (
                  <><ShoppingCart className="h-5 w-5 mr-2" /> Add to Cart</>
                )}
              </Button>
              <Button
                variant="outline"
                onClick={() => onToggleWishlist(product.id)}
                className={`h-12 px-4 ${isInWishlist ? 'border-red-300 text-red-500' : ''}`}
              >
                <Heart className={`h-5 w-5 ${isInWishlist ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
            </div>

            {/* Tabs */}
            <div className="mt-6 border-t border-gray-200 dark:border-gray-800 pt-4">
              <div className="flex gap-1 border-b border-gray-200 dark:border-gray-800">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'border-orange-500 text-orange-500'
                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              <div className="mt-4 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {activeTab === 'description' && (
                  <p>{product.description || 'High-quality product with premium materials. Designed for everyday use with lasting durability.'}</p>
                )}
                {activeTab === 'specs' && (
                  <ul className="space-y-2">
                    <li className="flex justify-between py-1 border-b border-gray-100 dark:border-gray-800"><span className="font-medium text-gray-700 dark:text-gray-300">Brand</span><span>{product.seller || 'ShopVerse'}</span></li>
                    <li className="flex justify-between py-1 border-b border-gray-100 dark:border-gray-800"><span className="font-medium text-gray-700 dark:text-gray-300">Category</span><span>{product.category}</span></li>
                    <li className="flex justify-between py-1 border-b border-gray-100 dark:border-gray-800"><span className="font-medium text-gray-700 dark:text-gray-300">Rating</span><span>{product.rating}/5</span></li>
                    <li className="flex justify-between py-1"><span className="font-medium text-gray-700 dark:text-gray-300">Condition</span><span>New</span></li>
                  </ul>
                )}
                {activeTab === 'reviews' && (
                  <div className="space-y-4">
                    {[5, 4, 3].map(stars => (
                      <div key={stars} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                        <div className="h-8 w-8 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center text-sm font-bold text-orange-600 shrink-0">
                          {String.fromCharCode(64 + (6 - stars))}
                        </div>
                        <div>
                          <StarRating rating={stars} />
                          <p className="text-sm mt-1">{stars === 5 ? 'Excellent product! Exceeded my expectations.' : stars === 4 ? 'Great quality for the price. Would buy again.' : 'Good product but shipping took a while.'}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {activeTab === 'shipping' && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3"><Truck className="h-5 w-5 text-green-500 shrink-0" /><div><p className="font-medium text-gray-700 dark:text-gray-300">{product.freeShipping ? 'Free Standard Shipping' : 'Standard Shipping - $4.99'}</p><p className="text-xs">Delivery in 5-7 business days</p></div></div>
                    <div className="flex items-center gap-3"><Zap className="h-5 w-5 text-orange-500 shrink-0" /><div><p className="font-medium text-gray-700 dark:text-gray-300">Express Shipping - $12.99</p><p className="text-xs">Delivery in 1-2 business days</p></div></div>
                    <div className="flex items-center gap-3"><RefreshCw className="h-5 w-5 text-blue-500 shrink-0" /><div><p className="font-medium text-gray-700 dark:text-gray-300">30-Day Free Returns</p><p className="text-xs">No questions asked return policy</p></div></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  COMPONENT: Cart Drawer                                             */
/* ------------------------------------------------------------------ */

function CartDrawer({ isOpen, onClose, items, onUpdateQty, onRemove, onCheckout, checkingOut }) {
  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        className="absolute right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-900 shadow-2xl flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" /> Cart ({items.length})
          </h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingCart className="h-16 w-16 mx-auto text-gray-300 dark:text-gray-700 mb-4" />
              <p className="text-gray-500">Your cart is empty</p>
              <Button onClick={onClose} className="mt-4 bg-orange-500 hover:bg-orange-600 text-white">
                Continue Shopping
              </Button>
            </div>
          ) : (
            items.map((item, idx) => (
              <div key={idx} className="flex gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                <img src={item.image} alt={item.name} className="h-20 w-20 rounded-lg object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium line-clamp-2">{item.name}</h3>
                  <p className="text-orange-500 font-bold mt-1">${item.price.toFixed(2)}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-lg">
                      <button onClick={() => onUpdateQty(idx, item.qty - 1)} className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-l-lg">
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="px-3 text-xs font-medium">{item.qty}</span>
                      <button onClick={() => onUpdateQty(idx, item.qty + 1)} className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-r-lg">
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <button onClick={() => onRemove(idx)} className="p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-950 rounded-lg transition-colors ml-auto">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-gray-200 dark:border-gray-800 p-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Subtotal</span>
              <span className="font-medium">${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Shipping</span>
              <span className="font-medium text-green-500">{total >= 50 ? 'Free' : '$4.99'}</span>
            </div>
            <div className="flex justify-between text-base font-bold border-t border-gray-200 dark:border-gray-800 pt-3">
              <span>Total</span>
              <span className="text-orange-500">${(total + (total >= 50 ? 0 : 4.99)).toFixed(2)}</span>
            </div>
            <Button
              onClick={onCheckout}
              disabled={checkingOut}
              className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white font-bold text-base disabled:opacity-50"
            >
              {checkingOut ? 'Processing...' : 'Checkout'}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  MAIN COMPONENT                                                     */
/* ------------------------------------------------------------------ */

export default function EcommerceMarketplace({ onNavigate }) {
  const { user, isAuthenticated, logout } = useAuth()
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [cartItems, setCartItems] = useState([])
  const [activeBanner, setActiveBanner] = useState(0)
  const [hoveredProduct, setHoveredProduct] = useState(null)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [wishlist, setWishlist] = useState(new Set())
  const [cartOpen, setCartOpen] = useState(false)
  const [sortBy, setSortBy] = useState('recommended')
  const [notification, setNotification] = useState(null)
  const [products, setProducts] = useState([])
  const [projectId, setProjectId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [checkingOut, setCheckingOut] = useState(false)
  const countdown = useCountdown()

  // Map API product to template format
  const mapProduct = (p) => ({
    id: p.id,
    name: p.name,
    price: parseFloat(p.price),
    original: p.compare_at_price ? parseFloat(p.compare_at_price) : null,
    discount: p.discount_percent || 0,
    rating: p.rating || 0,
    reviews: p.reviews_count || 0,
    sold: p.sold_count || 0,
    seller: p.seller?.name || 'VA Store',
    location: p.seller?.location || '',
    freeShipping: p.free_shipping || false,
    category: p.category?.name || 'General',
    image: p.featured_image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
    description: p.description || '',
  })

  // Fetch products from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('va-access-token')
        const headers = token ? { Authorization: `Bearer ${token}` } : {}

        // Get ecommerce project
        const projRes = await fetch('/api/v1/projects/public', { headers })
        const projData = await projRes.json()
        const projects = projData.items || projData || []
        const ecomProject = projects.find(p => p.template_type === 'ecommerce')
        if (!ecomProject) { setLoading(false); return }
        setProjectId(ecomProject.id)

        // Get products (public endpoint)
        const prodRes = await fetch(`/api/v1/ecommerce/projects/${ecomProject.id}/products/public`)
        const prodData = await prodRes.json()
        setProducts(prodData.items || prodData || [])
      } catch (err) {
        console.error('Failed to fetch products:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  // Derive mapped product arrays from API data
  const mappedProducts = products.map(mapProduct)
  const featuredProducts = mappedProducts
  const flashDeals = mappedProducts.filter(p => p.discount > 0).slice(0, 6)

  // Fetch cart from API
  const fetchCart = useCallback(async () => {
    if (!isAuthenticated || !projectId) return
    try {
      const token = localStorage.getItem('va-access-token')
      const res = await fetch(`/api/v1/ecommerce/projects/${projectId}/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.ok) {
        const data = await res.json()
        const items = (data.items || []).map(item => ({
          id: item.id,
          product_id: item.product_id,
          name: item.product?.name || 'Product',
          price: parseFloat(item.unit_price),
          image: item.product?.featured_image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
          qty: item.quantity,
        }))
        setCartItems(items)
      }
    } catch (err) {
      console.error('Fetch cart failed:', err)
    }
  }, [isAuthenticated, projectId])

  // Load cart when projectId is available and user is authenticated
  useEffect(() => {
    fetchCart()
  }, [fetchCart])

  // Auto-rotate banner
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBanner(prev => (prev + 1) % 3)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const banners = [
    { title: 'Mega Sale', subtitle: 'Up to 70% Off Electronics', cta: 'Shop Now', gradient: 'from-orange-500 via-amber-500 to-yellow-400', image: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=800&h=400&fit=crop' },
    { title: 'Fashion Week', subtitle: 'Trending Styles at Unbeatable Prices', cta: 'Explore', gradient: 'from-pink-500 via-rose-500 to-red-400', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=400&fit=crop' },
    { title: 'Home Refresh', subtitle: 'Transform Your Space for Less', cta: 'Discover', gradient: 'from-teal-500 via-emerald-500 to-green-400', image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=800&h=400&fit=crop' },
  ]

  const showNotification = useCallback((msg) => {
    setNotification(msg)
    setTimeout(() => setNotification(null), 2500)
  }, [])

  const handleAddToCart = useCallback(async (product, qty = 1) => {
    if (!isAuthenticated) {
      onNavigate && onNavigate('login')
      return
    }
    if (!projectId) return

    try {
      const token = localStorage.getItem('va-access-token')
      const res = await fetch(`/api/v1/ecommerce/projects/${projectId}/cart/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ product_id: product.id, quantity: qty }),
      })
      if (res.ok) {
        await fetchCart()
        showNotification(`${product.name} added to cart!`)
      }
    } catch (err) {
      console.error('Add to cart failed:', err)
    }
  }, [isAuthenticated, projectId, onNavigate, showNotification, fetchCart])

  const handleUpdateCartQty = useCallback(async (idx, newQty) => {
    if (newQty < 1) return
    const item = cartItems[idx]
    if (!item || !projectId) return

    try {
      const token = localStorage.getItem('va-access-token')
      const res = await fetch(`/api/v1/ecommerce/projects/${projectId}/cart/items/${item.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ quantity: newQty }),
      })
      if (res.ok) {
        await fetchCart()
      }
    } catch (err) {
      console.error('Update cart failed:', err)
    }
  }, [cartItems, projectId, fetchCart])

  const handleRemoveFromCart = useCallback(async (idx) => {
    const item = cartItems[idx]
    if (!item || !projectId) return

    try {
      const token = localStorage.getItem('va-access-token')
      const res = await fetch(`/api/v1/ecommerce/projects/${projectId}/cart/items/${item.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.ok) {
        await fetchCart()
      }
    } catch (err) {
      console.error('Remove from cart failed:', err)
    }
  }, [cartItems, projectId, fetchCart])

  const handleCheckout = useCallback(async () => {
    if (!isAuthenticated || !projectId) return
    setCheckingOut(true)
    try {
      const token = localStorage.getItem('va-access-token')
      const res = await fetch(`/api/v1/ecommerce/projects/${projectId}/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ customer_email: user?.email }),
      })
      if (res.ok) {
        setCartItems([])
        setCartOpen(false)
        showNotification('Order placed!')
      }
    } catch (err) {
      console.error('Checkout failed:', err)
    } finally {
      setCheckingOut(false)
    }
  }, [isAuthenticated, projectId, user, showNotification])

  const toggleWishlist = useCallback((productId) => {
    setWishlist(prev => {
      const next = new Set(prev)
      if (next.has(productId)) {
        next.delete(productId)
        showNotification('Removed from wishlist')
      } else {
        next.add(productId)
        showNotification('Added to wishlist!')
      }
      return next
    })
  }, [showNotification])

  // Filter products
  const filteredProducts = featuredProducts.filter(p => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory
    const matchesSearch = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price
    if (sortBy === 'price-high') return b.price - a.price
    if (sortBy === 'rating') return b.rating - a.rating
    if (sortBy === 'reviews') return b.reviews - a.reviews
    return 0
  })

  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 z-[70] bg-white/80 dark:bg-gray-950/80 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="h-10 w-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm text-gray-500 font-medium">Loading products...</span>
          </div>
        </div>
      )}

      {/* Notification Toast */}
      {notification && (
        <div className="fixed top-4 right-4 z-[60] bg-green-500 text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-in slide-in-from-right">
          <Check className="h-4 w-4" />
          <span className="text-sm font-medium">{notification}</span>
        </div>
      )}

      {/* ============================================================ */}
      {/*  PROMO BANNER                                                 */}
      {/* ============================================================ */}
      <div className="bg-orange-500 dark:bg-orange-600 text-white text-center text-sm py-1.5 px-4 font-medium cursor-pointer hover:bg-orange-600 dark:hover:bg-orange-700 transition-colors">
        Free shipping on orders over $50 &nbsp;|&nbsp; New user? Get 15% off with code <span className="font-bold">WELCOME15</span>
      </div>

      {/* ============================================================ */}
      {/*  TOP BAR / HEADER                                             */}
      {/* ============================================================ */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
          {/* Logo */}
          <button onClick={() => { setActiveCategory('All'); setSearchQuery('') }} className="flex items-center gap-2 shrink-0 hover:opacity-80 transition-opacity">
            <ShoppingBag className="h-7 w-7 text-orange-500" />
            <span className="text-xl font-bold tracking-tight">Shop<span className="text-orange-500">Verse</span></span>
          </button>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-auto flex">
            <div className="relative flex w-full">
              <select
                className="h-10 rounded-l-lg border border-r-0 border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm px-3 pr-8 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={activeCategory}
                onChange={e => setActiveCategory(e.target.value)}
              >
                {categories.map(c => (
                  <option key={c.name} value={c.name}>{c.name}</option>
                ))}
              </select>
              <Input
                placeholder="Search for products, brands, and more..."
                className="rounded-none border-gray-300 dark:border-gray-700 h-10 flex-1"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') e.target.blur() }}
              />
              <Button className="rounded-l-none rounded-r-lg bg-orange-500 hover:bg-orange-600 text-white h-10 px-5">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3 shrink-0">
            <ThemeSwitcher />

            <Button variant="ghost" className="relative p-2 group">
              <Heart className={`h-5 w-5 transition-colors ${wishlist.size > 0 ? 'text-red-500' : ''}`} />
              {wishlist.size > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlist.size}
                </span>
              )}
            </Button>

            {isAuthenticated ? (
              <div className="relative">
                <Button
                  variant="ghost"
                  className="relative p-2 flex items-center gap-2"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white text-xs font-bold">
                    {(user?.full_name || user?.email || '?').charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden md:inline text-sm font-medium truncate max-w-[100px]">
                    {user?.full_name || user?.email?.split('@')[0]}
                  </span>
                  <ChevronDown className="h-3.5 w-3.5 hidden md:block" />
                </Button>
                {userMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                    <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 z-50 py-2 overflow-hidden">
                      {/* User info */}
                      <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-700">
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">{user?.full_name || 'User'}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user?.email}</p>
                        {user?.role && (
                          <span className="inline-block mt-1 text-[10px] font-medium px-2 py-0.5 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 uppercase">
                            {user.role}
                          </span>
                        )}
                      </div>
                      {/* Menu items */}
                      <button
                        onClick={() => { setUserMenuOpen(false); onNavigate && onNavigate('profile') }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                      >
                        <UserCircle className="h-4 w-4 text-slate-400" /> My Profile
                      </button>
                      <button
                        onClick={() => { setUserMenuOpen(false) }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                      >
                        <ShoppingBag className="h-4 w-4 text-slate-400" /> My Orders
                      </button>
                      <button
                        onClick={() => { setUserMenuOpen(false) }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                      >
                        <Settings className="h-4 w-4 text-slate-400" /> Settings
                      </button>
                      {/* Logout */}
                      <div className="border-t border-slate-100 dark:border-slate-700 mt-1 pt-1">
                        <button
                          onClick={() => { setUserMenuOpen(false); logout() }}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                        >
                          <LogOut className="h-4 w-4" /> Sign Out
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Button variant="ghost" className="relative p-2" onClick={() => onNavigate && onNavigate('login')}>
                <User className="h-5 w-5" />
                <span className="hidden md:inline ml-1 text-sm">Sign In</span>
              </Button>
            )}

            <Button variant="ghost" className="relative p-2" onClick={() => setCartOpen(true)}>
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Button>

            <Button className="bg-orange-500 hover:bg-orange-600 text-white text-sm hidden md:flex">
              <Store className="h-4 w-4 mr-1" />
              Start Selling
            </Button>
          </div>
        </div>
      </header>

      {/* ============================================================ */}
      {/*  CATEGORY NAVIGATION BAR                                      */}
      {/* ============================================================ */}
      <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-1 py-2">
          {categories.map((cat) => {
            const Icon = cat.icon
            return (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all shrink-0
                  ${activeCategory === cat.name
                    ? 'bg-orange-500 text-white shadow-md'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-gray-700 hover:text-orange-600 dark:hover:text-orange-400'
                  }`}
              >
                <Icon className="h-4 w-4" />
                {cat.name}
              </button>
            )
          })}
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-8">

        {/* ============================================================ */}
        {/*  HERO SECTION                                                 */}
        {/* ============================================================ */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Main Banner */}
          <div className="lg:col-span-2 relative rounded-2xl overflow-hidden group cursor-pointer">
            <div className="relative min-h-[280px] overflow-hidden">
              <img
                src={banners[activeBanner].image}
                alt={banners[activeBanner].title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className={`absolute inset-0 bg-gradient-to-r ${banners[activeBanner].gradient} opacity-75`} />
              <div className="relative p-8 md:p-12 flex flex-col justify-center min-h-[280px]">
                <span className="text-white/80 text-sm font-semibold uppercase tracking-wider">Limited Time</span>
                <h1 className="text-3xl md:text-4xl font-bold text-white mt-2">{banners[activeBanner].title}</h1>
                <p className="text-white/90 text-lg mt-2">{banners[activeBanner].subtitle}</p>
                <Button
                  className="mt-6 bg-white text-gray-900 hover:bg-gray-100 font-semibold px-8 w-fit"
                  onClick={() => {
                    if (activeBanner === 0) setActiveCategory('Electronics')
                    else if (activeBanner === 1) setActiveCategory('Fashion')
                    else setActiveCategory('Home & Garden')
                  }}
                >
                  {banners[activeBanner].cta} <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
            {/* Navigation arrows */}
            <button
              onClick={(e) => { e.stopPropagation(); setActiveBanner(prev => (prev - 1 + 3) % 3) }}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setActiveBanner(prev => (prev + 1) % 3) }}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors opacity-0 group-hover:opacity-100"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {banners.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setActiveBanner(i) }}
                  className={`h-2.5 rounded-full transition-all ${i === activeBanner ? 'w-8 bg-white' : 'w-2.5 bg-white/50 hover:bg-white/70'}`}
                />
              ))}
            </div>
          </div>

          {/* Side Promo Cards */}
          <div className="flex flex-col gap-4">
            <button
              onClick={() => setActiveCategory('Fashion')}
              className="flex-1 relative rounded-2xl overflow-hidden group text-left"
            >
              <img src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=250&fit=crop" alt="Fashion" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/80 to-rose-600/80" />
              <div className="relative p-6 flex flex-col justify-center min-h-[130px]">
                <Shirt className="h-8 w-8 mb-2 opacity-80 text-white" />
                <h3 className="text-lg font-bold text-white">Fashion Week Deals</h3>
                <p className="text-white/80 text-sm mt-1">Up to 50% off top brands</p>
                <span className="mt-3 inline-flex items-center gap-1 text-white text-sm font-medium group-hover:gap-2 transition-all">
                  Shop Fashion <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </button>
            <button
              onClick={() => setActiveCategory('All')}
              className="flex-1 relative rounded-2xl overflow-hidden group text-left"
            >
              <img src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&h=250&fit=crop" alt="New Arrivals" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/80 to-purple-700/80" />
              <div className="relative p-6 flex flex-col justify-center min-h-[130px]">
                <Package className="h-8 w-8 mb-2 opacity-80 text-white" />
                <h3 className="text-lg font-bold text-white">New Arrivals Daily</h3>
                <p className="text-white/80 text-sm mt-1">Fresh finds every day</p>
                <span className="mt-3 inline-flex items-center gap-1 text-white text-sm font-medium group-hover:gap-2 transition-all">
                  Discover New <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </button>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  FLASH DEALS                                                  */}
        {/* ============================================================ */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Zap className="h-6 w-6 text-orange-500 fill-orange-500" />
                Flash Deals
              </h2>
              <div className="flex items-center gap-1 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg px-3 py-1.5 text-sm font-mono font-bold">
                <Clock className="h-3.5 w-3.5 mr-1" />
                {String(countdown.hours).padStart(2, '0')} : {String(countdown.minutes).padStart(2, '0')} : {String(countdown.seconds).padStart(2, '0')}
              </div>
            </div>
            <Button variant="ghost" className="text-orange-500 hover:text-orange-600 font-medium">
              View All <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-2 scroll-smooth">
            {flashDeals.map((deal) => (
              <Card
                key={deal.id}
                onClick={() => setSelectedProduct(deal)}
                className="min-w-[200px] max-w-[200px] shrink-0 group hover:shadow-lg transition-all border-gray-200 dark:border-gray-800 overflow-hidden cursor-pointer"
              >
                <div className="h-40 relative overflow-hidden">
                  <img src={deal.image} alt={deal.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <Badge className="absolute top-2 left-2 bg-red-500 text-white border-0 text-xs font-bold">
                    -{deal.discount}%
                  </Badge>
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleWishlist(deal.id) }}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 dark:bg-black/40 hover:bg-white dark:hover:bg-black/60 transition-colors"
                  >
                    <Heart className={`h-4 w-4 ${wishlist.has(deal.id) ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-white'}`} />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleAddToCart(deal) }}
                    className="absolute bottom-2 right-2 p-2 rounded-full bg-orange-500 text-white opacity-0 group-hover:opacity-100 hover:bg-orange-600 transition-all transform translate-y-2 group-hover:translate-y-0 shadow-lg"
                  >
                    <ShoppingCart className="h-4 w-4" />
                  </button>
                </div>
                <CardContent className="p-3">
                  <p className="text-sm font-medium line-clamp-2 min-h-[40px]">{deal.name}</p>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-lg font-bold text-red-500">${deal.price.toFixed(2)}</span>
                    <span className="text-xs text-gray-400 line-through">${deal.original.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-1.5">
                    <StarRating rating={deal.rating} />
                    <span className="text-xs text-gray-500 dark:text-gray-400">({deal.sold.toLocaleString()} sold)</span>
                  </div>
                  {/* Progress bar showing stock */}
                  <div className="mt-2">
                    <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full" style={{ width: `${Math.min(90, (deal.sold / 60))}%` }} />
                    </div>
                    <p className="text-[10px] text-gray-400 mt-0.5">{deal.sold.toLocaleString()} sold</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SHOP BY CATEGORY GRID                                        */}
        {/* ============================================================ */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Shop by Category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {categories.filter(c => c.name !== 'All').map((cat) => {
              const Icon = cat.icon
              return (
                <Card
                  key={cat.name}
                  onClick={() => setActiveCategory(cat.name)}
                  className={`group hover:shadow-lg transition-all cursor-pointer border-gray-200 dark:border-gray-800 ${
                    activeCategory === cat.name ? 'ring-2 ring-orange-500 border-orange-300 dark:border-orange-600' : 'hover:border-orange-300 dark:hover:border-orange-600'
                  }`}
                >
                  <CardContent className="p-5 flex flex-col items-center text-center">
                    <div className={`h-14 w-14 rounded-2xl flex items-center justify-center mb-3 transition-colors ${
                      activeCategory === cat.name
                        ? 'bg-orange-500 text-white'
                        : 'bg-orange-50 dark:bg-orange-950 group-hover:bg-orange-100 dark:group-hover:bg-orange-900'
                    }`}>
                      <Icon className={`h-7 w-7 ${activeCategory === cat.name ? 'text-white' : 'text-orange-500'}`} />
                    </div>
                    <h3 className="font-semibold text-sm">{cat.name}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{cat.items} items</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

        {/* ============================================================ */}
        {/*  FEATURED / RECOMMENDED PRODUCTS                              */}
        {/* ============================================================ */}
        <section>
          <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
            <h2 className="text-2xl font-bold">
              {activeCategory === 'All' ? 'Recommended For You' : activeCategory}
              {searchQuery && <span className="text-base font-normal text-gray-500 ml-2">results for "{searchQuery}"</span>}
            </h2>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500">{sortedProducts.length} products</span>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="h-9 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm px-3 pr-8 cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="recommended">Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="reviews">Most Reviews</option>
              </select>
            </div>
          </div>

          {sortedProducts.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
              <Search className="h-16 w-16 mx-auto text-gray-300 dark:text-gray-700 mb-4" />
              <p className="text-gray-500 text-lg">No products found</p>
              <p className="text-gray-400 text-sm mt-1">Try a different search term or category</p>
              <Button onClick={() => { setActiveCategory('All'); setSearchQuery('') }} className="mt-4 bg-orange-500 hover:bg-orange-600 text-white">
                View All Products
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {sortedProducts.map((product, i) => (
                <Card
                  key={product.id}
                  className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-gray-200 dark:border-gray-800 cursor-pointer"
                  onClick={() => setSelectedProduct(product)}
                  onMouseEnter={() => setHoveredProduct(i)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  <div className="h-48 relative overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    {product.freeShipping && (
                      <Badge className="absolute top-2 left-2 bg-green-500 text-white border-0 text-xs">
                        <Truck className="h-3 w-3 mr-1" /> Free Shipping
                      </Badge>
                    )}
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id) }}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 dark:bg-black/40 hover:bg-white dark:hover:bg-black/60 transition-colors"
                    >
                      <Heart className={`h-4 w-4 ${wishlist.has(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-white'}`} />
                    </button>
                    <div className={`absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-3 transform transition-all duration-300 ${hoveredProduct === i ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
                      <div className="flex gap-2">
                        <Button
                          onClick={(e) => { e.stopPropagation(); handleAddToCart(product) }}
                          className="flex-1 bg-orange-500 hover:bg-orange-600 text-white text-sm h-9"
                        >
                          <ShoppingCart className="h-4 w-4 mr-1" /> Add to Cart
                        </Button>
                        <Button
                          onClick={(e) => { e.stopPropagation(); setSelectedProduct(product) }}
                          variant="secondary"
                          className="h-9 px-3 bg-white/90 hover:bg-white text-gray-900"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <p className="text-xs text-gray-500 dark:text-gray-400">{product.category}</p>
                    <h3 className="font-semibold text-sm mt-1 line-clamp-2 min-h-[40px] group-hover:text-orange-500 transition-colors">{product.name}</h3>
                    <p className="text-xl font-bold text-orange-500 mt-2">${product.price.toFixed(2)}</p>
                    <div className="flex items-center gap-1.5 mt-2">
                      <StarRating rating={product.rating} />
                      <span className="text-xs text-gray-500 dark:text-gray-400">({product.reviews.toLocaleString()})</span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-2 text-xs text-gray-500 dark:text-gray-400">
                      <Store className="h-3 w-3" />
                      <span>{product.seller}</span>
                      <span className="mx-0.5">·</span>
                      <MapPin className="h-3 w-3" />
                      <span>{product.location}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>

        {/* ============================================================ */}
        {/*  TOP SELLERS                                                   */}
        {/* ============================================================ */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Top Sellers</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {topSellers.map((seller, i) => (
              <Card key={i} className="hover:shadow-lg transition-all border-gray-200 dark:border-gray-800 text-center cursor-pointer group">
                <CardContent className="p-4 flex flex-col items-center">
                  <div className="h-16 w-16 rounded-full overflow-hidden mb-3 ring-2 ring-gray-200 dark:ring-gray-700 group-hover:ring-orange-500 transition-all">
                    <img src={seller.avatar} alt={seller.name} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="font-semibold text-sm group-hover:text-orange-500 transition-colors">{seller.name}</h3>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-medium">{seller.rating}</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{seller.products.toLocaleString()} products</p>
                  <Button variant="outline" className="mt-3 text-xs h-8 w-full border-orange-300 text-orange-500 hover:bg-orange-50 dark:border-orange-700 dark:hover:bg-orange-950">
                    Visit Store
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* ============================================================ */}
        {/*  RECENTLY VIEWED                                               */}
        {/* ============================================================ */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Recently Viewed</h2>
          <div className="flex gap-4 overflow-x-auto pb-2 scroll-smooth">
            {recentlyViewed.map((item) => (
              <Card key={item.id} className="min-w-[160px] max-w-[160px] shrink-0 hover:shadow-md transition-all border-gray-200 dark:border-gray-800 overflow-hidden cursor-pointer group">
                <div className="h-28 relative overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <CardContent className="p-3">
                  <p className="text-xs font-medium line-clamp-1 group-hover:text-orange-500 transition-colors">{item.name}</p>
                  <p className="text-sm font-bold text-orange-500 mt-1">${item.price.toFixed(2)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* ============================================================ */}
        {/*  TRUST BADGES                                                  */}
        {/* ============================================================ */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Truck, title: 'Free Shipping', desc: 'On orders over $50' },
            { icon: Shield, title: 'Secure Payment', desc: '100% protected' },
            { icon: RefreshCw, title: 'Easy Returns', desc: '30-day return policy' },
            { icon: Headphones, title: '24/7 Support', desc: 'Always here to help' },
          ].map((badge, i) => (
            <Card key={i} className="border-gray-200 dark:border-gray-800 hover:shadow-md transition-all cursor-pointer group">
              <CardContent className="p-5 flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-orange-50 dark:bg-orange-950 flex items-center justify-center shrink-0 group-hover:bg-orange-100 dark:group-hover:bg-orange-900 transition-colors">
                  <badge.icon className="h-6 w-6 text-orange-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">{badge.title}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{badge.desc}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* ============================================================ */}
        {/*  SELL ON SHOPVERSE CTA                                         */}
        {/* ============================================================ */}
        <section className="rounded-2xl relative overflow-hidden">
          <img src="https://images.unsplash.com/photo-1556740758-90de940ca986?w=1200&h=400&fit=crop" alt="Start selling" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/90 via-amber-500/90 to-yellow-400/90" />
          <div className="relative p-8 md:p-12 text-white">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute top-4 right-10 h-32 w-32 rounded-full border-4 border-white" />
              <div className="absolute bottom-4 left-20 h-20 w-20 rounded-full border-4 border-white" />
              <div className="absolute top-10 left-1/2 h-16 w-16 rounded-full border-4 border-white" />
            </div>
            <div className="relative z-10 text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold">Start Selling Today</h2>
              <p className="text-white/90 mt-2">Reach millions of buyers worldwide. Set up your store in minutes.</p>
              <div className="flex items-center justify-center gap-8 mt-6">
                <div>
                  <p className="text-2xl font-bold">500K+</p>
                  <p className="text-sm text-white/80">Sellers</p>
                </div>
                <div className="h-8 w-px bg-white/30" />
                <div>
                  <p className="text-2xl font-bold">10M+</p>
                  <p className="text-sm text-white/80">Products</p>
                </div>
                <div className="h-8 w-px bg-white/30" />
                <div>
                  <p className="text-2xl font-bold">50M+</p>
                  <p className="text-sm text-white/80">Buyers</p>
                </div>
              </div>
              <Button className="mt-8 bg-white text-orange-600 hover:bg-gray-100 font-bold px-8 text-base h-12">
                <Store className="h-5 w-5 mr-2" />
                Create Your Store
              </Button>
            </div>
          </div>
        </section>

      </main>

      {/* ============================================================ */}
      {/*  FOOTER                                                        */}
      {/* ============================================================ */}
      <footer className="bg-gray-900 dark:bg-gray-950 text-gray-300 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {/* Customer Service */}
            <div>
              <h4 className="text-white font-semibold mb-4">Customer Service</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-orange-400 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Returns & Refunds</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Shipping Info</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Track Order</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Contact Us</a></li>
              </ul>
            </div>

            {/* About Us */}
            <div>
              <h4 className="text-white font-semibold mb-4">About Us</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-orange-400 transition-colors">About ShopVerse</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Press & Media</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Affiliate Program</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Blog</a></li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h4 className="text-white font-semibold mb-4">Categories</h4>
              <ul className="space-y-2 text-sm">
                {categories.filter(c => c.name !== 'All').slice(0, 5).map(cat => (
                  <li key={cat.name}>
                    <button onClick={() => { setActiveCategory(cat.name); window.scrollTo({ top: 0, behavior: 'smooth' }) }} className="hover:text-orange-400 transition-colors">
                      {cat.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Payment Methods */}
            <div>
              <h4 className="text-white font-semibold mb-4">Payment Methods</h4>
              <div className="flex flex-wrap gap-2">
                {['Visa', 'Mastercard', 'PayPal', 'Apple Pay', 'Google Pay'].map(method => (
                  <span key={method} className="text-xs bg-gray-800 dark:bg-gray-900 px-3 py-1.5 rounded-md border border-gray-700 hover:border-orange-500 transition-colors cursor-default">
                    {method}
                  </span>
                ))}
              </div>
              <h4 className="text-white font-semibold mt-6 mb-3">Download App</h4>
              <div className="flex flex-col gap-2">
                <button className="text-xs bg-gray-800 dark:bg-gray-900 px-3 py-2 rounded-md border border-gray-700 text-center cursor-pointer hover:border-orange-500 hover:text-orange-400 transition-colors">App Store</button>
                <button className="text-xs bg-gray-800 dark:bg-gray-900 px-3 py-2 rounded-md border border-gray-700 text-center cursor-pointer hover:border-orange-500 hover:text-orange-400 transition-colors">Google Play</button>
              </div>
            </div>

            {/* Follow Us */}
            <div>
              <h4 className="text-white font-semibold mb-4">Follow Us</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-orange-400 transition-colors">Facebook</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Twitter / X</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">YouTube</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">TikTok</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-orange-500" />
              <span className="font-semibold text-gray-300">ShopVerse</span>
              <span>&copy; {new Date().getFullYear()}. All rights reserved.</span>
            </div>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-orange-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-orange-400 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-orange-400 transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ============================================================ */}
      {/*  MODALS & DRAWERS                                              */}
      {/* ============================================================ */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        isInWishlist={selectedProduct ? wishlist.has(selectedProduct.id) : false}
        onToggleWishlist={toggleWishlist}
      />

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQty={handleUpdateCartQty}
        onRemove={handleRemoveFromCart}
        onCheckout={handleCheckout}
        checkingOut={checkingOut}
      />
    </div>
  )
}
