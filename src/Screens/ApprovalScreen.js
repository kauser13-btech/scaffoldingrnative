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
import { fetchApproval } from '../actions/approval';
import { useDispatch, useSelector } from 'react-redux';
import ApprovalFeed from '../Components/ApprovalFeed';


const ApprovalScreen = ({ navigation }) => {
    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
        flex: 1
    };
    const layout = useWindowDimensions();
    const [index, setIndex] = useState(0);
    const [counter, setCounter] = useState(0);
    const [routes] = useState([
        { key: 'pending', title: 'Waiting on approval' },
        { key: 'approved', title: 'Approved' },
        { key: 'rejected', title: 'Not Approved' },
    ]);

    const dispatch = useDispatch();
    const approvals = useSelector((state) => state['approvals'] && state['approvals']);


    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button onPress={() => {
                    navigation.navigate("NewFeedScreen")
                }} title="New Feed" />
            ),

        });
    }, [navigation]);



    useEffect(() => {
        (async () => {
            for (let i = 1; i < 4; i++)
                try {
                    await dispatch(fetchApproval(i));
                } catch (e) { }

        })();
    }, []);




    // console.log('av', approvals[1]);


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
            case 'pending':
                return <ApprovalFeed navigation={navigation} isDarkMode={isDarkMode} posts={approvals[1] ? approvals[1] : []} />;
            case 'approved':
                return <ApprovalFeed navigation={navigation} isDarkMode={isDarkMode} posts={approvals[2] ? approvals[2] : []} />;
            case 'rejected':
                return <ApprovalFeed navigation={navigation} isDarkMode={isDarkMode} posts={approvals[3] ? approvals[3] : []} />;
            default:
                return null;
        }
    };

    return (
        <SafeAreaView style={backgroundStyle}>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
            <TabView
                navigationState={{ index, routes }}
                renderScene={_renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width, height: layout.height }}
                renderTabBar={_renderTabBar}
            />
        </SafeAreaView >

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

// ApprovalScreen.options = {
//     topBar: {
//         visible: true,
//         rightButtons: [
//             {
//                 id: 'newAppraisal',
//                 //   icon: iconsMap.plus,
//                 enabled: true,
//                 disableIconTint: false,
//                 // color: 'white',
//                 disabledColor: 'black',
//                 testID: 'newAppraisalClickTest',
//                 text: 'Post'
//             },
//         ],
//     },
// };

export default ApprovalScreen;


