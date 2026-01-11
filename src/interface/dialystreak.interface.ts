interface IDailyStreakData {
    dailyStreakDetails: IDailyStreakDetail[]
}

interface IDailyStreakDetail {
    day: number
    name: string
    description: string
    completedAt: string
    rewards: IRewards
}

interface IRewards {
    points: number
    badge?: string
    badgeDetails?: IBadgeDetails
}

interface IBadgeDetails {
    code: string
    imageUrl: string
}

export { type IDailyStreakData, type IDailyStreakDetail };