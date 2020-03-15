/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Modal, Text, View, StyleSheet } from 'react-native';

import ButtonClose from '../Button/ButtonClose';
import ButtonConfirm from '../Button/ButtonConfirm';
// import ButtonRadio from '../Button/ButtonRadio';
import ButtonRadioList from '../Button/ButtonRadioList';
import ButtonEnumerator from '../Button/ButtonEnumator';

// Menu
function ModalMenu({ modalVisible, hideModalMenu, title, onConfirm }) {
  // const [showButtonEnumerator, setShowButtonEnumerator] = useState(false);

  const [budget, setBudget] = useState({
    typePay: 'À Vista',
    counterPay: 1
  });

  return (
    <Modal animationType="slide" transparent visible={modalVisible}>
      <View style={styles.modal}>
        <View style={styles.content}>
          <View style={styles.top}>
            <ButtonClose
              onPressed={() => {
                hideModalMenu(!modalVisible);
              }}
            />
          </View>

          <View style={styles.titleModalContainer}>
            <Text style={styles.titleModal}>{title}</Text>
          </View>

          <View style={styles.menuContainer}>
            <View style={styles.menu}>
              <ButtonRadioList
                items={[
                  { title: 'À Vista', checked: true },
                  { title: 'Parcelado', checked: false }
                ]}
                itemSelect={val => {
                  // setShowButtonEnumerator(item.title === 'Parcelado');
                  setBudget({
                    ...budget,
                    typePay: val.title
                  });
                }}
              />

              <View style={styles.titleContainerButtonEnumerator}>
                <Text style={styles.titleButtonEnumerator}>Número de Parcelas</Text>
              </View>

              <ButtonEnumerator
                onChange={val => {
                  setBudget({
                    ...budget,
                    counterPay: val
                  });
                }}
              />

              <ButtonConfirm
                onPressed={() => {
                  if (budget.typePay === 'À Vista') {
                    onConfirm({ ...budget, counterPay: 0 });
                  } else {
                    onConfirm(budget);
                  }

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
    justifyContent: 'center'
  },

  top: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    margin: 5,
    width: '90%'
  },

  titleContainerButtonEnumerator: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '10%'
  },

  titleButtonEnumerator: {
    fontSize: 20,
    color: '#666'
  },

  titleModalContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: '10%',
    marginBottom: '2%'
  },

  titleModal: {
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
    // alignItems: 'center',
    // justifyContent: 'space-between',
    borderRadius: 10,
    padding: '2%'
  }
});

export default ModalMenu;
