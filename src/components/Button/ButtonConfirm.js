import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

function ButtonConfirm({ onPressed }) {
  return (
    <TouchableOpacity style={styles.content} onPress={onPressed}>
      <MaterialIcons name="check" size={40} color="#FFFFFF" />
      <Text style={styles.title}>Confirmar</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    width: '80%',
    height: '15%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1FB6FF',
    borderRadius: 10
  },
  title: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    padding: '2%'
  }
});

export default ButtonConfirm;
