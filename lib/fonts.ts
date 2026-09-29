import { Inter, Sora, JetBrains_Mono } from 'next/font/google'

const sora = Sora({ subsets: ['latin'], variable: '--font-display', weight: ['400', '500', '600', '700'], display: 'swap' })
const inter = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' })
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', weight: ['400', '500'], display: 'swap' })

export const fonts = `${sora.variable} ${inter.variable} ${mono.variable}`
