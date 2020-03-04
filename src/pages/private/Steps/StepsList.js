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
import { StepCurrentAction } from "../../../store/Projects/projectAction";

import Result from "../../../components/Result/Result";
import AuthRender from "../AuthRender";

// Renderiza o card de cada etapa
function StepItem(props) {
  const {
    item,
    navigation,
    deleteStep,
    //LoadDetailList,
    LoadStepMenu,
    EditStep,
    profissional
  } = props;

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.cardContainer}
      //onPress={() => LoadDetailList(item)}
      onPress={() => LoadStepMenu(item)}
    >
      <View style={styles.cardItems}>
        <View style={styles.cardItemsValueLabel}>
          <Text style={styles.cardItemLabel}>{item.titulo}:</Text>
          <Text style={styles.cardItemValue}>{item.descricao}</Text>
        </View>

        <AuthRender auth={profissional}>
          <TouchableOpacity
            style={{ paddingLeft: "5%", paddingRight: "1%" }}
            onPress={() => EditStep(item)}
          >
            <MaterialIcons name="edit" size={30} color="#1FB6FF" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => deleteStep(item._id)}>
            <MaterialIcons name="delete" size={30} color="#FF4949" />
          </TouchableOpacity>
        </AuthRender>
      </View>

      <View style={styles.cardItems}>
        <Text style={styles.cardItemLabel}>Concluído:</Text>
        <Text style={styles.cardItemValue}>
          {parseFloat(item.concluido ? item.concluido : 0.0).toFixed(2)} %
        </Text>
      </View>
    </TouchableOpacity>
  );
}

// Tela Lista de Etapas
function StepsList(props) {
  const { StepCurrentAction, userProjects, userLogin, navigation } = props;
  const { token, profissional } = userLogin;
  const { project, reload } = userProjects;

  const [show, setShow] = useState(false);
  const [steps, setSteps] = useState([]);
  const [error, setErr] = useState(false);

  // carrega a lista das etapas
  useEffect(() => {
    loadSteps();
  }, [navigation, reload]);

  // consulta a lista das etapas
  async function loadSteps() {
    try {
      setShow(true);

      const response = await api.get(`/etapas/${project._id}`, {
        headers: {
          authorization: `Bearer ${token}`
        }
      });

      const data = response.data;

      if (data) {
        setSteps(data);
      } else {
        setSteps([]);
      }

      setShow(false);
    } catch (err) {
      console.log("err ", err);
      setErr(true);
    }
  }

  async function deleteStep(id) {
    try {
      setShow(true);

      const response = await api.delete(`/etapas/${id}`, {
        headers: {
          authorization: `Bearer ${token}`
        }
      });

      loadSteps();
    } catch (err) {
      console.log("err", err);
      setErr(true);
    }
  }

  // Carrega o menu Fotos / Detalhes da etapa
  function LoadStepMenu(item) {
    StepCurrentAction({
      step: item
    });

    navigation.navigate("StepMenu", { title: item.titulo });
  }

  // Carrega a lista de detalhes da etapa
  function LoadDetailList(item) {
    StepCurrentAction({
      step: item
    });

    navigation.navigate("Details");
  }

  function EditStep(item) {
    StepCurrentAction({
      step: item
    });

    navigation.navigate("StepRegister", { edit: true });
  }

  // Carrega a tela de cadastro de uma nova etapa
  function AddNewStep() {
    StepCurrentAction({
      step: {}
    });

    props.navigation.navigate("StepRegister", { edit: false });
  }

  //  Renderiza cada etapa da lista de Etapa
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
            data={steps}
            contentContainerStyle={styles.list}
            keyExtractor={step => step._id}
            renderItem={({ item }) => (
              <StepItem
                {...props}
                item={item}
                deleteStep={deleteStep}
                //LoadDetailList={LoadDetailList}
                LoadStepMenu={LoadStepMenu}
                EditStep={EditStep}
                profissional={profissional}
              />
            )}
          />

          <AuthRender auth={profissional}>
            <TouchableOpacity
              style={styles.buttonSave}
              onPress={() => AddNewStep()}
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
    //marginTop: Constants.statusBarHeight
  },
  list: {
    //marginTop: Constants.statusBarHeight,
    paddingHorizontal: "1%",
    paddingTop: "1%"
    //backgroundColor: '#000',
  },
  cardContainer: {
    // alinha no eixo horizontal
    alignItems: "center",
    backgroundColor: "#fff",
    padding: "1%",
    margin: "1%",
    //width: 380,
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
    width: "95%",
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
    paddingBottom: "1%"
  },

  cardItemValue: {
    paddingLeft: "5%",
    paddingRight: "10%",
    //width: '50%',
    //backgroundColor: 'blue',
    paddingTop: "1%",
    paddingBottom: "1%",
    fontWeight: "bold",
    fontSize: 16
  },

  cardDetails: {
    width: "95%",
    paddingTop: "1%",
    paddingBottom: "1%",
    paddingLeft: "1%",
    backgroundColor: "#F9FAFC"
    //backgroundColor: '#EFF2F7'
    //backgroundColor: '#000'
  },

  cardDetailsHeader: {
    // alignItems: 'center',
    // borderBottomColor: '#ccc',
    // borderBottomWidth: 1,
    width: "95%",
    paddingTop: "1%",
    paddingBottom: "1%",

    backgroundColor: "#C0CCDA",
    height: 40,
    alignItems: "center",
    justifyContent: "center"
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

export default connect(mapStateToProps, mapDispatchToProps)(StepsList);
