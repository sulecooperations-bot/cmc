import { mockData } from "@/lib/mock/seed"
import { ReactNode } from "react"

// Generate static params for static export
export function generateStaticParams() {
  return mockData.assets.map((asset) => ({
    type: asset.type,
    id: asset.id,
  }))
}

export default function Layout({
  children,
}: {
  children: ReactNode
}) {
  return <>{children}</>
}
