import { useState, useEffect, useCallback } from 'react'
import {
  Home, CalendarDays, BookOpen, ShoppingCart, Heart, Droplets, Flame,
  Star, Sparkles, Clock, UtensilsCrossed, Coffee, Salad, Apple, Cookie,
  Loader2, Check, ChevronRight, Leaf, Wheat, Fish, Egg, Scale, Target,
  TrendingDown, Activity, Plus, ArrowUp, ArrowDown, GlassWater
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ThemeSwitcher } from '@/components/shared/ThemeSwitcher'
import { Progress, ProgressRing } from '@/components/ui/progress'
import { DonutChart, AreaChart } from '@/components/shared/MiniChart'
import { useAuth } from '@/context/AuthContext'

/* ------------------------------------------------------------------ */
/*  HELPERS                                                             */
/* ------------------------------------------------------------------ */

const getHeaders = () => {
  const token = localStorage.getItem('va-access-token')
  return token ? { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } : {}
}

const TODAY = new Date().toISOString().split('T')[0]

const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const shortDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

function formatToday() {
  const d = new Date()
  return `${dayNames[d.getDay()]}, ${monthNames[d.getMonth()]} ${d.getDate()}`
}

const mealIcons = { breakfast: Coffee, lunch: Salad, dinner: UtensilsCrossed, snack: Apple }

const categoryIcons = {
  Produce: Leaf,
  Protein: Fish,
  'Grains & Pantry': Wheat,
  'Dairy & Beverages': GlassWater,
  Dairy: GlassWater,
  Beverages: GlassWater,
  Snacks: Cookie,
  Frozen: Egg,
}

const recipeGradients = [
  'from-teal-400 to-emerald-500',
  'from-cyan-400 to-teal-500',
  'from-green-400 to-teal-500',
  'from-emerald-400 to-green-500',
  'from-lime-400 to-emerald-500',
  'from-teal-400 to-cyan-500',
  'from-sky-400 to-teal-500',
  'from-indigo-400 to-teal-500',
]

/* ------------------------------------------------------------------ */
/*  COMPONENT                                                          */
/* ------------------------------------------------------------------ */

