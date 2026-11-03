import { en } from './en'
import type { Dict } from './en'
import { ar } from './ar'

export type Lang = 'en' | 'ar'
export const translations: Record<Lang, Dict> = { en, ar }
export type { Dict }
