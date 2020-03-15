import React from 'react';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

function ButtonClose({ onPressed }) {
  return (
    <TouchableOpacity onPress={onPressed}>
      <MaterialIcons name="close" size={40} color="#FFFFFF" />
    </TouchableOpacity>
  );
}

// const styles = StyleSheet.create({});

export default ButtonClose;
