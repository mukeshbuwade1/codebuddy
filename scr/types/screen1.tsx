export type formValuesTypes = {
    email: string,
    password: string
}

export type errorObj = {
    error: boolean,
    message?: string
}

export type validationObj = {
    email: errorObj,
    password: errorObj
}

export type formKeys = "email"|"password"