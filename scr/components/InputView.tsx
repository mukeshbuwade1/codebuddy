import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { propsType } from '../types/inputView'
import colors from '../assets/colors'

const InputView = (props: propsType) => {
    const { label, optional,
        placeholder, value, onChangeText, secureTextEntry,
        rightIcon, onPressRightIcon, keyboardType,
        errorObj,maxLength } = props
    return (
        <View style={styles.container}>
            <Text style={styles.label} >{label ?? placeholder}{!optional && <Text style={styles.starIcon}>*</Text>}</Text>

            <View style={[styles.inputView,{borderColor: errorObj?.error ?colors.red:colors.black,}]}>
                <TextInput
                    placeholder={placeholder}
                    value={value}
                    onChangeText={onChangeText}
                    style={styles.input}
                    keyboardType={keyboardType}
                    secureTextEntry={secureTextEntry}
                    maxLength={maxLength}
                    
                />
                {
                    rightIcon && <TouchableOpacity onPress={onPressRightIcon} >
                        {rightIcon()}
                    </TouchableOpacity>
                }
            </View>
            {errorObj?.error ? <Text style={styles.errorText}>
                {errorObj.message}
            </Text> : null}
        </View>
    )
}

export default InputView

const styles = StyleSheet.create({
    container: {
        width: "100%",
        paddingVertical: 10,

    },
    label: {
        fontSize: 15,
        fontWeight: "700",
        textTransform: "uppercase",
        marginBottom: 2
    },
    inputView: {
        borderWidth: 2,
        height: 45,
        borderRadius: 5,
        
        paddingHorizontal: 10
    },
    starIcon: {
        color: colors.red
    },
    input: {
        height: "100%"
    },
    errorText: {
        color: colors.red,
        fontSize: 12
    }
})