/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useRef, useState } from 'react';
import type { Node } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    ActivityIndicator,
    Pressable
} from 'react-native';

import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { useOrientation } from '../hooks/useOrientation';
import { registerLogin, registerTab } from '../Navigation';
import { fetchProfile } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import { RNCamera } from 'react-native-camera';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { generateImagePathForPost, saveImage } from '../Utils/fs';

const CameraScreen = ({ route, navigation }) => {
    const isDarkMode = useColorScheme() === 'dark';

    const [flash, setFlash] = useState('off');
    const [type, setType] = useState('back');
    const [images, setImages] = useState([]);
    const cameraRef = useRef(null)

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
        flex: 1
    };
    const { updateImages } = route.params;
    const orientation = useOrientation();

    takePicture = async () => {
        const randstring = (Math.random() + 1).toString(36).substring(7);
        // const id = uniqueId('image_') + uuid();
        if (cameraRef) {
            const options = { quality: 0.5, base64: true };
            const data = await cameraRef.current.takePictureAsync(options);
            const path = generateImagePathForPost(randstring);
            saveImage(path, data).then(() => {
                // console.log(path);
                setImages([...images, {
                    id: randstring,
                    url: `file://${path}`,
                    thumb: `file://${path}`,
                }]);
                updateImages({
                    id: randstring,
                    url: `file://${path}`,
                    thumb: `file://${path}`,
                });
                navigation.goBack();
            });
        }
    };
    // console.log(images);
    return (
        <SafeAreaView style={backgroundStyle}>
            <RNCamera
                ref={cameraRef}
                style={{ ...styles.container, flexDirection: orientation === 'PORTRAIT' ? 'column' : 'row', justifyContent: 'flex-end' }}
                type={RNCamera.Constants.Type.back}
                flashMode={flash}
                captureAudio={false}>
                <View style={{ flexDirection: orientation === 'PORTRAIT' ? 'row' : 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <Pressable onPress={takePicture} style={styles.btn}>
                        <MaterialIcons name="camera-alt" color={'#fff'} size={25} />
                    </Pressable>

                    <Pressable style={styles.btn}>
                        <MaterialIcons name="done-outline" color={'#fff'} size={25} />
                    </Pressable>
                </View>
            </RNCamera>
        </SafeAreaView >

    );
};






export default CameraScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    btn: {
        width: 50,
        height: 50,
        borderRadius: 50,
        borderWidth: 5,
        borderColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10
    }
});