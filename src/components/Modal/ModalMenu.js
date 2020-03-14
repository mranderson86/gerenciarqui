/* eslint-disable prettier/prettier */
import React from 'react';
import { Modal, Text, View, StyleSheet } from 'react-native';

import ButtonClose from '../Button/ButtonClose';
import ButtonConfirm from '../Button/ButtonConfirm';
// import ButtonRadio from '../Button/ButtonRadio';
import ButtonRadioList from '../Button/ButtonRadioList';

// Menu
function ModalMenu({ modalVisible, hideModalMenu, title }) {
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

          <View style={styles.menuContainer}>
            <View style={styles.menu}>
              {/* <View style={styles.radioList}>
                <ButtonRadio functionPressed={() => {}} title="Á Vista" />
                <ButtonRadio functionPressed={() => {}} title="Parcelado" />
              </View> */}

              <ButtonRadioList
                items={[
                  { title: 'À Vista', checked: true },
                  { title: 'Parcelado', checked: false }
                ]}
              />

              <ButtonConfirm
                functionPressed={() => {
                  hideModalMenu(!modalVisible);
                }}
              />
            </View>
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
    alignItems: 'center',
    justifyContent: 'flex-end'
  },

  top: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    margin: 5,
    width: '90%'
  },

  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: '10%',
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

  menuContainer: {
    backgroundColor: '#F7F7F7',
    width: '100%',
    height: '80%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomEndRadius: 10
  },

  menu: {
    height: '90%',
    width: '90%',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderRadius: 10,
    padding: '2%'
  },

  radioList: {
    // backgroundColor: '#CCCCCC',
    flex: 1
  }
});

export default ModalMenu;
