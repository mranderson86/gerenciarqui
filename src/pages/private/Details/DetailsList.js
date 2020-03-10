/* eslint-disable prettier/prettier */
/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import api from '../../../services/Api';
import { StepCurrentAction } from '../../../store/Projects/projectAction';

import Result from '../../../components/Result/Result';
import AuthRender from '../AuthRender';

// Renderiza o card de cada etapa
function StepItem(props) {
  const { item, index, deleteDetail, CheckDetail, profissional } = props;

  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardItems}>
        <View style={styles.cardItemsValueLabel}>
          <Text style={styles.cardItemValue}>{item.item}</Text>
        </View>

        <AuthRender auth={profissional}>
          <TouchableOpacity
            style={{ paddingLeft: '5%', paddingRight: '1%' }}
            onPress={() => CheckDetail(item, index)}
          >
            <MaterialIcons name="check" size={30} color={item.checked ? '#13CE66' : '#C0CCDA'} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => deleteDetail(item)}>
            <MaterialIcons name="delete" size={30} color="#FF4949" />
          </TouchableOpacity>
        </AuthRender>
      </View>
    </View>
  );
}

// Tela Lista de Etapas
function DetailsList(props) {
  const { StepCurrentAction, userProjects, userLogin, navigation, route } = props;
  const { token, profissional } = userLogin;
  const { step, project } = userProjects;

  const { reloading } = route.params;

  const [details, setDetails] = useState([]);
  const [show, setShow] = useState(false);
  const [error, setErr] = useState(false);

  // carrega a lista das etapas
  useEffect(() => {
    loadDetails();
  }, [navigation, reloading]);

  // consulta a lista das etapas
  async function loadDetails() {
    try {
      setShow(true);

      const response = await api.get(`/etapas/${project._id}/${step._id}`, {
        headers: {
          authorization: `Bearer ${token}`
        }
      });

      const { data } = response;

      if (data) {
        setDetails(data.detalhes);

        StepCurrentAction({
          step: data
        });
      } else {
        setDetails([]);
      }

      setShow(false);
    } catch (err) {
      console.log('err ', err);
      setErr(true);
    }
  }

  // Remove um detalhe da lista
  async function deleteDetail(item) {
    try {
      const detail = details;
      detail.splice(detail.indexOf(item), 1);

      let newDetails = {};

      const { _id, titulo, descricao, projeto_id } = step;

      if (details.length === 0) {
        newDetails = {
          _id,
          titulo,
          descricao,
          projeto_id
        };
      } else {
        newDetails = {
          _id,
          titulo,
          descricao,
          projeto_id,
          detalhes: detail
        };
      }

      setShow(true);

      await api.put(`/etapas/${step._id}`, newDetails, {
        headers: {
          authorization: `Bearer ${token}`
        }
      });

      // const data = response.data;
      const res = await api.get(`/etapas/${projeto_id}/${step._id}`, {
        headers: {
          authorization: `Bearer ${token}`
        }
      });
      const { data } = res;

      if (data) {
        setDetails(data.detalhes);

        StepCurrentAction({
          step: data
        });
      } else {
        setDetails([]);

        StepCurrentAction({
          step: data
        });
      }

      setShow(false);
    } catch (err) {
      console.log('err', err);
      setErr(true);
    }
  }

  // Carrega a tela de cadastro de uma nova etapa
  function AddNewDetail() {
    navigation.navigate('DetailRegister', { edit: false, step: {} });
  }

  async function CheckDetail(detail, index) {
    const { checked, item } = detail;

    const newCheck = {
      item,
      checked: !checked
    };

    const oldDetails = details;
    oldDetails.splice(index, 1, newCheck);

    setDetails([...oldDetails]);

    const { _id, titulo, descricao, projeto_id } = step;

    const newDetails = {
      _id,
      titulo,
      descricao,
      projeto_id,
      detalhes: oldDetails
    };

    setShow(true);

    await api.put(`/etapas/${step._id}`, newDetails, {
      headers: {
        authorization: `Bearer ${token}`
      }
    });

    setShow(false);
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
        data={details}
        contentContainerStyle={styles.list}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <StepItem
            item={item}
            index={index}
            deleteDetail={deleteDetail}
            CheckDetail={CheckDetail}
            profissional={profissional}
          />
        )}
      />

      <AuthRender auth={profissional}>
        <TouchableOpacity style={styles.buttonSave} onPress={() => AddNewDetail()}>
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
    paddingBottom: '1%'
  },

  cardItemValue: {
    paddingLeft: '5%',
    paddingRight: '10%',
    // width: '50%',
    // backgroundColor: 'blue',
    paddingTop: '1%',
    paddingBottom: '1%',
    fontWeight: 'bold',
    fontSize: 16
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
      StepCurrentAction
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(DetailsList);
