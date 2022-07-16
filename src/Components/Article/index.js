import React, { useEffect, useState } from 'react';
import type { Node } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    ActivityIndicator,
    Pressable
} from 'react-native';
import FastImage from 'react-native-fast-image'
import { getIcon } from '../../Utils/iconLoader';
import { ArticleImageGrid } from '../Images';

const Avatar = ({ image }) => (
    <FastImage
        style={{ width: 40, height: 40, borderRadius: 50 }}
        source={{
            uri: image,
            // headers: { Authorization: 'someAuthToken' },
            priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.contain}
    />
)

const Article = ({ isDarkMode, post, hnadleDetailView }) => {



    return (
        <View style={{ flex: 1 }}>
            <View style={styles.profile_wrapper}>
                <Pressable onPress={() => {
                    hnadleDetailView(post);
                }} style={{ flexDirection: 'row', paddingLeft: 10, paddingRight: 10 }}>
                    <Avatar image={post['user']['thumb']} />
                    <View style={{ paddingLeft: 10, paddingTop: 5 }}>
                        <Text style={{ color: isDarkMode ? '#E1E4E8' : '#010101', fontWeight: '600', fontSize: 14 }}>
                            {post['user']['name']}
                        </Text>
                        <Text style={{ color: '#8A8B8D', fontSize: 10 }}>
                            10 min
                        </Text>
                    </View>
                </Pressable>
                <Pressable style={{ padding: 5 }}>
                    {getIcon('trash', 15, '#616568')}
                </Pressable>
            </View>
            <Pressable onPress={() => {
                hnadleDetailView(post);
            }}>
                <Text style={{ ...styles.paragraph, color: isDarkMode ? '#E1E4E8' : '#606060' }}>
                    {
                        post['title']
                    }
                </Text>

            </Pressable>


            <ArticleImageGrid images={post['images']} />
        </View>


    );
};


const styles = StyleSheet.create({
    profile_wrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    paragraph: {
        // color: '#000',
        fontSize: 16,
        lineHeight: 24,
        marginVertical: 8,
        marginHorizontal: 16,
    },
});



export default Article;