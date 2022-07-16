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

const ArticleDetail = ({ isDarkMode, post, hnadleDetailView }) => {



    return (
        <ScrollView
            style={{ ...styles.container, backgroundColor: isDarkMode ? Colors.darker : Colors.lighter }}
            contentContainerStyle={styles.content}
        >

            <Text style={{ ...styles.title, color: isDarkMode ? Colors.light : Colors.dark }}>Lorem Ipsum</Text>
            <Text style={{ ...styles.paragraph, color: isDarkMode ? Colors.light : Colors.dark }}>
                Contrary
                to popular belief, Lorem Ipsum is not simply random text. It
                has roots in a piece of classical Latin literature from 45 BC, making
                it over 2000 years old.
            </Text>

            <Text style={{ ...styles.paragraph, color: isDarkMode ? Colors.light : Colors.dark }}>
                Richard McClintock, a Latin professor at Hampden-Sydney College in
                Virginia, looked up one of the more obscure Latin words, consectetur,
                from a Lorem Ipsum passage, and going through the cites of the word in
                classical literature, discovered the undoubtable source.
            </Text>
            <Text style={{ ...styles.paragraph, color: isDarkMode ? Colors.light : Colors.dark }}>
                Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of &quot;de
                Finibus Bonorum et Malorum&quot; (The Extremes of Good and Evil) by
                Cicero, written in 45 BC. This book is a treatise on the theory of
                ethics, very popular during the Renaissance. The first line of Lorem
                Ipsum, &quot;Lorem ipsum dolor sit amet..&quot;, comes from a line in
                section 1.10.32.
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