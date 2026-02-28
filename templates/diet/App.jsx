import { useState } from 'react'
import {
  Salad, UtensilsCrossed, ShoppingCart, ChefHat, TrendingDown, Target, Calendar, Clock,
  Plus, Menu, X, Bell, Search, ChevronDown, ChevronRight, CheckCircle2, Circle,
  Leaf, Wheat, Scale, Sparkles, BookOpen, Heart, LayoutDashboard, Settings,
  Droplets, Flame, Egg, Apple, GlassWater, Star
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ThemeSwitcher } from '@/components/shared/ThemeSwitcher'
import { Sparkline, DonutChart, BarChart, AreaChart } from '@/components/shared/MiniChart'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabContent } from '@/components/ui/tabs'
import { Progress, ProgressRing } from '@/components/ui/progress'

/* ------------------------------------------------------------------ */
/*  MOCK DATA                                                          */
/* ------------------------------------------------------------------ */

const sidebarLinks = [
  { icon: LayoutDashboard, label: 'Overview', href: '#', active: true },
  { icon: UtensilsCrossed, label: 'Meal Plans', href: '#meal-plans' },
  { icon: BookOpen, label: 'Recipes', href: '#recipes' },
  { icon: ShoppingCart, label: 'Grocery List', href: '#grocery' },
  { icon: TrendingDown, label: 'Progress', href: '#progress' },
  { icon: Target, label: 'Preferences', href: '#' },
  { icon: Settings, label: 'Settings', href: '#' },
]

const dietProfile = {
  dietType: 'Balanced',
  calorieTarget: 2200,
  calorieConsumed: 1680,
  restrictions: ['Gluten-free'],
  goal: 'Weight Loss',
}

const macros = [
  { name: 'Protein', current: 95, target: 130, unit: 'g', color: 'bg-emerald-500' },
  { name: 'Carbs', current: 180, target: 250, unit: 'g', color: 'bg-green-500' },
  { name: 'Fat', current: 52, target: 70, unit: 'g', color: 'bg-teal-500' },
  { name: 'Fiber', current: 22, target: 30, unit: 'g', color: 'bg-lime-500' },
]

const weeklyMeals = [
  { day: 'Monday', breakfast: 'Avocado Toast', lunch: 'Quinoa Bowl', dinner: 'Grilled Salmon', snack: 'Greek Yogurt', cal: 2050 },
  { day: 'Tuesday', breakfast: 'Smoothie Bowl', lunch: 'Turkey Wrap', dinner: 'Stir Fry Chicken', snack: 'Trail Mix', cal: 2100 },
  { day: 'Wednesday', breakfast: 'Overnight Oats', lunch: 'Chicken Salad', dinner: 'Pasta Primavera', snack: 'Apple Slices', cal: 1980 },
  { day: 'Thursday', breakfast: 'Egg White Omelet', lunch: 'Tuna Poke Bowl', dinner: 'Beef Stir Fry', snack: 'Protein Bar', cal: 2150 },
  { day: 'Friday', breakfast: 'Chia Pudding', lunch: 'Mediterranean Wrap', dinner: 'Baked Cod', snack: 'Mixed Nuts', cal: 1900 },
  { day: 'Saturday', breakfast: 'Protein Pancakes', lunch: 'Grilled Veggie Bowl', dinner: 'Herb Roast Chicken', snack: 'Hummus & Veggies', cal: 2200 },
  { day: 'Sunday', breakfast: 'Açaí Bowl', lunch: 'Shrimp Salad', dinner: 'Lean Beef Tacos', snack: 'Dark Chocolate', cal: 2080 },
]

