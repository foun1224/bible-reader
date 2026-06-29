import { useEffect } from 'react'

const ACHIEVEMENT_LABELS: Record<string, { icon: string; name: string }> = {
  first_chapter: { icon: '🌱', name: '第一章' },
  first_book:    { icon: '📖', name: '第一本書' },
  streak_7:      { icon: '🔥', name: '連續7天' },
  streak_30:     { icon: '💫', name: '連續30天' },
  nt_complete:   { icon: '✨', name: '新約完成' },
  ot_complete:   { icon: '🏆', name: '舊約完成' },
  century:       { icon: '💯', name: '百章勇士' },
}

interface Props {
  achievementId: string
  onClose: () => void
}

export default function AchievementModal({ achievementId, onClose }: Props) {
  const label = ACHIEVEMENT_LABELS[achievementId] ?? { icon: '🎉', name: achievementId }

  useEffect(() => {
    const timer = setTimeout(() => { onClose() }, 3500)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[60] bg-black/70 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="flex flex-col items-center gap-3 px-10 py-8 rounded-2xl bg-parchment-50 dark:bg-[#221C17] shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="text-7xl">{label.icon}</div>
        <div className="text-sm font-medium text-parchment-300 dark:text-[#A8906E]">成就解鎖！</div>
        <div className="text-2xl font-bold text-parchment-500 dark:text-[#EDE0C4]">{label.name}</div>
        <div className="text-[10px] text-parchment-300 dark:text-[#5A4838] mt-3 opacity-60">點任意處關閉</div>
      </div>
    </div>
  )
}
