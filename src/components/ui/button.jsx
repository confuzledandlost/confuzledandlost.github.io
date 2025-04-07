// src/components/ui/button.jsx
export function Button({ children, variant = "default", ...props }) {
  const base = "px-4 py-2 rounded font-medium transition"
  const styles =
    variant === "outline"
      ? "border border-gray-500 text-gray-700 dark:text-gray-200 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700"
      : variant === "ghost"
      ? "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
      : "bg-blue-600 text-white hover:bg-blue-700"

  return (
    <button className={`${base} ${styles}`} {...props}>
      {children}
    </button>
  )
}

