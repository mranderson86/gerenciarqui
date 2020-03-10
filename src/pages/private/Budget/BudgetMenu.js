/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { UserAction } from '../../../store/Users/userAction';
import { ProjectCurrentAction, StepCurrentAction } from '../../../store/Projects/projectAction';

// Tela Home / Bem Vindo
function BudgetMenu(props) {
  const { navigation } = props;

  useEffect(() => {}, []);

  //  Menu Fotos / Detalhes
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.cardContainer}
        onPress={() => {
          navigation.navigate('BudgetListItems', { reloading: false });
        }}
      >
        <View style={styles.cardItems}>
          <View style={styles.cardItemsValueLabel}>
            <Text style={styles.cardItemValue}>Itens</Text>
          </View>

          <MaterialIcons name="chevron-right" size={30} color="#1FB6FF" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.cardContainer}
        onPress={() => {
          navigation.navigate('PaymentsList', { reload: false });
        }}
      >
        <View style={styles.cardItems}>
          <View style={styles.cardItemsValueLabel}>
            <Text style={styles.cardItemValue}>Pagamentos</Text>
          </View>

          <MaterialIcons name="chevron-right" size={30} color="#1FB6FF" />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#E5E9F2'
  },

  userContainer: {
    width: '100%',
    height: '20%',
    padding: '5%'
  },

  cardContainer: {
    // alinha no eixo horizontal
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    margin: '1%',
    width: '95%',
    height: '20%',
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 2
  },

  cardItems: {
    flexDirection: 'row',
    width: '95%',
    alignItems: 'center'
  },

  cardItemsValueLabel: {
    flexDirection: 'column',
    width: '80%'
  },

  cardItemLabel: {
    color: '#888',
    paddingTop: '1%',
    paddingBottom: '1%'
  },

  cardItemValue: {
    paddingLeft: '5%',
    paddingRight: '10%',
    paddingTop: '1%',
    paddingBottom: '1%',
    fontWeight: 'bold',
    fontSize: 16
  }
});

// State em props
const mapStateToProps = state => {
  const { userLogin, userProjects } = state;
  return { userLogin, userProjects };
};

// Action em props
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      UserAction,
      ProjectCurrentAction,
      StepCurrentAction
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(BudgetMenu);
