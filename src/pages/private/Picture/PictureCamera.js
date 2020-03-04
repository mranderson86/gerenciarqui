import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import { MaterialIcons } from "@expo/vector-icons";

import Result from "../../../components/Result/Result";

// Câmera
function PictureCamera({ handleImageFromCamera }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [camera, setCamera] = useState(null);

  useEffect(() => {
    RequireCamera();
  }, []);

  // Solicita a permissão de utilização da câmera
  async function RequireCamera() {
    const { status } = await Camera.requestPermissionsAsync();
    setHasPermission(status === "granted");
  }

  async function takeImageFromCameraAsync() {
    if (camera) {
      let image = await camera.takePictureAsync();
      handleImageFromCamera(image);
    }
  }

  if (hasPermission === null) {
    return <Result type="await" />;
  }

  if (hasPermission === false) {
    return <Text>Câmera não disponível</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={ref => {
          setCamera(ref);
        }}
        style={styles.camera}
        type={type}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "transparent",
            flexDirection: "row"
          }}
        >
          <TouchableOpacity
            style={{
              alignSelf: "flex-end",
              alignItems: "center"
            }}
            onPress={() => takeImageFromCameraAsync()}
          >
            <MaterialIcons name="photo-camera" size={50} color="#FFF" />
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
    //justifyContent: "center",
    //alignItems: "center"
  },
  camera: {
    flex: 1,
    alignItems: "center"
  }
});

export default PictureCamera;
