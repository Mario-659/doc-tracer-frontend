export interface HttpError {
    message: string
    type: 'Client-side' | 'Server-side'
    status?: number
}
