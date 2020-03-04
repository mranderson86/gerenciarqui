import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import api from "../../../services/Api";
import { UserAction } from "../../../store/Users/userAction";

import Result from "../../../components/Result/Result";

// Tela Cadastrar um novo projeto
function ProjectRegister(props) {
  const { navigation, userLogin } = props;
  const { token } = userLogin;

  const [edit, setEdit] = useState(false);
  const [show, setShow] = useState(false);
  const [error, setErr] = useState(false);
  const [title, setTitle] = useState("");

  // Salva uma nova etapa ou altera uma existente
  async function save() {
    try {
      const data = {
        nome: title,
        profissional_id: userLogin._id
      };

      setShow(true);

      if (edit) {
        const response = await api.put(`/projetos/${step._id}`, data, {
          headers: {
            authorization: `Bearer ${token}`
          }
        });
      } else {
        const response = await api.post("/projetos", data, {
          headers: {
            authorization: `Bearer ${token}`
          }
        });
      }

      navigation.navigate("Projects", { reload: true });
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

  //  Renderiza cada card do projeto
  return (
    <SafeAreaView style={styles.container}>
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
      </View>

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
    //justifyContent: 'center',
    alignItems: "center",
    backgroundColor: "#E5E9F2"
  },

  formContainer: {
    backgroundColor: "#FFF",
    marginTop: "5%",
    width: "95%",
    padding: "2%"
  },

  detailsContainer: {
    //justifyContent: 'center',
    alignItems: "center"
    //backgroundColor: '#000'
  },

  inputContainer: {
    paddingLeft: "1%",
    paddingRight: "1%",
    paddingTop: "4%",
    paddingBottom: "4%"
  },

  label: {
    color: "#666"
  },

  input: {
    borderBottomColor: "#888",
    borderBottomWidth: 1,
    width: "100%",
    height: 40
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
  }
});

// State em props
const mapStateToProps = state => {
  const { userLogin } = state;
  return { userLogin };
};

export default connect(mapStateToProps)(ProjectRegister);
