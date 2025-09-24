import ThemeToggle from '../ThemeToggle'

export default function ThemeToggleExample() {
  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Theme Toggle</h2>
      <div className="flex items-center gap-4">
        <span>Toggle between light and dark mode:</span>
        <ThemeToggle />
      </div>
      <div className="p-4 bg-card border rounded-lg">
        <p className="text-card-foreground">
          This card demonstrates how the theme affects the interface colors.
        </p>
      </div>
    </div>
  )
}