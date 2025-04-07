// src/components/ui/card.jsx
export function Card({ children }) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-4">
      {children}
    </div>
  )
}

export function CardContent({ children }) {
  return <div className="space-y-2">{children}</div>
}

