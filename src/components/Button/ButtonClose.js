import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

function ButtonClose({ functionPressed }) {
  return (
    <TouchableOpacity onPress={functionPressed}>
      <MaterialIcons name="close" size={40} color="#FFFFFF" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});

export default ButtonClose;
