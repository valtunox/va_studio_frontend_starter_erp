import { useState } from 'react'
import {
  Rocket, Mail, Lock, Eye, EyeOff, ArrowRight, Github, User,
  Shield, Zap, Globe, Check, X, Loader2, Monitor,
  Sparkles, CheckCircle2, Star, Users
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ThemeSwitcher } from '@/components/shared/ThemeSwitcher'

function getPasswordStrength(pw) {
  let score = 0
  if (pw.length >= 8) score++
  if (/[A-Z]/.test(pw)) score++
  if (/[0-9]/.test(pw)) score++
  if (/[^A-Za-z0-9]/.test(pw)) score++
  return score
}

const strengthConfig = [
  { label: '', color: '', width: '0%' },
  { label: 'Weak', color: 'bg-red-500', width: '25%' },
  { label: 'Fair', color: 'bg-orange-400', width: '50%' },
  { label: 'Strong', color: 'bg-emerald-400', width: '75%' },
  { label: 'Very Strong', color: 'bg-emerald-500', width: '100%' },
]

const benefitsList = [
  { icon: Sparkles, title: '20+ Premium Templates', desc: 'Production-ready, fully customizable' },
  { icon: Zap, title: 'AI-Powered Builder', desc: 'Generate components with natural language' },
  { icon: Shield, title: 'Enterprise Security', desc: 'SOC2 compliant, E2E encrypted' },
  { icon: Globe, title: 'Global CDN Deploy', desc: 'One-click to 200+ edge locations' },
  { icon: Users, title: 'Team Collaboration', desc: 'Real-time editing with role management' },
  { icon: Star, title: 'Priority Support', desc: '24/7 dedicated engineering support' },
]

