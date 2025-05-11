
export type signInType = {
    email: string,
    password: string
}

export type forgotType = {
    email: string
}

export type responseType = {
    message: string
}

export type tokenType = {
    token: string
}

export type versionResponse = {
    _id: string,
    platform: string,
    version: string
}

export type versionType = {
    platform: string
}