import { useState } from 'react'
import {
  Rocket, Mail, Lock, Eye, EyeOff, ArrowRight, Github, Chrome,
  Sparkles, Shield, Zap, Globe, Loader2, Monitor
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ThemeSwitcher } from '@/components/shared/ThemeSwitcher'

const features = [
  { icon: Sparkles, title: 'AI-Powered Tools', desc: 'Smart template customization with built-in AI assistance' },
  { icon: Shield, title: 'Enterprise Security', desc: 'SOC2 compliant with end-to-end encryption' },
  { icon: Zap, title: 'Instant Deploy', desc: 'One-click deployment to any cloud provider' },
  { icon: Globe, title: 'Global CDN', desc: '99.99% uptime with edge caching worldwide' },
]

function App() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleLogin = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }

  return (
    <div className="min-h-screen flex font-sans relative overflow-hidden">
      <ThemeSwitcher />

      <style>{`
        .gradient-mesh {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%);
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
        @keyframes float3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, -20px) scale(1.1); }
        }
        .shape-1 { animation: float1 20s ease-in-out infinite; }
        .shape-2 { animation: float2 25s ease-in-out infinite; }
        .shape-3 { animation: float3 18s ease-in-out infinite; }
        @keyframes spin-slow { to { transform: rotate(360deg); } }
        .spin-slow { animation: spin-slow 30s linear infinite; }
      `}</style>

      {/* Animated Background */}
      <div className="fixed inset-0 gradient-mesh" />
      <div className="fixed inset-0 bg-black/20 dark:bg-black/40" />

      {/* Floating Shapes */}
      <div className="shape-1 fixed top-[10%] left-[5%] w-64 h-64 rounded-full bg-white/10 blur-3xl pointer-events-none" />
      <div className="shape-2 fixed bottom-[15%] right-[10%] w-80 h-80 rounded-full bg-purple-400/10 blur-3xl pointer-events-none" />
      <div className="shape-3 fixed top-[50%] left-[50%] w-48 h-48 rounded-full bg-cyan-400/10 blur-3xl pointer-events-none" />
      <div className="spin-slow fixed top-[20%] right-[20%] w-32 h-32 border border-white/10 rounded-2xl pointer-events-none" />
      <div className="spin-slow fixed bottom-[30%] left-[15%] w-24 h-24 border border-white/5 rounded-xl pointer-events-none" style={{ animationDirection: 'reverse', animationDuration: '25s' }} />

      {/* Left: Login Form */}
      <div className="flex-1 flex items-center justify-center relative z-10 px-6 py-12">
        <div className="w-full max-w-md">
          {/* Brand */}
          <div className="flex items-center gap-3 mb-10">
            <div className="w-11 h-11 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20">
              <Rocket className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white font-display tracking-tight">VA Studio</span>
          </div>

          {/* Glass Card */}
          <div className="backdrop-blur-xl bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 rounded-3xl p-8 shadow-2xl shadow-black/10">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white font-display">Welcome back</h2>
              <p className="text-white/60 mt-2">Sign in to your account to continue</p>
            </div>

            {/* Social Login */}
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

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium text-white/70">Password</Label>
                  <a href="#" className="text-xs text-purple-300 hover:text-purple-200 font-medium transition-colors">Forgot password?</a>
                </div>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
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
              </div>

              {/* Remember Me */}
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setRememberMe(!rememberMe)}
                  className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                    rememberMe
                      ? 'bg-purple-500 border-purple-400'
                      : 'border-white/20 hover:border-white/40'
                  }`}
                >
                  {rememberMe && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
                <span className="text-sm text-white/60">Remember me for 30 days</span>
              </div>

              {/* Submit */}
              <button
                onClick={handleLogin}
                disabled={loading}
                className="w-full h-12 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-purple-500/25 transition-all disabled:opacity-70 mt-2"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>Sign In <ArrowRight className="w-4 h-4" /></>
                )}
              </button>
            </div>

            {/* Sign Up Link */}
            <p className="text-center text-sm text-white/50 mt-8">
              Don't have an account?{' '}
              <a href="#" className="text-purple-300 hover:text-purple-200 font-medium transition-colors">Sign up</a>
            </p>
          </div>

          {/* Trust Badge */}
          <div className="flex items-center justify-center gap-2 mt-6 text-white/30 text-xs">
            <Shield className="w-3.5 h-3.5" />
            <span>256-bit SSL encrypted &middot; SOC2 compliant</span>
          </div>
        </div>
      </div>

      {/* Right Panel: Feature Highlights (desktop) */}
      <div className="hidden lg:flex lg:w-[480px] relative z-10 items-center px-8">
        <div className="w-full">
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8">
            <h3 className="text-xl font-bold text-white font-display mb-2">Why VA Studio?</h3>
            <p className="text-white/50 text-sm mb-8">Everything you need to ship production-grade apps.</p>

            <div className="space-y-5">
              {features.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-purple-300" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">{title}</h4>
                    <p className="text-xs text-white/40 mt-0.5 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Testimonial */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-white/60 text-sm italic leading-relaxed">
                "VA Studio cut our development time by 60%. The templates are production-ready out of the box."
              </p>
              <div className="flex items-center gap-3 mt-4">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-xs font-bold">SR</div>
                <div>
                  <p className="text-white text-sm font-medium">Sarah Rivera</p>
                  <p className="text-white/40 text-xs">CTO, ScaleUp Inc.</p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mt-6 pt-6 border-t border-white/10">
              {[
                { value: '10K+', label: 'Developers' },
                { value: '20+', label: 'Templates' },
                { value: '99.9%', label: 'Uptime' },
              ].map(({ value, label }) => (
                <div key={label} className="text-center">
                  <p className="text-lg font-bold text-white font-display">{value}</p>
                  <p className="text-[11px] text-white/40">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
