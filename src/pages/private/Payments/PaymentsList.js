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
import { PaymentCurrentAction } from "../../../store/Projects/projectAction";

import Result from "../../../components/Result/Result";
import Separator from "../../../components/Separator/Separator";
import AuthRender from "../AuthRender";

import { dateBrFormat, moneyBrFormat } from "../../../utils/utils";

// Card Payment
function CardItem(props) {
  const {
    payment,
    navigation,
    deletePayment,
    editPayment,
    profissional
  } = props;

  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardItems}>
        <View style={styles.cardItemsValueLabel}>
          <Text style={styles.cardItemLabel}>{""}</Text>
          <Text style={styles.cardItemValue}>{payment.detalhes}</Text>

          <Text style={styles.cardItemLabel}>Valor Pago</Text>
          <Text style={styles.cardItemValue}>
            {moneyBrFormat(parseFloat(payment.valor).toFixed(2))}
          </Text>

          <Text style={styles.cardItemLabel}>Data</Text>
          <Text style={styles.cardItemValue}>
            {dateBrFormat(new Date(payment.data_pgto))}
          </Text>
        </View>

        <AuthRender auth={profissional}>
          <TouchableOpacity
            style={{ paddingLeft: "5%", paddingRight: "1%" }}
            onPress={() => editPayment(payment)}
          >
            <MaterialIcons name="edit" size={30} color="#1FB6FF" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => deletePayment(payment._id)}>
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
    PaymentCurrentAction,
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

      loadPayments();
    } catch (err) {
      console.log("err", err);
      setErr(true);
    }
  }

  function editPayment(payment) {
    PaymentCurrentAction({
      payment
    });

    navigation.navigate("PaymentRegister", { edit: true });
  }

  // Carrega a tela de cadastro
  function addNewPayment() {
    props.navigation.navigate("PaymentRegister", { edit: false });
  }

  if (show && error) {
    return <Result type="error" />;
  }

  if (show && !error) {
    return <Result type="await" />;
  }

  //  Renderiza cada orçamento da lista de Pagamentos
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={payments}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <CardItem
            {...props}
            payment={item}
            deletePayment={deletePayment}
            editPayment={editPayment}
            profissional={profissional}
          />
        )}
        ItemSeparatorComponent={() => <Separator />}
      />

      <AuthRender auth={profissional}>
        <TouchableOpacity
          style={styles.buttonSave}
          onPress={() => addNewPayment()}
        >
          <MaterialIcons name="add-circle" size={50} color="#1FB6FF" />
        </TouchableOpacity>
      </AuthRender>
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

  cardContainer: {
    // alinha no eixo horizontal
    alignItems: "center",
    backgroundColor: "#fff",
    padding: "1%",
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
    width: "98%",
    paddingTop: "1%",
    paddingBottom: "1%"
  },

  cardItemsValueLabel: {
    flexDirection: "column",
    width: "80%"
  },

  cardItemLabel: {
    color: "#888",
    paddingTop: "1%",
    paddingBottom: "1%",
    fontWeight: "bold",
    fontSize: 16
  },

  cardItemValue: {
    paddingLeft: "5%",
    paddingRight: "10%",
    paddingTop: "1%",
    paddingBottom: "1%",
    fontWeight: "bold"
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
      PaymentCurrentAction
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(PaymentsList);
