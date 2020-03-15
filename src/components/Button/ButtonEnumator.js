/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

function ButtonEnumerator({ onChange }) {
  const [counter, setCounter] = useState(1);

  return (
    <View style={styles.content}>
      <View style={[styles.container, styles.content]}>
        <View style={styles.containerCounter}>
          <Text style={styles.counter}>{counter}</Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            let value = counter + 1;

            if (value > 12) {
              value = 12;
            }

            setCounter(value);
            onChange(value);
          }}
        >
          <MaterialCommunityIcons
            name="plus"
            size={30}
            // color="#1FB6FF"
            color="#000000"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            let value = counter - 1;

            if (value <= 0) {
              value = 0;
            }

            setCounter(value);
            onChange(value);
          }}
        >
          <MaterialCommunityIcons
            name="minus"
            size={30}
            // color="#1FB6FF"
            color="#000000"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const HEIGHT = '40%';

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    // backgroundColor: '#888',
    height: HEIGHT,
    width: '80%'
  },

  container: {
    borderRadius: 10,
    // borderWidth: 1,
    // borderColor: '#000',
    backgroundColor: '#E5E9F2',
    paddingVertical: 2
  },

  button: {
    // backgroundColor: '#666',
    // backgroundColor: '#999',
    width: '30%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },

  containerCounter: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '36%',
    height: '100%',
    backgroundColor: '#FFF'
  },

  counter: {
    fontSize: 25
    // fontWeight: 'bold'
  }
});

export default ButtonEnumerator;
