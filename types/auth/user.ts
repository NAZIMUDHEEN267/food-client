
export interface User {
    email: string,
    password: string,
    age: Date | number,
    username: string,
    mobile: number,
    pincode: number,
    address: string,
    phonenumber: number,
    role: string
    profile_image?: string | null
}
