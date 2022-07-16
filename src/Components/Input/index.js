import React from "react";
import { SafeAreaView, StyleSheet, TextInput } from "react-native";
import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';


import SelectDropdown from 'react-native-select-dropdown'
export const CustomTextInput = ({ title, value, isDarkMode, onChangeInput }) => {


    return (

        <TextInput
            style={{ ...styles.input, color: isDarkMode ? Colors.lighter : Colors.darker, borderColor: isDarkMode ? Colors.lighter : Colors.darker }}
            onChangeText={onChangeInput}
            value={value}
            placeholder={title}
        />

    );
};


export const CustomNumberInput = ({ title, value, isDarkMode, onChangeInput }) => {


    return (

        <TextInput
            style={{ ...styles.input, color: isDarkMode ? Colors.lighter : Colors.darker, borderColor: isDarkMode ? Colors.lighter : Colors.darker }}
            onChangeText={onChangeInput}
            value={value}
            placeholder={title}
            keyboardType="numeric"
        />

    );
};


export const CustopmDropdown = ({ title, data, value, onChangeInput, isDarkMode }) => {
    return (
        <SelectDropdown
            defaultButtonText={title}
            data={data}
            buttonTextStyle={{ color: '#fff' }}
            buttonStyle={{ ...styles.input, color: '#fff', backgroundColor: isDarkMode ? Colors.darker : Colors.darker, borderColor: isDarkMode ? Colors.lighter : Colors.darker, width: '94%' }}
            onSelect={(selectedItem, index) => {
                console.log(selectedItem, index)
            }}


            buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem.title;
            }}
            rowTextForSelection={(item, index) => {
                return item.title;
            }}
        />
    );
}


const styles = StyleSheet.create({
    input: {
        height: 45,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});

