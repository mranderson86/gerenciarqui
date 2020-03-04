import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import { MaterialIcons } from "@expo/vector-icons";

import Result from "../../../components/Result/Result";

// Câmera
function PictureCamera() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    RequireCamera();
  }, []);

  // Solicita a permissão de utlização da câmera
  async function RequireCamera() {
    const { status } = await Camera.requestPermissionsAsync();
    setHasPermission(status === "granted");
  }

  if (hasPermission === null) {
    return <Result type="await" />;
  }

  if (hasPermission === false) {
    return <Text>Câmera não disponível</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type}>
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
            onPress={() => {}}
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
