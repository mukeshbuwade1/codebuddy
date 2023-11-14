import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { formKeys, formValuesTypes, validationObj } from '../types/screen2'
import InputView from './InputView'
import ButtonComp from './ButtonComp'
import { basePropTypeForForm, storeValueTypes } from '../types/types'
import asyncStorage, { asyncStoreKeys } from '../services/asyncStorage'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const Screen2 = ({ storeValues, setStoreValues }: basePropTypeForForm) => {
    const initialFormValues = {
        firstName: "", lastName: "", address: ""
    }
    const initialValidationObj = {
        firstName: {
            error: false,
            message: ""
        },
        lastName: {
            error: false,
            message: ""
        },
        address: {
            error: false,
            message: ""
        },
    }
    const [formValues, setFormValues] = useState<formValuesTypes>(initialFormValues)
    const [validationObj, setValidationObj] = useState<validationObj>(initialValidationObj)

    useEffect(() => {
        setFormValues({
            ...formValues,
            firstName: storeValues?.formValues?.firstName ?? "",
            lastName: storeValues?.formValues?.lastName ?? "",
            address: storeValues?.formValues?.address ?? ""
        })
    }, [storeValues])

    const handleOnChange = (key: formKeys, value: string) => {
        if (key == "firstName" || key == "lastName" || key == "address") {
            if (validationObj?.[key]?.error) {
                setValidationObj({
                    ...validationObj,
                    [key]: { error: false, message: "" }
                })
            }
        }
        setFormValues({
            ...formValues,
            [key]: value
        })
    }

    const isInValid = () => {
        let flag = false
        let value = { ...initialValidationObj }
        const alphabetRegex = /^[a-zA-Z]+$/;

        if (!formValues?.firstName) {
            flag = true
            value.firstName = { error: true, message: "Field is required" }
        } else if (formValues?.firstName.trim().length < 2) {
            flag = true
            value.firstName = { error: true, message: "name must have more then 2 characters" }
        } else if (!alphabetRegex.test(formValues?.firstName.trim())) {
            flag = true
            value.firstName = { error: true, message: "Allow only alphabets" }
        }

        if (!formValues?.lastName) {
            flag = true
            value.lastName = { error: true, message: "Field is required" }
        } else if (!alphabetRegex.test(formValues?.lastName.trim())) {
            flag = true
            value.lastName = { error: true, message: "Allow only alphabets. Space is not allowed" }
        }

        if (!formValues?.address) {
            flag = true
            value.address = { error: true, message: "Field is required" }
        } else if (formValues?.address.trim().length < 10) {
            flag = true
            value.address = { error: true, message: "name must have more then 10 characters" }
        }

        setValidationObj(value)
        return flag
    }

    const handleSubmit = (changeScreen: number) => {
        if (changeScreen !== 0 && isInValid()) return

        const temp: storeValueTypes = storeValues
        if (changeScreen == 0) {
            temp.currentStep = 1
        } else {
            temp.currentStep = changeScreen == 1 ? 2 : 3
            temp.formValues = {
                ...temp.formValues,
                ...formValues
            }
        }

        setStoreValues({...temp})
        asyncStorage.storeData(asyncStoreKeys.store, temp)
    }

    return (
        <KeyboardAwareScrollView>
            <InputView
                placeholder='first name'
                value={formValues.firstName}
                onChangeText={(t) => handleOnChange("firstName", t)}
                errorObj={validationObj.firstName}
                maxLength={50}
            />
            <InputView
                placeholder='last Name'
                value={formValues.lastName}
                onChangeText={(t) => handleOnChange("lastName", t)}
                errorObj={validationObj.lastName}
            />
            <InputView
                placeholder='address'
                value={formValues.address}
                onChangeText={(t) => handleOnChange("address", t)}
                errorObj={validationObj.address}
            />

            <ButtonComp title={"Back"} secondary={true} onPress={() => handleSubmit(0)} />
            <ButtonComp title={"Save"} secondary={true} onPress={() => handleSubmit(1)} />
            <ButtonComp title={"Save and Next"} onPress={() => handleSubmit(2)} />
        </KeyboardAwareScrollView>
    )
}

export default Screen2

const styles = StyleSheet.create({})