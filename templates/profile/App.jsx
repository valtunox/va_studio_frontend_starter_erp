import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ThemeSwitcher } from '@/components/shared/ThemeSwitcher'
import {
  User, Mail, Shield, Camera, Globe, Languages, Clock, Phone,
  Lock, Eye, EyeOff, Trash2, AlertTriangle, CheckCircle2, AlertCircle,
  Loader2, ChevronRight, Settings, KeyRound, Palette, LogOut, CalendarDays,
  Save, X, FileText
} from 'lucide-react'

const TIMEZONES = [
  'UTC', 'America/New_York', 'America/Chicago', 'America/Denver',
  'America/Los_Angeles', 'America/Anchorage', 'Pacific/Honolulu',
  'Europe/London', 'Europe/Paris', 'Europe/Berlin', 'Europe/Moscow',
  'Asia/Tokyo', 'Asia/Shanghai', 'Asia/Kolkata', 'Asia/Dubai',
  'Australia/Sydney', 'Pacific/Auckland',
]

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Spanish' },
  { code: 'fr', label: 'French' },
  { code: 'de', label: 'German' },
  { code: 'pt', label: 'Portuguese' },
  { code: 'ja', label: 'Japanese' },
  { code: 'zh', label: 'Chinese' },
  { code: 'ko', label: 'Korean' },
  { code: 'ar', label: 'Arabic' },
  { code: 'hi', label: 'Hindi' },
]

const SIDEBAR_SECTIONS = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'security', label: 'Security', icon: KeyRound },
  { id: 'preferences', label: 'Preferences', icon: Palette },
  { id: 'danger', label: 'Danger Zone', icon: AlertTriangle },
]

