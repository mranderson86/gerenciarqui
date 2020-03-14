import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

function ButtonConfirm({ functionPressed }) {
  return (
    <TouchableOpacity style={styles.content} onPress={functionPressed}>
      <MaterialIcons name="check" size={40} color="#FFFFFF" />
      <Text style={styles.title}>Confirmar</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000'
  },
  title: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    padding: '4%'
  }
});

export default ButtonConfirm;
