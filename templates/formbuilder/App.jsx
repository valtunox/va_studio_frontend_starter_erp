import { useState, useCallback } from 'react'
import {
  User, Mail, Lock, Eye, EyeOff, ArrowRight, ArrowLeft, Phone, Calendar,
  Upload, Camera, Shield, Zap, Globe, Check, X, Loader2, Building2,
  Users, Sparkles, CheckCircle2, Star, KeyRound, Smartphone, AtSign,
  Briefcase, Factory, MessageSquare, Heart, FileText, PartyPopper,
  ChevronDown, Radio, ToggleLeft, ToggleRight, Search, Megaphone, UserPlus
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { ThemeSwitcher } from '@/components/shared/ThemeSwitcher'

const steps = [
  { id: 1, label: 'Personal', icon: User },
  { id: 2, label: 'Account', icon: KeyRound },
  { id: 3, label: 'Preferences', icon: Briefcase },
  { id: 4, label: 'Review', icon: CheckCircle2 },
]

const countryCodes = [
  { code: '+1', label: 'US' },
  { code: '+44', label: 'UK' },
  { code: '+91', label: 'IN' },
  { code: '+49', label: 'DE' },
  { code: '+33', label: 'FR' },
  { code: '+81', label: 'JP' },
]

const teamSizes = [
  { id: 'solo', label: 'Solo', desc: 'Just me', icon: User },
  { id: 'small', label: 'Small Team', desc: '2-10 members', icon: Users },
  { id: 'medium', label: 'Medium', desc: '11-50 members', icon: Building2 },
  { id: 'enterprise', label: 'Enterprise', desc: '50+ members', icon: Globe },
]

const twoFAOptions = [
  { id: 'sms', label: 'SMS', icon: Smartphone },
  { id: 'authenticator', label: 'Authenticator', icon: Shield },
  { id: 'email', label: 'Email', icon: Mail },
]

const hearAboutOptions = ['Social Media', 'Blog Post', 'Friend Referral', 'Search Engine', 'Other']

const roles = ['Developer', 'Designer', 'Product Manager', 'Founder / CEO', 'Marketing', 'Student', 'Other']
const industries = ['Technology', 'Finance', 'Healthcare', 'Education', 'E-Commerce', 'Media', 'Other']

const benefits = [
  { icon: Sparkles, title: 'AI-Powered Tools', desc: 'Build faster with intelligent assistance' },
  { icon: Zap, title: 'Lightning Fast', desc: 'Optimized for speed and performance' },
  { icon: Shield, title: 'Enterprise Security', desc: 'SOC2 compliant, end-to-end encrypted' },
]

function getPasswordStrength(pw) {
  let score = 0
  if (pw.length >= 8) score++
  if (/[A-Z]/.test(pw)) score++
  if (/[0-9]/.test(pw)) score++
  if (/[^A-Za-z0-9]/.test(pw)) score++
  return score
}

const strengthConfig = [
  { label: '', color: 'bg-muted', width: 0 },
  { label: 'Weak', color: 'bg-red-500', width: 25 },
  { label: 'Fair', color: 'bg-orange-400', width: 50 },
  { label: 'Strong', color: 'bg-emerald-400', width: 75 },
  { label: 'Very Strong', color: 'bg-emerald-500', width: 100 },
]

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function StepIndicator({ currentStep }) {
  const progress = ((currentStep - 1) / (steps.length - 1)) * 100
  return (
    <div className="w-full mb-8">
      <Progress value={progress} className="h-2 mb-4" />
      <div className="flex justify-between">
        {steps.map((step) => {
          const Icon = step.icon
          const isActive = currentStep === step.id
          const isCompleted = currentStep > step.id
          return (
            <div key={step.id} className="flex flex-col items-center gap-1.5">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                  isCompleted
                    ? 'bg-emerald-500 text-white'
                    : isActive
                    ? 'bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-lg shadow-purple-500/25'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {isCompleted ? <Check className="w-4 h-4" /> : step.id}
              </div>
              <span
                className={`text-xs font-medium hidden sm:block ${
                  isActive ? 'text-foreground' : 'text-muted-foreground'
                }`}
              >
                {step.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function RightPanel() {
  return (
    <div className="hidden lg:flex lg:w-5/12 relative overflow-hidden flex-col justify-between p-10 bg-gradient-to-br from-purple-600 via-indigo-600 to-violet-700 text-white">
      <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
      <div className="absolute bottom-0 left-0 w-56 h-56 bg-indigo-400/20 rounded-full translate-y-1/3 -translate-x-1/3 blur-2xl" />
      <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-purple-300/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-xl" />

      <div className="relative z-10">
        <div className="flex items-center gap-2.5 mb-2">
          <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight">VA Studio</span>
        </div>
        <p className="text-sm text-white/70">Build something extraordinary</p>
      </div>

      <div className="relative z-10 space-y-5">
        {benefits.map((b, i) => {
          const Icon = b.icon
          return (
            <div key={i} className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white/10 backdrop-blur-sm">
              <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">{b.title}</h4>
                <p className="text-xs text-white/70 mt-0.5">{b.desc}</p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="relative z-10 space-y-4">
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full border-2 border-white/30 bg-gradient-to-br from-purple-300 to-indigo-400 flex items-center justify-center text-[10px] font-bold"
              >
                {String.fromCharCode(65 + i)}
              </div>
            ))}
          </div>
          <div className="text-sm">
            <span className="font-semibold">50,000+</span>
            <span className="text-white/70"> users joined</span>
          </div>
        </div>

        <Card className="bg-white/10 border-white/10 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-xs text-white/90 italic leading-relaxed">
              &ldquo;The onboarding was seamless. I was up and running in under 2 minutes. Incredible developer experience!&rdquo;
            </p>
            <p className="text-xs text-white/60 mt-2 font-medium">— Sarah K., Staff Engineer</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function App({ onNavigate }) {
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [countryOpen, setCountryOpen] = useState(false)

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    countryCode: '+1',
    dob: '',
    profilePhoto: null,
    username: '',
    password: '',
    confirmPassword: '',
    twoFA: 'authenticator',
    recoveryEmail: '',
    role: '',
    industry: '',
    company: '',
    teamSize: '',
    hearAbout: [],
    newsletter: true,
    commProductUpdates: true,
    commSecurityAlerts: true,
    commTips: false,
    agreeTerms: false,
    agreePrivacy: false,
  })

  const updateForm = useCallback((field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }, [])

  const toggleHearAbout = (option) => {
    setForm((prev) => ({
      ...prev,
      hearAbout: prev.hearAbout.includes(option)
        ? prev.hearAbout.filter((o) => o !== option)
        : [...prev.hearAbout, option],
    }))
  }

  const strength = getPasswordStrength(form.password)
  const cfg = strengthConfig[strength]
  const emailValid = form.email ? isValidEmail(form.email) : null
  const passwordsMatch = form.password && form.confirmPassword && form.password === form.confirmPassword
  const usernameAvailable = form.username.length >= 3

  const goNext = () => setCurrentStep((s) => Math.min(s + 1, 4))
  const goBack = () => setCurrentStep((s) => Math.max(s - 1, 1))

  const handleSubmit = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 2000)
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="absolute top-4 right-4"><ThemeSwitcher /></div>
        <Card className="max-w-md w-full text-center">
          <CardContent className="p-10 space-y-5">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/25">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Welcome aboard!</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Your account has been created successfully. We sent a verification email to{' '}
              <span className="font-semibold text-foreground">{form.email}</span>.
            </p>
            <div className="pt-2 flex flex-col gap-2">
              <Button className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white">
                Go to Dashboard <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
              <Button variant="ghost" className="w-full text-muted-foreground" onClick={() => { setSubmitted(false); setCurrentStep(1) }}>
                Start Over
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left side - Form */}
      <div className="flex-1 flex flex-col p-6 sm:p-8 lg:p-12 overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 lg:hidden">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-foreground">VA Studio</span>
          </div>
          <ThemeSwitcher />
        </div>

        <div className="max-w-lg w-full mx-auto flex-1">
          <StepIndicator currentStep={currentStep} />

          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground">
              {currentStep === 1 && 'Personal Information'}
              {currentStep === 2 && 'Account Setup'}
              {currentStep === 3 && 'Preferences & Profile'}
              {currentStep === 4 && 'Review & Submit'}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {currentStep === 1 && 'Tell us a bit about yourself to get started.'}
              {currentStep === 2 && 'Secure your account with a strong password.'}
              {currentStep === 3 && 'Customize your experience.'}
              {currentStep === 4 && 'Double-check everything before creating your account.'}
            </p>
          </div>

          {/* Step 1 - Personal Information */}
          {currentStep === 1 && (
            <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="firstName">First Name <span className="text-red-500">*</span></Label>
                  <Input id="firstName" placeholder="John" value={form.firstName} onChange={(e) => updateForm('firstName', e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="lastName">Last Name <span className="text-red-500">*</span></Label>
                  <Input id="lastName" placeholder="Doe" value={form.lastName} onChange={(e) => updateForm('lastName', e.target.value)} />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="email">Email Address <span className="text-red-500">*</span></Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input id="email" type="email" className="pl-10 pr-10" placeholder="john@example.com" value={form.email} onChange={(e) => updateForm('email', e.target.value)} />
                  {emailValid !== null && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      {emailValid ? <Check className="w-4 h-4 text-emerald-500" /> : <X className="w-4 h-4 text-red-500" />}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="flex gap-2">
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setCountryOpen(!countryOpen)}
                      className="h-9 px-3 rounded-md border border-input bg-background text-sm flex items-center gap-1.5 hover:bg-accent transition-colors min-w-[90px]"
                    >
                      {form.countryCode} <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
                    </button>
                    {countryOpen && (
                      <div className="absolute top-full mt-1 left-0 z-50 bg-popover border border-border rounded-lg shadow-xl p-1 min-w-[120px]">
                        {countryCodes.map((c) => (
                          <button
                            key={c.code}
                            className="w-full px-3 py-1.5 text-sm text-left rounded hover:bg-accent transition-colors flex items-center justify-between"
                            onClick={() => { updateForm('countryCode', c.code); setCountryOpen(false) }}
                          >
                            <span>{c.label}</span>
                            <span className="text-muted-foreground">{c.code}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <Input id="phone" type="tel" className="flex-1" placeholder="(555) 123-4567" value={form.phone} onChange={(e) => updateForm('phone', e.target.value)} />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="dob">Date of Birth</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input id="dob" type="date" className="pl-10" value={form.dob} onChange={(e) => updateForm('dob', e.target.value)} />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label>Profile Photo</Label>
                <div
                  className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-purple-400 hover:bg-purple-50/50 dark:hover:bg-purple-950/20 transition-all cursor-pointer group"
                  onClick={() => updateForm('profilePhoto', 'uploaded')}
                >
                  <div className="w-12 h-12 rounded-full bg-muted mx-auto flex items-center justify-center mb-3 group-hover:bg-purple-100 dark:group-hover:bg-purple-900/30 transition-colors">
                    {form.profilePhoto ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                    ) : (
                      <Camera className="w-6 h-6 text-muted-foreground group-hover:text-purple-500 transition-colors" />
                    )}
                  </div>
                  <p className="text-sm font-medium text-foreground">
                    {form.profilePhoto ? 'Photo uploaded!' : 'Click to upload or drag & drop'}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 5MB</p>
                </div>
              </div>
            </div>
          )}

          {/* Step 2 - Account Setup */}
          {currentStep === 2 && (
            <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="space-y-1.5">
                <Label htmlFor="username">Username <span className="text-red-500">*</span></Label>
                <div className="relative">
                  <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input id="username" className="pl-10 pr-10" placeholder="johndoe" value={form.username} onChange={(e) => updateForm('username', e.target.value)} />
                  {form.username.length > 0 && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      {usernameAvailable ? (
                        <Check className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <X className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                  )}
                </div>
                {form.username.length > 0 && (
                  <p className={`text-xs mt-1 ${usernameAvailable ? 'text-emerald-500' : 'text-red-500'}`}>
                    {usernameAvailable ? 'Username is available!' : 'Username must be at least 3 characters'}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="password">Password <span className="text-red-500">*</span></Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    className="pl-10 pr-10"
                    placeholder="Create a strong password"
                    value={form.password}
                    onChange={(e) => updateForm('password', e.target.value)}
                  />
                  <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {form.password && (
                  <div className="space-y-1.5 mt-2">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                            i <= strength ? cfg.color : 'bg-muted'
                          }`}
                        />
                      ))}
                    </div>
                    <p className={`text-xs ${strength <= 1 ? 'text-red-500' : strength === 2 ? 'text-orange-400' : 'text-emerald-500'}`}>
                      {cfg.label}
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="confirmPassword">Confirm Password <span className="text-red-500">*</span></Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type={showConfirm ? 'text' : 'password'}
                    className="pl-10 pr-10"
                    placeholder="Confirm your password"
                    value={form.confirmPassword}
                    onChange={(e) => updateForm('confirmPassword', e.target.value)}
                  />
                  <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" onClick={() => setShowConfirm(!showConfirm)}>
                    {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {form.confirmPassword && (
                  <p className={`text-xs mt-1 flex items-center gap-1 ${passwordsMatch ? 'text-emerald-500' : 'text-red-500'}`}>
                    {passwordsMatch ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                    {passwordsMatch ? 'Passwords match' : 'Passwords do not match'}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Two-Factor Authentication</Label>
                <div className="grid grid-cols-3 gap-2">
                  {twoFAOptions.map((opt) => {
                    const Icon = opt.icon
                    const isActive = form.twoFA === opt.id
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => updateForm('twoFA', opt.id)}
                        className={`p-3 rounded-lg border text-center transition-all text-sm font-medium ${
                          isActive
                            ? 'border-purple-500 bg-purple-50 dark:bg-purple-950/30 text-purple-700 dark:text-purple-300 ring-1 ring-purple-500/20'
                            : 'border-border hover:border-purple-300 text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        <Icon className={`w-4 h-4 mx-auto mb-1 ${isActive ? 'text-purple-500' : ''}`} />
                        {opt.label}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="recoveryEmail">Recovery Email <Badge variant="secondary" className="ml-2 text-[10px]">Optional</Badge></Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input id="recoveryEmail" type="email" className="pl-10" placeholder="backup@example.com" value={form.recoveryEmail} onChange={(e) => updateForm('recoveryEmail', e.target.value)} />
                </div>
              </div>
            </div>
          )}

          {/* Step 3 - Preferences & Profile */}
          {currentStep === 3 && (
            <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="role">Role / Occupation</Label>
                  <select
                    id="role"
                    value={form.role}
                    onChange={(e) => updateForm('role', e.target.value)}
                    className="w-full h-9 px-3 rounded-md border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="">Select role...</option>
                    {roles.map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="industry">Industry</Label>
                  <select
                    id="industry"
                    value={form.industry}
                    onChange={(e) => updateForm('industry', e.target.value)}
                    className="w-full h-9 px-3 rounded-md border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="">Select industry...</option>
                    {industries.map((ind) => <option key={ind} value={ind}>{ind}</option>)}
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="company">Company Name</Label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input id="company" className="pl-10" placeholder="Acme Inc." value={form.company} onChange={(e) => updateForm('company', e.target.value)} />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Team Size</Label>
                <div className="grid grid-cols-2 gap-2">
                  {teamSizes.map((ts) => {
                    const Icon = ts.icon
                    const isActive = form.teamSize === ts.id
                    return (
                      <button
                        key={ts.id}
                        type="button"
                        onClick={() => updateForm('teamSize', ts.id)}
                        className={`p-3 rounded-lg border text-left transition-all ${
                          isActive
                            ? 'border-purple-500 bg-purple-50 dark:bg-purple-950/30 ring-1 ring-purple-500/20'
                            : 'border-border hover:border-purple-300'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isActive ? 'bg-purple-100 dark:bg-purple-900/50' : 'bg-muted'}`}>
                            <Icon className={`w-4 h-4 ${isActive ? 'text-purple-600 dark:text-purple-400' : 'text-muted-foreground'}`} />
                          </div>
                          <div>
                            <p className={`text-sm font-medium ${isActive ? 'text-purple-700 dark:text-purple-300' : 'text-foreground'}`}>{ts.label}</p>
                            <p className="text-xs text-muted-foreground">{ts.desc}</p>
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="space-y-2">
                <Label>How did you hear about us?</Label>
                <div className="flex flex-wrap gap-2">
                  {hearAboutOptions.map((opt) => {
                    const isSelected = form.hearAbout.includes(opt)
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => toggleHearAbout(opt)}
                        className={`px-3 py-1.5 rounded-full text-sm border transition-all ${
                          isSelected
                            ? 'bg-purple-100 dark:bg-purple-900/40 border-purple-400 text-purple-700 dark:text-purple-300'
                            : 'border-border text-muted-foreground hover:border-purple-300'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 inline mr-1" />}
                        {opt}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="space-y-3 pt-1">
                <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                  <div className="flex items-center gap-2.5">
                    <Megaphone className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Newsletter</p>
                      <p className="text-xs text-muted-foreground">Weekly tips and product updates</p>
                    </div>
                  </div>
                  <button type="button" onClick={() => updateForm('newsletter', !form.newsletter)} className="text-foreground">
                    {form.newsletter ? <ToggleRight className="w-8 h-8 text-purple-500" /> : <ToggleLeft className="w-8 h-8 text-muted-foreground" />}
                  </button>
                </div>

                <div className="space-y-2 p-3 rounded-lg border border-border">
                  <p className="text-sm font-medium text-foreground mb-2">Communication Preferences</p>
                  {[
                    { key: 'commProductUpdates', label: 'Product updates', desc: 'New features & improvements' },
                    { key: 'commSecurityAlerts', label: 'Security alerts', desc: 'Account & login notifications' },
                    { key: 'commTips', label: 'Tips & tutorials', desc: 'Best practices and guides' },
                  ].map((pref) => (
                    <label key={pref.key} className="flex items-center gap-3 cursor-pointer group">
                      <div
                        className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                          form[pref.key]
                            ? 'bg-purple-500 border-purple-500'
                            : 'border-input group-hover:border-purple-300'
                        }`}
                        onClick={() => updateForm(pref.key, !form[pref.key])}
                      >
                        {form[pref.key] && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <div onClick={() => updateForm(pref.key, !form[pref.key])}>
                        <p className="text-sm text-foreground">{pref.label}</p>
                        <p className="text-xs text-muted-foreground">{pref.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4 - Review & Submit */}
          {currentStep === 4 && (
            <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
              <Card>
                <CardContent className="p-5 space-y-4">
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Personal Information</h3>
                    <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm">
                      <div><span className="text-muted-foreground">Name:</span> <span className="font-medium text-foreground">{form.firstName} {form.lastName}</span></div>
                      <div><span className="text-muted-foreground">Email:</span> <span className="font-medium text-foreground">{form.email || '—'}</span></div>
                      <div><span className="text-muted-foreground">Phone:</span> <span className="font-medium text-foreground">{form.phone ? `${form.countryCode} ${form.phone}` : '—'}</span></div>
                      <div><span className="text-muted-foreground">DOB:</span> <span className="font-medium text-foreground">{form.dob || '—'}</span></div>
                    </div>
                  </div>

                  <hr className="border-border" />

                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Account</h3>
                    <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm">
                      <div><span className="text-muted-foreground">Username:</span> <span className="font-medium text-foreground">@{form.username || '—'}</span></div>
                      <div><span className="text-muted-foreground">2FA:</span> <Badge variant="secondary" className="ml-1 text-[10px]">{form.twoFA}</Badge></div>
                      <div><span className="text-muted-foreground">Password:</span> <span className="font-medium text-foreground">{'•'.repeat(Math.min(form.password.length, 12))}</span></div>
                      <div><span className="text-muted-foreground">Recovery:</span> <span className="font-medium text-foreground">{form.recoveryEmail || '—'}</span></div>
                    </div>
                  </div>

                  <hr className="border-border" />

                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Preferences</h3>
                    <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm">
                      <div><span className="text-muted-foreground">Role:</span> <span className="font-medium text-foreground">{form.role || '—'}</span></div>
                      <div><span className="text-muted-foreground">Industry:</span> <span className="font-medium text-foreground">{form.industry || '—'}</span></div>
                      <div><span className="text-muted-foreground">Company:</span> <span className="font-medium text-foreground">{form.company || '—'}</span></div>
                      <div><span className="text-muted-foreground">Team:</span> <span className="font-medium text-foreground">{teamSizes.find((t) => t.id === form.teamSize)?.label || '—'}</span></div>
                    </div>
                    {form.hearAbout.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {form.hearAbout.map((h) => (
                          <Badge key={h} variant="secondary" className="text-[10px]">{h}</Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-3">
                <label className="flex items-start gap-3 cursor-pointer">
                  <div
                    className={`w-4 h-4 mt-0.5 rounded border flex items-center justify-center shrink-0 transition-all ${
                      form.agreeTerms ? 'bg-purple-500 border-purple-500' : 'border-input'
                    }`}
                    onClick={() => updateForm('agreeTerms', !form.agreeTerms)}
                  >
                    {form.agreeTerms && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <span className="text-sm text-muted-foreground" onClick={() => updateForm('agreeTerms', !form.agreeTerms)}>
                    I agree to the <span className="text-purple-500 underline underline-offset-2 cursor-pointer">Terms of Service</span> and understand the terms and conditions.
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <div
                    className={`w-4 h-4 mt-0.5 rounded border flex items-center justify-center shrink-0 transition-all ${
                      form.agreePrivacy ? 'bg-purple-500 border-purple-500' : 'border-input'
                    }`}
                    onClick={() => updateForm('agreePrivacy', !form.agreePrivacy)}
                  >
                    {form.agreePrivacy && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <span className="text-sm text-muted-foreground" onClick={() => updateForm('agreePrivacy', !form.agreePrivacy)}>
                    I have read and agree to the <span className="text-purple-500 underline underline-offset-2 cursor-pointer">Privacy Policy</span>.
                  </span>
                </label>
              </div>

              <Button
                className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white h-11 text-sm font-semibold"
                disabled={!form.agreeTerms || !form.agreePrivacy || loading}
                onClick={handleSubmit}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating your account...
                  </>
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          )}

          {/* Navigation Buttons */}
          {currentStep < 4 && (
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
              <Button variant="ghost" onClick={goBack} disabled={currentStep === 1} className="text-muted-foreground">
                <ArrowLeft className="w-4 h-4 mr-1.5" /> Back
              </Button>
              <Button onClick={goNext} className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white">
                Continue <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </div>
          )}

          {currentStep === 4 && (
            <div className="flex items-center justify-start mt-4">
              <Button variant="ghost" onClick={goBack} className="text-muted-foreground">
                <ArrowLeft className="w-4 h-4 mr-1.5" /> Back
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Right Panel */}
      <RightPanel />
    </div>
  )
}

export default App
