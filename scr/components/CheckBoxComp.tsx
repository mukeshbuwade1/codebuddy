import React, { useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import colors from '../assets/colors';

interface CheckboxProps {
  label: string;
  isChecked: boolean;
  onToggle: () => void;
}

const CheckBoxComp: React.FC<CheckboxProps> = ({ label, isChecked, onToggle }) => {
  return (
    <TouchableOpacity onPress={onToggle} style={styles.checkboxContainer}>
      <View style={[styles.checkbox, isChecked ? styles.checked : null]} />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: colors.black,
    marginRight: 10,
  },
  checked: {
    backgroundColor: colors.primary, 
    borderColor: colors.primary, 
  },
  label: {
    fontSize: 16,
    fontWeight:"500"
  },
});

export default CheckBoxComp;