const groceryCategories = [
  {
    category: 'Produce',
    icon: Leaf,
    items: [
      { name: 'Avocados', qty: 3, checked: false },
      { name: 'Spinach (bag)', qty: 1, checked: false },
      { name: 'Tomatoes', qty: 4, checked: true },
      { name: 'Broccoli', qty: 2, checked: false },
      { name: 'Bell Peppers', qty: 3, checked: false },
      { name: 'Sweet Potatoes', qty: 2, checked: true },
      { name: 'Lemons', qty: 4, checked: false },
    ],
  },
  {
    category: 'Protein',
    icon: UtensilsCrossed,
    items: [
      { name: 'Chicken breast', qty: 2, checked: false },
      { name: 'Salmon fillets', qty: 1, checked: false },
      { name: 'Eggs (dozen)', qty: 1, checked: true },
      { name: 'Ground turkey', qty: 1, checked: false },
      { name: 'Cod fillets', qty: 1, checked: false },
      { name: 'Greek yogurt', qty: 2, checked: false },
    ],
  },
  {
    category: 'Grains & Pantry',
    icon: Wheat,
    items: [
      { name: 'Quinoa', qty: 1, checked: false },
      { name: 'Brown rice', qty: 1, checked: false },
      { name: 'Oats', qty: 1, checked: true },
      { name: 'Chia seeds', qty: 1, checked: false },
      { name: 'Olive oil', qty: 1, checked: true },
      { name: 'Almond butter', qty: 1, checked: false },
    ],
  },
  {
    category: 'Dairy & Beverages',
    icon: GlassWater,
    items: [
      { name: 'Almond milk', qty: 1, checked: false },
      { name: 'Feta cheese', qty: 1, checked: false },
      { name: 'Green tea', qty: 1, checked: true },
      { name: 'Coconut water', qty: 2, checked: false },
    ],
  },
]

const recipeSuggestions = [
  { title: 'Mediterranean Quinoa Bowl', prepTime: 25, calories: 420, difficulty: 'Easy', rating: 4.8, servings: 2 },
  { title: 'Honey Garlic Salmon', prepTime: 35, calories: 380, difficulty: 'Medium', rating: 4.9, servings: 2 },
  { title: 'Avocado Egg Toast', prepTime: 15, calories: 320, difficulty: 'Easy', rating: 4.5, servings: 1 },
  { title: 'Thai Chicken Stir Fry', prepTime: 30, calories: 450, difficulty: 'Medium', rating: 4.7, servings: 4 },
  { title: 'Chia Seed Pudding', prepTime: 10, calories: 280, difficulty: 'Easy', rating: 4.6, servings: 2 },
  { title: 'Grilled Herb Chicken', prepTime: 40, calories: 390, difficulty: 'Medium', rating: 4.8, servings: 4 },
  { title: 'Açaí Smoothie Bowl', prepTime: 10, calories: 310, difficulty: 'Easy', rating: 4.4, servings: 1 },
  { title: 'Baked Cod Provençal', prepTime: 45, calories: 340, difficulty: 'Hard', rating: 4.9, servings: 2 },
]

const weightData = [
  { week: 'W1', value: 185, label: 'W1' },
  { week: 'W2', value: 183.5, label: 'W2' },
  { week: 'W3', value: 182, label: 'W3' },
  { week: 'W4', value: 181, label: 'W4' },
  { week: 'W5', value: 180.2, label: 'W5' },
  { week: 'W6', value: 179.5, label: 'W6' },
  { week: 'W7', value: 178.8, label: 'W7' },
]

const calorieHistory = [
  { value: 2050, label: 'Mon' },
  { value: 2100, label: 'Tue' },
  { value: 1980, label: 'Wed' },
  { value: 2150, label: 'Thu' },
  { value: 1900, label: 'Fri' },
  { value: 2200, label: 'Sat' },
  { value: 1680, label: 'Sun' },
]

const waterIntake = { current: 6, target: 8 }

const weekRange = { start: 'Feb 17', end: 'Feb 23' }

const tabsList = ['Overview', 'Meal Plans', 'Recipes', 'Grocery List', 'Progress']

