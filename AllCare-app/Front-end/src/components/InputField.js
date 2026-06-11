import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

export default function InputField(props) {
  return (
    <TextInput
      {...props}
      style={styles.input}
      placeholderTextColor="#7B8794"
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#F5F9FF',
    height: 52,
    borderRadius: 14,
    paddingHorizontal: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#D9E8FF',
    color: '#10233F',
  },
});
