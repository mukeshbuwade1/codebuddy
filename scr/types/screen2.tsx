
export type formValuesTypes = {
    firstName: string,
    lastName: string
    address: string
}

export type errorObj = {
    error: boolean,
    message?: string
}

export type validationObj = {
    firstName: errorObj,
    lastName: errorObj
    address: errorObj
}

export type formKeys = "firstName"|"lastName"|"address"