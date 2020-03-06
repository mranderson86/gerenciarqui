import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import api from "../../../services/Api";
import { UserAction } from "../../../store/Users/userAction";
import Result from "../../../components/Result/Result";

// Tela Lista de Etapas
function PaymentRegister(props) {
  const { userLogin, userProjects, navigation, route } = props;
  const { token } = userLogin;
  const { project, budget } = userProjects;
  const { edit } = route.params;

  const [show, setShow] = useState(false);
  const [error, setErr] = useState(false);

  const headers = {
    authorization: `Bearer ${token}`
  };

  const [pay, setPay] = useState({
    description: "",
    valuePay: 0.0,
    datePay: new Date()
  });

  // carrega dados da etapa
  useEffect(() => {}, []);

  // Salva uma nova etapa ou altera uma etapa existente
  async function save() {
    try {
      const data = {
        ...payment,
        detalhes: pay.description,
        projeto_id: project._id,
        valor: pay.valuePay,
        data_pgto: pay.datePay
      };

      setShow(true);

      if (edit) {
        const response = await api.put(`/pagamentos/${payment._id}`, data, {
          headers: headers
        });
      } else {
        const response = await api.post("/pagamentos", data, {
          headers: headers
        });
      }

      // Retorna para a lista de orçamentos
      navigation.navigate("PaymentsList", { reloading: true });
    } catch (err) {
      console.log("error", err);
      setErr(true);
    }
  }

  if (show && error) {
    return <Result type="error" />;
  }

  if (show && !error) {
    return <Result type="await" />;
  }

  //  Renderiza cada etapa da lista de Etapa
  return (
    <KeyboardAvoidingView behavior="padding" enabled>
      <ScrollView style={{ width: "100%", height: "100%" }}>
        <View style={styles.formContainer}>
          <View style={styles.inputContainer100perc}>
            <Text style={styles.label}>Descrição</Text>
            <TextInput
              style={styles.input}
              value={pay.description}
              placeholder="Digite aqui"
              onChangeText={val => setPay([...pay, (description: val)])}
            />
          </View>

          <View style={styles.containerInputValueRow}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Valor</Text>
              <TextInput
                keyboardType="numeric"
                style={styles.input}
                value={pay.valuePay.toString()}
                placeholder="Digite aqui"
                onChangeText={val => setPay([...pay, (valuePay: val)])}
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Data</Text>
            <TextInput
              keyboardType="default"
              style={styles.input}
              value={pay.datePay.toString()}
              placeholder="Digite aqui"
              onChangeText={val => setPay([...pay, (datePay: val)])}
            />
          </View>
        </View>
        <View style={styles.buttonSaveContainer}>
          <TouchableOpacity style={styles.buttonSave} onPress={() => save()}>
            <MaterialIcons name="save" size={30} color="#FFF" />
            <Text style={styles.labelButtonSave}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: "center",
    backgroundColor: "#E5E9F2"
  },

  formContainer: {
    backgroundColor: "#FFF",
    //width: "100%",
    marginTop: "5%",
    marginHorizontal: "2%"
    //padding: '2%'
  },

  detailsContainer: {
    alignItems: "center"
  },

  containerInputValueRow: {
    flexDirection: "row"
  },

  containerInputValueRowCheck: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "50%",
    paddingLeft: "5%",
    paddingRight: "5%",
    paddingTop: "4%",
    paddingBottom: "4%"
  },

  inputContainer100perc: {
    paddingLeft: "5%",
    paddingRight: "5%",
    paddingTop: "4%",
    paddingBottom: "4%"
  },

  inputContainer: {
    width: "50%",
    paddingLeft: "5%",
    paddingRight: "5%",
    paddingTop: "4%",
    paddingBottom: "4%"
  },

  label: {
    color: "#666"
  },

  input: {
    borderBottomColor: "#888",
    borderBottomWidth: 1,
    height: 40
  },

  inputDetails: {
    borderBottomColor: "#888",
    borderBottomWidth: 1,
    width: 280,
    height: 40
  },

  buttonDetails: {
    paddingLeft: "2%"
  },

  detailsList: {
    width: "95%",
    //backgroundColor: '#000',
    marginBottom: "5%"
  },

  detailsHeader: {
    backgroundColor: "#C0CCDA",
    width: "100%",
    height: 40,
    alignItems: "center",
    justifyContent: "center"
  },

  rowDetails: {
    flexDirection: "row",
    alignItems: "center",
    padding: "1%",
    borderBottomColor: "#EFF2F7",
    borderBottomWidth: 1
  },

  labelDetail: {
    width: 260
    //backgroundColor: '#000'
  },

  buttonSaveContainer: {
    //justifyContent: 'center',
    alignItems: "center",
    marginTop: "5%",
    marginBottom: "5%"
  },

  buttonSave: {
    width: 200,
    height: 40,
    backgroundColor: "#1FB6FF",
    flexDirection: "row",
    //justifyContent: 'center'
    alignItems: "center"
  },

  labelButtonSave: {
    color: "#FFF",
    fontWeight: "bold",
    width: "80%",
    //backgroundColor: '#000',
    paddingLeft: "30%"
    //paddingRight: '10%'
  },

  labelValueReadOnly: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
    backgroundColor: "#C0CCDA",
    height: 40,
    textAlign: "center"
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
      UserAction
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(PaymentRegister);
