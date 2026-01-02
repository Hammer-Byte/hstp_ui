"use client"

import { useMemo, useState } from "react"
import { Search, SlidersHorizontal } from "lucide-react"
import CourseCard from "./course-card"
const COURSES = [
    {
        id: 1,
        title: "Java Spring Framework, Spring Boot, Spring AI - Gen AI",
        description:
            "Master Java, Spring Boot, Spring Security, Docker and Microservices",
        instructor: "Navin Reddy",
        rating: 4.6,
        reviews: 37791,
        hours: 55,
        lectures: 500,
        level: "All Levels",
        price: 399,
        originalPrice: 3549,
        bestseller: true,
        image: "https://img-c.udemycdn.com/course/750x422/2167814_a0e6_5.jpg",
    },
    {
        id: 2,
        title: "Advanced React & Performance",
        description: "Hooks, memoization, patterns, and optimization",
        instructor: "John Smith",
        rating: 4.4,
        reviews: 12000,
        hours: 32,
        lectures: 210,
        level: "Intermediate",
        price: 499,
        originalPrice: 1999,
        bestseller: false,
        image: "https://img-c.udemycdn.com/course/750x422/5417142_354e.jpg",
    },
]

export default function TrainingsPage() {
    const [search, setSearch] = useState("")
    const [level, setLevel] = useState("all")
    const [bestsellerOnly, setBestsellerOnly] = useState(false)
    const [open, setOpen] = useState(false)

    const filteredCourses = useMemo(() => {
        return COURSES.filter((course) => {
            const matchesSearch =
                course.title.toLowerCase().includes(search.toLowerCase()) ||
                course.description.toLowerCase().includes(search.toLowerCase())

            const matchesLevel =
                level === "all" || course.level === level

            const matchesBestseller =
                !bestsellerOnly || course.bestseller

            return matchesSearch && matchesLevel && matchesBestseller
        })
    }, [search, level, bestsellerOnly])

    return (
        <div className="space-y-6">

            {/* HEADER */}
            <div className="space-y-4">
                <h1 className="text-2xl font-bold">All Trainings</h1>

                {/* SEARCH + FILTER */}
                <div className="relative flex gap-2">

                    {/* SEARCH */}
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search trainings"
                            className="w-full h-10 pl-9 pr-4 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                    </div>

                    {/* FILTER DROPDOWN */}
                    <div className="relative">
                        <button
                            onClick={() => setOpen((v) => !v)}
                            className="surface px-4 h-10 flex items-center gap-2 text-sm"
                        >
                            <SlidersHorizontal className="h-4 w-4" />
                            Filter
                        </button>

                        {open && (
                            <div className="absolute right-0 mt-2 w-64 surface p-4 z-20">
                                <FilterDropdown
                                    level={level}
                                    setLevel={setLevel}
                                    bestsellerOnly={bestsellerOnly}
                                    setBestsellerOnly={setBestsellerOnly}
                                    close={() => setOpen(false)}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* COURSES */}
            <div className="space-y-4">
                {filteredCourses.length === 0 && (
                    <p className="text-sm text-muted-foreground">
                        No trainings found.
                    </p>
                )}

                {filteredCourses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                ))}
            </div>
        </div>
    )
}
function FilterDropdown({
    level,
    setLevel,
    bestsellerOnly,
    setBestsellerOnly,
    close,
}) {
    return (
        <div className="space-y-4 text-sm">

            {/* LEVEL */}
            <div className="space-y-2">
                <p className="font-medium">Level</p>
                {["all", "All Levels", "Intermediate"].map((l) => (
                    <label key={l} className="flex items-center gap-2">
                        <input
                            type="radio"
                            checked={level === l}
                            onChange={() => setLevel(l)}
                        />
                        {l}
                    </label>
                ))}
            </div>

            {/* BESTSELLER */}
            <div className="space-y-2">
                <p className="font-medium">Other</p>
                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={bestsellerOnly}
                        onChange={(e) => setBestsellerOnly(e.target.checked)}
                    />
                    Bestseller only
                </label>
            </div>

            {/* ACTIONS */}
            <div className="flex justify-end pt-2">
                <button
                    onClick={close}
                    className="text-sm font-medium text-primary"
                >
                    Apply
                </button>
            </div>
        </div>
    )
}
