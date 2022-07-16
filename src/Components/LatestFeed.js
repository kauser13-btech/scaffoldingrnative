/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState, memo, useCallback } from 'react';
import type { Node } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    ActivityIndicator
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
    Colors,

} from 'react-native/Libraries/NewAppScreen';
import { registerLogin } from '../Navigation';
import { fetchPosts } from '../actions';
import Article from './Article';


const LatestFeed = ({ isDarkMode, hnadleDetailView, counter }) => {


    const [refreshing, setRefresh] = useState(false);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 10,
                    width: "100%",
                    backgroundColor: isDarkMode ? '#181919' : "#CED0CE",
                    // marginLeft: "14%"
                }}
            />
        );
    };

    renderFooter = () => {
        if (!loading) return null;

        return (
            <View
                style={{
                    paddingVertical: 20,
                    borderTopWidth: 1,
                    borderColor: "#CED0CE"
                }}
            >
                <ActivityIndicator animating size="large" />
            </View>
        );
    };
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts['data'] ? state.posts['data'] : []);
    const pagination = useSelector((state) => state.posts['pagination'] ? state.posts['pagination'] : {});




    const fetchData = async () => {

        setLoading(true);
        await dispatch(fetchPosts(page));
        // console.log(pagination);
        setLoading(false);


    }
    useEffect(() => {
        (async () => {
            fetchData();
        })();
    }, [page]);

    handleRefresh = async () => {
        // console.log('sss');
        setPage(1);
        await fetchData();
    }
    handleLoadMore = async () => {
        console.log('HHHHHH');
        console.log(pagination['current_page'], pagination['last_page']);
        if (!loading && pagination['current_page']) {
            console.log(pagination['current_page'], pagination['last_page']);
            if (pagination['current_page'] < pagination['last_page']) {

                if (pagination['current_page'] == page) {

                    setPage(page => {
                        return pagination['current_page'] + 1
                    });
                }

                // await fetchData();
            }
        }
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={posts}
                renderItem={({ item }) => (
                    <Article hnadleDetailView={hnadleDetailView} post={item} isDarkMode={isDarkMode} />
                )}
                keyExtractor={item => item.id}
                ItemSeparatorComponent={renderSeparator}
                ListFooterComponent={renderFooter}
                onRefresh={handleRefresh}
                refreshing={refreshing}

                onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.1}
            />
        </View >


    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        // height: '100%'
    },

});



export default memo(LatestFeed);
