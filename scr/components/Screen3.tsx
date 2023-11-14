import { Modal, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ButtonComp from './ButtonComp'
import InputView from './InputView'
import { countryDropData, formKeys, formValuesTypes, validationObj } from '../types/screen3'
import CountryCodeDropdown from './DropdownCom'
import CheckBoxComp from './CheckBoxComp'
import { basePropTypeForForm, storeValueTypes } from '../types/types'
import asyncStorage, { asyncStoreKeys } from '../services/asyncStorage'
import colors from '../assets/colors'

const CountryCodeList: countryDropData[] = [
    { label: "India (+91)", value: "+91" },
    { label: "America (+1)", value: "+1" },
];

const Screen3 = ({ storeValues, setStoreValues }: basePropTypeForForm) => {
    const initialFormValues = {
        countryCode: {
            label: "",
            value: ""
        }, phoneNumber: "", acceptTermsAndCondition: false
    }
    const initialValidationObj = {
        countryCode: {
            error: false,
            message: ""
        },
        phoneNumber: {
            error: false,
            message: ""
        },
        acceptTermsAndCondition: {
            error: false,
            message: ""
        },
    }
    const [formValues, setFormValues] = useState<formValuesTypes>(initialFormValues)
    const [validationObj, setValidationObj] = useState<validationObj>(initialValidationObj)
    const [showModal, setShowModal] = useState(false)
   
    useEffect(() => {
        let code:countryDropData | undefined = undefined
        if(storeValues?.formValues?.countryCode){
            code = CountryCodeList.find((e)=>e.value==storeValues?.formValues?.countryCode);
            console.log(code)
        }
        setFormValues({
            ...formValues,
            countryCode:code, 
            phoneNumber:  storeValues?.formValues?.phoneNumber

        })
    }, [storeValues])

    const handleOnChange = (key: formKeys, value: string | boolean | countryDropData) => {
        if (key == "countryCode" || key == "phoneNumber" || key == "acceptTermsAndCondition") {
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

        if (!formValues?.countryCode?.value) {
            flag = true
            value.countryCode = { error: true, message: "Field is required" }
        }

        if (!formValues?.phoneNumber) {
            flag = true
            value.phoneNumber = { error: true, message: "Field is required" }
        } else if (formValues?.phoneNumber.trim().length !== 10) {
            flag = true
            value.phoneNumber = { error: true, message: "invalid phone number" }
        }

        if (!formValues?.acceptTermsAndCondition) {
            flag = true
            value.acceptTermsAndCondition = { error: true, message: "Accept terms and conditions" }
        }

        setValidationObj(value)
        return flag
    }

    const handleSubmit = async (changeScreen: number) => {
        if (changeScreen !== 0 && isInValid()) return

        const temp: storeValueTypes = storeValues
        if (changeScreen == 0) {
            temp.currentStep = 2
        } else {
            temp.formValues = {
                ...temp.formValues,
                ...formValues,
                countryCode: formValues?.countryCode?.value
            }
        }
        setStoreValues({...temp})
        await asyncStorage.storeData(asyncStoreKeys.store, temp)
        if(changeScreen == 1)openModal()
    }

    const openModal = () => {
        setShowModal(true)
    }
    const closeModal = () => {
        setShowModal(false)
    }

    const Row = ({ title, value, status }: { title: string, value: string, status?: string }) => (
        <View style={styles.row}>
            <Text style={[styles.text, ]
            }>{title}</Text>
            <Text style={[styles.text]}>{(value == "") ? "---" : value}</Text>
        </View>
    )

    return (
        <View>
            <Modal
                animationType="fade"
                transparent={true}
                visible={showModal}
                onRequestClose={closeModal}>
                <View style={[styles.centeredView]}>
                    <View style={styles.modalView}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: "700",
                            color: colors.primary,
                            marginBottom: 10
                        }}>FORM DATA</Text>
                        <Row
                            title='Email ID'
                            value={storeValues.formValues.emailId}
                        />
                        <Row
                            title='password'
                            value={storeValues.formValues.password}
                        />
                        <Row
                            title='firstName'
                            value={storeValues.formValues.firstName}
                        />
                        <Row
                            title='lastName'
                            value={storeValues.formValues.lastName}
                        />
                        <Row
                            title='address'
                            value={storeValues.formValues.address}
                        />
                        <Row
                            title='countryCode'
                            value={storeValues?.formValues?.countryCode??""}
                        />
                        <Row
                            title='phoneNumber'
                            value={storeValues.formValues.phoneNumber}
                        />

                        <ButtonComp title={"Close"} secondary={true} boxStyle={{ width: "100%" }} onPress={closeModal} />
                        <ButtonComp title={"Clear Data and Close"} boxStyle={{ width: "100%" }} onPress={() => {
                            closeModal()
                            asyncStorage.removeValue(asyncStoreKeys.store)
                            setStoreValues({})
                        }} />

                    </View>
                </View>
            </Modal>
            <CountryCodeDropdown
                data={CountryCodeList}
                value={formValues?.countryCode?.value}
                setValue={(l) => {
                    handleOnChange("countryCode", l)
                }}
                label={"select country Code"}
                placeholder={"select country Code"}
                errorObj={validationObj.countryCode}
            />
            <InputView
                placeholder='phone number'
                value={formValues.phoneNumber}
                onChangeText={(t) => handleOnChange("phoneNumber", t)}
                errorObj={validationObj.phoneNumber}
                maxLength={10}
                keyboardType='phone-pad'
            />

            <CheckBoxComp
                label={"I accept the Terms and Conditions"}
                isChecked={formValues.acceptTermsAndCondition}
                onToggle={() => handleOnChange("acceptTermsAndCondition", !formValues.acceptTermsAndCondition)}
            />
            {validationObj?.acceptTermsAndCondition?.error ? <Text style={styles.errorText}>
                {validationObj?.acceptTermsAndCondition.message}
            </Text> : null}
            <ButtonComp title={"Back"} secondary={true} onPress={() => handleSubmit(0)} />
            <ButtonComp title={"Submit"} onPress={() => handleSubmit(1)} />
            {/* <ButtonComp title={"Save"} onPress={handleSubmit} /> */}
        </View>
    )
}

export default Screen3

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.transparentBG,
        paddingHorizontal: 16,
    },
    modalView: {
        width: "100%",
        padding: 15,
        backgroundColor: colors.white,
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    errorText: {
        color: colors.red,
        fontSize: 12
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 3,
        columnGap: 10
    },
    text: {
        flex: 1,
        color: colors.black
    },
})