function App() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [loading, setLoading] = useState(false)

  const strength = getPasswordStrength(password)
  const passwordsMatch = password && confirmPassword && password === confirmPassword
  const cfg = strengthConfig[strength]

  const passwordChecks = [
    { label: '8+ characters', met: password.length >= 8 },
    { label: 'Uppercase letter', met: /[A-Z]/.test(password) },
    { label: 'Number', met: /[0-9]/.test(password) },
    { label: 'Special character', met: /[^A-Za-z0-9]/.test(password) },
  ]

  const handleRegister = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }

  return (
    <div className="min-h-screen flex font-sans relative overflow-hidden">
      <ThemeSwitcher />

      <style>{`
        .gradient-mesh {
          background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 25%, #d946ef 50%, #6366f1 75%, #818cf8 100%);
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
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(30px, -30px) rotate(120deg); }
          66% { transform: translate(-20px, 20px) rotate(240deg); }
        }
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(-40px, 20px) rotate(-120deg); }
          66% { transform: translate(25px, -35px) rotate(-240deg); }
        }
        .shape-1 { animation: float1 20s ease-in-out infinite; }
        .shape-2 { animation: float2 25s ease-in-out infinite; }
        @keyframes spin-slow { to { transform: rotate(360deg); } }
        .spin-slow { animation: spin-slow 30s linear infinite; }
      `}</style>

      {/* Background */}
      <div className="fixed inset-0 gradient-mesh" />
      <div className="fixed inset-0 bg-black/20 dark:bg-black/40" />

      {/* Shapes */}
      <div className="shape-1 fixed top-[10%] left-[5%] w-72 h-72 rounded-full bg-white/10 blur-3xl pointer-events-none" />
      <div className="shape-2 fixed bottom-[10%] right-[8%] w-96 h-96 rounded-full bg-fuchsia-400/10 blur-3xl pointer-events-none" />
      <div className="spin-slow fixed top-[25%] right-[15%] w-28 h-28 border border-white/10 rounded-2xl pointer-events-none" />
      <div className="spin-slow fixed bottom-[25%] left-[12%] w-20 h-20 border border-white/5 rounded-xl pointer-events-none" style={{ animationDirection: 'reverse', animationDuration: '22s' }} />

      {/* Left: Register Form */}
      <div className="flex-1 flex items-center justify-center relative z-10 px-6 py-10 overflow-y-auto">
        <div className="w-full max-w-md">
          {/* Brand */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-11 h-11 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20">
              <Rocket className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white font-display tracking-tight">VA Studio</span>
          </div>

          {/* Glass Card */}
          <div className="backdrop-blur-xl bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 rounded-3xl p-8 shadow-2xl shadow-black/10">
            <div className="mb-7">
              <h2 className="text-2xl font-bold text-white font-display">Create your account</h2>
              <p className="text-white/60 mt-2">Start your free trial &mdash; no credit card required</p>
            </div>

            {/* Social Signup */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                { icon: (
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                ), label: 'Google' },
                { icon: <Github className="w-5 h-5" />, label: 'GitHub' },
                { icon: <Monitor className="w-5 h-5" />, label: 'Microsoft' },
              ].map(({ icon, label }) => (
                <button
                  key={label}
                  className="flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all text-white/80 hover:text-white"
                >
                  {icon}
                  <span className="text-[11px] font-medium">{label}</span>
                </button>
              ))}
            </div>

            {/* Divider */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/15" />
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 text-xs text-white/40 bg-transparent backdrop-blur-xl">or continue with</span>
              </div>
            </div>

            {/* Form */}
            <div className="space-y-4">
              {/* Full Name */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-white/70">Full name</Label>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="John Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="h-12 pl-11 bg-white/5 border-white/15 text-white placeholder:text-white/30 rounded-xl focus:border-white/30 focus:ring-white/10"
                  />
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-white/70">Email address</Label>
                <div className="relative">
                  <Input
                    type="email"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 pl-11 bg-white/5 border-white/15 text-white placeholder:text-white/30 rounded-xl focus:border-white/30 focus:ring-white/10"
                  />
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-white/70">Password</Label>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a strong password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 pl-11 pr-11 bg-white/5 border-white/15 text-white placeholder:text-white/30 rounded-xl focus:border-white/30 focus:ring-white/10"
                  />
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {/* Strength Bar */}
                {password && (
                  <div className="space-y-2 pt-1">
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${cfg.color}`}
                        style={{ width: cfg.width }}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-medium ${
                        strength <= 1 ? 'text-red-400' : strength === 2 ? 'text-orange-400' : 'text-emerald-400'
                      }`}>
                        {cfg.label}
                      </span>
                      <span className="text-[10px] text-white/30">{strength}/4</span>
                    </div>
                  </div>
                )}

                {/* Validation Checklist */}
                {password && (
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 pt-1">
                    {passwordChecks.map(({ label, met }) => (
                      <div key={label} className="flex items-center gap-2">
                        {met ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <X className="w-3.5 h-3.5 text-white/25" />
                        )}
                        <span className={`text-xs ${met ? 'text-emerald-400' : 'text-white/35'}`}>{label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-white/70">Confirm password</Label>
                <div className="relative">
                  <Input
                    type={showConfirm ? 'text' : 'password'}
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`h-12 pl-11 pr-11 bg-white/5 border-white/15 text-white placeholder:text-white/30 rounded-xl focus:border-white/30 focus:ring-white/10 ${
                      confirmPassword && !passwordsMatch ? 'border-red-400/60' : ''
                    } ${passwordsMatch ? 'border-emerald-400/60' : ''}`}
                  />
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  {confirmPassword ? (
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
                      {passwordsMatch ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <X className="w-4 h-4 text-red-400" />
                      )}
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                    >
                      {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  )}
                </div>
                {confirmPassword && !passwordsMatch && (
                  <p className="text-xs text-red-400">Passwords do not match</p>
                )}
              </div>

              {/* Terms */}
              <div className="flex items-start gap-2.5">
                <button
                  type="button"
                  onClick={() => setAgreeTerms(!agreeTerms)}
                  className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all mt-0.5 shrink-0 ${
                    agreeTerms
                      ? 'bg-purple-500 border-purple-400'
                      : 'border-white/20 hover:border-white/40'
                  }`}
                >
                  {agreeTerms && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
                <span className="text-sm text-white/50">
                  I agree to the{' '}
                  <a href="#" className="text-purple-300 hover:text-purple-200 transition-colors">Terms of Service</a>
                  {' '}and{' '}
                  <a href="#" className="text-purple-300 hover:text-purple-200 transition-colors">Privacy Policy</a>
                </span>
              </div>

              {/* Submit */}
              <button
                onClick={handleRegister}
                disabled={loading || !agreeTerms}
                className="w-full h-12 rounded-xl bg-gradient-to-r from-purple-500 to-fuchsia-500 hover:from-purple-600 hover:to-fuchsia-600 text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-purple-500/25 transition-all disabled:opacity-50 mt-2"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>Create Account <ArrowRight className="w-4 h-4" /></>
                )}
              </button>
            </div>

            {/* Sign In Link */}
            <p className="text-center text-sm text-white/50 mt-8">
              Already have an account?{' '}
              <a href="#" className="text-purple-300 hover:text-purple-200 font-medium transition-colors">Sign in</a>
            </p>
          </div>

          {/* Trust Badge */}
          <div className="flex items-center justify-center gap-2 mt-6 text-white/30 text-xs">
            <Shield className="w-3.5 h-3.5" />
            <span>256-bit SSL encrypted &middot; SOC2 compliant</span>
          </div>
        </div>
      </div>

      {/* Right Panel: What you get (desktop) */}
      <div className="hidden lg:flex lg:w-[480px] relative z-10 items-center px-8">
        <div className="w-full">
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8">
            <h3 className="text-xl font-bold text-white font-display mb-2">What you get</h3>
            <p className="text-white/50 text-sm mb-8">Everything included in your free account.</p>

            <div className="space-y-5">
              {benefitsList.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-fuchsia-300" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-semibold text-white">{title}</h4>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <p className="text-xs text-white/40 mt-0.5 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social proof */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex -space-x-2">
                  {['AR', 'BK', 'CL', 'DM'].map((initials, i) => (
                    <div key={initials} className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-[10px] font-bold border-2 border-white/10" style={{ zIndex: 4 - i }}>
                      {initials}
                    </div>
                  ))}
                </div>
                <span className="text-white/50 text-xs">Join 10,000+ developers</span>
              </div>
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(n => (
                  <Star key={n} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
                <span className="text-white/50 text-xs ml-2">4.9/5 average rating</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
