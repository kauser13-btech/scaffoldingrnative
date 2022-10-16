import * as React from 'react';
import { Image, Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';

const layout_width = Dimensions.get('window').width - 0;
const layout_height = Dimensions.get('window').height - 0;
import {
    Colors
} from 'react-native/Libraries/NewAppScreen';
import { useRef, useState, useEffect } from 'react';
import { Pressable } from 'react-native';
// import RNFetchBlob from 'rn-fetch-blob';
// import { SigningArea } from './SigningArea';
// import Demo from '../Article/Demo';
// import RNSketchCanvas from '@terrylinla/react-native-sketch-canvas';
// import { SketchCanvas } from '@terrylinla/react-native-sketch-canvas';

export const Grid = ({ images, isDarkMode, navigation, loadImages, changeApprovalState, post }) => {

    const [senable, setSenable] = useState(true);
    return (
        <ScrollView
            style={{ ...styles.container, backgroundColor: isDarkMode ? Colors.darker : Colors.lighter }}
            contentContainerStyle={styles.content}
            scrollEnabled={senable}
        >
            {/* <Demo /> */}
            {images.map((image, i) => (
                // <View style={{ width: layout_width, height: layout_width * (image['height'] / image['width']) }}>
                //     <SigningArea setSenable={setSenable} image={image} key={i} />
                // </View>
                <Pressable key={image['id']} style={{ padding: 20 }} onPress={() => {
                    navigation.navigate('SignView', { image, loadImages, images, index: i, changeApprovalState, post_id: post['id'] });
                }}>
                    <FastImage
                        key={i}
                        style={{ width: layout_width, height: layout_width * (image['height'] / image['width']) }}
                        source={{
                            uri: image['url'],
                            // headers: { Authorization: 'someAuthToken' },
                            priority: FastImage.priority.normal,
                        }}
                        resizeMode={FastImage.resizeMode.cover}
                    />
                </Pressable>
            ))}
        </ScrollView>

    );
};



const styles = StyleSheet.create({
    container: {
        // flex: 1
        // backgroundColor: '#343C46',
    },
    content: {
        // flexDirection: 'row',
        // flexWrap: 'wrap',
    },
    // cover: {
    //     width: '50%',
    //     height: Dimensions.get('window').width / 2,
    // },
});