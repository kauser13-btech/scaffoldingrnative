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
    useWindowDimensions
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
// import { Navigation } from 'react-native-navigation';
import ArticleDetail from '../Components/Article/ArticleDetail';
import { Grid } from '../Components/Images/Grid';
import { Messsaging } from '../Components/Messsaging';
const FeedDetailScreen = ({ route, navigation }) => {
    const { post } = route.params;
    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
        flex: 1
    };
    const layout = useWindowDimensions();
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'article', title: 'Detail' },
        { key: 'images', title: 'Images' },
        { key: 'messsaging', title: 'Message' },
        { key: 'myfeed1', title: 'Location' },
    ]);


    useEffect(() => {

    }, []);


    hnadleDetailView = (data) => {
        // pushToNewScreen(props.componentId, 'app.FeedDetailScreen', data);
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
                scrollEnabled
            />
        );
    };

    _renderScene = ({ route }) => {
        switch (route.key) {
            case 'article':
                return <ArticleDetail post={post} isDarkMode={isDarkMode} />;
            case 'images':
                return <Grid images={post['images']} isDarkMode={isDarkMode} />;
            case 'messsaging':
                return <Messsaging isDarkMode={isDarkMode} />;
            default:
                return null;
        }
    };

    return (

        <TabView
            navigationState={{ index, routes }}
            renderScene={_renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            renderTabBar={_renderTabBar}
        />


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

FeedDetailScreen.options = {
    topBar: {
        visible: true,
        backButton: {
            showTitle: false,
        },
        title: {
            color: {
                light: '#1577F2',
                dark: '#1577F2'
            },
            text: 'Feed Detail'
        }
    },
    bottomTabs: {
        visible: false,
    },
};

export default FeedDetailScreen;
