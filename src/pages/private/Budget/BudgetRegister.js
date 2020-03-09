import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialIcons } from "@expo/vector-icons";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import api from "../../../services/Api";
import { UserAction } from "../../../store/Users/userAction";
import Result from "../../../components/Result/Result";

import { dateBrFormat } from "../../../utils/utils";

// Tela Lista de Etapas
function BudgetRegister(props) {
  const { userLogin, userProjects, navigation, route } = props;
  const { token } = userLogin;
  const { project, budget } = userProjects;
  const { edit } = route.params;

  const [show, setShow] = useState(false);
  const [error, setErr] = useState(false);
  const [showCalendary, setShowCalendary] = useState(false);

  const headers = {
    authorization: `Bearer ${token}`
  };

  const [newDetail, setNewDetail] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [valuePay, setValuePay] = useState("0");
  const [valueTotal, setValueTotal] = useState(0);
  const [accept, setAccept] = useState(false);
  const [status, setStatus] = useState(false);
  const [typePay, setTypePay] = useState("À Vista");
  const [counterPay, setCounterPay] = useState(0);
  const [validate, setValidate] = useState("99/99/9999");

  // carrega dados da etapa
  useEffect(() => {
    if (edit && budget) {
      setType(budget.tipo);
      setDescription(budget.descricao);
      setValueTotal(budget.valor_total || 0);
    }
  }, []);

  // Salva uma nova etapa ou altera uma etapa existente
  async function save() {
    try {
      const data = {
        ...budget,
        tipo: type,
        descricao: description,
        projeto_id: project._id,
        valor_pago: valuePay,
        meio_pagto: typePay,
        parcelas: counterPay,
        valor_parcela: 0.0
      };

      setShow(true);

      if (edit) {
        const response = await api.put(`/orcamentos/${budget._id}`, data, {
          headers: headers
        });
      } else {
        const response = await api.post("/orcamentos", data, {
          headers: headers
        });
      }

      // Retorna para a lista de orçamentos
      navigation.navigate("Budgets", { reloading: true });
    } catch (err) {
      console.log("error", err);
      setErr(true);
    }
  }

  // Adiciona um novo detalhe na lista
  function AddNewDetail() {
    if (newDetail !== "") {
      const newRowDetail = {
        item: newDetail,
        checked: false
      };

      setDetails([...details, newRowDetail]);
      setNewDetail("");
    }
  }

  // Exclui um detalhe da lista
  function deleteDetail(detail) {
    const oldDetails = details;
    oldDetails.splice(oldDetails.indexOf(detail), 1);

    setDetails([...oldDetails]);
  }

  // Marca um novo detalhe como concluido.
  function checkDetail(index, detail) {
    const { checked, item } = detail;

    const newCheck = {
      item: item,
      checked: !checked
    };

    const oldDetails = details;
    oldDetails.splice(index, 1, newCheck);
    setDetails([...oldDetails]);
  }

  //  Renderiza cada etapa da lista de Etapa
  return (
    <KeyboardAvoidingView behavior="padding" enabled>
      {show ? (
        error ? (
          <Result type="error" />
        ) : (
          <Result type="await" />
        )
      ) : (
        <>
          <ScrollView style={{ width: "100%", height: "100%" }}>
            <View style={styles.formContainer}>
              <View style={styles.inputContainer100perc}>
                <Text style={styles.label}>Tipo</Text>
                <TextInput
                  style={styles.input}
                  value={type}
                  placeholder="Digite aqui"
                  onChangeText={val => setType(val)}
                />
              </View>

              <View style={styles.inputContainer100perc}>
                <Text style={styles.label}>Descrição</Text>
                <TextInput
                  style={styles.input}
                  value={description}
                  placeholder="Digite aqui"
                  onChangeText={val => setDescription(val)}
                />
              </View>

              <View style={styles.containerInputValueRow}>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Valor Total</Text>
                  <TextInput style={styles.labelValueReadOnly}>
                    R$ {valueTotal.toFixed(2)}
                  </TextInput>
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Valor Pago</Text>
                  <TextInput
                    keyboardType="numeric"
                    style={styles.input}
                    value={valuePay.toString() || ""}
                    placeholder="Digite aqui"
                    onChangeText={val => {
                      if (val !== "") setValuePay(val);
                    }}
                  />
                </View>
              </View>

              <View style={styles.containerInputValueRow}>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Forma de Pagamento</Text>
                  <TextInput
                    keyboardType="default"
                    style={styles.input}
                    value={typePay}
                    placeholder="Digite aqui"
                    onChangeText={val => setTypePay(val)}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Parcelas</Text>
                  <TextInput
                    keyboardType="number-pad"
                    style={styles.input}
                    value={counterPay.toString()}
                    placeholder="Digite aqui"
                    onChangeText={val => {
                      if (val !== "") setCounterPay(val);
                    }}
                  />
                </View>
              </View>

              <View style={styles.containerInputValueRow}>
                <View style={styles.containerInputValueRowCheck}>
                  <Text style={styles.label}>Aceite</Text>
                  <TouchableOpacity
                    style={{ paddingLeft: "5%", paddingRight: "1%" }}
                    onPress={() => {
                      setAccept(!accept);
                    }}
                  >
                    <MaterialIcons
                      name="check"
                      size={30}
                      color={accept ? "#13CE66" : "#C0CCDA"}
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.containerInputValueRowCheck}>
                  <Text style={styles.label}>Situação</Text>
                  <TouchableOpacity
                    style={{ paddingLeft: "5%", paddingRight: "1%" }}
                    onPress={() => {
                      setStatus(!status);
                    }}
                  >
                    <MaterialIcons
                      name="check"
                      size={30}
                      color={status ? "#13CE66" : "#C0CCDA"}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Validade</Text>
                <TextInput
                  keyboardType="default"
                  style={styles.input}
                  value={validate.toString()}
                  placeholder="99/99/9999"
                  onFocus={e => {
                    Keyboard.dismiss();
                    setShowCalendary(true);
                  }}
                />
              </View>

              {showCalendary && (
                <DateTimePicker
                  testID="dateTimePicker"
                  timeZoneOffsetInMinutes={0}
                  value={new Date()}
                  mode="date"
                  onChange={(evt, date) => {
                    setShowCalendary(false);

                    setValidate(dateBrFormat(date));
                  }}
                />
              )}
            </View>
            <View style={styles.buttonSaveContainer}>
              <TouchableOpacity
                style={styles.buttonSave}
                onPress={() => save()}
              >
                <MaterialIcons name="save" size={30} color="#FFF" />
                <Text style={styles.labelButtonSave}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </>
      )}
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
    //justifyContent: 'center',
    alignItems: "center"
    //backgroundColor: '#000'
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

export default connect(mapStateToProps, mapDispatchToProps)(BudgetRegister);
