import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Camera, CameraType, FlashMode,WhiteBalance } from "expo-camera";
import { useDispatch, useSelector } from "react-redux";
import { updateImage, updateToken, updateFirstname, updateUsername, updateEmail  } from "../reducers/user";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useIsFocused } from "@react-navigation/native";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';




export default function SnapScreen({navigation}) {
  const BACKEND_ADDRESS = "https://shareact-backend.vercel.app";
  // const BACKEND_ADDRESS = "http://localhost:3000";
  // mettre a jour localhost avec expo


  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.value);
  const isFocused = useIsFocused();

  const [urlimage, setUrlImage] = useState(null)
  let [firstname, setFirstname] = useState(null);
  let [username, setUserName] = useState(null);
  let [email, setEmail] = useState(null);
  const [hasPermission, setHasPermission] = useState(false);
  const [type, setType] = useState(CameraType.front);
  const [flashMode, setFlashMode] = useState(FlashMode.off);
  const [cloudoMode, setCloudoMode] = useState(WhiteBalance.auto);
  const [cerclecolor,setcerclecolor] = useState('#fff');
let imagetmp = ''

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
  // const dispatchurlimage = ()=> {
  //   console.log('dispatche de image dans user apres le fetch etc ..',imagetmp)
 

  //   if (firstname === null) {
  //     firstname = user.firstname
  //     //setFirstname(user.firstname)

  //   }
    
  //   if (username === null) {
  //     username = user.username
  //   }
  //   if (email === null) {
  //     email = user.email
  //   }
  //   // console.log(firstname, username, email, image, user.token)

  //   const datas = {
  //     image: urlimage,
  //     token: user.token,
  //   };

  //   fetch(`${BACKEND_ADDRESS}/users/changesprofil`, {
  //     method: "PUT",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(datas),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (!data.result) {
  //         console.log(data.error)

  //       } else {
  //         dispatch(updateFirstname(firstname));
  //         dispatch(updateUsername(username));
  //         dispatch(updateEmail(email));
  //         // console.log("Hello BDD")
  //         // navigation.navigate("TabNavigator", { screen: "Map" });
        
  //       }
  //     })

  // } 

  const takePicture = async () => {
    const photo = await cameraRef.takePictureAsync({ quality: 0.3 });
    const formData = new FormData();
    setcerclecolor('#e8be4b')

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

        imagetmp = data.image
        // dispatchurlimage()
        dispatch(updateImage(data.image))
        if (data.result){
//           console.log('userimage apres la prise de photo et data result',urlimage)
//           dispatch(updateImage(urlimage));
//           console.log(user,'console log de user apres le dispatch de urlimage')
//      navigation.navigate("TabNavigator", { screen: "Map" });
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


  console.log('console.log hors de des fonction direct sur la page de USER.image',user.image)


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
      whiteBalance={cloudoMode}
    >
      <View style={styles.buttonsContainer}>
      
      <TouchableOpacity
         onPress={() => setCloudoMode(
          cloudoMode === WhiteBalance.auto ? WhiteBalance.fluorescent : WhiteBalance.auto)}>
         

        <FontAwesome5 name={nameicone} size={40} color={cloudoMode === WhiteBalance.auto ? "#ffffff" : "#e8be4b"}
        
              />
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
            size={40}
            color={flashMode === FlashMode.off ? "#ffffff" : "#e8be4b"}
          />
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
