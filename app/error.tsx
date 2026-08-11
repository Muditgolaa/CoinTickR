'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <h2 className="text-2xl font-semibold">Something went wrong</h2>
      <p className="max-w-md text-sm text-purple-100">
        We couldn&apos;t load this data right now — this is usually a temporary issue with the market
        data provider. Please try again.
      </p>
      <button
        onClick={reset}
        className="mt-2 cursor-pointer rounded-md bg-green-500 px-4 py-2 text-sm font-semibold text-dark-900 transition-all hover:bg-green-400"
      >
        Try again
      </button>
    </main>
  )
}
