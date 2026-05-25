'use client'

export function LoadingSkeleton({ count = 1 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="skeleton h-24 rounded-lg" />
      ))}
    </div>
  )
}

export function SkeletonCard() {
  return (
    <div className="skeleton h-64 rounded-lg">
      <div className="skeleton h-32 mb-4" />
      <div className="skeleton h-4 w-3/4 mb-2" />
      <div className="skeleton h-4 w-1/2" />
    </div>
  )
}
