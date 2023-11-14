import { KeyboardTypeOptions } from "react-native";
import { errorObj } from "./screen1";

export type propsType = {
    optional?:boolean,
    label?:string,
    placeholder:string,
    value?: string | undefined
    onChangeText?: ((text: string) => void) | undefined,
    rightIcon?:()=>React.ReactNode
    // rightIcon?: React.ComponentType<any> | React.ReactElement<any, string | React.JSXElementConstructor<any>> | null | undefined
    onPressRightIcon?:()=>void,
    keyboardType?: KeyboardTypeOptions | undefined;
    secureTextEntry?: boolean | undefined,
    errorObj?:errorObj,
    maxLength?:number
}