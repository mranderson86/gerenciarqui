/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import api from '../../../services/Api';
import { BudgetCurrentAction } from '../../../store/Projects/projectAction';

import Result from '../../../components/Result/Result';
import AuthRender from '../AuthRender';
import { moneyBrFormat } from '../../../utils/utils';

// Renderiza o card de cada etapa
function CardItem(props) {
  const { budget, deleteBudget, loadBudgetMenu, editBudget, profissional } = props;

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.cardContainer}
      // onPress={() => loadBudgetListItems(budget)}
      onPress={() => loadBudgetMenu(budget)}
    >
      <View style={styles.cardItems}>
        <View style={styles.cardItemsValueLabel}>
          <Text style={styles.cardItemLabel}>{budget.tipo}</Text>
          <Text style={styles.cardItemValue}>{budget.descricao}</Text>

          <Text style={styles.cardItemLabel}>Valor Total</Text>
          <Text style={styles.cardItemValue}>{moneyBrFormat(budget.valor_total || 0.0)}</Text>

          <Text style={styles.cardItemLabel}>Valor Pago</Text>
          <Text style={styles.cardItemValue}>{moneyBrFormat(budget.valor_pago)}</Text>
        </View>

        <AuthRender auth={profissional}>
          <TouchableOpacity
            style={{ paddingLeft: '5%', paddingRight: '1%' }}
            onPress={() => editBudget(budget)}
          >
            <MaterialIcons name="edit" size={30} color="#1FB6FF" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => deleteBudget(budget._id)}>
            <MaterialIcons name="delete" size={30} color="#FF4949" />
          </TouchableOpacity>
        </AuthRender>
      </View>
    </TouchableOpacity>
  );
}

// Tela Lista de Etapas
function BudgetList(props) {
  const { BudgetCurrentAction, userProjects, userLogin, navigation, route } = props;
  const { token, profissional } = userLogin;
  const { project, reload } = userProjects;

  const { reloading } = route.params;

  const [show, setShow] = useState(false);
  const [budgets, setBudgets] = useState([]);
  const [error, setErr] = useState(false);

  // carrega a lista das etapas
  useEffect(() => {
    loadBudgets();
  }, [navigation, reload, reloading]);

  // consulta a lista das etapas
  async function loadBudgets() {
    try {
      setShow(true);

      const response = await api.get(`/orcamentos/${project._id}`, {
        headers: {
          authorization: `Bearer ${token}`
        }
      });

      const { data } = response;

      if (data) {
        setBudgets(data);
      } else {
        setBudgets([]);
      }

      setShow(false);
    } catch (err) {
      console.log('err ', err);
      setErr(true);
    }
  }

  async function deleteBudget(id) {
    try {
      setShow(true);

      await api.delete(`/orcamentos/${id}`, {
        headers: {
          authorization: `Bearer ${token}`
        }
      });

      loadBudgets();
    } catch (err) {
      console.log('err', err);
      setErr(true);
    }
  }

  function editBudget(budget) {
    BudgetCurrentAction({
      budget
    });

    navigation.navigate('BudgetRegister', { edit: true });
  }

  // Carrega a tela de cadastro
  function addNewBudget() {
    BudgetCurrentAction({
      budget: {}
    });

    props.navigation.navigate('BudgetRegister', { edit: false });
  }

  // Carrega menu de cada orçamento
  function loadBudgetMenu(budget) {
    BudgetCurrentAction({
      budget
    });

    props.navigation.navigate('BudgetMenu', { title: budget.tipo });
  }

  if (show && error) {
    return <Result type="error" />;
  }

  if (show && !error) {
    return <Result type="await" />;
  }

  //  Renderiza cada orçamento da lista de orçamentos
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={budgets}
        contentContainerStyle={styles.list}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <CardItem
            budget={item}
            deleteBudget={deleteBudget}
            loadBudgetMenu={loadBudgetMenu}
            editBudget={editBudget}
            profissional={profissional}
          />
        )}
      />

      <AuthRender auth={profissional}>
        <TouchableOpacity style={styles.buttonSave} onPress={() => addNewBudget()}>
          <MaterialIcons name="add-circle" size={50} color="#1FB6FF" />
        </TouchableOpacity>
      </AuthRender>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E5E9F2'
    // marginTop: Constants.statusBarHeight
  },
  list: {
    // marginTop: Constants.statusBarHeight,
    paddingHorizontal: '1%',
    paddingTop: '1%'
    // backgroundColor: '#000',
  },
  cardContainer: {
    // alinha no eixo horizontal
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: '1%',
    margin: '1%',
    // width: 380,
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 2
  },

  cardItems: {
    flexDirection: 'row',
    // backgroundColor: "#232334",
    width: '95%',
    paddingTop: '1%',
    paddingBottom: '1%'
  },

  cardItemsValueLabel: {
    flexDirection: 'column',
    width: '80%'
    // backgroundColor: 'red',
  },

  cardItemLabel: {
    color: '#888',
    // backgroundColor: 'yellow',
    paddingTop: '1%',
    paddingBottom: '1%',
    fontWeight: 'bold',
    fontSize: 16
  },

  cardItemValue: {
    paddingLeft: '5%',
    paddingRight: '10%',
    // width: '50%',
    // backgroundColor: 'blue',
    paddingTop: '1%',
    paddingBottom: '1%',
    fontWeight: 'bold'
    // fontSize: 16
  },

  cardDetails: {
    width: '95%',
    paddingTop: '1%',
    paddingBottom: '1%',
    paddingLeft: '1%',
    backgroundColor: '#F9FAFC'
    // backgroundColor: '#EFF2F7'
    // backgroundColor: '#000'
  },

  cardDetailsHeader: {
    // alignItems: 'center',
    // borderBottomColor: '#ccc',
    // borderBottomWidth: 1,
    width: '95%',
    paddingTop: '1%',
    paddingBottom: '1%',

    backgroundColor: '#C0CCDA',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

// State em props
const mapStateToProps = state => {
  const { userLogin, userProjects } = state;
  return { userLogin, userProjects };
};

// Ações do Projeto / Etapas
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      BudgetCurrentAction
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(BudgetList);
