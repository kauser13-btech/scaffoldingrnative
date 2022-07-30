import React, { useRef, useEffect, useState } from 'react';
import { Animated, Text, View, TouchableOpacity } from 'react-native';
const radius = 50;
const MoveBall = (props) => {
    const value = useState(new Animated.ValueXY({ x: 0, y: 0 }))[0];

    function moveBall() {
        Animated.timing(value, {
            toValue: {
                x: 100, y: 100
            },
            duration: 1000,
            useNativeDriver: false
        }).start();
    }

    return (
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
            <Animated.View style={value.getLayout()}>
                <View style={{
                    width: radius * 2,
                    height: radius * 2,
                    borderRadius: radius,
                    backgroundColor: 'red',
                    // position: 'absolute',
                    // left: 0, top: 0
                }}>

                </View>
            </Animated.View>
            <TouchableOpacity onPress={moveBall}>
                <Text>Move One</Text>
            </TouchableOpacity>
        </View>
    );
}


export default MoveBall;