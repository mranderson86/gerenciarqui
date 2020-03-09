import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';

// Resultado de alguma operação
// Mostra ActivateIndicator (loading)
// Informação de Sucesso ou Erro em operações com backend
function Result({ type = 'error' || 'await' || 'success' }) {
  if (type === 'await') {
    return (
      <View>
        <ActivityIndicator size="large" color="#1FB6FF" />
        <Text>Aguarde ...</Text>
      </View>
    );
  }
  if (type === 'success') {
    return (
      <View>
        <MaterialIcons name="check-circle" size={50} color="#13CE66" />
        <Text>Sucesso ...</Text>
      </View>
    );
  }
  if (type === 'error') {
    return (
      <View>
        <MaterialIcons name="error" size={50} color="#FF4949" />
        <Text>Erro ...</Text>
      </View>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#FFF',
//     width: '100%',
//     height: '100%'
//   }
// });

export default Result;
