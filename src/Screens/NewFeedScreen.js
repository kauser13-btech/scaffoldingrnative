/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
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
    Pressable,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard, Image
} from 'react-native';

import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { CustomTextInput, CustopmDropdown } from '../Components/Input';
import { CommonButton, RectButton } from '../Components';
import { makePost, syncPostJobCreator, InitiateToQueue } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import { posts_mock } from '../queue/mockData';
// import { getQueueInstance } from '../queue/queueInstance';

const NewFeedScreen = ({ navigation }) => {

    const [inputData, setInputData] = useState({
        title: '',
        description: '',
        location: ''
    });
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
        flex: 1
    };
    const dispatch = useDispatch();
    const savePost = async () => {
        try {
            setLoading(true);
            const response = await dispatch(makePost({ title: inputData['title'], description: inputData['description'] }));
            if (response.type === 'MAKE_POST_SUCCESS') {
                for (let i in images) {
                    dispatch(InitiateToQueue({ ...images[i], post_id: response.payload.data.data.id }));
                }
            }

            setLoading(false);
            navigation.goBack();
        } catch (e) {
            console.log(e);
            setLoading(false);
        }
    }
    const updateImages = (image) => {
        setImages([...images, image]);
    }
    const navigateToCamera = () => {
        navigation.navigate("CameraScreen", {
            updateImages: updateImages
        });
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView style={styles.container}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <>
                        <View>
                            <CustomTextInput onChangeInput={(title) => {
                                setInputData({ ...inputData, title: title });
                            }} title={`Project Title`} value={inputData['title']} isDarkMode={isDarkMode} />


                            <CustomTextInput onChangeInput={(description) => {
                                setInputData({ ...inputData, description: description });
                            }} title={`Project Desscription`} value={inputData['description']} isDarkMode={isDarkMode} />

                            <View>
                                <CustopmDropdown onChangeInput={(location) => {
                                    setInputData({ ...inputData, location: location });
                                }} data={[{ id: 1, title: 'Dhaka' }, { id: 2, title: "Rajshahi" }]} title={`Select  Location`} value={inputData['description']} isDarkMode={isDarkMode} />
                            </View>
                            <View style={{ flexWrap: 'wrap', padding: 10, flexDirection: 'row' }}>
                                {
                                    images.map((image) => {
                                        return (<View style={{ padding: 5 }} key={image.id}>
                                            <Image
                                                style={{ width: 100, height: 100 }}
                                                source={{
                                                    uri: image['url']
                                                }}
                                            />
                                        </View>);
                                    })
                                }
                            </View>
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <RectButton pressFunction={navigateToCamera} title={`Attach Image`} />
                            </View>
                        </View>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <CommonButton loading={loading} pressFunction={savePost} title={`Save`} />
                        </View>
                    </>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>


    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between'
    },

});

NewFeedScreen.options = {
    topBar: {
        visible: true,
        backButton: {
            showTitle: false,
        }
    },
    bottomTabs: {
        visible: false,
    },
};

export default NewFeedScreen;
