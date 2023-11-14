import React, { useState } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import colors from '../assets/colors';
import { countryDropData, errorObj } from '../types/screen3';

export type valueType = countryDropData

interface props {
  data: valueType[];
  value: valueType | string | undefined;
  setValue: (value: valueType) => void;
  label: string;
  placeholder?: string;
  onFocus?: () => void;
  search?: boolean;
  valueField?: keyof valueType;
  labelField?: keyof valueType;
  dropdownPosition?: 'top' | 'bottom' | 'auto';
  optional?: boolean;
  errorObj?: errorObj
}

const DropdownComponent = ({
  data,
  value,
  setValue,
  label,
  placeholder,
  onFocus,
  search,
  valueField,
  labelField,
  dropdownPosition,
  optional,
  errorObj
}: props) => {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label} >{label ?? placeholder}{!optional && <Text style={styles.starIcon}>*</Text>}</Text>

      <Dropdown
        style={[styles.dropdown, { borderColor: errorObj?.error ? colors.red : colors.black, }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search={search ?? false}
        maxHeight={300}
        itemTextStyle={{ color: '#000' }}
        labelField={labelField ?? 'label'}
        valueField={valueField ?? 'value'}
        placeholder={!isFocus ? placeholder : '...'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => {
          if (onFocus) onFocus();
          setIsFocus(true);
        }}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item);
          setIsFocus(false);
        }}
        dropdownPosition={dropdownPosition ?? 'auto'}
      />
  {errorObj?.error ? <Text style={styles.errorText}>
                {errorObj.message}
            </Text> : null}
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 10,
  },
  dropdown: {
    borderWidth: 2,
    height: 45,
    borderRadius: 5,
    paddingHorizontal: 10
  },
  icon: {
    marginRight: 5,
  },
  label: {
    fontSize: 15,
    fontWeight: "700",
    textTransform: "uppercase",
    marginBottom: 2
  },
  placeholderStyle: {
    fontSize: 14,
    color: Platform.OS=="ios"? colors.gray:"#000a",
    textTransform:"capitalize"
  },
  selectedTextStyle: {
    fontSize: 15,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  starIcon: {
    color: colors.red
  },
  errorText: {
    color: colors.red,
    fontSize: 12
}
});
