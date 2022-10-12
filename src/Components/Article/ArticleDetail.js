import React, { useEffect, useState } from 'react';
import type { Node } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    ActivityIndicator,
    Pressable,
    ScrollView
} from 'react-native';

import {
    Colors
} from 'react-native/Libraries/NewAppScreen';

const ArticleDetail = ({ isDarkMode, post }) => {



    return (
        <ScrollView
            style={{ ...styles.container, backgroundColor: isDarkMode ? Colors.darker : Colors.lighter }}
            contentContainerStyle={styles.content}
        >

            <Text style={{ ...styles.title, color: isDarkMode ? Colors.light : Colors.dark }}> {post['title']}</Text>
            <Text style={{ ...styles.paragraph, color: isDarkMode ? Colors.light : Colors.dark }}>
                {post['description']}
            </Text>


        </ScrollView>


    );
};


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1
    },
    content: {
        paddingVertical: 16,
    },
    author: {
        flexDirection: 'row',
        marginVertical: 8,
        marginHorizontal: 16,
    },
    meta: {
        marginHorizontal: 8,
        justifyContent: 'center',
    },
    name: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 16,
        lineHeight: 24,
    },
    timestamp: {
        color: '#999',
        fontSize: 14,
        lineHeight: 21,
    },
    avatar: {
        height: 48,
        width: 48,
        borderRadius: 24,
    },
    title: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 36,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    paragraph: {
        // color: '#000',
        fontSize: 16,
        lineHeight: 24,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        marginVertical: 8,
    },
});

export default ArticleDetail;