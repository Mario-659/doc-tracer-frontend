export interface UserResponse {
    id: number;
    username: string;
    email: string;
    roles: string[];
    isActive: boolean;
    lastLogin: string;
    createdAt: string;
    updatedAt: string;
}
