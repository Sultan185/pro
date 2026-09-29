import { IBM_Plex_Sans_Arabic, Inter, Sora, JetBrains_Mono } from 'next/font/google'

// Kept apart from fonts.ts so the English page never preloads the Arabic files.
//
// The Latin faces come first in every stack and the Arabic face fills in the glyphs
// they lack. adjustFontFallback is off because that fallback is a resized local Arial,
// which has Arabic glyphs and would be picked before the real Arabic face.
const sora = Sora({ subsets: ['latin'], variable: '--font-display', weight: ['400', '500', '600', '700'], display: 'swap', adjustFontFallback: false })
const inter = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap', adjustFontFallback: false })
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', weight: ['400', '500'], display: 'swap', adjustFontFallback: false })
const arabic = IBM_Plex_Sans_Arabic({ subsets: ['arabic'], variable: '--font-arabic', weight: ['400', '500', '600', '700'], display: 'swap' })

export const fonts = `${sora.variable} ${inter.variable} ${mono.variable} ${arabic.variable}`
