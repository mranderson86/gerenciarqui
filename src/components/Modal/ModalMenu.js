/* eslint-disable prettier/prettier */
import React from 'react';
import { Modal, Text, TouchableHighlight, View } from 'react-native';

// Menu
function ModalMenu({ modalVisible, hideModalMenu }) {
  // const [visible, setVisible] = useState(false);

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={modalVisible}
      onRequestClose={() => {
        // Alert.alert('Modal has been closed.');
      }}
    >
      <View style={{ marginTop: 22 }}>
        <View>
          <Text>Hello World!</Text>

          <TouchableHighlight
            onPress={() => {
              // setVisible(!visible);
              hideModalMenu(!modalVisible);
            }}
          >
            <Text>Hide Modal</Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
  );
}

export default ModalMenu;
