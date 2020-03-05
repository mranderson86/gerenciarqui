import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import api from "../../../services/Api";
import { BudgetCurrentAction } from "../../../store/Projects/projectAction";

import Result from "../../../components/Result/Result";
import AuthRender from "../AuthRender";

// Renderiza o card de cada etapa
function CardItem(props) {
  const {
    payment,
    navigation,
    deleteBudget,
    loadBudgetListItems,
    editBudget,
    profissional
  } = props;

  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardItems}>
        <View style={styles.cardItemsValueLabel}>
          <Text style={styles.cardItemLabel}>{""}</Text>
          <Text style={styles.cardItemValue}>{payment.detalhes}</Text>

          <Text style={styles.cardItemLabel}>Valor Pago</Text>
          <Text style={styles.cardItemValue}>{payment.valor || 0}</Text>

          <Text style={styles.cardItemLabel}>Data</Text>
          <Text style={styles.cardItemValue}>{payment.data_pgto}</Text>
        </View>

        <AuthRender auth={profissional}>
          <TouchableOpacity
            style={{ paddingLeft: "5%", paddingRight: "1%" }}
            onPress={() => editBudget(budget)}
          >
            <MaterialIcons name="edit" size={30} color="#1FB6FF" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => deleteBudget(budget._id)}>
            <MaterialIcons name="delete" size={30} color="#FF4949" />
          </TouchableOpacity>
        </AuthRender>
      </View>
    </View>
  );
}

// Lista de Pagamentos
function PaymentsList(props) {
  const {
    BudgetCurrentAction,
    userProjects,
    userLogin,
    navigation,
    route
  } = props;
  const { token, profissional } = userLogin;
  const { project } = userProjects;

  const { reloading } = route.params;

  const [show, setShow] = useState(false);
  const [payments, setPayments] = useState([]);
  const [error, setErr] = useState(false);

  // carrega a lista das etapas
  useEffect(() => {
    loadPayments();
  }, [navigation, reloading]);

  // consulta a lista das etapas
  async function loadPayments() {
    try {
      setShow(true);

      const response = await api.get(`/pagamentos/${project._id}`, {
        headers: {
          authorization: `Bearer ${token}`
        }
      });

      const data = response.data;

      if (data) {
        setPayments(data);
      } else {
        setPayments([]);
      }

      setShow(false);
    } catch (err) {
      console.log("err ", err);
      setErr(true);
    }
  }

  async function deletePayment(id) {
    try {
      setShow(true);

      const response = await api.delete(`/pagamentos/${id}`, {
        headers: {
          authorization: `Bearer ${token}`
        }
      });

      loadBudgets();
    } catch (err) {
      console.log("err", err);
      setErr(true);
    }
  }

  function editBudget(budget) {
    navigation.navigate("PaymentRegister", { edit: true });
  }

  // Carrega a tela de cadastro
  function addNewPayment() {
    props.navigation.navigate("PaymentRegister", { edit: false });
  }

  //  Renderiza cada orçamento da lista de orçamentos
  return (
    <SafeAreaView style={styles.container}>
      {show ? (
        error ? (
          <Result type="error" />
        ) : (
          <Result type="await" />
        )
      ) : (
        <>
          <FlatList
            data={payments}
            //contentContainerStyle={styles.list}
            keyExtractor={item => item._id}
            renderItem={({ item }) => (
              <CardItem
                {...props}
                payment={item}
                deleteBudget={deletePayment}
                editBudget={editBudget}
                profissional={profissional}
              />
            )}
          />

          <AuthRender auth={profissional}>
            <TouchableOpacity
              style={styles.buttonSave}
              onPress={() => addNewPayment()}
            >
              <MaterialIcons name="add-circle" size={50} color="#1FB6FF" />
            </TouchableOpacity>
          </AuthRender>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E5E9F2"
  },
  list: {
    //paddingHorizontal: "1%",
    //paddingTop: "1%"
  },
  cardContainer: {
    // alinha no eixo horizontal
    alignItems: "center",
    backgroundColor: "#fff",
    padding: "1%",
    //margin: "1%",
    borderRadius: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 2
  },

  cardItems: {
    flexDirection: "row",
    //backgroundColor: "#232334",
    width: "98%",
    paddingTop: "1%",
    paddingBottom: "1%"
  },

  cardItemsValueLabel: {
    flexDirection: "column",
    width: "80%"
    //backgroundColor: 'red',
  },

  cardItemLabel: {
    color: "#888",
    //backgroundColor: 'yellow',
    paddingTop: "1%",
    paddingBottom: "1%",
    fontWeight: "bold",
    fontSize: 16
  },

  cardItemValue: {
    paddingLeft: "5%",
    paddingRight: "10%",
    //width: '50%',
    //backgroundColor: 'blue',
    paddingTop: "1%",
    paddingBottom: "1%",
    fontWeight: "bold"
    //fontSize: 16
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

export default connect(mapStateToProps, mapDispatchToProps)(PaymentsList);
