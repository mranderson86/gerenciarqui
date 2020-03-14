import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';

import ButtonRadio from './ButtonRadio';

function ButtonRadioList({ items = [] }) {
  const [list, setList] = useState([]);

  useEffect(() => {
    setList(items);
  }, []);

  // Devolve qual radio foi clicado
  // e alterna o valor entre os demais radios
  function handleItemClick(item) {
    const { title, checked } = item;

    console.log(' Radio Pressed ', title);
    // setList([...list, { title: } ])

    const newList = list.map(radio => {
      return { ...radio, checked: !radio.checked };
    });

    console.log(newList, list);

    setList(newList);
  }

  return (
    <View style={styles.container}>
      {list.map(
        item => (
          <ButtonRadio functionPressed={handleItemClick} item={item} />
        )
        // console.log(item)
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default ButtonRadioList;
