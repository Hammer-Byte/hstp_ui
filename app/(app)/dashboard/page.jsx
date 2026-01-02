"use client"

import { useEffect, useMemo, useState } from "react"
import { BookOpen, FileText, Award, Clock } from "lucide-react"
import Link from "next/link"

const COMMON_ACTIONS = [
  { title: "All Trainings", subtitle: "Corporate programs", icon: BookOpen },
  { title: "My Enrolled", subtitle: "Company courses", icon: Clock },
  { title: "Exams", subtitle: "Internal tests", icon: FileText },
  { title: "Certificates", subtitle: "Achievements", icon: Award },
]

export default function DashboardPage() {
  const [hotelId, setHotelId] = useState(null)

  useEffect(() => {
    try {
      const stored = localStorage.getItem("activeHotel")
      if (stored) {
        const parsed = JSON.parse(stored)
        setHotelId(parsed?.id || "h1")
      } else {
        setHotelId("h1")
      }
    } catch {
      setHotelId("h1")
    }
  }, [])

  // ✅ Derived state (clean & predictable)
  const progressValue = useMemo(() => {
    if (hotelId === "h1") return 60
    if (hotelId === "h2") return 42
    return 78
  }, [hotelId])

  if (!hotelId) return null

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Welcome back! Here is your learning overview.
        </p>
      </div>

      {/* PROGRESS CARD */}
      <div className="surface p-5 rounded-xl border bg-card shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm font-medium">Training Completion</p>
            <p className="text-xs text-muted-foreground">
              Based on assigned courses
            </p>
          </div>
          <span className="text-2xl font-bold text-primary">
            {progressValue}%
          </span>
        </div>

        <div className="h-3 rounded-full bg-secondary overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-700"
            style={{ width: `${progressValue}%` }}
          />
        </div>
      </div>

      {/* ACTIONS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {COMMON_ACTIONS.map((item) => {
          const content = (
            <>
              <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                <item.icon className="h-6 w-6" />
              </div>
              <h3 className="font-semibold mb-1">{item.title}</h3>
              <p className="text-xs text-muted-foreground">
                {item.subtitle}
              </p>
            </>
          )

          return item.title === "All Trainings" ? (
            <Link
              key={item.title}
              href="/trainings"
              className="surface p-4 rounded-xl border text-left hover:shadow-md hover:border-primary/50 transition-all"
            >
              {content}
            </Link>
          ) : (
            <button
              key={item.title}
              className="surface p-4 rounded-xl border text-left hover:shadow-md hover:border-primary/50 transition-all"
            >
              {content}
            </button>
          )
        })}
      </div>
    </div>
  )
}
