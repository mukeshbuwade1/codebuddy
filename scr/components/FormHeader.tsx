import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '../assets/colors'

type propsType = {
    currentStep: number
}

const FormHeader = ({ currentStep }: propsType) => {
    return (
        <View>
            <Text style={{
                fontSize:20,
                fontWeight:"700",
                color:colors.primary,
                marginTop:10
            }}>{
                currentStep == 3
                    ? "Third Step"
                    : currentStep == 2
                        ? "Second Step"
                        : "First Step"
            }</Text>
            <View style={styles.box}>
                <View style={[styles.circle, currentStep > 0 && styles.completeView]} />
                <View style={[styles.line, currentStep > 1 && styles.completeView]} />
                <View style={[styles.circle, currentStep > 1 && styles.completeView]} />
                <View style={[styles.line, currentStep > 2 && styles.completeView]} />
                <View style={[styles.circle, currentStep > 2 && styles.completeView]} />
            </View>
        </View>
    )
}

export default FormHeader

const styles = StyleSheet.create({
    box: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
        marginTop: 10
    },
    circle: {
        borderWidth: 3,
        borderRadius: 20,
        width: 30,
        height: 30,
        borderColor: colors.gray,
    },
    line: {
        height: 3,
        flex: 1,
        backgroundColor: colors.gray
    },
    completeView: {
        backgroundColor: colors.lightPrimary,
        borderColor: colors.primary,
    }
})