export default function App({ onNavigate }) {
  const { user, isAuthenticated, loading: authLoading, logout } = useAuth()

  const [activeTab, setActiveTab] = useState('dashboard')
  const [recipeFilter, setRecipeFilter] = useState('All')
  const [selectedDay, setSelectedDay] = useState(0)

  // Data state
  const [projectId, setProjectId] = useState(null)
  const [profile, setProfile] = useState(null)
  const [todayLog, setTodayLog] = useState(null)
  const [recipes, setRecipes] = useState([])
  const [mealPlans, setMealPlans] = useState([])
  const [weightEntries, setWeightEntries] = useState([])
  const [dailyLogs, setDailyLogs] = useState([])
  const [groceryLists, setGroceryLists] = useState([])

  // Loading states
  const [initialLoading, setInitialLoading] = useState(true)
  const [waterLoading, setWaterLoading] = useState(false)
  const [togglingItem, setTogglingItem] = useState(null)

  /* ---- FETCH PROJECT ---- */
  const fetchProject = useCallback(async () => {
    try {
      const res = await fetch('/api/v1/projects/public')
      const data = await res.json()
      const projects = data.items || data || []
      const nutriProject = projects.find(p => p.name === 'NutriTrack')
      if (nutriProject) {
        setProjectId(nutriProject.id)
        return nutriProject.id
      }
    } catch (e) {
      console.error('Failed to fetch project:', e)
    }
    return null
  }, [])

  /* ---- API HELPERS ---- */
  const apiFetch = useCallback(async (path, options = {}) => {
    const res = await fetch(path, {
      ...options,
      headers: { ...getHeaders(), ...(options.headers || {}) },
    })
    if (!res.ok) throw new Error(`API error ${res.status}`)
    return res.json()
  }, [])

  /* ---- LOAD INITIAL DATA ---- */
  const loadData = useCallback(async (pid) => {
    if (!pid) return
    setInitialLoading(true)
    try {
      const [profileData, recipesData, logsData, mealPlanData, weightData, groceryData] = await Promise.allSettled([
        apiFetch(`/api/v1/nutrition/profile?project_id=${pid}`),
        apiFetch(`/api/v1/nutrition/recipes?project_id=${pid}`),
        apiFetch(`/api/v1/nutrition/daily-logs?project_id=${pid}`),
        apiFetch(`/api/v1/nutrition/meal-plans?project_id=${pid}`),
        apiFetch(`/api/v1/nutrition/weight?project_id=${pid}`),
        apiFetch(`/api/v1/nutrition/grocery-lists?project_id=${pid}`),
      ])

      if (profileData.status === 'fulfilled') setProfile(profileData.value)
      if (recipesData.status === 'fulfilled') setRecipes(recipesData.value.items || recipesData.value || [])
      if (mealPlanData.status === 'fulfilled') setMealPlans(mealPlanData.value.items || mealPlanData.value || [])
      if (weightData.status === 'fulfilled') setWeightEntries(weightData.value.items || weightData.value || [])
      if (groceryData.status === 'fulfilled') setGroceryLists(groceryData.value.items || groceryData.value || [])

      let logs = []
      if (logsData.status === 'fulfilled') {
        logs = logsData.value.items || logsData.value || []
        setDailyLogs(logs)
      }

      let todaysLog = logs.find(l => l.date === TODAY)
      if (!todaysLog) {
        try {
          const calTarget = profileData.status === 'fulfilled' ? (profileData.value.calorie_target || 2100) : 2100
          todaysLog = await apiFetch(`/api/v1/nutrition/daily-logs?project_id=${pid}`, {
            method: 'POST',
            body: JSON.stringify({ date: TODAY, calories_target: calTarget }),
          })
          setDailyLogs(prev => [...prev, todaysLog])
        } catch (e) {
          console.error('Failed to create daily log:', e)
        }
      }
      if (todaysLog) setTodayLog(todaysLog)
    } catch (e) {
      console.error('Failed to load data:', e)
    } finally {
      setInitialLoading(false)
    }
  }, [apiFetch])

  /* ---- INIT ---- */
  useEffect(() => {
    if (!isAuthenticated) {
      setInitialLoading(false)
      return
    }
    ;(async () => {
      const pid = await fetchProject()
      if (pid) await loadData(pid)
      else setInitialLoading(false)
    })()
  }, [isAuthenticated, fetchProject, loadData])

  /* ---- WATER TRACKER ---- */
  const handleWaterClick = async (count) => {
    if (!todayLog || !projectId || waterLoading) return
    setWaterLoading(true)
    try {
      const updated = await apiFetch(`/api/v1/nutrition/daily-logs/${todayLog.id}?project_id=${projectId}`, {
        method: 'PATCH',
        body: JSON.stringify({ water_consumed: count }),
      })
      setTodayLog(prev => ({ ...prev, ...updated }))
    } catch (e) {
      console.error('Failed to update water:', e)
    } finally {
      setWaterLoading(false)
    }
  }

  /* ---- TOGGLE GROCERY ITEM ---- */
  const handleToggleGroceryItem = async (listId, itemId, currentChecked) => {
    if (!projectId || togglingItem) return
    setTogglingItem(itemId)
    try {
      await apiFetch(`/api/v1/nutrition/grocery-lists/${listId}/items/${itemId}?project_id=${projectId}`, {
        method: 'PATCH',
        body: JSON.stringify({ checked: !currentChecked }),
      })
      // Update local state
      setGroceryLists(prev => prev.map(list => {
        if (list.id !== listId) return list
        return {
          ...list,
          items: (list.items || []).map(item =>
            item.id === itemId ? { ...item, checked: !currentChecked } : item
          )
        }
      }))
    } catch (e) {
      console.error('Failed to toggle grocery item:', e)
      // Optimistic rollback not needed since we only update on success
    } finally {
      setTogglingItem(null)
    }
  }

  /* ---- DERIVED DATA ---- */
  const caloriesConsumed = todayLog?.calories_consumed || 0
  const caloriesGoal = todayLog?.calories_target || profile?.calorie_target || 2100
  const caloriePercent = caloriesGoal > 0 ? Math.round((caloriesConsumed / caloriesGoal) * 100) : 0

  const macros = [
    { name: 'Protein', current: todayLog?.protein || 0, target: profile?.protein_target || 130, unit: 'g', color: 'bg-teal-500', gradient: 'from-teal-400 to-teal-600' },
    { name: 'Carbs', current: todayLog?.carbs || 0, target: profile?.carbs_target || 250, unit: 'g', color: 'bg-emerald-500', gradient: 'from-emerald-400 to-emerald-600' },
    { name: 'Fat', current: todayLog?.fat || 0, target: profile?.fat_target || 70, unit: 'g', color: 'bg-cyan-500', gradient: 'from-cyan-400 to-cyan-600' },
    { name: 'Fiber', current: todayLog?.fiber || 0, target: profile?.fiber_target || 30, unit: 'g', color: 'bg-lime-500', gradient: 'from-lime-400 to-lime-600' },
  ]

  const waterCount = todayLog?.water_consumed || 0
  const waterTarget = todayLog?.water_target || profile?.water_target || 8

  // Weekly calorie data from daily logs
  const weeklyCalorieData = (() => {
    const sorted = [...dailyLogs].sort((a, b) => a.date.localeCompare(b.date)).slice(-7)
    return sorted.map(l => ({
      value: l.calories_consumed || 0,
      label: shortDays[new Date(l.date).getDay()],
    }))
  })()

  // Recipe categories from API
  const recipeCategories = (() => {
    const cats = new Set(['All'])
    recipes.forEach(r => { if (r.category) cats.add(r.category) })
    return Array.from(cats)
  })()

  const filteredRecipes = recipeFilter === 'All'
    ? recipes
    : recipes.filter(r => r.category === recipeFilter)

  const featuredRecipe = recipes.find(r => r.is_featured) || recipes[0]

  // Active meal plan
  const activePlan = mealPlans.find(p => p.is_active) || mealPlans[0]
  const planEntries = activePlan?.entries || []
  const planDays = (() => {
    const days = [...new Set(planEntries.map(e => e.day))].sort()
    return days
  })()
  const currentPlanDay = planDays[selectedDay] || planDays[0]
  const currentDayEntries = planEntries.filter(e => e.day === currentPlanDay)

  // Weight chart data
  const weightChartData = weightEntries.slice(-10).map(w => ({
    value: w.weight,
    label: shortDays[new Date(w.date).getDay()],
  }))

  const weightChange = (() => {
    if (weightEntries.length < 2) return null
    const sorted = [...weightEntries].sort((a, b) => a.date.localeCompare(b.date))
    const first = sorted[0].weight
    const last = sorted[sorted.length - 1].weight
    return { diff: +(last - first).toFixed(1), first, last }
  })()

  // Active grocery list
  const activeGroceryList = groceryLists.find(g => g.is_active) || groceryLists[0]
  const groceryItems = activeGroceryList?.items || []
  const groceryByCategory = (() => {
    const groups = {}
    groceryItems.forEach(item => {
      const cat = item.category || 'Other'
      if (!groups[cat]) groups[cat] = []
      groups[cat].push(item)
    })
    return groups
  })()
  const totalGrocery = groceryItems.length
  const checkedGrocery = groceryItems.filter(i => i.checked).length

  // Profile derived
  const firstName = user?.full_name ? user.full_name.split(' ')[0] : 'there'
  const currentWeight = profile?.current_weight || (weightEntries.length > 0 ? weightEntries[weightEntries.length - 1]?.weight : null)
  const targetWeight = profile?.target_weight || null
  const height = profile?.height || null
  const bmi = (() => {
    if (!currentWeight || !height) return null
    // Assuming height in inches, weight in lbs
    return +((currentWeight / (height * height)) * 703).toFixed(1)
  })()

  const tabs = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'plan', label: 'Plan', icon: CalendarDays },
    { id: 'recipes', label: 'Recipes', icon: BookOpen },
    { id: 'grocery', label: 'Grocery', icon: ShoppingCart },
    { id: 'health', label: 'Health', icon: Heart },
  ]

  /* ---- AUTH CHECK ---- */
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-teal-500" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center transition-colors">
        <div className="fixed top-4 right-4 z-50">
          <ThemeSwitcher />
        </div>
        <div className="max-w-[430px] mx-auto bg-white dark:bg-gray-900 shadow-2xl rounded-2xl p-8 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-400 to-green-500 flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Diet & Health</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-6">Plan your meals, track your health, and reach your goals.</p>
          <Button
            onClick={() => onNavigate && onNavigate('login')}
            className="w-full h-12 rounded-xl bg-gradient-to-r from-teal-500 to-green-500 hover:from-teal-600 hover:to-green-600 text-white shadow-lg"
          >
            Log In
          </Button>
        </div>
      </div>
    )
  }

  /* ---- LOADING STATE ---- */
  if (initialLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center space-y-3">
          <Loader2 className="w-8 h-8 animate-spin text-teal-500 mx-auto" />
          <p className="text-sm text-gray-500 dark:text-gray-400">Loading your diet plan...</p>
        </div>
      </div>
    )
  }

  /* ==================================================================== */
  /*  1. DASHBOARD TAB                                                     */
  /* ==================================================================== */
  const renderDashboard = () => (
    <div className="space-y-5">
      {/* Greeting */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{getGreeting()}, {firstName}</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{formatToday()}</p>
      </div>

      {/* Diet Profile Card */}
      <Card className="border-0 shadow-lg overflow-hidden">
        <div className="h-1.5 bg-gradient-to-r from-teal-400 via-green-400 to-emerald-500" />
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Target className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <span className="font-semibold text-sm text-gray-900 dark:text-white">Your Diet Profile</span>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {profile?.diet_type && (
              <Badge className="bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300 border-0 text-xs">{profile.diet_type}</Badge>
            )}
            {profile?.goal && (
              <Badge className="bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300 border-0 text-xs">{profile.goal}</Badge>
            )}
            {(Array.isArray(profile?.restrictions) ? profile.restrictions : profile?.restrictions ? [profile.restrictions] : []).map((r, i) => (
              <Badge key={i} className="bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300 border-0 text-xs">{r}</Badge>
            ))}
            {!profile?.diet_type && !profile?.goal && (
              <span className="text-xs text-gray-400 dark:text-gray-500">No profile configured yet</span>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Calorie Donut */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-teal-50 to-green-50 dark:from-teal-950/40 dark:to-green-950/40">
        <CardContent className="p-6">
          <div className="flex items-center gap-6">
            <div className="relative flex-shrink-0">
              <DonutChart
                value={Math.min(caloriesConsumed, caloriesGoal)}
                max={caloriesGoal}
                size={130}
                strokeWidth={12}
                color="#14b8a6"
                label={`${caloriePercent}%`}
                sublabel={`${caloriesConsumed} / ${caloriesGoal}`}
              />
            </div>
            <div className="flex-1 space-y-2">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Daily Calories</p>
              <div className="text-3xl font-bold text-teal-600 dark:text-teal-400">{Math.max(caloriesGoal - caloriesConsumed, 0)}</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">remaining today</p>
              {caloriePercent >= 100 && (
                <Badge className="bg-teal-500 text-white border-0 text-xs">Goal reached!</Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Macro Breakdown */}
      <div>
        <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Macro Breakdown</h2>
        <div className="space-y-3">
          {macros.map(m => {
            const pct = m.target > 0 ? Math.min(Math.round((m.current / m.target) * 100), 100) : 0
            return (
              <div key={m.name} className="flex items-center gap-3">
                <div className="w-16 text-xs font-medium text-gray-600 dark:text-gray-400">{m.name}</div>
                <div className="flex-1">
                  <Progress value={pct} className="h-2.5" />
                </div>
                <div className="w-24 text-right">
                  <span className="text-xs font-semibold text-gray-900 dark:text-white">{Math.round(m.current)}</span>
                  <span className="text-xs text-gray-400">/{m.target}{m.unit}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Water Intake */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Droplets className="w-5 h-5 text-cyan-500" />
              <span className="font-semibold text-gray-900 dark:text-white text-sm">Water Intake</span>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {waterCount}/{waterTarget} glasses
              {waterLoading && <Loader2 className="w-3 h-3 animate-spin inline ml-1" />}
            </span>
          </div>
          <div className="flex gap-2 flex-wrap">
            {Array.from({ length: waterTarget }).map((_, i) => (
              <button
                key={i}
                onClick={() => handleWaterClick(i + 1)}
                disabled={waterLoading}
                className={`w-9 h-9 rounded-full border-2 flex items-center justify-center transition-all ${
                  i < waterCount
                    ? 'bg-cyan-500 border-cyan-500 text-white scale-105'
                    : 'border-gray-200 dark:border-gray-700 text-gray-300 dark:text-gray-600 hover:border-cyan-300 dark:hover:border-cyan-700'
                }`}
              >
                <Droplets className="w-4 h-4" />
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Calorie Trend */}
      {weeklyCalorieData.length > 0 && (
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Activity className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              Weekly Calorie Trend
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <AreaChart data={weeklyCalorieData} height={120} color="#14b8a6" />
            <div className="flex items-center justify-center gap-4 mt-3 text-xs text-gray-500 dark:text-gray-400">
              <span>Target: <strong className="text-teal-600 dark:text-teal-400">{caloriesGoal} cal</strong></span>
              <span>Avg: <strong>{weeklyCalorieData.length > 0 ? Math.round(weeklyCalorieData.reduce((s, d) => s + d.value, 0) / weeklyCalorieData.length) : 0} cal</strong></span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Insight */}
      {macros[0].target > 0 && (
        <Card className="border-0 shadow-sm bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-950/30 dark:to-cyan-950/30">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-green-500 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {(() => {
                  const protPct = Math.min(Math.round((macros[0].current / macros[0].target) * 100), 100)
                  if (protPct >= 100) return 'Amazing! You hit your protein goal today.'
                  if (protPct >= 75) return `Almost there! ${macros[0].target - Math.round(macros[0].current)}g of protein left.`
                  return `You're at ${protPct}% of your protein goal. Keep going!`
                })()}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                {macros[0].current < macros[0].target ? 'Add a high-protein snack to stay on track.' : 'Great job maintaining your macros!'}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )

  /* ==================================================================== */
  /*  2. PLAN TAB                                                          */
  /* ==================================================================== */
  const renderPlan = () => {
    const mealPlanByType = {}
    currentDayEntries.forEach(e => {
      const type = e.meal_type || 'meal'
      if (!mealPlanByType[type]) mealPlanByType[type] = { name: e.name, cal: e.calories || 0, items: [] }
      else {
        mealPlanByType[type].cal += (e.calories || 0)
        mealPlanByType[type].items.push(e.name)
      }
    })

    const planCards = Object.keys(mealPlanByType).length > 0
      ? Object.entries(mealPlanByType)
      : currentDayEntries.map((e, i) => [e.meal_type || `meal-${i}`, { name: e.name, cal: e.calories || 0, items: [] }])

    const mealOrder = ['breakfast', 'lunch', 'dinner', 'snack']
    const sortedCards = [...planCards].sort((a, b) => {
      const aIdx = mealOrder.indexOf(a[0])
      const bIdx = mealOrder.indexOf(b[0])
      return (aIdx === -1 ? 99 : aIdx) - (bIdx === -1 ? 99 : bIdx)
    })

    const mealColors = {
      breakfast: 'from-amber-400 to-orange-400',
      lunch: 'from-green-400 to-teal-500',
      dinner: 'from-indigo-400 to-purple-500',
      snack: 'from-pink-400 to-rose-400',
    }

    return (
      <div className="space-y-5">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Meal Plan</h1>
          {activePlan && <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{activePlan.name}</p>}
        </div>

        {/* Day Selector */}
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide">
          {planDays.length > 0 ? planDays.map((day, i) => {
            const isToday = selectedDay === i
            return (
              <button
                key={day}
                onClick={() => setSelectedDay(i)}
                className={`flex flex-col items-center min-w-[3.5rem] py-2.5 px-3 rounded-2xl text-sm font-medium transition-all ${
                  isToday
                    ? 'bg-gradient-to-b from-teal-500 to-green-500 text-white shadow-lg shadow-teal-500/30 scale-105'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <span className="text-[10px] uppercase tracking-wider opacity-80">{typeof day === 'string' ? day.slice(0, 3) : 'Day'}</span>
                <span className="text-lg font-bold mt-0.5">{typeof day === 'number' ? day : i + 1}</span>
              </button>
            )
          }) : (
            ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
              <button
                key={day}
                onClick={() => setSelectedDay(i)}
                className={`flex flex-col items-center min-w-[3.5rem] py-2.5 px-3 rounded-2xl text-sm font-medium transition-all ${
                  selectedDay === i
                    ? 'bg-gradient-to-b from-teal-500 to-green-500 text-white shadow-lg shadow-teal-500/30 scale-105'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <span className="text-[10px] uppercase tracking-wider">{day}</span>
                <span className="text-lg font-bold mt-0.5">{i + 1}</span>
              </button>
            ))
          )}
        </div>

        {/* Meal Cards */}
        {sortedCards.length > 0 ? sortedCards.map(([key, meal]) => {
          const MealIcon = mealIcons[key] || UtensilsCrossed
          const gradient = mealColors[key] || 'from-gray-400 to-gray-500'
          return (
            <Card key={key} className="border-0 shadow-sm overflow-hidden hover:shadow-md transition">
              <CardContent className="p-0">
                <div className="flex items-stretch">
                  <div className={`w-16 bg-gradient-to-b ${gradient} flex items-center justify-center`}>
                    <MealIcon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 p-4 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider font-medium mb-0.5">{key}</p>
                      <p className="font-semibold text-sm text-gray-900 dark:text-white">{meal.name}</p>
                      {meal.items && meal.items.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          {meal.items.map((item, idx) => (
                            <span key={idx} className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">{item}</span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="text-right ml-3 flex-shrink-0">
                      <span className="text-lg font-bold text-teal-600 dark:text-teal-400">{meal.cal}</span>
                      <p className="text-[10px] text-gray-400">cal</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        }) : (
          <div className="text-center py-12">
            <CalendarDays className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
            <p className="text-sm text-gray-500 dark:text-gray-400">No meal plan entries for this day.</p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Generate an AI plan to get started.</p>
          </div>
        )}

        {/* Daily Total */}
        {currentDayEntries.length > 0 && (
          <Card className="border-0 shadow-sm bg-gradient-to-r from-teal-50 to-green-50 dark:from-teal-950/30 dark:to-green-950/30">
            <CardContent className="p-4 flex items-center justify-between">
              <span className="font-semibold text-gray-900 dark:text-white">Daily Total</span>
              <span className="text-2xl font-bold text-teal-600 dark:text-teal-400">
                {currentDayEntries.reduce((sum, e) => sum + (e.calories || 0), 0)} <span className="text-sm font-medium text-gray-400">cal</span>
              </span>
            </CardContent>
          </Card>
        )}

        {/* Generate AI Meal Plan */}
        <Button className="w-full h-12 rounded-xl bg-gradient-to-r from-teal-500 to-green-500 hover:from-teal-600 hover:to-green-600 text-white shadow-lg shadow-teal-500/20">
          <Sparkles className="w-5 h-5 mr-2" /> Generate AI Meal Plan
        </Button>

        {/* Weekly Summary */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Weekly Summary</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-2 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  {dailyLogs.length > 0
                    ? Math.round(dailyLogs.reduce((s, l) => s + (l.calories_consumed || 0), 0) / dailyLogs.length).toLocaleString()
                    : '0'}
                </p>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">Avg Calories</p>
              </div>
              <div className="p-2 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                <p className="text-xl font-bold text-teal-600 dark:text-teal-400">
                  {dailyLogs.length > 0
                    ? (() => {
                        const best = dailyLogs.reduce((a, b) => (Math.abs((a.calories_consumed || 0) - (a.calories_target || 2100)) < Math.abs((b.calories_consumed || 0) - (b.calories_target || 2100)) ? a : b))
                        const d = new Date(best.date)
                        return dayNames[d.getDay()].slice(0, 3)
                      })()
                    : '--'}
                </p>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">Best Day</p>
              </div>
              <div className="p-2 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                <p className="text-xl font-bold text-gray-900 dark:text-white">{planEntries.length}</p>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">Meals Planned</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  /* ==================================================================== */
  /*  3. RECIPES TAB                                                       */
  /* ==================================================================== */
  const renderRecipes = () => (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Recipes</h1>

      {/* Category Filter Pills */}
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide">
        {recipeCategories.map(cat => (
          <button
            key={cat}
            onClick={() => setRecipeFilter(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              recipeFilter === cat
                ? 'bg-gradient-to-r from-teal-500 to-green-500 text-white shadow-md shadow-teal-500/20'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Featured Recipe */}
      {featuredRecipe && (
        <Card className="border-0 shadow-lg overflow-hidden">
          <div className="h-40 bg-gradient-to-br from-teal-400 via-green-400 to-emerald-500 flex items-center justify-center relative">
            <UtensilsCrossed className="w-20 h-20 text-white/20" />
            <Badge className="absolute top-3 left-3 bg-white/20 text-white border-0 backdrop-blur-sm text-xs">
              <Star className="w-3 h-3 mr-1 fill-white" /> Featured
            </Badge>
            {featuredRecipe.difficulty && (
              <Badge className="absolute top-3 right-3 bg-black/20 text-white border-0 backdrop-blur-sm text-xs">{featuredRecipe.difficulty}</Badge>
            )}
          </div>
          <CardContent className="p-4">
            <h3 className="font-bold text-gray-900 dark:text-white text-lg">{featuredRecipe.title}</h3>
            {featuredRecipe.description && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{featuredRecipe.description}</p>
            )}
            <div className="flex items-center gap-4 mt-3">
              <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1"><Flame className="w-3 h-3 text-teal-500" /> {featuredRecipe.calories} cal</span>
              <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1"><Clock className="w-3 h-3 text-teal-500" /> {(featuredRecipe.prep_time || 0) + (featuredRecipe.cook_time || 0)} min</span>
              <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1"><Egg className="w-3 h-3 text-teal-500" /> {featuredRecipe.protein}g protein</span>
              {featuredRecipe.rating && (
                <span className="text-xs text-amber-500 flex items-center gap-1 ml-auto"><Star className="w-3 h-3 fill-amber-500" /> {featuredRecipe.rating}</span>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recipe Grid */}
      <div className="grid grid-cols-2 gap-3">
        {filteredRecipes.map((recipe, idx) => {
          const totalTime = (recipe.prep_time || 0) + (recipe.cook_time || 0)
          return (
            <Card key={recipe.id || idx} className="border-0 shadow-sm overflow-hidden hover:shadow-md transition cursor-pointer group">
              <div className={`h-24 bg-gradient-to-br ${recipeGradients[idx % recipeGradients.length]} flex items-center justify-center relative`}>
                <UtensilsCrossed className="w-8 h-8 text-white/30 group-hover:scale-110 transition-transform" />
                {recipe.difficulty && (
                  <Badge className="absolute top-2 left-2 bg-black/20 text-white border-0 text-[10px] backdrop-blur-sm">{recipe.difficulty}</Badge>
                )}
              </div>
              <CardContent className="p-3">
                <p className="font-semibold text-sm text-gray-900 dark:text-white truncate group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">{recipe.title}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-0.5"><Flame className="w-3 h-3" /> {recipe.calories} cal</span>
                  {totalTime > 0 && <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-0.5"><Clock className="w-3 h-3" /> {totalTime}m</span>}
                </div>
                {recipe.rating && (
                  <div className="flex items-center gap-1 mt-1.5">
                    <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                    <span className="text-xs text-amber-600 dark:text-amber-400">{recipe.rating}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {recipes.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
          <p className="text-sm text-gray-500 dark:text-gray-400">No recipes available yet.</p>
        </div>
      )}
    </div>
  )

  /* ==================================================================== */
  /*  4. GROCERY TAB                                                       */
  /* ==================================================================== */
  const renderGrocery = () => {
    const categoryNames = Object.keys(groceryByCategory)

    return (
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Grocery List</h1>
            {activeGroceryList?.name && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{activeGroceryList.name}</p>
            )}
          </div>
          {totalGrocery > 0 && (
            <Badge className="bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-400 border-0">
              {checkedGrocery}/{totalGrocery}
            </Badge>
          )}
        </div>

        {/* Progress */}
        {totalGrocery > 0 && (
          <Card className="border-0 shadow-sm bg-gradient-to-r from-teal-50 to-green-50 dark:from-teal-950/30 dark:to-green-950/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Shopping Progress</span>
                <span className="text-sm font-bold text-teal-600 dark:text-teal-400">{totalGrocery > 0 ? Math.round((checkedGrocery / totalGrocery) * 100) : 0}%</span>
              </div>
              <Progress value={totalGrocery > 0 ? Math.round((checkedGrocery / totalGrocery) * 100) : 0} className="h-3" />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                {checkedGrocery === totalGrocery && totalGrocery > 0
                  ? 'All done! Your cart is complete.'
                  : `${totalGrocery - checkedGrocery} items remaining`
                }
              </p>
            </CardContent>
          </Card>
        )}

        {/* Grouped Items */}
        {categoryNames.map(cat => {
          const items = groceryByCategory[cat]
          const CatIcon = categoryIcons[cat] || ShoppingCart
          const checkedInCat = items.filter(i => i.checked).length
          return (
            <Card key={cat} className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-teal-100 dark:bg-teal-900/40 flex items-center justify-center">
                    <CatIcon className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  </div>
                  <span className="font-semibold text-sm text-gray-900 dark:text-white flex-1">{cat}</span>
                  <span className="text-xs text-gray-400 dark:text-gray-500">{checkedInCat}/{items.length}</span>
                </div>
                <div className="space-y-1">
                  {items.map(item => (
                    <button
                      key={item.id}
                      onClick={() => activeGroceryList && handleToggleGroceryItem(activeGroceryList.id, item.id, item.checked)}
                      disabled={togglingItem === item.id}
                      className="w-full flex items-center gap-3 py-2.5 px-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition text-left group"
                    >
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0 ${
                        item.checked
                          ? 'bg-teal-500 border-teal-500'
                          : 'border-gray-300 dark:border-gray-600 group-hover:border-teal-400'
                      }`}>
                        {togglingItem === item.id ? (
                          <Loader2 className="w-3 h-3 animate-spin text-white" />
                        ) : item.checked ? (
                          <Check className="w-3 h-3 text-white" />
                        ) : null}
                      </div>
                      <span className={`text-sm flex-1 transition-all ${
                        item.checked
                          ? 'line-through text-gray-400 dark:text-gray-500'
                          : 'text-gray-700 dark:text-gray-300'
                      }`}>
                        {item.name}
                      </span>
                      {item.quantity && item.quantity > 1 && (
                        <span className="text-xs text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">x{item.quantity}</span>
                      )}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )
        })}

        {groceryItems.length === 0 && (
          <div className="text-center py-12">
            <ShoppingCart className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
            <p className="text-sm text-gray-500 dark:text-gray-400">No grocery list available yet.</p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Generate a meal plan to create one automatically.</p>
          </div>
        )}
      </div>
    )
  }

  /* ==================================================================== */
  /*  5. HEALTH TAB                                                        */
  /* ==================================================================== */
  const renderHealth = () => (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Health & Progress</h1>

      {/* Weight Progress Chart */}
      {weightChartData.length > 0 && (
        <Card className="border-0 shadow-lg overflow-hidden">
          <div className="h-1.5 bg-gradient-to-r from-teal-400 via-cyan-400 to-green-500" />
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm flex items-center gap-2">
                <Scale className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                Weight Progress
              </CardTitle>
              {weightChange && (
                <Badge className={`border-0 text-xs ${
                  weightChange.diff <= 0
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400'
                    : 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400'
                }`}>
                  {weightChange.diff <= 0 ? <ArrowDown className="w-3 h-3 mr-0.5 inline" /> : <ArrowUp className="w-3 h-3 mr-0.5 inline" />}
                  {Math.abs(weightChange.diff)} lbs
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <AreaChart data={weightChartData} height={140} color="#14b8a6" />
          </CardContent>
        </Card>
      )}

      {weightChartData.length === 0 && (
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6 text-center">
            <Scale className="w-10 h-10 text-gray-300 dark:text-gray-600 mx-auto mb-2" />
            <p className="text-sm text-gray-500 dark:text-gray-400">No weight data yet. Start logging to see your progress!</p>
          </CardContent>
        </Card>
      )}

      {/* Body Stats */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4 text-center">
            <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-900/40 flex items-center justify-center mx-auto mb-2">
              <Scale className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{currentWeight || '--'}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Current Weight {currentWeight ? 'lbs' : ''}</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4 text-center">
            <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/40 flex items-center justify-center mx-auto mb-2">
              <Target className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{targetWeight || '--'}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Target Weight {targetWeight ? 'lbs' : ''}</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4 text-center">
            <div className="w-10 h-10 rounded-xl bg-cyan-100 dark:bg-cyan-900/40 flex items-center justify-center mx-auto mb-2">
              <Activity className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{height || '--'}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Height {height ? 'in' : ''}</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4 text-center">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center mx-auto mb-2">
              <Heart className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{bmi || '--'}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">BMI</p>
          </CardContent>
        </Card>
      </div>

      {/* Goal Card */}
      <Card className="border-0 shadow-sm bg-gradient-to-r from-teal-50 to-green-50 dark:from-teal-950/30 dark:to-green-950/30">
        <CardContent className="p-4 flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-400 to-green-500 flex items-center justify-center shadow-lg flex-shrink-0">
            <TrendingDown className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-sm text-gray-900 dark:text-white capitalize">{profile?.goal || 'Set your goal'}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              {profile?.diet_type ? `${profile.diet_type} diet` : 'Configure your diet type'}
              {currentWeight && targetWeight ? ` - ${Math.abs(currentWeight - targetWeight).toFixed(1)} lbs to go` : ''}
            </p>
          </div>
          {currentWeight && targetWeight && (
            <Badge className={`border-0 text-xs ${
              (profile?.goal || '').toLowerCase().includes('loss')
                ? (currentWeight <= targetWeight ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400' : 'bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-400')
                : 'bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-400'
            }`}>
              {currentWeight <= targetWeight && (profile?.goal || '').toLowerCase().includes('loss') ? 'Goal Reached!' : 'In Progress'}
            </Badge>
          )}
        </CardContent>
      </Card>

      {/* Water Tracking Ring */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <Droplets className="w-4 h-4 text-cyan-500" />
            Today&apos;s Hydration
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center pb-5">
          <ProgressRing
            value={Math.min(waterCount, waterTarget)}
            max={waterTarget}
            size={110}
            strokeWidth={10}
            color="stroke-cyan-500"
          >
            <div className="text-center">
              <span className="text-xl font-bold text-gray-900 dark:text-white">{waterCount}</span>
              <span className="text-xs text-gray-400">/{waterTarget}</span>
            </div>
          </ProgressRing>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">glasses today</p>
          <div className="flex gap-1.5 mt-3">
            {Array.from({ length: waterTarget }).map((_, i) => (
              <button
                key={i}
                onClick={() => handleWaterClick(i + 1)}
                disabled={waterLoading}
                className={`w-7 h-8 rounded-md border-2 flex items-center justify-center transition-all ${
                  i < waterCount
                    ? 'bg-cyan-100 dark:bg-cyan-900/40 border-cyan-400 dark:border-cyan-600'
                    : 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 hover:border-cyan-300'
                }`}
              >
                {i < waterCount && <Droplets className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Daily Calorie History */}
      {weeklyCalorieData.length > 0 && (
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Flame className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              Calorie History
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <AreaChart data={weeklyCalorieData} height={120} color="#14b8a6" />
            <div className="flex items-center justify-center gap-4 mt-3 text-xs text-gray-500 dark:text-gray-400">
              <span>Target: <strong className="text-teal-600 dark:text-teal-400">{caloriesGoal} cal</strong></span>
              <span>Avg: <strong>{weeklyCalorieData.length > 0 ? Math.round(weeklyCalorieData.reduce((s, d) => s + d.value, 0) / weeklyCalorieData.length) : 0} cal</strong></span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Dietary Restrictions */}
      {profile?.restrictions && (Array.isArray(profile.restrictions) ? profile.restrictions.length > 0 : !!profile.restrictions) && (
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Dietary Restrictions</p>
            <div className="flex flex-wrap gap-1.5">
              {(Array.isArray(profile.restrictions) ? profile.restrictions : [profile.restrictions]).map((r, i) => (
                <Badge key={i} className="bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300 border-0 text-xs">{r}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )

  /* ---- MAIN RENDER ---- */
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return renderDashboard()
      case 'plan': return renderPlan()
      case 'recipes': return renderRecipes()
      case 'grocery': return renderGrocery()
      case 'health': return renderHealth()
      default: return renderDashboard()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
      {/* Theme Switcher */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeSwitcher />
      </div>

      {/* App Container */}
      <div className="max-w-[430px] mx-auto min-h-screen bg-white dark:bg-gray-900 shadow-2xl relative">
        {/* Scrollable Content */}
        <div className="pb-24 pt-6 px-5 overflow-y-auto">
          {renderContent()}
        </div>

        {/* Bottom Tab Bar */}
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-t border-gray-100 dark:border-gray-800 z-40">
          <div className="flex items-center justify-around py-2 px-2">
            {tabs.map(tab => {
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col items-center gap-0.5 py-1.5 px-3 rounded-xl transition-all ${
                    isActive
                      ? 'text-teal-600 dark:text-teal-400'
                      : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
                  }`}
                >
                  <div className={`relative ${isActive ? '' : ''}`}>
                    <tab.icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : ''}`} />
                    {isActive && (
                      <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-teal-500" />
                    )}
                  </div>
                  <span className="text-[10px] font-medium mt-0.5">{tab.label}</span>
                </button>
              )
            })}
          </div>
          {/* Safe area spacer for notched phones */}
          <div className="h-[env(safe-area-inset-bottom,0px)]" />
        </nav>
      </div>
    </div>
  )
}
