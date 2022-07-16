/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';



const MyFeed = ({ isDarkMode }) => {

    return (
        <View style={styles.container}>
            <Text style={{ color: isDarkMode ? Colors.white : Colors.black, }}>MyFeed</Text>
        </View>


    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 2,
        borderColor: 'red'
    },

});



export default MyFeed;