/* ------------------------------------------------------------------ */
/*  APP                                                                */
/* ------------------------------------------------------------------ */

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [groceryItems, setGroceryItems] = useState(groceryCategories)
  const [activeTab, setActiveTab] = useState('Overview')

  const toggleGroceryItem = (catIndex, itemIndex) => {
    setGroceryItems((prev) => {
      const next = JSON.parse(JSON.stringify(prev))
      next[catIndex].items[itemIndex].checked = !next[catIndex].items[itemIndex].checked
      return next
    })
  }

  const totalGrocery = groceryItems.reduce((s, c) => s + c.items.length, 0)
  const checkedGrocery = groceryItems.reduce((s, c) => s + c.items.filter(i => i.checked).length, 0)

  const calPct = Math.round((dietProfile.calorieConsumed / dietProfile.calorieTarget) * 100)

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full w-60 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-40 transform transition-transform lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center">
              <Salad className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold font-display">Diet Planner</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1 text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="p-3 space-y-0.5">
          {sidebarLinks.map(({ icon: Icon, label, href, active }) => (
            <a
              key={label}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4.5 h-4.5 shrink-0" />
              <span className="flex-1">{label}</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </a>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <div className="lg:pl-60">
        {/* Header */}
        <header className="sticky top-0 h-14 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 flex items-center gap-4 px-4 sm:px-6 z-30">
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-slate-600 dark:text-slate-400">
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 rounded-lg px-3 py-2">
              <Calendar className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span className="text-sm font-medium">
                Week of {weekRange.start} – {weekRange.end}
              </span>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 flex-1 max-w-xs">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <Input placeholder="Search meals..." className="h-9 bg-slate-100 dark:bg-slate-800 border-0 text-sm" />
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <Button
              size="sm"
              className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white border-0 shadow-lg shadow-emerald-500/25"
            >
              <Plus className="w-3.5 h-3.5 mr-1.5" />
              Generate Plan
            </Button>
            <button className="relative p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full" />
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="p-4 sm:p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold font-display">Diet Dashboard</h1>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Your personalized diet plan for this week</p>
            </div>
            <Tabs tabs={tabsList} active={activeTab} onChange={setActiveTab} />
          </div>

          {/* ============ OVERVIEW TAB ============ */}
          <TabContent id="Overview" active={activeTab}>
            {/* Diet Profile + Calorie Donut */}
            <div className="grid lg:grid-cols-3 gap-6 mb-6">
              <Card className="border-slate-200 dark:border-slate-800 overflow-hidden lg:col-span-2">
                <div className="h-1 bg-gradient-to-r from-emerald-500 to-green-600" />
                <CardHeader className="pb-3">
                  <CardTitle className="font-display flex items-center gap-2">
                    <Target className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    Diet Profile
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                      <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">Diet Type</p>
                      <p className="font-semibold mt-1">{dietProfile.dietType}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                      <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">Daily Target</p>
                      <p className="font-semibold mt-1">{dietProfile.calorieTarget.toLocaleString()} kcal</p>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                      <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">Restrictions</p>
                      <p className="font-semibold mt-1">{dietProfile.restrictions.join(', ')}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                      <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">Goal</p>
                      <p className="font-semibold mt-1 flex items-center gap-1">
                        <TrendingDown className="w-4 h-4 text-emerald-500" />
                        {dietProfile.goal}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-slate-200 dark:border-slate-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-display flex items-center gap-2">
                    <Flame className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    Today&apos;s Calories
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <DonutChart
                    value={dietProfile.calorieConsumed}
                    max={dietProfile.calorieTarget}
                    size={120}
                    strokeWidth={10}
                    color="#10b981"
                    label={`${calPct}%`}
                    sublabel={`${dietProfile.calorieConsumed} / ${dietProfile.calorieTarget}`}
                  />
                  <div className="mt-3 text-center">
                    <Badge variant="success">{dietProfile.calorieTarget - dietProfile.calorieConsumed} kcal remaining</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Macro Breakdown */}
            <Card className="border-slate-200 dark:border-slate-800 mb-6">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-display">Macro Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {macros.map((m) => {
                    const pct = Math.round((m.current / m.target) * 100)
                    return (
                      <div key={m.name} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium">{m.name}</span>
                          <span className="text-slate-500 dark:text-slate-400">{m.current}/{m.target}{m.unit}</span>
                        </div>
                        <Progress value={m.current} max={m.target} color={m.color} />
                        <p className="text-xs text-slate-500 dark:text-slate-400 text-right">{pct}%</p>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Weekly Calorie Trend + Water Intake */}
            <div className="grid lg:grid-cols-3 gap-6 mb-6">
              <Card className="border-slate-200 dark:border-slate-800 lg:col-span-2">
                <CardHeader>
                  <CardTitle className="font-display flex items-center gap-2">
                    <TrendingDown className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    Weekly Calorie Trend
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <AreaChart data={calorieHistory} height={140} color="#10b981" />
                  <div className="mt-3 flex items-center justify-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                    <span>Target: <strong className="text-emerald-600 dark:text-emerald-400">{dietProfile.calorieTarget} kcal</strong></span>
                    <span>Avg: <strong>{Math.round(calorieHistory.reduce((s, d) => s + d.value, 0) / calorieHistory.length)} kcal</strong></span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-slate-200 dark:border-slate-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-display flex items-center gap-2">
                    <Droplets className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    Water Intake
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <ProgressRing value={waterIntake.current} max={waterIntake.target} size={100} strokeWidth={8} color="stroke-emerald-500">
                    <div className="text-center">
                      <span className="text-lg font-bold">{waterIntake.current}</span>
                      <span className="text-xs text-slate-500">/{waterIntake.target}</span>
                    </div>
                  </ProgressRing>
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">glasses today</p>
                  <div className="flex gap-1.5 mt-3">
                    {Array.from({ length: waterIntake.target }).map((_, i) => (
                      <div key={i} className={`w-6 h-7 rounded-md border-2 flex items-center justify-center ${
                        i < waterIntake.current
                          ? 'bg-emerald-100 dark:bg-emerald-900/40 border-emerald-400 dark:border-emerald-600'
                          : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700'
                      }`}>
                        {i < waterIntake.current && <Droplets className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Weight Progress */}
            <Card className="border-slate-200 dark:border-slate-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="font-display flex items-center gap-2">
                    <Scale className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    Weight Progress
                  </CardTitle>
                  <Badge variant="success">-6.2 lbs</Badge>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">Last 7 weeks</p>
              </CardHeader>
              <CardContent>
                <AreaChart
                  data={weightData}
                  height={120}
                  color="#10b981"
                />
              </CardContent>
            </Card>
          </TabContent>

          {/* ============ MEAL PLANS TAB ============ */}
          <TabContent id="Meal Plans" active={activeTab}>
            <Card className="border-slate-200 dark:border-slate-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="font-display flex items-center gap-2">
                    <UtensilsCrossed className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    Weekly Meal Plan
                  </CardTitle>
                  <Badge variant="success">7 days planned</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto -mx-2">
                  <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 min-w-[700px]">
                    {weeklyMeals.map((day) => (
                      <div
                        key={day.day}
                        className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:border-emerald-500/50 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                            {day.day.slice(0, 3)}
                          </p>
                          <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400">{day.cal} cal</span>
                        </div>
                        <div className="space-y-2 text-sm">
                          {[
                            { label: 'Breakfast', val: day.breakfast },
                            { label: 'Lunch', val: day.lunch },
                            { label: 'Dinner', val: day.dinner },
                            { label: 'Snack', val: day.snack },
                          ].map((meal) => (
                            <div key={meal.label}>
                              <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase">{meal.label}</p>
                              <p className="font-medium truncate text-xs">{meal.val}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200 dark:border-slate-800 mt-6">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-display">Daily Calorie Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <BarChart
                  data={weeklyMeals.map(d => ({ value: d.cal, label: d.day.slice(0, 3), color: '#10b981' }))}
                  height={140}
                  barWidth={28}
                  gap={12}
                />
              </CardContent>
            </Card>
          </TabContent>

          {/* ============ RECIPES TAB ============ */}
          <TabContent id="Recipes" active={activeTab}>
            <Card className="border-slate-200 dark:border-slate-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="font-display flex items-center gap-2">
                    <ChefHat className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    Recipe Collection
                  </CardTitle>
                  <span className="text-sm text-slate-500 dark:text-slate-400">{recipeSuggestions.length} recipes</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {recipeSuggestions.map((recipe) => (
                    <div
                      key={recipe.title}
                      className="group rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden hover:border-emerald-500/50 dark:hover:border-emerald-500/50 transition-colors"
                    >
                      <div className="aspect-video bg-gradient-to-br from-emerald-100 to-green-200 dark:from-emerald-900/30 dark:to-green-900/30 flex items-center justify-center relative">
                        <UtensilsCrossed className="w-10 h-10 text-emerald-400/60 dark:text-emerald-500/40" />
                        <Heart className="w-5 h-5 text-slate-300 dark:text-slate-600 absolute top-2 right-2 hover:text-rose-500 cursor-pointer transition-colors" />
                        <Badge
                          variant={recipe.difficulty === 'Easy' ? 'success' : recipe.difficulty === 'Medium' ? 'warning' : 'error'}
                          className="absolute top-2 left-2"
                        >
                          {recipe.difficulty}
                        </Badge>
                      </div>
                      <div className="p-3">
                        <h3 className="font-semibold text-sm mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors truncate">
                          {recipe.title}
                        </h3>
                        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{recipe.prepTime}m</span>
                          <span className="flex items-center gap-1"><Flame className="w-3 h-3" />{recipe.calories} cal</span>
                          <span className="flex items-center gap-1"><Star className="w-3 h-3 text-amber-500" />{recipe.rating}</span>
                          <span>{recipe.servings} srv</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabContent>

          {/* ============ GROCERY LIST TAB ============ */}
          <TabContent id="Grocery List" active={activeTab}>
            <Card className="border-slate-200 dark:border-slate-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="font-display flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    Grocery List
                  </CardTitle>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-slate-500 dark:text-slate-400">{checkedGrocery}/{totalGrocery} items</span>
                    <Progress value={checkedGrocery} max={totalGrocery} size="sm" color="bg-emerald-500" className="w-24" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {groceryItems.map((cat, catIndex) => (
                    <div key={cat.category} className="space-y-3">
                      <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                        <cat.icon className="w-4 h-4 text-emerald-500" />
                        {cat.category}
                        <Badge variant="secondary" className="ml-auto text-[10px]">{cat.items.length}</Badge>
                      </div>
                      <ul className="space-y-1.5">
                        {cat.items.map((item, itemIndex) => (
                          <li
                            key={item.name}
                            className="flex items-center gap-2 text-sm cursor-pointer group py-1 px-2 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                            onClick={() => toggleGroceryItem(catIndex, itemIndex)}
                          >
                            {item.checked ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                            ) : (
                              <Circle className="w-4 h-4 text-slate-300 dark:text-slate-600 shrink-0" />
                            )}
                            <span className={item.checked ? 'line-through text-slate-400 dark:text-slate-500 flex-1' : 'text-slate-700 dark:text-slate-300 flex-1'}>
                              {item.name}
                            </span>
                            {item.qty > 1 && <span className="text-xs text-slate-400">×{item.qty}</span>}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabContent>

          {/* ============ PROGRESS TAB ============ */}
          <TabContent id="Progress" active={activeTab}>
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-slate-200 dark:border-slate-800">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="font-display flex items-center gap-2">
                      <Scale className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                      Weight Trend
                    </CardTitle>
                    <Badge variant="success">-6.2 lbs total</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <AreaChart data={weightData} height={160} color="#10b981" />
                  <div className="grid grid-cols-3 gap-3 mt-4">
                    <div className="text-center p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                      <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">185</p>
                      <p className="text-[10px] text-slate-500 uppercase">Start</p>
                    </div>
                    <div className="text-center p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                      <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">178.8</p>
                      <p className="text-[10px] text-slate-500 uppercase">Current</p>
                    </div>
                    <div className="text-center p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                      <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">170</p>
                      <p className="text-[10px] text-slate-500 uppercase">Goal</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-slate-200 dark:border-slate-800">
                <CardHeader>
                  <CardTitle className="font-display flex items-center gap-2">
                    <Flame className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    Calorie Adherence
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <AreaChart data={calorieHistory} height={160} color="#10b981" />
                  <div className="mt-4 space-y-3">
                    {[
                      { label: 'Avg Daily Intake', val: `${Math.round(calorieHistory.reduce((s, d) => s + d.value, 0) / calorieHistory.length)} kcal` },
                      { label: 'Best Day', val: '1,900 kcal (Fri)' },
                      { label: 'Adherence Rate', val: '86%' },
                    ].map((s) => (
                      <div key={s.label} className="flex items-center justify-between text-sm">
                        <span className="text-slate-500 dark:text-slate-400">{s.label}</span>
                        <span className="font-semibold">{s.val}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-slate-200 dark:border-slate-800">
                <CardHeader>
                  <CardTitle className="text-base font-display">Weekly Macro Averages</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {macros.map((m) => (
                      <div key={m.name} className="space-y-1.5">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium">{m.name}</span>
                          <span className="text-slate-500 dark:text-slate-400">{m.current}/{m.target}{m.unit}</span>
                        </div>
                        <Progress value={m.current} max={m.target} color={m.color} />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-slate-200 dark:border-slate-800">
                <CardHeader>
                  <CardTitle className="text-base font-display flex items-center gap-2">
                    <Droplets className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    Hydration Tracking
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-6">
                    <ProgressRing value={waterIntake.current} max={waterIntake.target} size={100} strokeWidth={8} color="stroke-emerald-500">
                      <div className="text-center">
                        <span className="text-lg font-bold">{waterIntake.current}</span>
                        <span className="text-xs text-slate-500">/{waterIntake.target}</span>
                      </div>
                    </ProgressRing>
                    <div className="space-y-2 flex-1">
                      {[
                        { label: 'Today', val: `${waterIntake.current} glasses` },
                        { label: 'Weekly Avg', val: '7.2 glasses' },
                        { label: 'Streak', val: '5 days' },
                      ].map((s) => (
                        <div key={s.label} className="flex items-center justify-between text-sm">
                          <span className="text-slate-500 dark:text-slate-400">{s.label}</span>
                          <span className="font-medium">{s.val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabContent>
        </main>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <ThemeSwitcher />
    </div>
  )
}

export default App
