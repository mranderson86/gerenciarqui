import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import api from '../../../services/Api';
import Result from '../../../components/Result/Result';

import { StepCurrentAction } from '../../../store/Projects/projectAction';

// Tela Cadastrar um novo projeto
function DetailRegister(props) {
  const { navigation, userProjects, userLogin } = props;
  const { step } = userProjects;
  const { detalhes } = step;
  const { token } = userLogin;

  const [show, setShow] = useState(false);
  const [error, setErr] = useState(false);
  const [title, setTitle] = useState('');

  useEffect(() => {}, []);

  // inclui um novo item de detalhe na lista de detalhes da etapa
  async function save() {
    try {
      const detail = {
        item: title,
        checked: false
      };

      const details = [...detalhes, detail];

      const data = {
        ...step,
        detalhes: details
      };

      setShow(true);

      await api.put(`/etapas/${step._id}`, data, {
        headers: {
          authorization: `Bearer ${token}`
        }
      });

      navigation.navigate('Details', { reloading: true });
    } catch (err) {
      console.log('error(detail) ', err);

      setErr(true);
    }
  }

  if (show && error) {
    return <Result type="error" />;
  }

  if (show && !error) {
    return <Result type="await" />;
  }

  //  Renderiza cada card do projeto
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Descrição</Text>
            <TextInput
              style={styles.input}
              value={title}
              placeholder="Digite aqui"
              onChangeText={val => setTitle(val)}
            />
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonSaveContainer}>
        <TouchableOpacity style={styles.buttonSave} onPress={() => save()}>
          <MaterialIcons name="save" size={30} color="#FFF" />
          <Text style={styles.labelButtonSave}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E5E9F2'
  },

  formContainer: {
    backgroundColor: '#FFF',
    width: 350,
    marginTop: '5%'
    // padding: '2%'
  },

  detailsContainer: {
    // justifyContent: 'center',
    alignItems: 'center'
    // backgroundColor: '#000'
  },

  detailsInputContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    width: 325,
    paddingBottom: '5%'
  },

  inputContainer: {
    paddingLeft: '5%',
    paddingRight: '5%',
    paddingTop: '4%',
    paddingBottom: '4%'
  },

  customerContainer: {
    // flexDirection: "row",
    paddingLeft: '5%',
    paddingRight: '5%',
    paddingTop: '4%',
    paddingBottom: '4%',
    color: '#FFF'
  },

  label: {
    color: '#666'
  },

  input: {
    borderBottomColor: '#888',
    borderBottomWidth: 1,
    height: 40
  },

  inputDetails: {
    borderBottomColor: '#888',
    borderBottomWidth: 1,
    width: 280,
    height: 40
  },

  buttonDetails: {
    paddingLeft: '2%'
  },

  detailsList: {
    width: '95%',
    // backgroundColor: '#000',
    marginBottom: '5%'
  },

  detailsHeader: {
    backgroundColor: '#C0CCDA',
    width: '100%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },

  rowDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: '1%',
    borderBottomColor: '#EFF2F7',
    borderBottomWidth: 1
  },

  labelDetail: {
    width: 260
    // backgroundColor: '#000'
  },

  buttonSaveContainer: {
    // justifyContent: 'center',
    alignItems: 'center',
    marginTop: '5%',
    marginBottom: '5%'
  },

  buttonSave: {
    width: 200,
    height: 40,
    backgroundColor: '#1FB6FF',
    flexDirection: 'row',
    // justifyContent: 'center'
    alignItems: 'center'
  },

  labelButtonSave: {
    color: '#FFF',
    fontWeight: 'bold',
    width: '80%',
    // backgroundColor: '#000',
    paddingLeft: '30%'
    // paddingRight: '10%'
  },

  buttonSearch: {
    width: 200,
    height: 40,
    backgroundColor: '#1FB6FF',
    flexDirection: 'row',
    // justifyContent: 'center'
    alignItems: 'center'
  },

  labelSearch: {
    fontWeight: 'bold',
    color: '#FFF'
  }
});

// Acessa ao estado global
const mapStateToProps = state => {
  const { userLogin, userProjects } = state;
  return { userLogin, userProjects };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      StepCurrentAction
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(DetailRegister);
