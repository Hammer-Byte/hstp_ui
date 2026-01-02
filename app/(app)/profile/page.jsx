"use client"

import { useState, useRef, useMemo, useCallback } from "react"
import {
  User,
  Mail,
  Phone,
  Wallet,
  FileText,
  BookOpen,
  Camera,
  MapPin,
} from "lucide-react"
import { Input } from "@/components/ui/input"

/* TABS CONFIGURATION */
const TABS = [
  { id: "basic", label: "Basic Details", icon: User },
  { id: "enrollments", label: "Enrollments", icon: BookOpen },
  { id: "wallet", label: "Wallet", icon: Wallet },
  { id: "notes", label: "Private Notes", icon: FileText },
]

const INITIAL_PROFILE = {
  name: "John Doe",
  email: "john@example.com",
  phone: "+91 98765 43210",
  address: "Ahmedabad, Gujarat",
  photo: null,
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("basic")
  const [profile, setProfile] = useState(INITIAL_PROFILE)
  const fileRef = useRef(null)

  /* ---------- HANDLERS ---------- */

  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    setProfile((prev) => ({ ...prev, [name]: value }))
  }, [])

  const handlePhotoChange = useCallback((e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith("image/")) return
    if (file.size > 2 * 1024 * 1024) return

    const reader = new FileReader()
    reader.onloadend = () => {
      setProfile((prev) => ({ ...prev, photo: reader.result }))
    }
    reader.readAsDataURL(file)
  }, [])

  const openFilePicker = useCallback(() => {
    fileRef.current?.click()
  }, [])

  /* ---------- DERIVED DATA ---------- */

  const initials = useMemo(() => {
    return profile.name
      .split(" ")
      .filter(Boolean)
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase()
  }, [profile.name])

  /* ---------- RENDER ---------- */

  return (
    <div className="w-full max-w-[100vw] overflow-x-hidden bg-background min-h-screen">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
        {/* HEADER */}
        <Header />

        {/* PROFILE CARD */}
        <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
          <ProfileHeader
            profile={profile}
            initials={initials}
            fileRef={fileRef}
            onPhotoChange={handlePhotoChange}
            onOpenFile={openFilePicker}
          />

          <Tabs activeTab={activeTab} onChange={setActiveTab} />

          <div className="p-4 sm:p-6 bg-card">
            {activeTab === "basic" ? (
              <BasicDetails profile={profile} onChange={handleChange} />
            ) : (
              <EmptyState />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---------- SUB COMPONENTS ---------- */

function Header() {
  return (
    <div className="flex flex-col gap-1 px-1">
      <h1 className="text-2xl font-bold tracking-tight">Profile Settings</h1>
      <p className="text-muted-foreground text-sm">
        Manage your personal information.
      </p>
    </div>
  )
}

function ProfileHeader({
  profile,
  initials,
  fileRef,
  onPhotoChange,
  onOpenFile,
}) {
  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <div className="relative shrink-0">
          <div className="h-24 w-24 rounded-full overflow-hidden bg-muted flex items-center justify-center border-2 border-background shadow-sm">
            {profile.photo ? (
              <img
                src={profile.photo}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-2xl font-semibold text-muted-foreground">
                {initials}
              </span>
            )}
          </div>

          <button
            onClick={onOpenFile}
            className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center ring-2 ring-background hover:bg-primary/90 transition-all"
          >
            <Camera className="h-4 w-4" />
          </button>

          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onPhotoChange}
          />
        </div>

        <div className="text-center sm:text-left space-y-1 flex-1 min-w-0">
          <h2 className="text-xl font-semibold truncate">{profile.name}</h2>
          <p className="text-sm text-muted-foreground truncate">
            {profile.email}
          </p>
          <div className="flex flex-wrap justify-center sm:justify-start gap-2 pt-1">
            <Badge color="blue">Student</Badge>
            <Badge color="green">Verified</Badge>
          </div>
        </div>
      </div>
    </div>
  )
}

function Tabs({ activeTab, onChange }) {
  return (
    <div className="border-b w-full overflow-x-auto bg-muted/30">
      <div className="flex w-full min-w-max px-4 sm:px-6">
        {TABS.map(({ id, label, icon: Icon }) => {
          const isActive = activeTab === id
          return (
            <button
              key={id}
              onClick={() => onChange(id)}
              className={`relative flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function BasicDetails({ profile, onChange }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <Field label="Full Name">
        <Input name="name" value={profile.name} onChange={onChange} />
      </Field>

      <Field label="Email Address" icon={<Mail className="h-4 w-4" />}>
        <Input
          name="email"
          value={profile.email}
          onChange={onChange}
          className="pl-9"
        />
      </Field>

      <Field label="Phone Number" icon={<Phone className="h-4 w-4" />}>
        <Input
          name="phone"
          value={profile.phone}
          onChange={onChange}
          className="pl-9"
        />
      </Field>

      <div className="space-y-2 md:col-span-2 min-w-0">
        <Label>Address</Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <textarea
            name="address"
            value={profile.address}
            onChange={onChange}
            rows={3}
            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm pl-9 resize-none"
          />
        </div>
      </div>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="py-10 text-center space-y-3">
      <div className="mx-auto h-12 w-12 rounded-full bg-muted flex items-center justify-center">
        <BookOpen className="h-5 w-5 text-muted-foreground" />
      </div>
      <p className="text-muted-foreground text-sm">
        This section is currently empty.
      </p>
    </div>
  )
}

/* ---------- HELPERS ---------- */

function Label({ children }) {
  return <label className="text-sm font-medium leading-none">{children}</label>
}

function Field({ label, icon, children }) {
  return (
    <div className="space-y-2 min-w-0">
      <Label>{label}</Label>
      {icon ? (
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
            {icon}
          </div>
          {children}
        </div>
      ) : (
        children
      )}
    </div>
  )
}

function Badge({ children, color }) {
  const styles = {
    blue: "bg-blue-50 text-blue-700 ring-blue-700/10",
    green: "bg-green-50 text-green-700 ring-green-600/20",
  }

  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ${
        styles[color] || styles.blue
      }`}
    >
      {children}
    </span>
  )
}
