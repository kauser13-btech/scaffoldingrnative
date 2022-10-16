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
import { useDispatch, useSelector } from 'react-redux';
import ArticleDetail from '../Components/Article/ArticleDetail';
import { Grid } from '../Components/Images/Grid';
import { Messsaging } from '../Components/Messsaging';
import { appendAsset, EditAsset, changeApprovalStatus } from '../actions/approval';
import { getPost } from '../Utils/util';


const ApprovalDetailScreen = ({ route, navigation }) => {
    const dispatch = useDispatch();
    const { post_id, status } = route.params;
    const approvals = useSelector((state) => state['approvals'] && state['approvals']);
    const post = getPost(approvals, post_id);

    const [images, setImages] = useState([]);
    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
        flex: 1
    };
    const layout = useWindowDimensions();
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'article', title: 'Detail' },
        { key: 'signing_doc', title: 'Signing Doument' },
        { key: 'supporting_doc', title: 'Supporting Doument' },
        { key: 'messsaging', title: 'Message' },

    ]);



    const loadImages = (image) => {
        console.log(image);
        dispatch(EditAsset(image, post['id'], post['status']));
    }

    const changeApprovalState = async (status) => {
        await dispatch(changeApprovalStatus({ id: post['id'], status }, post['status']));
    }


    useEffect(() => {

    }, []);




    // console.log(images);

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
            case 'signing_doc':
                return <Grid post={post} changeApprovalState={changeApprovalState} loadImages={loadImages} navigation={navigation} images={post['assets'].filter(image => {
                    return true;
                    return image['status'] === 1
                })} isDarkMode={isDarkMode} />;

            case 'supporting_doc':
                return <Grid post={post} changeApprovalState={changeApprovalState} loadImages={loadImages} navigation={navigation} images={post['assets'].filter(image => {
                    return image['status'] === 2
                })} isDarkMode={isDarkMode} />;
            case 'messsaging':
                return <Messsaging isDarkMode={isDarkMode} />;
            default:
                return null;
        }
    };
    // console.log(post['assets']);
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TabView
                navigationState={{ index, routes }}
                renderScene={_renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
                renderTabBar={_renderTabBar}
            // swipeEnabled={false}
            />
        </SafeAreaView>



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

ApprovalDetailScreen.options = {
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

export default ApprovalDetailScreen;
