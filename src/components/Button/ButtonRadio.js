/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

function ButtonRadio({ functionPressed, item }) {
  // const [radio, setRadio] = useState(false);

  useEffect(() => {
    // setRadio(item);
  }, []);

  return (
    <TouchableOpacity
      style={styles.content}
      onPress={() => {
        // setRadio({ ...radio, checked: !radio.checked });
        functionPressed(item);
      }}
    >
      <MaterialCommunityIcons
        name={item.checked ? 'circle-slice-8' : 'circle-outline'}
        size={30}
        // color="#1FB6FF"
        color="#000000"
      />
      <Text style={styles.title}>{item.title || ''}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
    // backgroundColor: '#000000'
  },
  title: {
    // color: '#1FB6FF',
    color: '#000000',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: '4%'
  }
});

export default ButtonRadio;
