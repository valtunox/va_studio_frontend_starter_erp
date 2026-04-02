import { useState, useMemo } from 'react'
import {
  Rocket, User, Building2, Settings, CheckCircle2, ArrowRight, ArrowLeft,
  Upload, Globe, Palette, Bell, Shield, Zap, Mail,
  Camera, Sparkles, Users, Monitor, Clock, AlertCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ThemeSwitcher } from '@/components/shared/ThemeSwitcher'

const steps = [
  { id: 1, label: 'Personal', icon: User },
  { id: 2, label: 'Organization', icon: Building2 },
  { id: 3, label: 'Preferences', icon: Settings },
  { id: 4, label: 'Welcome', icon: CheckCircle2 },
]

const companySizes = ['1-10', '11-50', '51-200', '201-1000', '1000+']
const industries = ['Technology', 'Finance', 'Healthcare', 'Education', 'E-Commerce', 'Marketing', 'Other']
const timezones = ['UTC-8 (PST)', 'UTC-5 (EST)', 'UTC+0 (GMT)', 'UTC+1 (CET)', 'UTC+5:30 (IST)', 'UTC+8 (CST)', 'UTC+9 (JST)']

const themeOptions = [
  { id: 'light', label: 'Light', colors: ['#f8fafc', '#e2e8f0', '#94a3b8'] },
  { id: 'dark', label: 'Dark', colors: ['#0f172a', '#1e293b', '#475569'] },
  { id: 'purple', label: 'Purple', colors: ['#7c3aed', '#a855f7', '#c084fc'] },
  { id: 'ocean', label: 'Ocean', colors: ['#0ea5e9', '#38bdf8', '#7dd3fc'] },
]

const notifOptions = [
  { id: 'product', label: 'Product updates', desc: 'New features and improvements', default: true },
  { id: 'security', label: 'Security alerts', desc: 'Account and login notifications', default: true },
  { id: 'marketing', label: 'Tips & tutorials', desc: 'Best practices and guides', default: false },
]

function ProgressRing({ percent, size = 56, stroke = 4 }) {
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percent / 100) * circumference
  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth={stroke} />
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="url(#ringGrad)" strokeWidth={stroke} strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset} className="transition-all duration-700" />
      <defs>
        <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
      </defs>
    </svg>
  )
}

