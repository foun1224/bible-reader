export interface Verse {
  number: number
  text: string
}

export interface Chapter {
  number: number
  verses: Verse[]
}

export interface Book {
  id: number | string
  name: string
  nameEn?: string
  testament?: string
  chapters: Chapter[]
}

export interface BibleData {
  name: string
  nameEn: string
  books: Book[]
}

export interface JasherData {
  name: string
  nameEn: string
  chapters: Chapter[]
}

export interface BookMark {
  sourceId: 'ckjv' | 'jasher'
  bookId?: number
  chapter: number
  verse: number
}

export interface CompletionRecord {
  sourceId: 'ckjv' | 'jasher'
  bookId?: number
  bookName?: string
  chapter: number
  completedAt: string  // ISO 8601 timestamp
}

export interface StreakData {
  lastReadDate: string  // 'YYYY-MM-DD'（台灣時區，sv-SE locale）
  currentStreak: number
  longestStreak: number
}
