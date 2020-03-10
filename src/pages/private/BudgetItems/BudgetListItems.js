import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import api from '../../../services/Api';
import { BudgetCurrentAction } from '../../../store/Projects/projectAction';

import Result from '../../../components/Result/Result';
import AuthRender from '../AuthRender';

// Renderiza o card de cada etapa
function CardItem(props) {
  const { item, deleteItem, profissional } = props;

  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardItems}>
        <View style={styles.cardItemsValueLabel}>
          <Text style={styles.cardItemLabel}>{item.item}</Text>
          <Text style={styles.cardItemValue}>{item.descricao}</Text>
          <Text style={styles.cardItemValue}>{parseFloat(item.preco).toFixed(2)}</Text>
        </View>

        <AuthRender auth={profissional}>
          <TouchableOpacity onPress={() => deleteItem(item)}>
            <MaterialIcons name="delete" size={30} color="#FF4949" />
          </TouchableOpacity>
        </AuthRender>
      </View>
    </View>
  );
}

// Tela Lista de Etapas
function BudgetListItems(props) {
  const { BudgetCurrentAction, userProjects, userLogin, navigation, route } = props;
  const { token, profissional } = userLogin;
  const { budget } = userProjects;

  const { reloading } = route.params;

  const [items, setItems] = useState([]);
  const [show, setShow] = useState(false);
  const [error, setErr] = useState(false);

  // carrega a lista de orçamentos
  useEffect(() => {
    loadBudgetItems();
  }, [navigation, reloading]);

  // console.log("Orçamento ", budget);

  // consulta a lista de items do orçamento
  async function loadBudgetItems() {
    try {
      setShow(true);

      const response = await api.get(`/orcamentos/${budget.projeto_id}/${budget._id}`, {
        headers: {
          authorization: `Bearer ${token}`
        }
      });

      const { data } = response;

      if (data) {
        BudgetCurrentAction({
          budget: data
        });

        setItems(data.itens);
      } else {
        setItems([]);
      }

      setShow(false);
    } catch (err) {
      console.log('err ', err);
      setErr(true);
    }
  }

  // Remove um detalhe da lista
  async function deleteItem(item) {
    try {
      const items = budget.itens;

      items.splice(items.indexOf(item), 1);

      const newData = {
        ...budget,
        itens: items
      };

      setShow(true);

      await api.put(`/orcamentos/${budget._id}`, newData, {
        headers: {
          authorization: `Bearer ${token}`
        }
      });

      // const data = response.data;
      const res = await api.get(`/orcamentos/${budget.projeto_id}/${budget._id}`, {
        headers: {
          authorization: `Bearer ${token}`
        }
      });

      const { data } = res;

      if (data) {
        setItems(data.itens);

        BudgetCurrentAction({
          budget: data
        });
      } else {
        setItems([]);

        BudgetCurrentAction({
          budget: data
        });
      }

      setShow(false);
    } catch (err) {
      console.log('err', err);
      setErr(true);
    }
  }

  // Carrega a tela de cadastro de uma nova etapa
  function AddNewItem() {
    BudgetCurrentAction({
      budget
    });

    navigation.navigate('BudgetItemRegister', { edit: false });
  }

  if (show && error) {
    return <Result type="error" />;
  }

  if (show && !error) {
    return <Result type="await" />;
  }

  //  Renderiza cada etapa da lista de Etapa
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        extraData={reloading}
        data={items}
        contentContainerStyle={styles.list}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <CardItem item={item} index={index} deleteItem={deleteItem} profissional={profissional} />
        )}
      />

      <AuthRender auth={profissional}>
        <TouchableOpacity style={styles.buttonSave} onPress={() => AddNewItem()}>
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
    // backgroundColor: "#000"
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
    width: '95%'
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
    paddingLeft: '1%',
    paddingRight: '5%',
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

export default connect(mapStateToProps, mapDispatchToProps)(BudgetListItems);
