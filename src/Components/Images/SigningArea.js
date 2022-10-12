import * as React from 'react';
import { Image, Dimensions, ScrollView, StyleSheet, View, TouchableOpacity, Text, Alert } from 'react-native';
import FastImage from 'react-native-fast-image';
import RNSketchCanvas from '@terrylinla/react-native-sketch-canvas';
import { SketchCanvas } from '@terrylinla/react-native-sketch-canvas';
import { useRef, useState, useEffect } from 'react';
import RNFetchBlob from 'rn-fetch-blob';
import { generateImagePathForPost, saveImage } from '../../Utils/fs';
// import Sample from '../../images/sample.png';
export const SigningArea = ({ image, setSenable }) => {
    const canvas = useRef();
    const [path, setPath] = useState('/private/var/mobile/Containers/Data/Application/6823EB0C-7F3B-4749-A3E9-A39C02076065/tmp/RNSketchCanvas/43343538.png');
    const [color, setColor] = useState('#000');
    const [thickness, setThickness] = useState(3);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const path_ = generateImagePathForPost(image['id']);
        console.log('sss', path_);
        RNFetchBlob.config({
            fileCache: true,
            appendExt: 'png',
        })
            .fetch('GET', image['url'])
            .then(resp => {
                //imagePath = resp.path();
                return resp.readFile("base64");

            }).then(base64Data => {
                // console.log('ss');
                // console.log(base64Data);
                saveImage(path_, base64Data).then(() => {
                    // setPath(path_);
                }).catch((error) => {
                    // this.setState({ takingPicture: false });
                    console.log(error)
                });
                //  
            })
            .catch(error => console.log(error));
    }, []);
    console.log('path', path);
    return (
        <View style={{ flex: 1, flexDirection: 'row' }}>
            <RNSketchCanvas
                localSourceImage={{ filename: path, directory: SketchCanvas.MAIN_BUNDLE, mode: 'AspectFit' }}
                // localSourceImage={{ filename: 'bulb.png', directory: RNSketchCanvas.MAIN_BUNDLE }}
                containerStyle={{ backgroundColor: 'transparent', flex: 1 }}
                canvasStyle={{ backgroundColor: 'transparent', flex: 1 }}
                onStrokeEnd={data => {
                }}
                closeComponent={<View style={styles.functionButton}><Text style={{ color: 'white' }}>Close</Text></View>}
                onClosePressed={() => {

                }}
                undoComponent={<View style={styles.functionButton}><Text style={{ color: 'white' }}>Undo</Text></View>}
                onUndoPressed={(id) => {
                    // Alert.alert('do something')
                }}
                clearComponent={<View style={styles.functionButton}><Text style={{ color: 'white' }}>Clear</Text></View>}
                onClearPressed={() => {
                    // Alert.alert('do something')
                }}
                eraseComponent={<View style={styles.functionButton}><Text style={{ color: 'white' }}>Eraser</Text></View>}
                strokeComponent={color => (
                    <View style={[{ backgroundColor: color }, styles.strokeColorButton]} />
                )}
                strokeSelectedComponent={(color, index, changed) => {
                    return (
                        <View style={[{ backgroundColor: color, borderWidth: 2 }, styles.strokeColorButton]} />
                    )
                }}
                strokeWidthComponent={(w) => {
                    return (<View style={styles.strokeWidthButton}>
                        <View style={{
                            backgroundColor: 'white', marginHorizontal: 2.5,
                            width: Math.sqrt(w / 3) * 10, height: Math.sqrt(w / 3) * 10, borderRadius: Math.sqrt(w / 3) * 10 / 2
                        }} />
                    </View>
                    )
                }}
                defaultStrokeIndex={0}
                defaultStrokeWidth={5}
                saveComponent={<View style={styles.functionButton}><Text style={{ color: 'white' }}>Save</Text></View>}
                savePreference={() => {
                    return {
                        folder: 'RNSketchCanvas',
                        filename: String(Math.ceil(Math.random() * 100000000)),
                        transparent: false,
                        includeImage: false,
                        cropToImageSize: false,
                        imageType: 'png'
                    }
                }}
                onSketchSaved={(success, path) => {
                    Alert.alert(success ? 'Image saved!' : 'Failed to save image!', path)
                    console.log(path);
                    // setPath(path);
                }}
                onPathsChange={(pathsCount) => {
                    console.log('pathsCount', pathsCount)
                }}
            />
        </View>


        // <View style={{ flex: 1, flexDirection: 'row' }}>
        //     <View style={{ flex: 1, flexDirection: 'column' }}>
        //         <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

        //             <View style={{ flexDirection: 'row' }}>
        //                 <TouchableOpacity style={styles.functionButton} onPress={() => {

        //                     setThickness(10);
        //                 }}>
        //                     <Text style={{ color: 'white' }}>Thick</Text>
        //                 </TouchableOpacity>
        //                 <TouchableOpacity style={styles.functionButton} onPress={() => {
        //                     setThickness(5);
        //                 }}>
        //                     <Text style={{ color: 'white' }}>Thin</Text>
        //                 </TouchableOpacity>
        //             </View>
        //         </View>
        //         <SketchCanvas
        //             localSourceImage={{ filename: path, directory: SketchCanvas.MAIN_BUNDLE, mode: 'AspectFit' }}
        //             // localSourceImage={{ filename: 'bulb.png', directory: RNSketchCanvas.MAIN_BUNDLE }}
        //             ref={canvas}
        //             style={{ flex: 1 }}
        //             strokeColor={color}
        //             strokeWidth={thickness}
        //             onStrokeStart={(x, y) => {
        //                 console.log('x: ', x, ', y: ', y)
        //                 setMessage('Start');
        //                 setSenable(false);
        //             }}
        //             onStrokeChanged={(x, y) => {
        //                 console.log('x: ', x, ', y: ', y)
        //                 setMessage('Changed');
        //             }}
        //             onStrokeEnd={() => {
        //                 setMessage('End');
        //                 setSenable(true);
        //             }}
        //             onPathsChange={(pathsCount) => {
        //                 console.log('pathsCount', pathsCount)
        //             }}
        //             onSketchSaved={(result, path) => console.log(result, path)}
        //             saveComponent={<View style={styles.functionButton}><Text style={{ color: '#fff' }}>Save</Text></View>}
        //             savePreference={() => {
        //                 return {
        //                     folder: 'RNSketchCanvas',
        //                     filename: String(Math.ceil(Math.random() * 100000000)),
        //                     transparent: true,
        //                     imageType: 'jpg'
        //                 }
        //             }}
        //         />
        //         <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        //             <View style={{ flexDirection: 'row' }}>
        //                 <TouchableOpacity style={[styles.functionButton, { backgroundColor: 'red' }]} onPress={() => {

        //                     setColor('#FF0000');
        //                 }}>
        //                     <Text style={{ color: 'white' }}>Red</Text>
        //                 </TouchableOpacity>
        //                 <TouchableOpacity style={[styles.functionButton, { backgroundColor: 'black' }]} onPress={() => {

        //                     setColor('#000000');
        //                 }}>
        //                     <Text style={{ color: 'white' }}>Black</Text>
        //                 </TouchableOpacity>
        //             </View>
        //             <Text style={{ marginRight: 8, fontSize: 20 }}>{message}</Text>
        //             <TouchableOpacity style={[styles.functionButton, { backgroundColor: 'black', width: 90 }]} onPress={() => {

        //                 console.log(canvas);
        //                 // save(imageType, transparent, folder, filename, includeImage, cropToImageSize)
        //                 canvas.save('png', false, 'RNSketchCanvas', String(Math.ceil(Math.random() * 100000000)), true, true)
        //                 // Alert.alert(JSON.stringify(canvas.getPaths()))
        //                 // canvas.current.getBase64('png', false, true, true, (err, result) => {
        //                 //     console.log(result)
        //                 // })
        //             }}>
        //                 <Text style={{ color: 'white' }}>Get Paths</Text>
        //             </TouchableOpacity>
        //         </View>
        //     </View>
        // </View>


    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    strokeColorButton: {
        marginHorizontal: 2.5,
        marginVertical: 8,
        width: 30,
        height: 30,
        borderRadius: 15,
    },
    strokeWidthButton: {
        marginHorizontal: 2.5,
        marginVertical: 8,
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#39579A'
    },
    functionButton: {
        marginHorizontal: 2.5,
        marginVertical: 8,
        height: 30,
        width: 60,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    cameraContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
        alignSelf: 'stretch'
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20
    },
    page: {
        flex: 1,
        height: 300,
        elevation: 2,
        marginVertical: 8,
        backgroundColor: 'white',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.75,
        shadowRadius: 2
    }
});