import { GestureResponderEvent, StyleProp, ViewStyle } from "react-native"

export type propsType = {
    title: string,
    onPress?: ((event: GestureResponderEvent) => void) | undefined,
    boxStyle?: StyleProp<ViewStyle>,
    secondary?:boolean
}