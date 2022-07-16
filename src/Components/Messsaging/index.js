import React, { useState } from 'react';
import {
    View,
    Image,
    Text,
    TextInput,
    ScrollView,
    StyleSheet,
    FlatList,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';
import { CommonButton, SendButton } from '..';

const MESSAGES = [
    {
        id: 1,
        message: 'Nilove default class Chat extends React.Component'
    },
    {
        id: 2,
        message: 'sudo make me a sandwich'
    },
    {
        id: 3,
        message: 'what? make it yourself'
    },
    {
        id: 4,
        message: 'make me a sandwich'
    }

];


export const Messsaging = ({ images, isDarkMode }) => {
    const [refreshing, setRefresh] = useState(false);
    const [loading, setLoading] = useState(false);
    const [messsage, setMessage] = useState('');
    const [messsages, setMessages] = useState(MESSAGES);
    const [counter, setCounter] = useState(5);

    handleRefresh = () => {
        // console.log('ddd');
    }
    handleLoadMore = () => {
        // console.log('dd');
    }
    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ ...styles.container, backgroundColor: isDarkMode ? Colors.darker : Colors.lighter }}>
            <FlatList
                data={messsages}
                inverted={true}
                renderItem={({ item }) => {

                    const odd = item.id % 2;
                    return <View
                        // eslint-disable-next-line react/no-array-index-key
                        key={item.id}
                        style={[odd ? styles.odd : styles.even, styles.inverted]}
                    >
                        <Image
                            style={styles.avatar}
                            source={
                                odd
                                    ? require('../../assets/avatar-2.png')
                                    : require('../../assets/avatar-1.png')
                            }
                        />
                        <View
                            style={[styles.bubble, odd ? styles.received : styles.sent]}
                        >
                            <Text style={odd ? styles.receivedText : styles.sentText}>
                                {item.message}
                            </Text>
                        </View>
                    </View>
                }}
                keyExtractor={item => item.id}
                onRefresh={handleRefresh}
                refreshing={refreshing}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={30}
            />
            <View style={{ flexDirection: 'row', backgroundColor: '#fff' }}>
                <TextInput
                    onChangeText={(message) => {
                        setMessage(message);
                    }}
                    value={messsage}
                    style={{ ...styles.input, width: '85%' }}
                    placeholder="Write a message"
                    underlineColorAndroid="transparent"
                />
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <SendButton pressFunction={() => {
                        setMessages([{ id: counter, message: messsage }, ...messsages]);
                        setCounter(counter + 1);
                        setMessage('');
                    }} title={`Send`} />
                </View>

            </View>


        </KeyboardAvoidingView>

    );
};






const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eceff1',
    },
    inverted: {
        // transform: [{ scaleY: -1 }],
    },
    content: {
        padding: 16,
    },
    even: {
        flexDirection: 'row',
    },
    odd: {
        flexDirection: 'row-reverse',
    },
    avatar: {
        marginVertical: 8,
        marginHorizontal: 6,
        height: 40,
        width: 40,
        borderRadius: 20,
        borderColor: 'rgba(0, 0, 0, .16)',
        borderWidth: StyleSheet.hairlineWidth,
    },
    bubble: {
        marginVertical: 8,
        marginHorizontal: 6,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 20,
    },
    sent: {
        backgroundColor: '#cfd8dc',
    },
    received: {
        backgroundColor: '#2196F3',
    },
    sentText: {
        color: 'black',
    },
    receivedText: {
        color: 'white',
    },
    input: {
        height: 48,
        paddingVertical: 12,
        paddingHorizontal: 24,
        backgroundColor: 'white',
    },
});