function Toast({ message, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-2xl border backdrop-blur-xl transition-all animate-in slide-in-from-top-2 fade-in duration-300 ${
      type === 'success'
        ? 'bg-emerald-500/20 border-emerald-400/30 text-emerald-200'
        : 'bg-red-500/20 border-red-400/30 text-red-200'
    }`}>
      {type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
      <span className="text-sm font-medium">{message}</span>
      <button onClick={onClose} className="ml-2 opacity-60 hover:opacity-100 transition-opacity">
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  )
}

function getInitials(name) {
  if (!name) return '?'
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
}

function formatDate(dateStr) {
  if (!dateStr) return 'N/A'
  try {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric',
    })
  } catch {
    return dateStr
  }
}

function App({ onNavigate }) {
  const { user, apiFetch, logout } = useAuth()
  const [activeSection, setActiveSection] = useState('profile')
  const [toast, setToast] = useState(null)

  // Profile form state
  const [profileForm, setProfileForm] = useState({
    full_name: '',
    bio: '',
    phone: '',
    avatar_url: '',
    timezone: 'UTC',
    language: 'en',
  })
  const [profileLoading, setProfileLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  // Password form state
  const [passwordForm, setPasswordForm] = useState({
    current_password: '',
    new_password: '',
    confirm_password: '',
  })
  const [passwordLoading, setPasswordLoading] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Delete account state
  const [deleteConfirm, setDeleteConfirm] = useState('')
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  // Populate form from user data
  useEffect(() => {
    if (user) {
      setProfileForm({
        full_name: user.full_name || user.name || '',
        bio: user.bio || '',
        phone: user.phone || '',
        avatar_url: user.avatar_url || user.avatar || '',
        timezone: user.timezone || 'UTC',
        language: user.language || 'en',
      })
    }
  }, [user])

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
  }

  // Profile update handler
  const handleProfileUpdate = async (e) => {
    e.preventDefault()
    if (!profileForm.full_name.trim()) {
      showToast('Full name is required.', 'error')
      return
    }
    setProfileLoading(true)
    try {
      await apiFetch('/users/me', {
        method: 'PATCH',
        body: JSON.stringify(profileForm),
      })
      showToast('Profile updated successfully.')
      setIsEditing(false)
    } catch (err) {
      showToast(err.message || 'Failed to update profile.', 'error')
    } finally {
      setProfileLoading(false)
    }
  }

  // Password change handler
  const handlePasswordChange = async (e) => {
    e.preventDefault()
    const { current_password, new_password, confirm_password } = passwordForm
    if (!current_password || !new_password || !confirm_password) {
      showToast('All password fields are required.', 'error')
      return
    }
    if (new_password.length < 8) {
      showToast('New password must be at least 8 characters.', 'error')
      return
    }
    if (new_password !== confirm_password) {
      showToast('New passwords do not match.', 'error')
      return
    }
    if (current_password === new_password) {
      showToast('New password must differ from the current password.', 'error')
      return
    }
    setPasswordLoading(true)
    try {
      await apiFetch('/users/me/change-password', {
        method: 'POST',
        body: JSON.stringify({ current_password, new_password }),
      })
      showToast('Password changed successfully.')
      setPasswordForm({ current_password: '', new_password: '', confirm_password: '' })
      setShowCurrentPassword(false)
      setShowNewPassword(false)
      setShowConfirmPassword(false)
    } catch (err) {
      showToast(err.message || 'Failed to change password.', 'error')
    } finally {
      setPasswordLoading(false)
    }
  }

  // Delete account handler
  const handleDeleteAccount = async () => {
    if (deleteConfirm !== 'DELETE') {
      showToast('Please type DELETE to confirm.', 'error')
      return
    }
    setDeleteLoading(true)
    try {
      await apiFetch('/users/me', { method: 'DELETE' })
      showToast('Account deleted. Redirecting...')
      setTimeout(() => {
        if (logout) logout()
        if (onNavigate) onNavigate('login')
      }, 1500)
    } catch (err) {
      showToast(err.message || 'Failed to delete account.', 'error')
    } finally {
      setDeleteLoading(false)
    }
  }

  const userEmail = user?.email || 'user@example.com'
  const userName = user?.full_name || user?.name || 'User'
  const userRole = user?.role || 'Member'
  const userAvatar = user?.avatar_url || user?.avatar || ''
  const userJoined = user?.created_at || user?.joined_at || user?.joined || ''
  const userTimezone = user?.timezone || 'UTC'
  const userLanguage = user?.language || 'en'

  const languageLabel = LANGUAGES.find(l => l.code === userLanguage)?.label || userLanguage

  // Shared glass input classes
  const inputClasses = 'h-11 bg-white/5 border-white/15 text-white placeholder:text-white/30 rounded-xl focus:border-white/30 focus:ring-white/10'
  const selectClasses = 'h-11 w-full bg-white/5 border border-white/15 text-white rounded-xl px-3 focus:border-white/30 focus:ring-white/10 focus:outline-none appearance-none cursor-pointer'

  return (
    <div className="min-h-screen flex font-sans relative overflow-hidden">
      <ThemeSwitcher />

      <style>{`
        .gradient-mesh-profile {
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
        .shape-1 { animation: float1 20s ease-in-out infinite; }
        .shape-2 { animation: float2 25s ease-in-out infinite; }
        select option { background: #1e1b4b; color: white; }
        .sidebar-item { transition: all 0.2s ease; }
        .sidebar-item:hover { background: rgba(255,255,255,0.08); }
        .sidebar-item.active { background: rgba(255,255,255,0.12); }
      `}</style>

      {/* Animated Background */}
      <div className="fixed inset-0 gradient-mesh-profile" />
      <div className="fixed inset-0 bg-black/30 dark:bg-black/50" />

      {/* Floating Shapes */}
      <div className="shape-1 fixed top-[10%] left-[5%] w-64 h-64 rounded-full bg-white/10 blur-3xl pointer-events-none" />
      <div className="shape-2 fixed bottom-[15%] right-[10%] w-80 h-80 rounded-full bg-purple-400/10 blur-3xl pointer-events-none" />

      {/* Toast */}
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}

      {/* Main Layout */}
      <div className="relative z-10 flex w-full min-h-screen">

        {/* Sidebar */}
        <aside className="hidden md:flex w-72 flex-col p-6 shrink-0">
          <div className="backdrop-blur-xl bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 rounded-2xl p-5 flex flex-col h-full">

            {/* User Summary */}
            <div className="flex items-center gap-3.5 mb-8 pb-6 border-b border-white/10">
              {userAvatar ? (
                <img
                  src={userAvatar}
                  alt={userName}
                  className="w-12 h-12 rounded-full object-cover border-2 border-white/20"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold text-sm border-2 border-white/20">
                  {getInitials(userName)}
                </div>
              )}
              <div className="min-w-0">
                <p className="text-white font-semibold text-sm truncate">{userName}</p>
                <p className="text-white/40 text-xs truncate">{userEmail}</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-1">
              {SIDEBAR_SECTIONS.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveSection(id)}
                  className={`sidebar-item w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    activeSection === id
                      ? 'active text-white bg-white/12'
                      : 'text-white/50 hover:text-white/80'
                  } ${id === 'danger' ? 'mt-4' : ''}`}
                >
                  <Icon className={`w-4 h-4 ${activeSection === id ? 'text-purple-300' : ''} ${id === 'danger' && activeSection === id ? 'text-red-400' : ''}`} />
                  {label}
                  {activeSection === id && <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-50" />}
                </button>
              ))}
            </nav>

            {/* Sidebar Footer */}
            <div className="pt-4 mt-4 border-t border-white/10 space-y-1">
              <button
                onClick={() => onNavigate && onNavigate('dashboard')}
                className="sidebar-item w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-white/50 hover:text-white/80"
              >
                <Settings className="w-4 h-4" />
                Back to Dashboard
              </button>
              <button
                onClick={() => { if (logout) logout(); if (onNavigate) onNavigate('login'); }}
                className="sidebar-item w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-white/50 hover:text-red-300"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </div>
        </aside>

        {/* Mobile Section Tabs */}
        <div className="md:hidden fixed top-0 left-0 right-0 z-40 backdrop-blur-xl bg-black/30 border-b border-white/10 px-4 py-3">
          <div className="flex gap-2 overflow-x-auto">
            {SIDEBAR_SECTIONS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveSection(id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  activeSection === id
                    ? 'bg-white/15 text-white'
                    : 'text-white/50'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto pt-20 md:pt-8">
          <div className="max-w-2xl mx-auto space-y-6">

            {/* ---- PROFILE SECTION ---- */}
            {activeSection === 'profile' && (
              <>
                {/* Profile Header Card */}
                <div className="backdrop-blur-xl bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 rounded-2xl p-6 md:p-8">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                    <div className="relative group">
                      {userAvatar ? (
                        <img
                          src={userAvatar}
                          alt={userName}
                          className="w-20 h-20 rounded-2xl object-cover border-2 border-white/20"
                        />
                      ) : (
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold text-2xl border-2 border-white/20">
                          {getInitials(userName)}
                        </div>
                      )}
                      <div className="absolute inset-0 rounded-2xl bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                        <Camera className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h1 className="text-xl md:text-2xl font-bold text-white font-display">{userName}</h1>
                      <p className="text-white/50 text-sm mt-0.5">{userEmail}</p>
                      <div className="flex flex-wrap items-center gap-3 mt-3">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-purple-500/20 border border-purple-400/30 text-purple-200 text-xs font-medium">
                          <Shield className="w-3 h-3" />
                          {userRole}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-white/40 text-xs">
                          <CalendarDays className="w-3 h-3" />
                          Joined {formatDate(userJoined)}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-white/40 text-xs">
                          <Globe className="w-3 h-3" />
                          {userTimezone}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-white/40 text-xs">
                          <Languages className="w-3 h-3" />
                          {languageLabel}
                        </span>
                      </div>
                    </div>
                    {!isEditing && (
                      <Button
                        onClick={() => setIsEditing(true)}
                        className="bg-white/10 hover:bg-white/15 text-white border border-white/20 rounded-xl h-10 px-5 text-sm font-medium"
                      >
                        Edit Profile
                      </Button>
                    )}
                  </div>
                </div>

                {/* Edit Profile Form */}
                {isEditing && (
                  <form onSubmit={handleProfileUpdate} className="backdrop-blur-xl bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 rounded-2xl p-6 md:p-8">
                    <h2 className="text-lg font-bold text-white font-display mb-6">Edit Profile</h2>

                    <div className="space-y-5">
                      {/* Full Name */}
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-white/70">Full Name *</Label>
                        <div className="relative">
                          <Input
                            type="text"
                            placeholder="John Doe"
                            value={profileForm.full_name}
                            onChange={(e) => setProfileForm(f => ({ ...f, full_name: e.target.value }))}
                            className={`${inputClasses} pl-10`}
                          />
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                        </div>
                      </div>

                      {/* Bio */}
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-white/70">Bio</Label>
                        <div className="relative">
                          <textarea
                            placeholder="Tell us about yourself..."
                            value={profileForm.bio}
                            onChange={(e) => setProfileForm(f => ({ ...f, bio: e.target.value }))}
                            rows={3}
                            maxLength={300}
                            className="w-full bg-white/5 border border-white/15 text-white placeholder:text-white/30 rounded-xl px-4 py-3 pl-10 focus:border-white/30 focus:ring-white/10 focus:outline-none resize-none text-sm"
                          />
                          <FileText className="absolute left-3 top-3.5 w-4 h-4 text-white/40" />
                        </div>
                        <p className="text-xs text-white/30 text-right">{profileForm.bio.length}/300</p>
                      </div>

                      {/* Phone */}
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-white/70">Phone</Label>
                        <div className="relative">
                          <Input
                            type="tel"
                            placeholder="+1 (555) 000-0000"
                            value={profileForm.phone}
                            onChange={(e) => setProfileForm(f => ({ ...f, phone: e.target.value }))}
                            className={`${inputClasses} pl-10`}
                          />
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                        </div>
                      </div>

                      {/* Avatar URL */}
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-white/70">Avatar URL</Label>
                        <div className="relative">
                          <Input
                            type="url"
                            placeholder="https://example.com/avatar.jpg"
                            value={profileForm.avatar_url}
                            onChange={(e) => setProfileForm(f => ({ ...f, avatar_url: e.target.value }))}
                            className={`${inputClasses} pl-10`}
                          />
                          <Camera className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                        </div>
                      </div>

                      {/* Timezone & Language row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-white/70">Timezone</Label>
                          <div className="relative">
                            <select
                              value={profileForm.timezone}
                              onChange={(e) => setProfileForm(f => ({ ...f, timezone: e.target.value }))}
                              className={`${selectClasses} pl-10`}
                            >
                              {TIMEZONES.map(tz => (
                                <option key={tz} value={tz}>{tz}</option>
                              ))}
                            </select>
                            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-white/70">Language</Label>
                          <div className="relative">
                            <select
                              value={profileForm.language}
                              onChange={(e) => setProfileForm(f => ({ ...f, language: e.target.value }))}
                              className={`${selectClasses} pl-10`}
                            >
                              {LANGUAGES.map(({ code, label }) => (
                                <option key={code} value={code}>{label}</option>
                              ))}
                            </select>
                            <Languages className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 mt-8 pt-6 border-t border-white/10">
                      <button
                        type="submit"
                        disabled={profileLoading}
                        className="h-10 px-6 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold text-sm flex items-center gap-2 shadow-lg shadow-purple-500/25 transition-all disabled:opacity-70"
                      >
                        {profileLoading ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Save className="w-4 h-4" />
                        )}
                        {profileLoading ? 'Saving...' : 'Save Changes'}
                      </button>
                      <Button
                        type="button"
                        onClick={() => {
                          setIsEditing(false)
                          if (user) {
                            setProfileForm({
                              full_name: user.full_name || user.name || '',
                              bio: user.bio || '',
                              phone: user.phone || '',
                              avatar_url: user.avatar_url || user.avatar || '',
                              timezone: user.timezone || 'UTC',
                              language: user.language || 'en',
                            })
                          }
                        }}
                        className="bg-white/5 hover:bg-white/10 text-white/60 hover:text-white border border-white/10 rounded-xl h-10 px-5 text-sm"
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                )}

                {/* Profile Details (when not editing) */}
                {!isEditing && (
                  <div className="backdrop-blur-xl bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 rounded-2xl p-6 md:p-8">
                    <h2 className="text-lg font-bold text-white font-display mb-6">Profile Details</h2>
                    <div className="space-y-4">
                      {[
                        { icon: User, label: 'Full Name', value: userName },
                        { icon: Mail, label: 'Email', value: userEmail },
                        { icon: Shield, label: 'Role', value: userRole },
                        { icon: FileText, label: 'Bio', value: user?.bio || 'No bio set' },
                        { icon: Phone, label: 'Phone', value: user?.phone || 'Not provided' },
                        { icon: Globe, label: 'Timezone', value: userTimezone },
                        { icon: Languages, label: 'Language', value: languageLabel },
                        { icon: CalendarDays, label: 'Joined', value: formatDate(userJoined) },
                      ].map(({ icon: Icon, label, value }) => (
                        <div key={label} className="flex items-start gap-3.5 py-2">
                          <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 mt-0.5">
                            <Icon className="w-4 h-4 text-white/40" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs text-white/40 font-medium">{label}</p>
                            <p className="text-sm text-white/80 mt-0.5 break-words">{value}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* ---- SECURITY SECTION ---- */}
            {activeSection === 'security' && (
              <form onSubmit={handlePasswordChange} className="backdrop-blur-xl bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 rounded-2xl p-6 md:p-8">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                    <Lock className="w-5 h-5 text-purple-300" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white font-display">Change Password</h2>
                    <p className="text-white/40 text-xs mt-0.5">Update your password to keep your account secure</p>
                  </div>
                </div>

                <div className="space-y-4 mt-6">
                  {/* Current Password */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-white/70">Current Password</Label>
                    <div className="relative">
                      <Input
                        type={showCurrentPassword ? 'text' : 'password'}
                        placeholder="Enter current password"
                        value={passwordForm.current_password}
                        onChange={(e) => setPasswordForm(f => ({ ...f, current_password: e.target.value }))}
                        className={`${inputClasses} pl-10 pr-10`}
                      />
                      <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                      <button type="button" onClick={() => setShowCurrentPassword(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors">
                        {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* New Password */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-white/70">New Password</Label>
                    <div className="relative">
                      <Input
                        type={showNewPassword ? 'text' : 'password'}
                        placeholder="Minimum 8 characters"
                        value={passwordForm.new_password}
                        onChange={(e) => setPasswordForm(f => ({ ...f, new_password: e.target.value }))}
                        className={`${inputClasses} pl-10 pr-10`}
                      />
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                      <button type="button" onClick={() => setShowNewPassword(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors">
                        {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {/* Strength indicator */}
                    {passwordForm.new_password && (
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex-1 flex gap-1">
                          {[1, 2, 3, 4].map(i => (
                            <div
                              key={i}
                              className={`h-1 flex-1 rounded-full transition-colors ${
                                passwordForm.new_password.length >= i * 3
                                  ? passwordForm.new_password.length >= 12
                                    ? 'bg-emerald-400'
                                    : passwordForm.new_password.length >= 8
                                      ? 'bg-yellow-400'
                                      : 'bg-red-400'
                                  : 'bg-white/10'
                              }`}
                            />
                          ))}
                        </div>
                        <span className={`text-xs font-medium ${
                          passwordForm.new_password.length >= 12 ? 'text-emerald-400' :
                          passwordForm.new_password.length >= 8 ? 'text-yellow-400' : 'text-red-400'
                        }`}>
                          {passwordForm.new_password.length >= 12 ? 'Strong' :
                           passwordForm.new_password.length >= 8 ? 'Fair' : 'Weak'}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-white/70">Confirm New Password</Label>
                    <div className="relative">
                      <Input
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Re-enter new password"
                        value={passwordForm.confirm_password}
                        onChange={(e) => setPasswordForm(f => ({ ...f, confirm_password: e.target.value }))}
                        className={`${inputClasses} pl-10 pr-10`}
                      />
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                      <button type="button" onClick={() => setShowConfirmPassword(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors">
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {passwordForm.confirm_password && passwordForm.new_password !== passwordForm.confirm_password && (
                      <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3 h-3" /> Passwords do not match
                      </p>
                    )}
                    {passwordForm.confirm_password && passwordForm.new_password === passwordForm.confirm_password && passwordForm.confirm_password.length >= 8 && (
                      <p className="text-xs text-emerald-400 flex items-center gap-1 mt-1">
                        <CheckCircle2 className="w-3 h-3" /> Passwords match
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10">
                  <button
                    type="submit"
                    disabled={passwordLoading}
                    className="h-10 px-6 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold text-sm flex items-center gap-2 shadow-lg shadow-purple-500/25 transition-all disabled:opacity-70"
                  >
                    {passwordLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <KeyRound className="w-4 h-4" />
                    )}
                    {passwordLoading ? 'Updating...' : 'Update Password'}
                  </button>
                </div>
              </form>
            )}

            {/* ---- PREFERENCES SECTION ---- */}
            {activeSection === 'preferences' && (
              <div className="space-y-6">
                <div className="backdrop-blur-xl bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 rounded-2xl p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                      <Palette className="w-5 h-5 text-purple-300" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-white font-display">Preferences</h2>
                      <p className="text-white/40 text-xs mt-0.5">Customize your experience</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Timezone */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-white/70">Timezone</Label>
                      <div className="relative">
                        <select
                          value={profileForm.timezone}
                          onChange={(e) => setProfileForm(f => ({ ...f, timezone: e.target.value }))}
                          className={`${selectClasses} pl-10`}
                        >
                          {TIMEZONES.map(tz => (
                            <option key={tz} value={tz}>{tz}</option>
                          ))}
                        </select>
                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
                      </div>
                    </div>

                    {/* Language */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-white/70">Language</Label>
                      <div className="relative">
                        <select
                          value={profileForm.language}
                          onChange={(e) => setProfileForm(f => ({ ...f, language: e.target.value }))}
                          className={`${selectClasses} pl-10`}
                        >
                          {LANGUAGES.map(({ code, label }) => (
                            <option key={code} value={code}>{label}</option>
                          ))}
                        </select>
                        <Languages className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/10">
                    <button
                      type="button"
                      onClick={async () => {
                        setProfileLoading(true)
                        try {
                          await apiFetch('/users/me', {
                            method: 'PATCH',
                            body: JSON.stringify({
                              timezone: profileForm.timezone,
                              language: profileForm.language,
                            }),
                          })
                          showToast('Preferences saved.')
                        } catch (err) {
                          showToast(err.message || 'Failed to save preferences.', 'error')
                        } finally {
                          setProfileLoading(false)
                        }
                      }}
                      disabled={profileLoading}
                      className="h-10 px-6 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold text-sm flex items-center gap-2 shadow-lg shadow-purple-500/25 transition-all disabled:opacity-70"
                    >
                      {profileLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                      {profileLoading ? 'Saving...' : 'Save Preferences'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ---- DANGER ZONE ---- */}
            {activeSection === 'danger' && (
              <div className="backdrop-blur-xl bg-red-500/5 border border-red-400/20 rounded-2xl p-6 md:p-8">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-red-500/15 flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-red-200 font-display">Danger Zone</h2>
                    <p className="text-red-300/50 text-xs mt-0.5">Irreversible and destructive actions</p>
                  </div>
                </div>

                <div className="mt-6 p-5 rounded-xl border border-red-400/15 bg-red-500/5">
                  <h3 className="text-sm font-semibold text-red-200">Delete Account</h3>
                  <p className="text-xs text-red-300/50 mt-1 leading-relaxed">
                    Permanently delete your account and all associated data. This action cannot be undone.
                    All your projects, settings, and data will be permanently removed.
                  </p>

                  {!showDeleteDialog ? (
                    <button
                      type="button"
                      onClick={() => setShowDeleteDialog(true)}
                      className="mt-4 h-9 px-5 rounded-xl bg-red-500/20 hover:bg-red-500/30 border border-red-400/30 text-red-200 text-sm font-medium flex items-center gap-2 transition-all"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Delete My Account
                    </button>
                  ) : (
                    <div className="mt-4 space-y-4">
                      <div className="p-4 rounded-xl bg-red-500/10 border border-red-400/20">
                        <p className="text-sm text-red-200 font-medium mb-3">
                          Type <span className="font-mono font-bold bg-red-500/20 px-1.5 py-0.5 rounded">DELETE</span> to confirm:
                        </p>
                        <Input
                          type="text"
                          placeholder="Type DELETE"
                          value={deleteConfirm}
                          onChange={(e) => setDeleteConfirm(e.target.value)}
                          className="h-10 bg-red-500/10 border-red-400/20 text-red-200 placeholder:text-red-300/30 rounded-xl focus:border-red-400/40 focus:ring-red-500/10"
                        />
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={handleDeleteAccount}
                          disabled={deleteLoading || deleteConfirm !== 'DELETE'}
                          className="h-9 px-5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-semibold flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {deleteLoading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-3.5 h-3.5" />
                          )}
                          {deleteLoading ? 'Deleting...' : 'Permanently Delete'}
                        </button>
                        <button
                          type="button"
                          onClick={() => { setShowDeleteDialog(false); setDeleteConfirm(''); }}
                          className="h-9 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white text-sm font-medium border border-white/10 transition-all"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  )
}

export default App
