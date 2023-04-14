import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Camera, CameraType, FlashMode } from "expo-camera";
import { useDispatch, useSelector } from "react-redux";
import { updateImage, updateToken } from "../reducers/user";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useIsFocused } from "@react-navigation/native";


const BACKEND_ADDRESS = "https://shareact-backend.vercel.app";

export default function SnapScreen({navigation}) {

  const dispatch = useDispatch();

  const user = useSelector((state: { user: UserState }) => state.user.value);
  const isFocused = useIsFocused();

  const [urlimage, setUrlImage] = useState()
  const [hasPermission, setHasPermission] = useState(false);
  const [type, setType] = useState(CameraType.back);
  const [flashMode, setFlashMode] = useState(FlashMode.off);

  let cameraRef: any = useRef(null);
console.log('log arrivé sur snap', user)
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    const photo = await cameraRef.takePictureAsync({ quality: 0.3 });
    const formData = new FormData();

    formData.append("photoFromFront", {
      uri: photo.uri,
      name: "photo.jpg",
      type: "image/jpeg",
    });
    console.log('log arrivé sur sbeffor SNAP', user)
    fetch(`${BACKEND_ADDRESS}/users/upload`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('data de la save image normalement un url',data)
        data.result && dispatch(updateImage(data.url));
        setUrlImage(data.image)


        if (data.result){
          console.log('avant envois snap',user)
      fetch('https://shareact-backend.vercel.app/users/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstname:user.firstname, username:user.username, email:user.email,password:user.password, age:user.datebirth, gender:user.gender,image:user.image}),
      }).then(response => response.json())
        .then(data => {
          console.log('BDD BDD BDD retour singup', data)
          data.result && dispatch(updateToken({ token: data.token }))
          
        });
  
        navigation.navigate("TabNavigator", { screen: "Map" });
      }
      });
     
  };


  if (!hasPermission || !isFocused) {
    return <View />;
  }

  return (
    <Camera
      type={type}
      flashMode={flashMode}
      ref={(ref) => (cameraRef = ref)}
      style={styles.camera}
    >
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          onPress={() =>
            setType(
              type === CameraType.back ? CameraType.front : CameraType.back
            )
          }
          style={styles.button}
        >
          <FontAwesome name="rotate-right" size={25} color="#ffffff" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            setFlashMode(
              flashMode === FlashMode.off ? FlashMode.torch : FlashMode.off
            )
          }
          style={styles.button}
        >
          <FontAwesome
            name="flash"
            size={25}
            color={flashMode === FlashMode.off ? "#ffffff" : "#e8be4b"}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.snapContainer}>
        <TouchableOpacity onPress={() => cameraRef && takePicture()}>
          <FontAwesome name="circle-thin" size={95} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </Camera>
  );
}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
  buttonsContainer: {
    flex: 0.1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  button: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: 50,
  },
  snapContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 25,
  },
});
