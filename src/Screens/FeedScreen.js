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
    useWindowDimensions,
    Button
} from 'react-native';

import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { pushToNewScreen, registerLogin } from '../Navigation';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import LatestFeed from '../Components/LatestFeed';
import PopularFeed from '../Components/PopularFeed';
import MyFeed from '../Components/MyFeed';



const FeedScreen = ({ navigation }) => {
    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
        flex: 1
    };
    const layout = useWindowDimensions();
    const [index, setIndex] = useState(0);
    const [counter, setCounter] = useState(0);
    const [routes] = useState([
        { key: 'latest', title: 'Latest Feed' },
        { key: 'popular', title: 'Popular Feed' },
        { key: 'myfeed', title: 'My Feed' },
    ]);


    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button onPress={() => {
                    navigation.navigate("NewFeedScreen")
                }} title="New Feed" />
            ),

        });
    }, [navigation]);


    hnadleDetailView = (data) => {
        // pushToNewScreen(props.componentId, 'app.FeedDetailScreen', { post: data });
        navigation.navigate('FeedDetailScreen', { post: data });
    }




    _renderTabBar = (props) => {
        // console.log(props);
        return (
            <TabBar
                style={{ ...styles.tabbar, backgroundColor: isDarkMode ? Colors.darker : Colors.lighter, }}
                labelStyle={styles.label}
                tabStyle={styles.tab}
                indicatorStyle={styles.indicator}
                {...props}
            />
        );
    };

    _renderScene = ({ route }) => {
        switch (route.key) {
            case 'latest':
                return <LatestFeed counter={counter} hnadleDetailView={hnadleDetailView} isDarkMode={isDarkMode} />;
            case 'popular':
                return <PopularFeed isDarkMode={isDarkMode} />;
            case 'myfeed':
                return <MyFeed isDarkMode={isDarkMode} />;
            default:
                return null;
        }
    };

    return (
        // <View style={backgroundStyle}>

        <TabView
            navigationState={{ index, routes }}
            renderScene={_renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width, height: layout.height }}
            renderTabBar={_renderTabBar}
        />
        // </View >

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

    tabbar: {
        backgroundColor: '#3f51b5',
    },
    indicator: {
        backgroundColor: '#1577F2',
    },
    label: {
        fontWeight: '400',
        fontSize: 12,
        color: '#1577F2'
    },
    tabStyle: {
        width: 'auto',
    },

});


export default FeedScreen;


