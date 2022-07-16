import React, { useEffect, useState } from 'react';
import type { Node } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    ActivityIndicator,
    Pressable,
    Dimensions
} from 'react-native';
import FastImage from 'react-native-fast-image'


const layout_width = Dimensions.get('window').width;


export const ArticleImageGrid = ({ images }) => {
    const max = 5
    const total = images.length < max ? images.length : max;


    if (total == 1) {
        return <View style={{ paddingBottom: 10 }}>
            <FastImage
                style={{ width: layout_width, height: layout_width / 2 }}
                source={{
                    uri: images[0]['thumb'],
                    // headers: { Authorization: 'someAuthToken' },
                    priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.cover}
            />
        </View>
    } else if (total == 2) {
        return (
            <View style={{ flexDirection: 'row', paddingBottom: 10 }}>
                <FastImage
                    style={{ width: layout_width / 2, height: layout_width / 3 }}
                    source={{
                        uri: images[0]['thumb'],
                        // headers: { Authorization: 'someAuthToken' },
                        priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                />

                <FastImage
                    style={{ width: layout_width / 2, height: layout_width / 3 }}
                    source={{
                        uri: images[1]['thumb'],
                        // headers: { Authorization: 'someAuthToken' },
                        priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                />

            </View>
        );
    } else if (total > 2) {
        return (
            <View style={{ flexDirection: 'column', paddingBottom: 10 }}>
                <FastImage
                    style={{ width: layout_width, height: layout_width / 2 }}
                    source={{
                        uri: images[0]['thumb'],
                        // headers: { Authorization: 'someAuthToken' },
                        priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                />

                <View style={{ flexDirection: 'row' }}>
                    {
                        images.filter((image, key) => {
                            return key > 0 && key < max;
                        }).map((image, key) => {
                            return <FastImage
                                key={key}
                                style={{ flex: 1 / (total - 1), height: layout_width / 3 }}
                                source={{
                                    uri: images[key]['thumb'],
                                    // headers: { Authorization: 'someAuthToken' },
                                    priority: FastImage.priority.normal,
                                }}
                                resizeMode={FastImage.resizeMode.cover}
                            />
                        })
                    }

                </View>

            </View>
        );
    }
    else return null;

}