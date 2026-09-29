import '../globals.css'
import Document from '@/components/Document'
import { fonts } from '@/lib/fonts-ar'
import { buildMetadata, viewport as siteViewport } from '@/lib/seo'

export const metadata = buildMetadata('ar')
export const viewport = siteViewport

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <Document locale="ar" fonts={fonts}>{children}</Document>
}