function App({ onNavigate }) {
  const [currentStep, setCurrentStep] = useState(1)

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [bio, setBio] = useState('')

  const [companyName, setCompanyName] = useState('')
  const [companySize, setCompanySize] = useState('')
  const [industry, setIndustry] = useState('')
  const [website, setWebsite] = useState('')

  const [selectedTheme, setSelectedTheme] = useState('light')
  const [timezone, setTimezone] = useState('')
  const [notifs, setNotifs] = useState({ product: true, security: true, marketing: false })

  const [errors, setErrors] = useState({})

  const toggleNotif = (key) => setNotifs(prev => ({ ...prev, [key]: !prev[key] }))

  const completionPercent = useMemo(() => {
    const fields = [firstName, lastName, userEmail, bio, companyName, companySize, industry, website, selectedTheme, timezone]
    const filled = fields.filter(Boolean).length
    return Math.round((filled / fields.length) * 100)
  }, [firstName, lastName, userEmail, bio, companyName, companySize, industry, website, selectedTheme, timezone])

  const validate = (step) => {
    const e = {}
    if (step === 1) {
      if (!firstName.trim()) e.firstName = 'First name is required'
      if (!lastName.trim()) e.lastName = 'Last name is required'
      if (!userEmail.trim()) e.userEmail = 'Email is required'
      else if (!/\S+@\S+\.\S+/.test(userEmail)) e.userEmail = 'Invalid email format'
    }
    if (step === 2) {
      if (!companyName.trim()) e.companyName = 'Company name is required'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const nextStep = () => {
    if (validate(currentStep)) {
      setCurrentStep(Math.min(4, currentStep + 1))
    }
  }
  const prevStep = () => {
    setErrors({})
    setCurrentStep(Math.max(1, currentStep - 1))
  }
  const skipStep = () => {
    setErrors({})
    setCurrentStep(Math.min(4, currentStep + 1))
  }

  return (
    <div className="min-h-screen font-sans flex flex-col relative overflow-hidden">
      <ThemeSwitcher />

      <style>{`
        .gradient-mesh {
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 25%, #a855f7 50%, #6366f1 75%, #4f46e5 100%);
          background-size: 400% 400%;
          animation: meshMove 15s ease infinite;
        }
        @keyframes meshMove {
          0%, 100% { background-position: 0% 50%; }
          25% { background-position: 100% 0%; }
          50% { background-position: 100% 100%; }
          75% { background-position: 0% 100%; }
        }
        @keyframes float1 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(25px, -25px); }
        }
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-30px, 15px); }
        }
        .shape-1 { animation: float1 20s ease-in-out infinite; }
        .shape-2 { animation: float2 24s ease-in-out infinite; }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(24px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .slide-in { animation: slideIn 0.4s ease-out; }
        @keyframes confetti-fall {
          0% { transform: translateY(-100vh) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        .confetti-piece {
          position: fixed;
          width: 10px;
          height: 10px;
          top: -10px;
          z-index: 50;
          pointer-events: none;
          animation: confetti-fall linear forwards;
        }
        .confetti-piece:nth-child(odd) { border-radius: 50%; }
        .confetti-piece:nth-child(even) { border-radius: 2px; }
      `}</style>

      {/* Background */}
      <div className="fixed inset-0 gradient-mesh" />
      <div className="fixed inset-0 bg-black/10 dark:bg-black/30" />
      <div className="shape-1 fixed top-[5%] right-[10%] w-80 h-80 rounded-full bg-white/5 blur-3xl pointer-events-none" />
      <div className="shape-2 fixed bottom-[5%] left-[5%] w-96 h-96 rounded-full bg-purple-400/10 blur-3xl pointer-events-none" />

      {/* Confetti on step 4 */}
      {currentStep === 4 && (
        <>
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={i}
              className="confetti-piece"
              style={{
                left: `${Math.random() * 100}%`,
                backgroundColor: ['#a855f7', '#6366f1', '#f59e0b', '#10b981', '#ef4444', '#3b82f6', '#ec4899'][i % 7],
                width: `${6 + Math.random() * 8}px`,
                height: `${6 + Math.random() * 8}px`,
                animationDuration: `${2 + Math.random() * 3}s`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </>
      )}

      {/* Header */}
      <header className="relative z-20 h-16 flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20">
            <Rocket className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white font-display">VA Studio</span>
        </div>
        <div className="flex items-center gap-4">
          {/* Progress Ring */}
          <div className="relative flex items-center justify-center">
            <ProgressRing percent={completionPercent} size={44} stroke={3} />
            <span className="absolute text-[10px] font-bold text-white">{completionPercent}%</span>
          </div>
          {currentStep < 4 && (
            <button onClick={skipStep} className="text-sm text-white/50 hover:text-white/80 transition-colors">
              Skip
            </button>
          )}
        </div>
      </header>

      {/* Step Indicator */}
      <div className="relative z-20 px-6 pb-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between">
            {steps.map((step, i) => {
              const Icon = step.icon
              const isActive = currentStep === step.id
              const isComplete = currentStep > step.id
              return (
                <div key={step.id} className="flex items-center">
                  <div className="flex items-center gap-2">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all border ${
                      isComplete
                        ? 'bg-emerald-500/80 border-emerald-400/50 text-white'
                        : isActive
                          ? 'bg-white/20 backdrop-blur-md border-white/30 text-white'
                          : 'bg-white/5 border-white/10 text-white/30'
                    }`}>
                      {isComplete ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-4 h-4" />}
                    </div>
                    <span className={`text-sm font-medium hidden sm:block transition-colors ${
                      isActive ? 'text-white' : isComplete ? 'text-white/70' : 'text-white/30'
                    }`}>
                      {step.label}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className={`w-12 sm:w-20 h-0.5 mx-2 sm:mx-4 rounded-full transition-colors ${
                      currentStep > step.id ? 'bg-emerald-400/60' : 'bg-white/10'
                    }`} />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="relative z-20 flex-1 flex items-start justify-center px-6 pb-10">
        <div className="w-full max-w-2xl">

          {/* Step 1: Personal Info */}
          {currentStep === 1 && (
            <div className="slide-in backdrop-blur-xl bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 rounded-3xl p-8 shadow-2xl shadow-black/10">
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-4">
                  <User className="w-7 h-7 text-purple-300" />
                </div>
                <h2 className="text-2xl font-bold text-white font-display">Tell us about yourself</h2>
                <p className="text-white/50 mt-2">Let's personalize your experience</p>
              </div>

              {/* Avatar */}
              <div className="flex justify-center mb-8">
                <div className="relative group">
                  <div className="w-24 h-24 rounded-full bg-white/10 border-2 border-dashed border-white/20 flex items-center justify-center group-hover:border-white/40 transition-colors cursor-pointer">
                    <Camera className="w-8 h-8 text-white/30 group-hover:text-white/50 transition-colors" />
                  </div>
                  <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center shadow-lg hover:bg-purple-400 transition-colors">
                    <Upload className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-white/70">First name *</Label>
                  <Input
                    placeholder="John"
                    value={firstName}
                    onChange={(e) => { setFirstName(e.target.value); setErrors(prev => ({ ...prev, firstName: undefined })) }}
                    className={`h-12 bg-white/5 border-white/15 text-white placeholder:text-white/30 rounded-xl focus:border-white/30 focus:ring-white/10 ${errors.firstName ? 'border-red-400/60' : ''}`}
                  />
                  {errors.firstName && (
                    <p className="text-xs text-red-400 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.firstName}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-white/70">Last name *</Label>
                  <Input
                    placeholder="Doe"
                    value={lastName}
                    onChange={(e) => { setLastName(e.target.value); setErrors(prev => ({ ...prev, lastName: undefined })) }}
                    className={`h-12 bg-white/5 border-white/15 text-white placeholder:text-white/30 rounded-xl focus:border-white/30 focus:ring-white/10 ${errors.lastName ? 'border-red-400/60' : ''}`}
                  />
                  {errors.lastName && (
                    <p className="text-xs text-red-400 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.lastName}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2 mt-4">
                <Label className="text-sm font-medium text-white/70">Email address *</Label>
                <div className="relative">
                  <Input
                    type="email"
                    placeholder="john@company.com"
                    value={userEmail}
                    onChange={(e) => { setUserEmail(e.target.value); setErrors(prev => ({ ...prev, userEmail: undefined })) }}
                    className={`h-12 pl-11 bg-white/5 border-white/15 text-white placeholder:text-white/30 rounded-xl focus:border-white/30 focus:ring-white/10 ${errors.userEmail ? 'border-red-400/60' : ''}`}
                  />
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                </div>
                {errors.userEmail && (
                  <p className="text-xs text-red-400 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.userEmail}</p>
                )}
              </div>

              <div className="space-y-2 mt-4">
                <Label className="text-sm font-medium text-white/70">Short bio</Label>
                <textarea
                  placeholder="Tell us a little about what you do..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={3}
                  className="w-full bg-white/5 border border-white/15 text-white placeholder:text-white/30 rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/10"
                />
              </div>
            </div>
          )}

          {/* Step 2: Organization */}
          {currentStep === 2 && (
            <div className="slide-in backdrop-blur-xl bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 rounded-3xl p-8 shadow-2xl shadow-black/10">
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-4">
                  <Building2 className="w-7 h-7 text-purple-300" />
                </div>
                <h2 className="text-2xl font-bold text-white font-display">Organization setup</h2>
                <p className="text-white/50 mt-2">Help us customize your workspace</p>
              </div>

              <div className="space-y-5">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-white/70">Company name *</Label>
                  <div className="relative">
                    <Input
                      placeholder="Acme Inc."
                      value={companyName}
                      onChange={(e) => { setCompanyName(e.target.value); setErrors(prev => ({ ...prev, companyName: undefined })) }}
                      className={`h-12 pl-11 bg-white/5 border-white/15 text-white placeholder:text-white/30 rounded-xl focus:border-white/30 focus:ring-white/10 ${errors.companyName ? 'border-red-400/60' : ''}`}
                    />
                    <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  </div>
                  {errors.companyName && (
                    <p className="text-xs text-red-400 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.companyName}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-white/70">Company size</Label>
                  <div className="flex flex-wrap gap-2">
                    {companySizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setCompanySize(size)}
                        className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all border ${
                          companySize === size
                            ? 'bg-purple-500/30 border-purple-400/50 text-white'
                            : 'bg-white/5 border-white/10 text-white/50 hover:border-white/20 hover:text-white/70'
                        }`}
                      >
                        <Users className="w-3.5 h-3.5 inline mr-1.5" />{size}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-white/70">Industry</Label>
                  <div className="flex flex-wrap gap-2">
                    {industries.map((ind) => (
                      <button
                        key={ind}
                        onClick={() => setIndustry(ind)}
                        className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all border ${
                          industry === ind
                            ? 'bg-purple-500/30 border-purple-400/50 text-white'
                            : 'bg-white/5 border-white/10 text-white/50 hover:border-white/20 hover:text-white/70'
                        }`}
                      >
                        {ind}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-white/70">Website</Label>
                  <div className="relative">
                    <Input
                      placeholder="https://yourcompany.com"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      className="h-12 pl-11 bg-white/5 border-white/15 text-white placeholder:text-white/30 rounded-xl focus:border-white/30 focus:ring-white/10"
                    />
                    <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Preferences */}
          {currentStep === 3 && (
            <div className="slide-in backdrop-blur-xl bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 rounded-3xl p-8 shadow-2xl shadow-black/10">
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-4">
                  <Palette className="w-7 h-7 text-purple-300" />
                </div>
                <h2 className="text-2xl font-bold text-white font-display">Your preferences</h2>
                <p className="text-white/50 mt-2">Customize your workspace experience</p>
              </div>

              <div className="space-y-6">
                {/* Theme Selection */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-white/70">Theme</Label>
                  <div className="grid grid-cols-4 gap-3">
                    {themeOptions.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setSelectedTheme(t.id)}
                        className={`p-4 rounded-xl border text-center transition-all ${
                          selectedTheme === t.id
                            ? 'bg-purple-500/20 border-purple-400/50'
                            : 'bg-white/5 border-white/10 hover:border-white/20'
                        }`}
                      >
                        <div className="flex justify-center gap-1 mb-2">
                          {t.colors.map((c) => (
                            <div key={c} className="w-4 h-4 rounded-full border border-white/10" style={{ backgroundColor: c }} />
                          ))}
                        </div>
                        <span className={`text-xs font-medium ${selectedTheme === t.id ? 'text-white' : 'text-white/50'}`}>{t.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Notifications */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-white/70">Notifications</Label>
                  <div className="space-y-2">
                    {notifOptions.map((opt) => (
                      <div
                        key={opt.id}
                        className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center">
                            <Bell className="w-4 h-4 text-purple-300" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white">{opt.label}</p>
                            <p className="text-xs text-white/40">{opt.desc}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => toggleNotif(opt.id)}
                          className={`relative w-11 h-6 rounded-full transition-colors ${notifs[opt.id] ? 'bg-purple-500' : 'bg-white/15'}`}
                        >
                          <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${notifs[opt.id] ? 'translate-x-5' : 'translate-x-0.5'}`} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Timezone */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-white/70">Timezone</Label>
                  <div className="relative">
                    <select
                      value={timezone}
                      onChange={(e) => setTimezone(e.target.value)}
                      className="w-full h-12 pl-11 pr-4 bg-white/5 border border-white/15 text-white rounded-xl appearance-none focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/10 text-sm"
                    >
                      <option value="" className="bg-slate-900">Select timezone...</option>
                      {timezones.map((tz) => (
                        <option key={tz} value={tz} className="bg-slate-900">{tz}</option>
                      ))}
                    </select>
                    <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Welcome / Confirmation */}
          {currentStep === 4 && (
            <div className="slide-in backdrop-blur-xl bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 rounded-3xl p-10 shadow-2xl shadow-black/10">
              <div className="text-center">
                {/* Animated Success */}
                <div className="relative w-28 h-28 mx-auto mb-8">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-400/30 to-emerald-600/30 animate-ping" style={{ animationDuration: '2s' }} />
                  <div className="absolute inset-2 rounded-full bg-gradient-to-br from-emerald-400/20 to-emerald-600/20 animate-pulse" />
                  <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                    <CheckCircle2 className="w-14 h-14 text-white" />
                  </div>
                </div>

                <h2 className="text-3xl font-bold text-white font-display mb-3">Welcome aboard, {firstName || 'there'}!</h2>
                <p className="text-white/50 text-lg mb-10 max-w-md mx-auto">
                  Your workspace is ready. Start building something extraordinary.
                </p>

                {/* Summary Cards */}
                <div className="grid grid-cols-3 gap-4 mb-10 max-w-md mx-auto">
                  {[
                    { icon: Sparkles, value: '20+', label: 'Templates' },
                    { icon: Zap, value: 'AI', label: 'Powered' },
                    { icon: Shield, value: '24/7', label: 'Support' },
                  ].map(({ icon: Icon, value, label }) => (
                    <div key={label} className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <Icon className="w-5 h-5 text-purple-300 mx-auto mb-2" />
                      <p className="text-xl font-bold text-white font-display">{value}</p>
                      <p className="text-[11px] text-white/40">{label}</p>
                    </div>
                  ))}
                </div>

                {/* Profile Summary */}
                {(firstName || companyName) && (
                  <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-5 mb-8 max-w-sm mx-auto text-left">
                    <p className="text-xs text-white/30 uppercase tracking-wider mb-3 font-medium">Your profile</p>
                    {firstName && <p className="text-sm text-white/70"><span className="text-white/40">Name:</span> {firstName} {lastName}</p>}
                    {userEmail && <p className="text-sm text-white/70 mt-1"><span className="text-white/40">Email:</span> {userEmail}</p>}
                    {companyName && <p className="text-sm text-white/70 mt-1"><span className="text-white/40">Company:</span> {companyName}</p>}
                    {industry && <p className="text-sm text-white/70 mt-1"><span className="text-white/40">Industry:</span> {industry}</p>}
                  </div>
                )}

                {/* CTA */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button className="h-12 px-8 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white rounded-xl font-semibold shadow-lg shadow-purple-500/25">
                    <Sparkles className="w-4 h-4 mr-2" /> Explore Templates
                  </Button>
                  <Button variant="outline" className="h-12 px-8 rounded-xl border-white/20 text-white hover:bg-white/10">
                    Go to Dashboard <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          {currentStep < 4 && (
            <div className="flex items-center justify-between mt-6">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/15 text-white/60 hover:text-white hover:border-white/30 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <span className="text-sm text-white/40">
                Step {currentStep} of {steps.length}
              </span>
              <button
                onClick={nextStep}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold shadow-lg shadow-purple-500/25 transition-all"
              >
                {currentStep === 3 ? 'Complete' : 'Continue'} <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default App
