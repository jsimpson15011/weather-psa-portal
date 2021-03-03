export interface IAnnouncement {
    id?: number | null,
    title: string,
    body: string,
    isApproved: boolean,
    expiration: Date
}