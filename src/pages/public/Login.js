import React, { useEffect, useState } from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  ScrollView
} from 'react-native';
import Icon from '@expo/vector-icons/MaterialIcons';
import { Input } from 'react-native-elements';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Result from '../../components/Result/Result';

import api from '../../services/Api';
import { UserAction } from '../../store/Users/userAction';

const logo = require('../../assets/gerenciArqui_logo.png');

// Tela de Login / Autenticação do usuário
function Login({ UserAction }) {
  // const { navigation, login, UserAction } = props;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);

  // carrega a lista das etapas
  useEffect(() => {}, []);

  // Envia usuário e senha para autenticação
  async function submitLogin() {
    try {
      if (error) setError(false);

      setShow(true);

      const data = {
        email,
        password
      };

      const response = await api.post('/login', data);

      const { user, token } = response.data;

      if (user && token) {
        try {
          const res = await api.get(`/usuarios/${user.id}`, {
            headers: {
              authorization: `Bearer ${token}`
            }
          });

          const { profissional } = res.data;

          // altera o estado do usuário
          UserAction({
            authenticate: true,
            profissional,
            token,
            user
          });
        } catch (err) {
          console.log('login(user) ', err);

          setShow(false);
          setError(true);
        }
      } else {
        setShow(false);
      }
    } catch (err) {
      console.log('login(auth) ', err);

      setShow(false);
      setError(true);
    }
  }

  if (show) {
    return <Result type="await" />;
  }

  //  Renderiza cada etapa da lista de Etapa
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <ScrollView style={styles.containerScrollView}>
        <View style={styles.containerHome}>
          <View style={styles.logoContainer}>
            <Image style={styles.imageLogoContainer} source={logo} />
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Input
                label="Usuário"
                textContentType="emailAddress"
                leftIcon={<Icon name="email" size={24} color="#999" />}
                value={email}
                placeholder="Digite seu usuário"
                onChangeText={val => setEmail(val)}
                // errorStyle={ErrorConfig}
                // errorMessage="Por favor,informe seu usuário"
              />
            </View>

            <View style={styles.inputContainer}>
              <Input
                label="Senha"
                secureTextEntry
                textContentType="password"
                leftIcon={<Icon name="lock" size={24} color="#999" />}
                value={password}
                placeholder="Informe sua Senha"
                onChangeText={val => setPassword(val)}
                // errorStyle={ErrorConfig}
                // errorMessage="Por favor,informe sua senha"
              />
            </View>

            {error ? (
              <View>
                <Text style={{ color: '#FF4949', textAlign: 'center' }}>
                  Usuário e/ou Senha incorreto !
                </Text>
              </View>
            ) : (
              <></>
            )}

            <View style={styles.buttonLoginContainer}>
              <TouchableOpacity style={styles.buttonSave} onPress={() => submitLogin()}>
                <Text style={styles.labelButtonLogin}>Entrar</Text>
                <Icon name="chevron-right" size={30} color="#FFF" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const BgColor = '#F7F7F7'; // #FF4949

// const ErrorConfig = { color: '#FF4949', fontSize: 18 };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#F7F7F7',
    backgroundColor: BgColor,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center'
  },

  containerScrollView: {
    width: '100%',
    height: '100%'
  },

  containerHome: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: '2%'
  },

  formContainer: {
    backgroundColor: '#FFF',
    width: '100%',
    marginTop: '5%',
    borderRadius: 10
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

  buttonLoginContainer: {
    alignItems: 'center',
    marginTop: '5%',
    marginBottom: '5%'
  },

  buttonSave: {
    width: 200,
    height: 40,
    backgroundColor: '#1FB6FF',
    flexDirection: 'row',
    alignItems: 'center'
  },

  labelButtonLogin: {
    color: '#FFF',
    fontWeight: 'bold',
    width: '85%',
    paddingLeft: '10%',
    textAlign: 'center'
    // backgroundColor: '#000'
  },

  logoContainer: {
    backgroundColor: BgColor,
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30
  },

  imageLogoContainer: {
    width: '100%',
    height: '100%',
    borderRadius: 100
  }
});

// State do usuário em props
const mapStateToProps = state => {
  const login = state;
  return { login };
};

// Action do userReducer em props
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      UserAction
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Login);
