import React, { useRef, useState, useEffect } from 'react';
import { View, Button, Text, Pressable, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import RNFetchBlob from 'rn-fetch-blob';
import { getHtml } from '../scripts/html';
import { Dimensions } from 'react-native';
import { generateImagePathForPost, readImageDataFromUrl, saveImage, get, getImageSize, isValidUrl } from '../Utils/fs';
import WebviewComponent from '../Components/Article/WebviewComponent';
const windowWidth = Dimensions.get('window').width - 20;
const windowHeight = Dimensions.get('window').height - 20;
import { useDispatch, useSelector } from 'react-redux';
import { getPost } from '../Utils/util';
import { InitiateToQueue } from '../actions';

// export default memo(WebViewComponent);


const WebViewScreen = ({ route, navigation }) => {
    const dispatch = useDispatch();
    // const [dimensions, setDimensions] = useState({ window, screen });
    const { loadImages, index, changeApprovalState, post_id } = route.params;
    const approvals = useSelector((state) => state['approvals'] && state['approvals']);
    const post = getPost(approvals, post_id);
    const images = post && post['assets'];
    const [uri, setUri] = useState(null);
    const [tmp_index, setTmpIndex] = useState(0);
    const [image, setImage] = useState(null);
    const webView = useRef();
    // const new_width = image['width'] > image['height'] ? (image['width'] / image['height']) * windowHeight : windowWidth;
    // const new_height = image['height'] > image['width'] ? (image['height'] / image['width']) * windowWidth : windowHeight;



    const [new_width, setNewWidth] = useState(null);
    const [new_height, setNewHeight] = useState(null);
    const sendDataToWebView = () => {
        webView.current.postMessage('Data from React Native App');
    }
    const handleWebViewMessage = (event) => {

        const randstring = (Math.random() + 1).toString(36).substring(7);
        const { data } = event.nativeEvent;
        const path = generateImagePathForPost(randstring);
        const parts = data.split(",");
        let wh;
        saveImage(path, parts[1]).then(async () => {
            wh = await getImageSize(`file://${path}`);
            loadImages({ ...image, url: `file://${path}`, width: wh['width'], height: wh['height'], sync: true });
            // navigation.goBack();
        });


    };


    const changeApprovalStatus = async (images, status) => {
        // console.log(images);
        await changeApprovalState(status);
        for (let i in images) {
            if (images[i]['sync'])
                await dispatch(InitiateToQueue({ ...images[i], approvals_type: post['status'] }));
        }
        navigation.popToTop();
    }

    const nextImage = async (tmp_index) => {
        const images_length = images.length;
        if (tmp_index < (images_length - 1)) {
            await setImage(images[tmp_index + 1]);
            await setTmpIndex(tmp_index + 1);
        }

    }


    const prevImage = async (tmp_index) => {
        // console.log(tmp_index);
        const images_length = images.length;
        if (tmp_index > 0) {
            await setImage(images[tmp_index - 1]);
            await setTmpIndex(tmp_index - 1);
        }

    }


    useEffect(() => {
        setImage(images[index]);
        setTmpIndex(index);
    }, []);


    useEffect(() => {
        (async () => {
            try {

                const fs = RNFetchBlob.fs;
                let imagePath = null;
                if (isValidUrl(image['url'])) {

                    RNFetchBlob.config({
                        fileCache: true
                    })
                        .fetch("GET", image['url'])
                        // the image is now dowloaded to device's storage
                        .then(resp => {
                            // the image path you can use it directly with Image component
                            imagePath = resp.path();
                            return resp.readFile("base64");
                        })
                        .then(base64Data => {
                            // here's base64 encoded image
                            // console.log(base64Data);
                            setUri(`data:image/png;base64,${base64Data}`);
                            // remove the file from storage
                            return fs.unlink(imagePath);
                        });

                } else {
                    const tpath = await readImageDataFromUrl(image['url']);
                    setUri(`data:image/png;base64,${tpath}`);
                }
                setNewWidth(image['width'] > image['height'] ? (image['width'] / image['height']) * windowHeight : windowWidth);
                setNewHeight(image['height'] > image['width'] ? (image['height'] / image['width']) * windowWidth : windowHeight);
            }
            catch (e) {
                console.log(e);
            }

        })();

    }, [image]);



    if (uri && image)
        return (

            <View style={{ flex: 1, flexDirection: 'column' }}>
                <View style={{ flex: 19 / 20, height: '90%' }}>
                    <WebviewComponent uri={uri} new_width={new_width} new_height={new_height} webView={webView} handleWebViewMessage={handleWebViewMessage} />
                </View>
                <View style={{ flex: 1 / 20, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>

                    <View style={{ padding: 5 }}>
                        <Text>Page {tmp_index + 1}/{images.length}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', width: 300, justifyContent: 'space-between' }}>
                        {
                            tmp_index > 0 && <Pressable onPress={async () => {
                                await sendDataToWebView();
                                await prevImage(tmp_index);
                            }} style={{ width: 90, height: 30, backgroundColor: '#0EB0F4', alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ color: '#fff' }}>Previous</Text>
                            </Pressable>
                        }

                        {
                            tmp_index < (images.length - 1) && <Pressable onPress={async () => {
                                await sendDataToWebView();
                                await nextImage(tmp_index);
                            }} style={{ width: 90, height: 30, backgroundColor: '#0EB0F4', alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ color: '#fff' }}>Next</Text>
                            </Pressable>
                        }


                        {
                            tmp_index === (images.length - 1) && <>
                                <Pressable onPress={async () => {
                                    await sendDataToWebView();
                                    await changeApprovalStatus(images, 2)

                                }} style={{ width: 90, height: 30, backgroundColor: 'green', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ color: '#fff' }}>Accept</Text>
                                </Pressable>

                                <Pressable onPress={async () => {
                                    await sendDataToWebView();
                                    await changeApprovalStatus(images, 3)
                                }} style={{ width: 90, height: 30, backgroundColor: 'red', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ color: '#fff' }}>Reject</Text>
                                </Pressable>
                            </>
                        }
                    </View>

                </View>
            </View >



        );
    else {
        return (<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size="large" color="#00ff00" />
        </View>);
    }
};

// WebViewScreen.options = {
//     bottomTabs: {
//         visible: false,
//     },
//     topBar: {

//         backButton: {
//             showTitle: false,
//         }
//     },

// };

export default WebViewScreen;

