export default function LoginLeftPanel() {
  return (
    <div className="hidden md:flex flex-col justify-center px-16 bg-primary text-primary-foreground relative">
      <div className="absolute inset-0 bg-black/5" />

      <div className="relative max-w-md space-y-6">
        <span className="text-sm uppercase tracking-wide text-primary-foreground/70">
          Learning Platform
        </span>

        <h1 className="text-4xl font-semibold leading-tight">
          Train teams. <br /> Build confidence.
        </h1>

        <p className="text-primary-foreground/80 leading-relaxed">
          Structured training for hospitality teams and professional institutes.
        </p>
      </div>
    </div>
  );
}
