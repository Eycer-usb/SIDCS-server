export interface Users {
    id?: number;
    name: string;
    lastname: string;
    email: string;
    password: string;
    role: string;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;
}
