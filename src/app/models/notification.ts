export enum NotificationType {
    'success',
    'error',
    'warning',
    'info',
}

export class AppNotification {
    id: number
    message: string
    type: NotificationType

    constructor(message: string, type: NotificationType) {
        this.id = Math.floor(Math.random() * 100000)
        this.message = message
        this.type = type
    }
}
