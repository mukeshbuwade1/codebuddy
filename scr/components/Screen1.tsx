import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import InputView from './InputView'
import ButtonComp from './ButtonComp'
import { formKeys, formValuesTypes, validationObj } from '../types/screen1'
import { basePropTypeForForm, storeValueTypes } from '../types/types'
import asyncStorage, { asyncStoreKeys } from '../services/asyncStorage'



const Screen1 = ({ storeValues, setStoreValues }: basePropTypeForForm) => {
    const initialFormValues = {
        email: "", password: ""
    }
    const initialValidationObj = {
        email: {
            error: false,
            message: ""
        },
        password: {
            error: false,
            message: ""
        }
    }
    const [formValues, setFormValues] = useState<formValuesTypes>(initialFormValues)
    const [validationObj, setValidationObj] = useState<validationObj>(initialValidationObj)

    useEffect(() => {
        setFormValues({
            ...formValues,
            email: storeValues?.formValues?.emailId ?? "",
            password: storeValues?.formValues?.password ?? "",
        })
    }, [storeValues])



    const handleOnChange = (key: formKeys, value: string) => {
        if (key == "email" || key == "password") {
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
        let emailReg = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
        let passReg = /^(?=.*[A-Z].*[A-Z])(?=.*[a-z].*[a-z])(?=.*\d.*\d)(?=.*[^a-zA-Z0-9].*[^a-zA-Z0-9]).{8,}$/;

        if (!formValues?.email) {
            flag = true
            value.email = { error: true, message: "Field is required" }
        } else if (!emailReg.test(formValues?.email)) {
            flag = true
            value.email = { error: true, message: "Email is invalid" }
        }

        if (!formValues?.password) {
            flag = true
            value.password = { error: true, message: "Field is required" }
        } else if (!passReg.test(formValues.password)) {
            flag = true
            value.password = { error: true, message: "Password must contain minimum 2 capital letters, 2 small letter, 2 numbers and 2 special characters" }
        }

        setValidationObj(value)
        return flag
    }

    const handleSubmit = (changeScreen?: boolean) => {
        if (isInValid()) return
        const temp: storeValueTypes = {
            currentStep: changeScreen ? 2 : 1,
            formValues:
            {
                ...storeValues?.formValues,
                emailId: formValues.email,
                password: formValues.password,
            }
        }

        setStoreValues(temp)
        asyncStorage.storeData(asyncStoreKeys.store, temp)
    }

    return (
        <View>
            <InputView
                placeholder='emailId'
                value={formValues.email}
                keyboardType={'email-address'}
                onChangeText={(t) => handleOnChange("email", t)}
                errorObj={validationObj.email}
            />
            <InputView
                placeholder='password'
                value={formValues.password}
                secureTextEntry={true}
                onChangeText={(t) => handleOnChange("password", t)}
                errorObj={validationObj.password}

            />
                <ButtonComp title={"Save"} secondary={true} onPress={() => handleSubmit()} />
                <ButtonComp 
                 title={"Save and Next"} onPress={() => handleSubmit(true)} />
        </View>
    )
}

export default Screen1

const styles = StyleSheet.create({})