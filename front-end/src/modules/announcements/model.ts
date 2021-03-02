export interface IAnnouncement {
    id: number,
    title: string,
    body: string,
    isApproved: boolean,
    expiration: Date
}