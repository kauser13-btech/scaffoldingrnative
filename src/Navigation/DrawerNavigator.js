import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";

import { ContactStackNavigator, MainStackNavigator } from "./StackNavigator";
import TabNavigator, { BottomStack } from "./TabNavigator";
import CustomDrawerContent from "../Components/CustomDrawerContent";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
            <Drawer.Screen options={{ title: 'Overview', headerShown: false }} name="HomeLayout" component={BottomStack} />
            <Drawer.Screen options={{ title: 'Overview', headerShown: false }} name="ContactLayout" component={ContactStackNavigator} />
        </Drawer.Navigator>
    );
}

export default DrawerNavigator;