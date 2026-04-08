import { useState, useCallback } from 'react'
import {
  User, Mail, Phone, Camera, Lock, Eye, EyeOff, ArrowRight, ArrowLeft,
  Github, CheckCircle2, Circle, Building2, Users, Crown, Globe,
  Bell, MessageSquare, Smartphone, Shield, Sparkles, Star, Zap,
  Check, X, Loader2, ChevronDown, Monitor
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { ThemeSwitcher } from '@/components/shared/ThemeSwitcher'

const steps = [
  { id: 1, label: 'Personal', icon: User },
  { id: 2, label: 'Account', icon: Lock },
  { id: 3, label: 'Preferences', icon: Globe },
  { id: 4, label: 'Review', icon: CheckCircle2 },
]

const roleOptions = [
  { id: 'individual', label: 'Individual', desc: 'Personal projects & learning', icon: User },
  { id: 'team', label: 'Team', desc: 'Collaborate with your team', icon: Users },
  { id: 'enterprise', label: 'Enterprise', desc: 'Organization-wide access', icon: Crown },
]

const industries = [
  'Technology', 'Finance', 'Healthcare', 'Education', 'E-Commerce',
  'Marketing', 'Design', 'Legal', 'Manufacturing', 'Other',
]

const hearAboutOptions = [
  'Google Search', 'Social Media', 'Blog / Article', 'Friend / Colleague',
  'YouTube', 'Podcast', 'Conference / Event', 'Other',
]

const testimonials = [
  { name: 'Sarah Chen', role: 'Product Designer at Figma', text: 'The smoothest onboarding I have ever experienced. Took me under two minutes to get started.' },
  { name: 'Marcus Rivera', role: 'CTO at LaunchPad', text: 'We moved our entire team here in a day. The multi-step flow made it effortless.' },
  { name: 'Aisha Patel', role: 'Indie Developer', text: 'Beautiful design, intuitive process. Exactly what modern registration should feel like.' },
]

function getPasswordStrength(pw) {
  let s = 0
  if (pw.length >= 8) s++
  if (/[A-Z]/.test(pw)) s++
  if (/[0-9]/.test(pw)) s++
  if (/[^A-Za-z0-9]/.test(pw)) s++
  return s
}

const strengthLevels = [
  { label: '', color: 'bg-slate-200 dark:bg-slate-700' },
  { label: 'Weak', color: 'bg-red-500' },
  { label: 'Fair', color: 'bg-orange-400' },
  { label: 'Strong', color: 'bg-emerald-400' },
  { label: 'Very Strong', color: 'bg-emerald-500' },
]

function Toggle({ checked, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 ${
        checked ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-600'
      }`}
    >
      <span
        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
          checked ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  )
}

export default function App({ onNavigate }) {
  const [step, setStep] = useState(1)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [industryOpen, setIndustryOpen] = useState(false)
  const [testimonialIdx, setTestimonialIdx] = useState(0)

  const [form, setForm] = useState({
    fullName: '', email: '', phone: '', avatar: null,
    username: '', password: '', confirmPassword: '', role: 'individual',
    industry: '', hearAbout: [], newsletter: true,
    notifEmail: true, notifPush: false, notifSMS: false,
    agreeTerms: false,
  })

  const [errors, setErrors] = useState({})

  const set = useCallback((field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
    setErrors(prev => ({ ...prev, [field]: undefined }))
  }, [])

  const toggleHearAbout = (item) => {
    set('hearAbout', form.hearAbout.includes(item)
      ? form.hearAbout.filter(i => i !== item)
      : [...form.hearAbout, item])
  }

  const validateStep = (s) => {
    const e = {}
    if (s === 1) {
      if (!form.fullName.trim()) e.fullName = 'Name is required'
      if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email is required'
    }
    if (s === 2) {
      if (!form.username.trim() || form.username.length < 3) e.username = 'Min 3 characters'
      if (form.password.length < 8) e.password = 'Min 8 characters'
      if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const next = () => { if (validateStep(step) && step < 4) setStep(step + 1) }
  const back = () => { if (step > 1) setStep(step - 1) }

  const handleSubmit = () => {
    if (!form.agreeTerms) { setErrors({ agreeTerms: 'Required' }); return }
    setSubmitting(true)
    setTimeout(() => { setSubmitting(false); setSubmitted(true) }, 2000)
  }

  const strength = getPasswordStrength(form.password)
  const passwordsMatch = form.confirmPassword.length > 0 && form.password === form.confirmPassword
  const usernameAvailable = form.username.length >= 3 && form.username !== 'admin'
  const progress = ((step - 1) / 3) * 100

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950 p-4">
        <div className="fixed top-4 right-4 z-50"><ThemeSwitcher /></div>
        <Card className="w-full max-w-md text-center border-0 shadow-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
          <CardContent className="pt-12 pb-10 px-8">
            <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/25">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Welcome aboard, {form.fullName.split(' ')[0]}!</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-8">Your account has been created successfully. Check your email for a verification link.</p>
            <Badge className="bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300 mb-6">@{form.username}</Badge>
            <div className="mt-6">
              <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                onClick={() => { setSubmitted(false); setStep(1); setForm({ fullName: '', email: '', phone: '', avatar: null, username: '', password: '', confirmPassword: '', role: 'individual', industry: '', hearAbout: [], newsletter: true, notifEmail: true, notifPush: false, notifSMS: false, agreeTerms: false }) }}>
                Go to Dashboard <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white dark:bg-slate-950">
      <div className="fixed top-4 right-4 z-50"><ThemeSwitcher /></div>

      {/* Left Decorative Panel */}
      <div className="hidden lg:flex lg:w-[45%] xl:w-[42%] relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 text-white p-10 flex-col justify-between">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 -left-10 w-72 h-72 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute bottom-32 right-0 w-96 h-96 rounded-full bg-purple-300/20 blur-3xl" />
          <div className="absolute top-1/2 left-1/3 w-48 h-48 rounded-full bg-indigo-300/30 blur-2xl" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight">VA Studio</span>
          </div>

          <h1 className="text-4xl font-bold leading-tight mb-4">
            Start building<br />something amazing
          </h1>
          <p className="text-indigo-200 text-lg mb-10 leading-relaxed">
            Join thousands of creators and teams shipping faster with our platform.
          </p>

          <div className="space-y-4 mb-10">
            {[
              { icon: Zap, text: 'Instant project setup' },
              { icon: Shield, text: 'Enterprise-grade security' },
              { icon: Star, text: 'Premium templates & components' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-indigo-100">{text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10">
          <Card className="bg-white/10 border-white/10 backdrop-blur-md shadow-none">
            <CardContent className="p-6">
              <p className="text-indigo-100 italic leading-relaxed mb-4">
                "{testimonials[testimonialIdx].text}"
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-white text-sm">{testimonials[testimonialIdx].name}</p>
                  <p className="text-indigo-300 text-xs">{testimonials[testimonialIdx].role}</p>
                </div>
                <div className="flex gap-1.5">
                  {testimonials.map((_, i) => (
                    <button key={i} onClick={() => setTestimonialIdx(i)}
                      className={`w-2 h-2 rounded-full transition-all ${i === testimonialIdx ? 'bg-white w-5' : 'bg-white/40'}`} />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Progress Bar */}
        <div className="h-1 bg-slate-100 dark:bg-slate-800">
          <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
        </div>

        <div className="flex-1 flex items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-lg">
            {/* Step Indicators */}
            <div className="flex items-center justify-between mb-10">
              {steps.map((s, idx) => {
                const Icon = s.icon
                const isActive = step === s.id
                const isDone = step > s.id
                return (
                  <div key={s.id} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                        isDone ? 'bg-gradient-to-br from-emerald-400 to-emerald-500 text-white shadow-lg shadow-emerald-500/20' :
                        isActive ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25' :
                        'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500'
                      }`}>
                        {isDone ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                      </div>
                      <span className={`text-xs mt-1.5 font-medium hidden sm:block ${
                        isActive ? 'text-indigo-600 dark:text-indigo-400' :
                        isDone ? 'text-emerald-600 dark:text-emerald-400' :
                        'text-slate-400 dark:text-slate-500'
                      }`}>{s.label}</span>
                    </div>
                    {idx < steps.length - 1 && (
                      <div className={`w-12 sm:w-20 h-0.5 mx-2 rounded transition-colors duration-300 ${
                        step > s.id ? 'bg-emerald-400' : 'bg-slate-200 dark:bg-slate-700'
                      }`} />
                    )}
                  </div>
                )
              })}
            </div>

            {/* Step 1 - Personal Info */}
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Personal Information</h2>
                  <p className="text-slate-500 dark:text-slate-400 mt-1">Let us get to know you better</p>
                </div>

                {/* Social Sign-up */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'Google', icon: <Globe className="w-4 h-4" /> },
                    { label: 'GitHub', icon: <Github className="w-4 h-4" /> },
                    { label: 'Microsoft', icon: <Monitor className="w-4 h-4" /> },
                  ].map(s => (
                    <Button key={s.label} variant="outline" className="h-11 gap-2 text-sm border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800">
                      {s.icon} {s.label}
                    </Button>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
                  <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">or continue with email</span>
                  <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
                </div>

                {/* Avatar Upload */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/40 dark:to-purple-900/40 flex items-center justify-center border-2 border-dashed border-indigo-300 dark:border-indigo-700 cursor-pointer hover:border-indigo-400 transition-colors">
                    <Camera className="w-6 h-6 text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Upload avatar</p>
                    <p className="text-xs text-slate-400">JPG, PNG under 2MB</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">Full Name</Label>
                    <div className="relative mt-1.5">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input placeholder="John Doe" value={form.fullName}
                        onChange={e => set('fullName', e.target.value)}
                        className={`pl-10 h-11 ${errors.fullName ? 'border-red-400 focus:ring-red-400' : ''}`} />
                    </div>
                    {errors.fullName && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><X className="w-3 h-3" />{errors.fullName}</p>}
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email Address</Label>
                    <div className="relative mt-1.5">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input type="email" placeholder="john@example.com" value={form.email}
                        onChange={e => set('email', e.target.value)}
                        className={`pl-10 h-11 ${errors.email ? 'border-red-400 focus:ring-red-400' : ''}`} />
                    </div>
                    {errors.email && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><X className="w-3 h-3" />{errors.email}</p>}
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">Phone Number <span className="text-slate-400 font-normal">(optional)</span></Label>
                    <div className="relative mt-1.5">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input type="tel" placeholder="+1 (555) 000-0000" value={form.phone}
                        onChange={e => set('phone', e.target.value)} className="pl-10 h-11" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2 - Account Setup */}
            {step === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Account Setup</h2>
                  <p className="text-slate-500 dark:text-slate-400 mt-1">Secure your account credentials</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">Username</Label>
                    <div className="relative mt-1.5">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">@</span>
                      <Input placeholder="johndoe" value={form.username}
                        onChange={e => set('username', e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                        className={`pl-8 pr-10 h-11 ${errors.username ? 'border-red-400' : ''}`} />
                      {form.username.length >= 3 && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          {usernameAvailable
                            ? <Check className="w-4 h-4 text-emerald-500" />
                            : <X className="w-4 h-4 text-red-500" />}
                        </div>
                      )}
                    </div>
                    {form.username.length >= 3 && (
                      <p className={`text-xs mt-1 ${usernameAvailable ? 'text-emerald-500' : 'text-red-500'}`}>
                        {usernameAvailable ? 'Username is available' : 'Username is taken'}
                      </p>
                    )}
                    {errors.username && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><X className="w-3 h-3" />{errors.username}</p>}
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">Password</Label>
                    <div className="relative mt-1.5">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input type={showPassword ? 'text' : 'password'} placeholder="Min 8 characters" value={form.password}
                        onChange={e => set('password', e.target.value)}
                        className={`pl-10 pr-10 h-11 ${errors.password ? 'border-red-400' : ''}`} />
                      <button type="button" onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {form.password && (
                      <div className="mt-2">
                        <div className="flex gap-1.5">
                          {[1, 2, 3, 4].map(i => (
                            <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors ${i <= strength ? strengthLevels[strength].color : 'bg-slate-200 dark:bg-slate-700'}`} />
                          ))}
                        </div>
                        <p className={`text-xs mt-1 ${strength <= 1 ? 'text-red-500' : strength === 2 ? 'text-orange-500' : 'text-emerald-500'}`}>
                          {strengthLevels[strength].label}
                        </p>
                      </div>
                    )}
                    {errors.password && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><X className="w-3 h-3" />{errors.password}</p>}
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">Confirm Password</Label>
                    <div className="relative mt-1.5">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input type={showConfirm ? 'text' : 'password'} placeholder="Repeat your password" value={form.confirmPassword}
                        onChange={e => set('confirmPassword', e.target.value)}
                        className={`pl-10 pr-10 h-11 ${errors.confirmPassword ? 'border-red-400' : form.confirmPassword && passwordsMatch ? 'border-emerald-400' : ''}`} />
                      <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                        {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {form.confirmPassword && (
                      <p className={`text-xs mt-1 flex items-center gap-1 ${passwordsMatch ? 'text-emerald-500' : 'text-red-500'}`}>
                        {passwordsMatch ? <><Check className="w-3 h-3" /> Passwords match</> : <><X className="w-3 h-3" /> Passwords do not match</>}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3 block">Account Type</Label>
                    <div className="grid grid-cols-3 gap-3">
                      {roleOptions.map(r => {
                        const Icon = r.icon
                        const active = form.role === r.id
                        return (
                          <button key={r.id} type="button" onClick={() => set('role', r.id)}
                            className={`relative p-4 rounded-xl border-2 text-center transition-all duration-200 ${
                              active
                                ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/50 shadow-md shadow-indigo-500/10'
                                : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                            }`}>
                            {active && <div className="absolute top-2 right-2"><Check className="w-3.5 h-3.5 text-indigo-500" /></div>}
                            <Icon className={`w-5 h-5 mx-auto mb-2 ${active ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}`} />
                            <p className={`text-sm font-semibold ${active ? 'text-indigo-700 dark:text-indigo-300' : 'text-slate-700 dark:text-slate-300'}`}>{r.label}</p>
                            <p className="text-[10px] text-slate-400 mt-0.5 leading-tight">{r.desc}</p>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3 - Preferences */}
            {step === 3 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Preferences</h2>
                  <p className="text-slate-500 dark:text-slate-400 mt-1">Tailor your experience</p>
                </div>

                <div className="space-y-5">
                  {/* Industry */}
                  <div>
                    <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">Industry</Label>
                    <div className="relative mt-1.5">
                      <button type="button" onClick={() => setIndustryOpen(!industryOpen)}
                        className="w-full flex items-center justify-between h-11 px-3 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-left hover:border-slate-300 dark:hover:border-slate-600 transition-colors">
                        <span className={form.industry ? 'text-slate-900 dark:text-white' : 'text-slate-400'}>{form.industry || 'Select your industry'}</span>
                        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${industryOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {industryOpen && (
                        <div className="absolute z-20 mt-1 w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg shadow-xl max-h-48 overflow-auto">
                          {industries.map(ind => (
                            <button key={ind} type="button" onClick={() => { set('industry', ind); setIndustryOpen(false) }}
                              className={`w-full text-left px-3 py-2 text-sm hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition-colors flex items-center justify-between ${
                                form.industry === ind ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/30' : 'text-slate-700 dark:text-slate-300'
                              }`}>
                              {ind}
                              {form.industry === ind && <Check className="w-3.5 h-3.5" />}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* How did you hear about us */}
                  <div>
                    <Label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">How did you hear about us?</Label>
                    <div className="flex flex-wrap gap-2">
                      {hearAboutOptions.map(opt => {
                        const active = form.hearAbout.includes(opt)
                        return (
                          <button key={opt} type="button" onClick={() => toggleHearAbout(opt)}
                            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                              active
                                ? 'bg-indigo-100 dark:bg-indigo-900/50 border-indigo-300 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300'
                                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                            }`}>
                            {active && <Check className="w-3 h-3 inline mr-1" />}{opt}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Toggles */}
                  <Card className="border-slate-200 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-800/30">
                    <CardContent className="p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center">
                            <Mail className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Newsletter</p>
                            <p className="text-xs text-slate-400">Weekly tips and product updates</p>
                          </div>
                        </div>
                        <Toggle checked={form.newsletter} onChange={v => set('newsletter', v)} />
                      </div>

                      <div className="h-px bg-slate-200 dark:bg-slate-700" />

                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Notifications</p>
                      {[
                        { key: 'notifEmail', label: 'Email', desc: 'Account activity & alerts', icon: Mail },
                        { key: 'notifPush', label: 'Push', desc: 'Browser notifications', icon: Bell },
                        { key: 'notifSMS', label: 'SMS', desc: 'Text message alerts', icon: Smartphone },
                      ].map(n => (
                        <div key={n.key} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                              <n.icon className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{n.label}</p>
                              <p className="text-xs text-slate-400">{n.desc}</p>
                            </div>
                          </div>
                          <Toggle checked={form[n.key]} onChange={v => set(n.key, v)} />
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* Step 4 - Review */}
            {step === 4 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Review & Confirm</h2>
                  <p className="text-slate-500 dark:text-slate-400 mt-1">Double-check your details before creating your account</p>
                </div>

                <div className="space-y-3">
                  <Card className="border-slate-200 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-800/30">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                          {form.fullName ? form.fullName.charAt(0).toUpperCase() : '?'}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white">{form.fullName || 'Not provided'}</p>
                          <p className="text-sm text-slate-500">@{form.username || 'username'}</p>
                        </div>
                        <Badge className="ml-auto capitalize bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300">{form.role}</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <p className="text-slate-400 text-xs">Email</p>
                          <p className="text-slate-700 dark:text-slate-300 truncate">{form.email || '-'}</p>
                        </div>
                        <div>
                          <p className="text-slate-400 text-xs">Phone</p>
                          <p className="text-slate-700 dark:text-slate-300">{form.phone || '-'}</p>
                        </div>
                        <div>
                          <p className="text-slate-400 text-xs">Industry</p>
                          <p className="text-slate-700 dark:text-slate-300">{form.industry || '-'}</p>
                        </div>
                        <div>
                          <p className="text-slate-400 text-xs">Referral</p>
                          <p className="text-slate-700 dark:text-slate-300 truncate">{form.hearAbout.length ? form.hearAbout.join(', ') : '-'}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-slate-200 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-800/30">
                    <CardContent className="p-4">
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Notification Preferences</p>
                      <div className="flex flex-wrap gap-2">
                        {form.newsletter && <Badge variant="secondary" className="text-xs">Newsletter</Badge>}
                        {form.notifEmail && <Badge variant="secondary" className="text-xs">Email Alerts</Badge>}
                        {form.notifPush && <Badge variant="secondary" className="text-xs">Push Notifications</Badge>}
                        {form.notifSMS && <Badge variant="secondary" className="text-xs">SMS Alerts</Badge>}
                        {!form.newsletter && !form.notifEmail && !form.notifPush && !form.notifSMS && (
                          <span className="text-xs text-slate-400">None selected</span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
                  <button type="button" onClick={() => set('agreeTerms', !form.agreeTerms)}
                    className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-all ${
                      form.agreeTerms
                        ? 'bg-indigo-600 border-indigo-600'
                        : errors.agreeTerms ? 'border-red-400' : 'border-slate-300 dark:border-slate-600'
                    }`}>
                    {form.agreeTerms && <Check className="w-3 h-3 text-white" />}
                  </button>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    I agree to the <span className="text-indigo-600 dark:text-indigo-400 font-medium cursor-pointer hover:underline">Terms of Service</span> and <span className="text-indigo-600 dark:text-indigo-400 font-medium cursor-pointer hover:underline">Privacy Policy</span>
                  </p>
                </div>
                {errors.agreeTerms && <p className="text-xs text-red-500 flex items-center gap-1"><X className="w-3 h-3" />You must agree to the terms</p>}
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
              {step > 1 ? (
                <Button variant="ghost" onClick={back} className="gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">
                  <ArrowLeft className="w-4 h-4" /> Back
                </Button>
              ) : <div />}

              {step < 4 ? (
                <Button onClick={next} className="gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/25 px-8">
                  Continue <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button onClick={handleSubmit} disabled={submitting}
                  className="gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/25 px-8">
                  {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Creating Account...</> : <>Create Account <Sparkles className="w-4 h-4" /></>}
                </Button>
              )}
            </div>

            {/* Sign In Link */}
            <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
              Already have an account?{' '}
              <span className="text-indigo-600 dark:text-indigo-400 font-medium cursor-pointer hover:underline" onClick={() => onNavigate && onNavigate('login')}>Sign in</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
