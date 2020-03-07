import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import api from "../../../services/Api";
import { UserAction } from "../../../store/Users/userAction";
import { ProjectCurrentAction } from "../../../store/Projects/projectAction";

import Result from "../../../components/Result/Result";

import AuthRender from "../AuthRender";

// Renderiza o card de cada etapa
function CardItem(props) {
  const { item, navigation, Delete, LoadDashboard, profissional } = props;

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.cardContainer}
      onPress={() => LoadDashboard(item)}
    >
      <View style={styles.cardItems}>
        <View style={styles.cardItemsValueLabel}>
          <Text style={styles.cardItemLabel}>Projeto</Text>
          <Text style={styles.cardItemValue}>{item.nome}</Text>

          <Text style={styles.cardItemLabel}>Situação</Text>
          <Text style={styles.cardItemValue}>
            {item.ativo ? "Ativo" : "Desativado"}
          </Text>
        </View>

        <AuthRender auth={profissional}>
          <TouchableOpacity
            style={{ paddingLeft: "1%" }}
            onPress={() =>
              navigation.navigate("ProjectRegister", { step: item, edit: true })
            }
          >
            <MaterialIcons name="edit" size={30} color="#1FB6FF" />
          </TouchableOpacity>
        </AuthRender>
      </View>
    </TouchableOpacity>
  );
}

// Tela Lista de Projetos
function ProjectsList(props) {
  const { userLogin, ProjectCurrentAction, navigation, route } = props;
  const { token, profissional } = userLogin;

  const { reload } = route.params;

  const [projects, setProjects] = useState([]);
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);

  // carrega a lista das etapas
  useEffect(() => {
    Load();
  }, [navigation, reload]);

  // consulta a lista de projetos
  async function Load() {
    try {
      setShow(true);

      const response = await api.get(`/projetos`, {
        headers: {
          authorization: `Bearer ${token}`
        }
      });

      const data = response.data;

      if (data) {
        setProjects(data);
      } else {
        setProjects([]);
      }

      setShow(false);
    } catch (err) {
      console.log("load ", err);
    }
  }

  // Exclui um projeto da lista
  async function Delete(id) {
    try {
      setShow(true);

      await api.delete(`/projetos/${id}`, {
        headers: {
          authorization: `Bearer ${token}`
        }
      });

      Load();
    } catch (err) {
      console.log("err", err);

      setError(true);
    }
  }

  // Carrega a tela de etapas
  function LoadStepList(project) {
    ProjectCurrentAction({
      project
    });

    navigation.navigate("Steps");
  }

  function LoadDashboard(project) {
    ProjectCurrentAction({
      project
    });

    navigation.navigate("ProjectMenu", { title: project.nome });
  }

  if (show && error) {
    return <Result type="error" />;
  }

  if (show && !error) {
    return <Result type="await" />;
  }

  //  Renderiza lista de projetos
  return (
    <View style={styles.container}>
      <FlatList
        data={projects}
        contentContainerStyle={styles.list}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <CardItem
            {...props}
            item={item}
            Delete={Delete}
            //LoadStepList={LoadStepList}
            LoadDashboard={LoadDashboard}
            profissional={profissional}
          />
        )}
      />

      <AuthRender auth={profissional}>
        <TouchableOpacity
          style={styles.buttonSave}
          onPress={() => navigation.navigate("ProjectRegister")}
        >
          <MaterialIcons name="add-circle" size={50} color="#1FB6FF" />
        </TouchableOpacity>
      </AuthRender>
    </View>
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
    paddingHorizontal: "1%",
    paddingTop: "1%"
  },
  cardContainer: {
    // alinha no eixo horizontal
    alignItems: "center",
    backgroundColor: "#fff",
    padding: "1%",
    margin: "1%",
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
    paddingTop: "1%",
    paddingBottom: "1%"
  },

  cardItemsValueLabel: {
    flexDirection: "column",
    width: "90%"
  },

  cardItemLabel: {
    color: "#888",
    paddingTop: "1%",
    paddingBottom: "1%"
  },

  cardItemValue: {
    paddingLeft: "5%",
    paddingRight: "10%",
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
  },

  cardDetailsHeader: {
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

// Action em props
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      UserAction,
      ProjectCurrentAction
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsList);
