export enum UserRole {
    Admin = 1,
    User = 2
}

export interface JwtToken {
    Role: UserRole,
    sub: string;
}