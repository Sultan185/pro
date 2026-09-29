import '../globals.css'
import Document from '@/components/Document'
import { fonts } from '@/lib/fonts'
import { buildMetadata, viewport as siteViewport } from '@/lib/seo'

export const metadata = buildMetadata('en')
export const viewport = siteViewport

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <Document locale="en" fonts={fonts}>{children}</Document>
}
