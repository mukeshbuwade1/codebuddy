
export type countryDropData = {
    label: string,
    value: string,
}

export type formValuesTypes = {
    countryCode?: countryDropData,
    phoneNumber: string
    acceptTermsAndCondition: boolean
}

export type errorObj = {
    error: boolean,
    message?: string
}

export type validationObj = {
    countryCode: errorObj,
    phoneNumber: errorObj
    acceptTermsAndCondition: errorObj
}

export type formKeys = "countryCode" | "phoneNumber" | "acceptTermsAndCondition"