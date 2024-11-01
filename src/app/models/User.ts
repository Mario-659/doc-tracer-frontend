export enum Role {
    ADMIN = 'ROLE_ADMIN',
    EDITOR = 'ROLE_EDITOR',
    VIEWER = 'ROLE_VIEWER'
}

export interface User {
    username: string,
    roles: Role[]
    expirationTimestamp: number
}
