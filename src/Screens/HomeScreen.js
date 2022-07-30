import React, { useEffect, useState } from "react";
import { View, Button, Text, StyleSheet } from "react-native";
import CircleAnimation from "../Components/Animation/CircleAnimation";
import FadeInView from '../Components/Animation/FadeInView';
import MoveBall from "../Components/Animation/MoveBall";
const HomeScreen = ({ navigation }) => {
    const [done, setDone] = useState(0);
    useEffect(() => {
        setDone(100);
    }, []);
    return (
        <View style={styles.center}>

            <MoveBall />
            {/* <FadeInView style={{ width: 250, height: 50, backgroundColor: 'powderblue' }} />
            <CircleAnimation activeColor="darkviolet"
                passiveColor="darkgrey"
                baseColor="white"
                width={50}
                done={done}
                radius={100}
                duration={1200} />
            <Button
                title="Go to About Screen"
                onPress={() => navigation.navigate("Profile")} // We added an onPress event which would navigate to the About screen
            /> */}
        </View>
    );
};

const styles = StyleSheet.create({
    center: {
        flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
        // textAlign: "center",
    },
});

export default HomeScreen;