export type storeValueTypes ={currentStep: number,
formValues: {
  "emailId": string,
  "password": string,
  "firstName": string,
  "lastName": string,
  "address": string,
  "countryCode"?: string,
  "phoneNumber": string
}}

export type basePropTypeForForm={
    storeValues:storeValueTypes,
    setStoreValues: React.Dispatch<React.SetStateAction<storeValueTypes | undefined>>
}