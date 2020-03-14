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

          <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
          </View>

          <View style={styles.menu}>
            <ButtonConfirm
              functionPressed={() => {
                hideModalMenu(!modalVisible);
              }}
            />
          </View>
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
    flexDirection: 'column',
    alignItems: 'center'
  },

  top: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    margin: 10,
    width: '90%'
  },

  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: '2%'
  },

  title: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: 'bold',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '80%'
  },

  menu: {
    height: '70%',
    width: '90%',
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderRadius: 10,
    padding: '2%'
  }
});

export default ModalMenu;
