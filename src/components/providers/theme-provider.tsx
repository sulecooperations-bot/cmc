"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { useAppStore } from "@/lib/store"

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  const { reducedMotion } = useAppStore()

  return (
    <NextThemesProvider {...props}>
      <div className={reducedMotion ? "reduced-motion" : ""}>
        {children}
      </div>
    </NextThemesProvider>
  )
}

