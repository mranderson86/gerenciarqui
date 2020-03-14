/* eslint-disable prettier/prettier */
import React from 'react';
import { Modal, Text, View, StyleSheet } from 'react-native';

import ButtonClose from '../Button/ButtonClose';
import ButtonConfirm from '../Button/ButtonConfirm';

// Menu
function ModalMenu({ modalVisible, hideModalMenu, title }) {
  // const [visible, setVisible] = useState(false);

  return (
    <Modal animationType="slide" transparent visible={modalVisible}>
      <View style={styles.modal}>
        <View style={styles.content}>
          <View style={styles.top}>
            <ButtonClose
              functionPressed={() => {
                hideModalMenu(!modalVisible);
              }}
            />
          </View>

          <Text style={styles.title}>{title}</Text>

          <ButtonConfirm
            functionPressed={() => {
              hideModalMenu(!modalVisible);
            }}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: 'rgba(0.0,0.0,0.0,0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  content: {
    width: '90%',
    height: '80%',
    backgroundColor: '#1FB6FF',
    borderRadius: 10,
    flexDirection: 'column'
    // alignItems: 'flex-end'
  },

  top: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    margin: 10
  },

  title: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: 'bold',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '80%'
  }
});

export default ModalMenu;
