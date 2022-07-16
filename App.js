import React from "react";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";

import { MainStackNavigator } from "./src/Navigation/StackNavigator";
import BottomTabNavigator, { BottomStack } from "./src/Navigation/TabNavigator";
import {
  useColorScheme,
} from 'react-native';
import { Provider } from 'react-redux';
import DrawerNavigator from "./src/Navigation/DrawerNavigator";
import { rehydrateStore, store } from "./src/store";
import { PersistGate } from 'redux-persist/integration/react';
import RootNavigation from "./src/Navigation/RootNavigation";
const App = () => {
  const scheme = useColorScheme();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={rehydrateStore}>
        <RootNavigation />
      </PersistGate>
    </Provider>
  );
}
export default App

// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  * @flow strict-local
//  */

// import React from 'react';
// import type { Node } from 'react';
// import {
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   useColorScheme,
//   View,
//   Button
// } from 'react-native';

// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';
// import {
//   NavigationContainer,
//   DefaultTheme,
//   DarkTheme,
// } from '@react-navigation/native';

// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// function HomeScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Home Screen</Text>
//       <Button
//         title="Go to Details"
//         onPress={() => navigation.navigate('Details', { id: 32323, name: 'Nilove' })}
//       />
//     </View>
//   );
// }

// function DetailsScreen({ route, navigation }) {
//   console.log(route);
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Details Screen</Text>
//     </View>
//   );
// }

// const Stack = createNativeStackNavigator();

// const App: () => Node = () => {
//   const scheme = useColorScheme();
//   // options={{ headerShown: false }}
//   return (
//     <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
//       <Stack.Navigator>
//         <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Overview', headerShown: false }} />
//         <Stack.Screen name="Details" component={DetailsScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

// export default App;
