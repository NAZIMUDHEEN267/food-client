
export interface User {
    email: string,
    password: string,
    age: Date | number,
    username: string,
    pincode: number,
    address: string,
    phonenumber: number,
    role: string
    profile_image?: string | null
}


export type token = {
    token: string
}