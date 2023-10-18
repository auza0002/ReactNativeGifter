import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  Pressable,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native"; // Import Dimensions
import { useFocusEffect } from "@react-navigation/native";
import { useTheme } from "@rneui/themed";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useMyData } from "../../context/AsyncStorage";

const CameraIdea = ({ navigation, route }) => {
  const [dataUser, setDataUser, getPersonById] = useMyData([]);
  const { id } = route.params;
  const user = getPersonById(id);
  const { theme } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
  const [image, setImage] = useState(null);
  const [imageWidth, setImageWidth] = useState(null);
  const [imageHeight, setImageHeight] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasPermission(cameraStatus.status === "granted");
    })();
  }, []);

  useEffect(() => {
    if (!isModalOpen) {
      if (cameraRef.current) {
        cameraRef.current.pausePreview();
      }
    }
  }, [isModalOpen]);

  useFocusEffect(
    React.useCallback(() => {
      setIsModalOpen(true);
      return () => {
        setIsModalOpen(false);
      };
    }, [])
  );

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        setImage(data.uri);

        const screenWidth = Dimensions.get("window").width;
        const imageWidth = screenWidth * (0.5 + Math.random() * 0.2);
        const imageHeight = imageWidth * (2 / 3);
        setImageWidth(imageWidth);
        setImageHeight(imageHeight);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const downloadPicture = async () => {
    if (image) {
      try {
        await MediaLibrary.saveToLibraryAsync(image);
        alert("Image saved to library");
      } catch (error) {
        alert("Error saving image");
      }
    }
  };
  const savePicture = () => {
    if (image) {
      navigation.navigate("Add Idea Screen", { image: image, id: id });
      setImage(null);
    }
  };
  if (hasPermission === false) {
    alert("No access to camera");
  }
  return (
    <View style={styles.container}>
      {!image ? (
        <Camera
          style={[
            styles.camera,
            {
              justifyContent: "space-between",
              width: imageWidth,
              height: imageHeight,
            },
          ]}
          type={type}
          flashMode={flashMode}
          ref={cameraRef}
        >
          <Pressable
            style={{
              position: "absolute",
              top: 20,
              left: 20,
              zIndex: 100,
            }}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <FontAwesome
              name="chevron-down"
              size={30}
              color={theme.colors.text.white}
            />
          </Pressable>
          <View
            style={{
              marginTop: 25,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Text
              style={{
                color: theme.colors.text.white,
                fontSize: theme.typography.bodyLarge.fontSize,
                fontWeight: theme.typography.bodyLarge.fontWeight,
              }}
            >
              {user.name}
            </Text>
            <Text
              style={{
                color: theme.colors.primaryPressed,
                fontSize: theme.typography.body.fontSize,
                fontWeight: theme.typography.bodyLarge.fontWeight,
              }}
            >
              Image gift
            </Text>
          </View>
          <View
            onPress={() => {
              takePicture();
            }}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
              gap: 10,
              marginBottom: 50,
            }}
          >
            <Pressable
              onPress={() => {
                if (hasPermission === false) {
                  return;
                }
                type === Camera.Constants.Type.front
                  ? setType(Camera.Constants.Type.back)
                  : setType(Camera.Constants.Type.front);
              }}
            >
              <MaterialIcons
                name="flip-camera-ios"
                size={40}
                color={theme.colors.text.white}
              />
            </Pressable>
            <Pressable
              onPress={() => {
                if (hasPermission === false) {
                  return;
                }
                takePicture();
              }}
            >
              <View
                style={{
                  width: 60,
                  height: 60,
                  backgroundColor: "transparent",
                  borderColor: theme.colors.text.white,
                  borderWidth: 6,
                  borderRadius: 50,
                }}
              ></View>
            </Pressable>
            <Pressable
              onPress={() => {
                if (hasPermission === false) {
                  return;
                }
                flashMode === Camera.Constants.FlashMode.torch
                  ? setFlashMode(Camera.Constants.FlashMode.off)
                  : setFlashMode(Camera.Constants.FlashMode.torch);
              }}
            >
              <MaterialIcons
                name={
                  flashMode === Camera.Constants.FlashMode.off
                    ? "flash-off"
                    : "flash-on"
                }
                size={40}
                color={theme.colors.text.white}
              />
            </Pressable>
          </View>
        </Camera>
      ) : (
        <View style={[styles.camera, { justifyContent: "flex-end" }]}>
          <Image
            source={{ uri: image }}
            style={{
              width: "100%",
              height: "100%",
            }}
          />
          <View
            style={{
              position: "absolute",
              flexDirection: "row",
              alignItems: "center",
              height: 60,
              paddingHorizontal: 20,
              justifyContent: "space-between",
              backgroundColor: "rgba(0,0,0,0.5)",
              width: "100%",
            }}
          >
            <Pressable
              style={{
                borderBottomColor: theme.colors.yellow,
                borderBottomWidth: 1,
              }}
              onPress={() => {
                setImage(null);
                navigation.goBack();
              }}
            >
              <Text style={{ color: theme.colors.yellow }}>Cancel</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                downloadPicture();
              }}
            >
              <MaterialIcons
                name="file-download"
                size={30}
                color={theme.colors.text.white}
              />
            </Pressable>
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
              }}
              onPress={() => {
                savePicture();
              }}
            >
              <FontAwesome
                name="chevron-right"
                size={24}
                color={theme.colors.text.white}
              />
              <Text
                style={{
                  color: theme.colors.text.white,
                  fontSize: theme.typography.bodyLarge.fontSize,
                  fontWeight: theme.typography.bodyLarge.fontWeight,
                }}
              >
                Save image
              </Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingHorizontal: 20,
  },
  camera: {
    flexDirection: "column",
    flex: 1,
    borderRadius: 20,
    marginVertical: 50,
    borderRadius: 20,
    overflow: "hidden",
  },
});

export default CameraIdea;
