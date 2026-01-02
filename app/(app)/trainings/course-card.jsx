export default function CourseCard({ course }) {
  return (
    <div
      className="
        surface flex flex-col sm:flex-row gap-3 p-3 overflow-hidden w-full max-w-full
      "
    >
      {/* IMAGE */}
      <div
        className="
          w-full
          sm:w-40
          aspect-video
          rounded-md
          overflow-hidden
          shrink-0
        "
      >
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* CONTENT */}
      <div className="flex-1 min-w-0 max-w-full">
        <h3 className="text-sm font-semibold leading-snug line-clamp-2">
          {course.title}
        </h3>

        <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
          {course.description}
        </p>

        <p className="text-[11px] text-muted-foreground mt-1">
          {course.instructor}
        </p>

        <div className="flex flex-wrap gap-2 text-[11px] mt-1">
          <span className="font-medium">{course.rating}</span>
          <span className="text-muted-foreground">
            ({course.reviews} ratings)
          </span>
          <span className="text-muted-foreground">
            {course.hours}h · {course.lectures}
          </span>
        </div>

        <div className="flex items-center gap-2 mt-1">
          <span className="text-sm font-semibold">
            ₹{course.price}
          </span>
          <span className="text-xs line-through text-muted-foreground">
            ₹{course.originalPrice}
          </span>
        </div>
      </div>

      {/* CTA */}
      <div className="w-full sm:w-auto shrink-0 flex sm:items-center">
        <button
          className="
            w-full sm:w-auto
            h-8
            px-4
            rounded-md
            bg-primary
            text-primary-foreground
            text-xs
            font-medium
          "
        >
          Add to cart
        </button>
      </div>
    </div>
  )
}
