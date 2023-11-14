import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Screen1 from '../components/Screen1'
import Screen2 from '../components/Screen2'
import Screen3 from '../components/Screen3'
import Loader from '../components/Loader'
import asyncStorage, { asyncStoreKeys } from '../services/asyncStorage'
import FormHeader from '../components/FormHeader'
import { storeValueTypes } from '../types/types'

const initStoreValue = {
  currentStep: 1,
  formValues: {
    "emailId": "",
    "password": "",
    "firstName": "",
    "lastName": "",
    "address": "",
    "countryCode": "",
    "phoneNumber": ""
  }
}
const Form = () => {

  const [storeValues, setStoreValues] =useState<storeValueTypes>()

  useEffect(() => {
    prepareStorage()
  },[])
  const prepareStorage = async () => {
    let flag = await asyncStorage.getData(asyncStoreKeys.store)
    if (flag) {
      setStoreValues(flag)
    }else{
      await asyncStorage.storeData(asyncStoreKeys.store, initStoreValue)
    }
  }
  return (
    <View style={{
      paddingHorizontal: 16,

    }}>
      {/* <Loader showLoader={loading}/> */}
      <FormHeader
      currentStep={storeValues?.currentStep??1}
      />
      {
        storeValues?.currentStep==3
        ? <Screen3 storeValues={storeValues} setStoreValues={setStoreValues}/> 
        :storeValues?.currentStep==2
        ? <Screen2 storeValues={storeValues} setStoreValues={setStoreValues}/>
        : <Screen1 storeValues={storeValues} setStoreValues={setStoreValues}/>
      }
    </View>
  )
}

export default Form

const styles = StyleSheet.create({})