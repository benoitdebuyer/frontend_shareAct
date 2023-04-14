import React from "react";
import { useState } from 'react';
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    UserState,
    Modal,
    ScrollView
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { updateFirstname, updateToken, updateUsername, updateEmail, updateImage, updateAge, updateGender, updateDatebirth } from '../reducers/user';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import DatePicker from '@react-native-community/datetimepicker';




export default function Racecardtest() {
    const photosData = "https://static.lacapsule.academy/faceup/picture1.jpg";

    return (
        <ScrollView style={styles.scrollView}>
        <View style={styles.container}>


            <Text style={styles.title}>Participants : </Text>

            <View style={styles.containerParticipants}>
                <View style={styles.participant}>
                    <Image style={styles.photo} source={require('../assets/Shareact2.png')} />
                    <Text style={styles.pseudo}>@pseudo</Text>
                </View>

                <View style={styles.participant}>
                    <Image style={styles.photo} source={require('../assets/Shareact2.png')} />
                    <Text style={styles.pseudo}>@pseudo</Text>
                </View>

                <View style={styles.participant}>
                    <Image style={styles.photo} source={require('../assets/Shareact2.png')} />
                    <Text style={styles.pseudo}>@pseudo</Text>
                </View>
                <View style={styles.participant}>
                    <Image style={styles.photo} source={require('../assets/Shareact2.png')} />
                    <Text style={styles.pseudo}>@pseudo</Text>
                </View>
                <View style={styles.participant}>
                    <Image style={styles.photo} source={require('../assets/Shareact2.png')} />
                    <Text style={styles.pseudo}>@pseudo</Text>
                </View>
                <View style={styles.participant}>
                    <Image style={styles.photo} source={require('../assets/Shareact2.png')} />
                    <Text style={styles.pseudo}>@pseudo</Text>
                </View>


            </View>

        </View>
         </ScrollView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',
        marginTop: 60,
    },
    title: {
        width: '80%',
        fontSize: 36,
        fontWeight: '600',
        color: '#474CCC',
    },
    containerParticipants: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: 20,
    },
    participant: {
        margin: 10,
    },
    photo: {
        width: 100,
        height: 100,
        borderRadius: 100,
        borderColor: '#474CCC',
        borderWidth: 4,
    },
    pseudo: {
        paddingVertical: 10,
        textAlign: 'center',
    }

});
