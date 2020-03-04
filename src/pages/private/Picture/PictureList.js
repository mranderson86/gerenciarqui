import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image
} from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import api, { apiURL } from "../../../services/Api";
import { UserAction } from "../../../store/Users/userAction";
import { ProjectCurrentAction } from "../../../store/Projects/projectAction";

import Result from "../../../components/Result/Result";

import AuthRender from "../AuthRender";

function FlatListItemSeparator() {
  return (
    <View
      style={{
        height: 0.5,
        width: "100%",
        backgroundColor: "#000"
      }}
    />
  );
}

// Renderiza o card de cada etapa
function CardItem(props) {
  const { item, navigation, Delete, profissional } = props;

  const pathImage = {
    uri: `${item.url}`
  };

  return (
    <View style={styles.cardContainer}>
      <Image style={styles.imageContainer} source={pathImage} />
      <AuthRender auth={profissional}>
        <TouchableOpacity onPress={() => Delete(item._id)}>
          <MaterialIcons name="delete" size={30} color="#FF4949" />
        </TouchableOpacity>
      </AuthRender>
    </View>
  );
}

// Tela Lista de Projetos
function PictureList(props) {
  const { userLogin, ProjectCurrentAction, navigation, route } = props;
  const { token, profissional } = userLogin;

  const { reload } = route.params;

  const [images, setImages] = useState([]);
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

      const response = await api.get(`/arquivos`, {
        headers: {
          authorization: `Bearer ${token}`
        }
      });

      const data = response.data;

      if (data) {
        setImages(data);
      } else {
        setImages([]);
      }

      setShow(false);
    } catch (err) {
      console.log("load ", err);
    }
  }

  // Exclui um projeto da lista
  async function Delete(id) {}

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
        data={images}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <CardItem
            {...props}
            item={item}
            Delete={Delete}
            profissional={profissional}
          />
        )}
        //ItemSeparatorComponent={<FlatListItemSeparator />}
      />

      <AuthRender auth={profissional}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("PictureGallery", { reload: false })
          }
        >
          <MaterialCommunityIcons name="image-plus" size={50} color="#1FB6FF" />
        </TouchableOpacity>
      </AuthRender>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    //alignItems: "center",
    backgroundColor: "#E5E9F2"
  },

  cardContainer: {
    // alinha no eixo horizontal
    flex: 1,
    flexDirection: "row",
    padding: "1%",
    backgroundColor: "#FFF"
  },

  imageContainer: {
    width: "90%",
    height: 200,
    flexDirection: "row",
    borderRadius: 5
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

export default connect(mapStateToProps, mapDispatchToProps)(PictureList);
