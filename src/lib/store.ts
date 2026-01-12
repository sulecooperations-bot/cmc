import { create } from "zustand"
import { persist } from "zustand/middleware"

type Density = "comfortable" | "compact"

interface AppState {
  density: Density
  reducedMotion: boolean
  sidebarCollapsed: boolean
  setDensity: (density: Density) => void
  setReducedMotion: (reduced: boolean) => void
  setSidebarCollapsed: (collapsed: boolean) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      density: "comfortable",
      reducedMotion: false,
      sidebarCollapsed: false,
      setDensity: (density) => set({ density }),
      setReducedMotion: (reduced) => set({ reducedMotion: reduced }),
      setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
    }),
    {
      name: "cmc-app-settings",
    }
  )
)

