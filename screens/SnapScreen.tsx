import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Camera, CameraType, FlashMode,WhiteBalance } from "expo-camera";
import { useDispatch, useSelector } from "react-redux";
import { updateImage} from "../reducers/user";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useIsFocused } from "@react-navigation/native";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';




export default function SnapScreen({navigation}) {
  const BACKEND_ADDRESS = "https://backend-share-act.vercel.app/";
  
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.value);
  const isFocused = useIsFocused();

  const [hasPermission, setHasPermission] = useState(false);
  const [type, setType] = useState(CameraType.front);
  const [flashMode, setFlashMode] = useState(FlashMode.off);
  const [cloudoMode, setCloudoMode] = useState(WhiteBalance.auto);
  const [cerclecolor,setcerclecolor] = useState('#fff');

  let cameraRef: any = useRef(null);

   useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
    
  }, []);

  if (!hasPermission || !isFocused) {
    return <View />;
  }

  const takePicture = async () => {
    const photo = await cameraRef.takePictureAsync({ quality: 0.3 });
    const formData = new FormData();
    setcerclecolor('#e8be4b') 

    formData.append("photoFromFront", {
      uri: photo.uri,
      name: "photo.jpg",
      type: "image/jpeg",
    });

    fetch(`${BACKEND_ADDRESS}/users/upload`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {

        dispatch(updateImage(data.image))
        if (data.result){

const datas = {
  image: data.image,
  token: user.token,
};

fetch(`${BACKEND_ADDRESS}/users/changesprofil`, {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(datas),
})
  .then((response) => response.json())
  .then((data) => {
    if (!data.result) {
      console.log(data.error)

    } else {

      dispatch(updateImage(datas.image));

      navigation.navigate("TabNavigator", { screen: "Map" });
    }
  })     
      }
      });
     
  };

  let colorflashmode = '#000000'
  
  if (flashMode === FlashMode.off) {
    colorflashmode = '#000000'
  }else {
    colorflashmode = '#e8be4b'
    console.log(flashMode)
  };

  let colorwhitebalance = '#000000'
  let nameicone = "cloud"

  if (cloudoMode === WhiteBalance.auto) {
    colorwhitebalance = '#000000'
  }
  else if (WhiteBalance.incandescent)
  {
    colorwhitebalance = '#e8be4b'
  };

  return (
    <Camera
      type={type}
      flashMode={flashMode}
      ref={(ref) => (cameraRef = ref)}
      style={styles.camera}
      pictureSize='640x480' 
      whiteBalance={cloudoMode}>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          onPress={() => setCloudoMode(
          cloudoMode === WhiteBalance.auto ? WhiteBalance.fluorescent : WhiteBalance.auto)}>
            <FontAwesome5 name={nameicone} size={40} color={cloudoMode === WhiteBalance.auto ? "#ffffff" : "#e8be4b"}/>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            setFlashMode(
              flashMode === FlashMode.off ? FlashMode.torch : FlashMode.off)}
          style={styles.button}>
          <FontAwesome
            name="flash"
            size={40}
            color={flashMode === FlashMode.off ? "#ffffff" : "#e8be4b"}/>
        </TouchableOpacity>
      </View>

      <View style={styles.snapContainer}>
        <TouchableOpacity onPress={() => cameraRef && takePicture()}>
          <FontAwesome name="circle-thin" size={100} color={cerclecolor}/>
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
    paddingTop: 60,
    paddingLeft: 40,
    paddingRight: 40,
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
    paddingBottom: 40,
  },
});
