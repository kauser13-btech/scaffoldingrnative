import React, { useRef, useState, useEffect } from 'react';
import { View, Button } from 'react-native';
import { WebView } from 'react-native-webview';
import RNFetchBlob from 'rn-fetch-blob';
import { getHtml } from '../scripts/html';
import { Dimensions } from 'react-native';
import { generateImagePathForPost, readImageDataFromUrl, saveImage, get, getImageSize } from '../Utils/fs';
const windowWidth = Dimensions.get('window').width - 50;
const windowHeight = Dimensions.get('window').height - 50;
const WebViewScreen = ({ route, navigation }) => {
    // const [dimensions, setDimensions] = useState({ window, screen });
    const { image, loadImages } = route.params;

    const webView = useRef();
    const new_width = image['width'] > image['height'] ? (image['width'] / image['height']) * windowHeight : windowWidth;
    const new_height = image['height'] > image['width'] ? (image['height'] / image['width']) * windowWidth : windowHeight;

    const sendDataToWebView = () => {
        webView.current.postMessage('Data from React Native App');
    }
    const handleWebViewMessage = (event) => {

        const randstring = (Math.random() + 1).toString(36).substring(7);
        const { data } = event.nativeEvent;
        const path = generateImagePathForPost(randstring);
        // console.log(data);
        const parts = data.split(",");
        let wh;
        saveImage(path, parts[1]).then(async () => {
            wh = await getImageSize(`file://${path}`);
            loadImages({ ...image, url: `file://${path}`, id: randstring, width: wh['width'], height: wh['height'] });
            // console.log();
            navigation.goBack();
        });


    };


    useEffect(() => {
        sendDataToWebView();
    }, []);
    return (

        <View style={{ flex: 1, flexDirection: 'column' }}>
            <View style={{ flex: 1, height: '50%' }}>
                <WebView
                    ref={webView}
                    // style={styles.webview}
                    originWhitelist={['*']}
                    javaScriptEnabled
                    onMessage={handleWebViewMessage}
                    source={{ html: getHtml(image['url'], new_width, new_height) }}
                />
            </View>
            <View style={{ height: 20 }}>
                <Button
                    onPress={() => { }}
                    title="Learn More"
                    color="#841584"
                    accessibilityLabel="Learn more about this purple button"
                />
            </View>
        </View >



    );
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

