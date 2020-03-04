import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform
} from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import FormData from "form-data";
import { uniqueId } from "lodash";

import api from "../../../services/Api";
import Result from "../../../components/Result/Result";
import PictureCamera from "../../private/Picture/PictureCamera";

// Câmera
function PictureGallery(props) {
  const { userLogin, userProjects, navigation, route } = props;
  const { token, profissional } = userLogin;
  const { step } = userProjects;

  const [image, setImage] = useState(null);
  // Await / Error request
  const [show, SetShow] = useState({
    await: false,
    error: false
  });

  const [camera, setCamera] = useState(false);

  const authorization = `Bearer ${token}`;
  // Procurando imagens no disco local
  async function handleImageFromGalleryAsync() {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Sem permissão de acesso a câmera");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (!pickerResult.cancelled) {
      setImage(pickerResult);
    }
  }

  function handleImageFromCamera(imageFromCamera) {
    setImage(imageFromCamera);
    setCamera(false);
  }

  // prepara a imgem para request / upload
  function createImageData(file) {
    const data = new FormData();
    const imageId = uniqueId();

    const pathImage =
      Platform.OS === "android" ? image.uri : image.uri.replace("file://", "");

    const dotPosition = pathImage.lastIndexOf(".");
    const imageType = pathImage.substring(dotPosition);

    data.append("file", {
      name: `${imageId}${imageType}`,
      type: `image/${imageType[1]}`,
      uri: pathImage
    });

    // anexa propriedades da imagem
    //Object.keys(body).forEach(key => {
    //  data.append(key, body[key]);
    //});

    return data;
  }

  async function handleUploadImage() {
    try {
      SetShow({
        error: false,
        await: true
      });

      let dataImage = createImageData(image);

      const response = await api.post(`/arquivos/${step._id}`, dataImage, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${token}`
        }
      });

      SetShow({
        error: false,
        await: false
      });

      setImage(null);
    } catch (err) {
      console.log("error 1", err);

      SetShow({
        error: true,
        await: false
      });
    }
  }

  if (show.await) {
    return <Result type="await" />;
  }

  if (show.error) {
    return <Result type="error" />;
  }

  if (camera) {
    return <PictureCamera handleImageFromCamera={handleImageFromCamera} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {image ? (
          <Image source={{ uri: image?.uri }} style={styles.image} />
        ) : (
          <MaterialIcons name="image" size={50} color="#999" />
        )}
      </View>

      <View style={styles.buttonSaveContainer}>
        <TouchableOpacity
          onPress={() => handleImageFromGalleryAsync()}
          style={styles.buttonSave}
        >
          <MaterialCommunityIcons name="image-search" size={30} color="#FFF" />
          <Text style={styles.labelButtonSave}>Galeria</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonSaveContainer}>
        <TouchableOpacity
          onPress={() => setCamera(true)}
          style={styles.buttonSave}
        >
          <MaterialCommunityIcons name="camera" size={30} color="#FFF" />
          <Text style={styles.labelButtonSave}>Câmera</Text>
        </TouchableOpacity>
      </View>

      {image && (
        <View style={styles.buttonSaveContainer}>
          <TouchableOpacity
            onPress={() => handleUploadImage()}
            style={styles.buttonSave}
          >
            <MaterialIcons name="cloud-upload" size={30} color="#FFF" />
            <Text style={styles.labelButtonSave}>Salvar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E5E9F2",
    alignItems: "center"
  },

  imageContainer: {
    marginTop: "5%",
    width: "95%",
    height: "40%",
    borderRadius: 1,
    borderColor: "#999",
    borderWidth: 3,
    borderStyle: "dotted"
  },

  image: {
    width: "100%",
    height: "100%"
  },

  buttonSaveContainer: {
    alignItems: "center",
    marginTop: "5%"
  },

  buttonSave: {
    width: 200,
    height: 40,
    backgroundColor: "#1FB6FF",
    flexDirection: "row",
    alignItems: "center"
  },

  labelButtonSave: {
    color: "#FFF",
    fontWeight: "bold",
    width: "80%",
    paddingLeft: "30%"
  }
});

// State em props
const mapStateToProps = state => {
  const { userLogin, userProjects } = state;
  return { userLogin, userProjects };
};

export default connect(mapStateToProps)(PictureGallery);
