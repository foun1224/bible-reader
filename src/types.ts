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
  gracePeriodUsed?: boolean  // 本輪連讀已用過一次寬限
}

// 閱讀計劃
export interface ReadingPlan {
  planId: 'yearly' | 'nt90' | 'custom'
  startDate: string  // 'YYYY-MM-DD'
  customChaptersPerDay?: number
}

// 成就
export interface Achievement {
  id: string
  unlockedAt: string  // ISO 8601
}

export interface Highlight {
  id: string                     // UUID-like: `${sourceId}-${bookId ?? 'j'}-${chapter}-${verse}-${Date.now()}`
  sourceId: 'ckjv' | 'jasher'
  bookId?: number
  chapter: number
  verse: number
  color: 'yellow' | 'red' | 'green' | 'blue'
  note: string                   // 可空字串
  highlightText: string          // 劃線的文字內容
  createdAt: string              // ISO timestamp
}
