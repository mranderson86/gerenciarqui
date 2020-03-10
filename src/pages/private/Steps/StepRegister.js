import React, { useEffect, useState } from 'react';
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
import { UserAction } from '../../../store/Users/userAction';
import { StepCurrentAction } from '../../../store/Projects/projectAction';

import Result from '../../../components/Result/Result';

// Tela Lista de Etapas
function StepsRegister(props) {
  const {
    userLogin,
    userProjects,
    StepCurrentAction,
    StepsCurrentAction,
    navigation,
    route
  } = props;
  const { token } = userLogin;
  const { project, step } = userProjects;
  const { edit } = route.params;

  const [show, setShow] = useState(false);
  const [error, setErr] = useState(false);

  const headers = {
    authorization: `Bearer ${token}`
  };

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // carrega dados da etapa
  useEffect(() => {
    if (edit && step) {
      setTitle(step.titulo);
      setDescription(step.descricao);
    }
  }, []);

  // Salva uma nova etapa ou altera uma etapa existente
  async function saveStep() {
    try {
      const data = {
        ...step,
        titulo: title,
        descricao: description,
        projeto_id: project._id
      };

      setShow(true);

      if (edit) {
        const response = await api.put(`/etapas/${step._id}`, data, {
          headers
        });

        StepCurrentAction({
          step: response.data
        });
      } else {
        await api.post('/etapas', data, { headers });
        StepsCurrentAction({
          steps: []
        });
      }

      navigation.navigate('Steps', { reloadStep: true });
    } catch (err) {
      console.log('error', err);
      setErr(true);
    }
  }

  if (show && !error) {
    return <Result type="error" />;
  }

  if (show && error) {
    return <Result type="await" />;
  }

  //  Renderiza cada etapa da lista de Etapa
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Título</Text>
            <TextInput
              style={styles.input}
              value={title}
              placeholder="Digite aqui"
              onChangeText={val => setTitle(val)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Descrição</Text>
            <TextInput
              style={styles.input}
              value={description}
              placeholder="Digite aqui"
              onChangeText={val => setDescription(val)}
            />
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonSaveContainer}>
        <TouchableOpacity style={styles.buttonSave} onPress={() => saveStep()}>
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
    alignItems: 'center',
    backgroundColor: '#E5E9F2'
  },

  formContainer: {
    backgroundColor: '#FFF',
    width: 350,
    marginTop: '5%'
  },

  detailsContainer: {
    alignItems: 'center'
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
      StepCurrentAction,
      StepsCurrentAction
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(StepsRegister);
