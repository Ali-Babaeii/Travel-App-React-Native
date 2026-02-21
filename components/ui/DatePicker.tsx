import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../constants/data';
import { DatePickerProps } from '../../types';

export const DatePicker: React.FC<DatePickerProps> = ({ label, value, placeholder, onPress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity style={styles.input} onPress={onPress}>
        <Text style={value ? styles.inputTextFilled : styles.inputTextPlaceholder}>
          {value || placeholder}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: COLORS.secondary,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: 'center',
  },
  inputTextFilled: {
    fontSize: 15,
    color: COLORS.text,
  },
  inputTextPlaceholder: {
    fontSize: 15,
    color: COLORS.textPlaceholder,
  },
});
