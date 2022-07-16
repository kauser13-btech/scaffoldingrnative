import * as React from 'react';
import { Image, Dimensions, ScrollView, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
const layout_width = Dimensions.get('window').width;
import {
    Colors
} from 'react-native/Libraries/NewAppScreen';


export const Grid = ({ images, isDarkMode }) => {




    return (
        <ScrollView
            style={{ ...styles.container, backgroundColor: isDarkMode ? Colors.darker : Colors.lighter }}
            contentContainerStyle={styles.content}
        >
            {images.map((image, i) => (
                // eslint-disable-next-line react/no-array-index-key
                // <Image key={i} source={source} style={styles.cover} />
                <FastImage
                    key={i}
                    style={{ width: layout_width / 2, height: layout_width / 2 }}
                    source={{
                        uri: image['thumb'],
                        // headers: { Authorization: 'someAuthToken' },
                        priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                />
            ))}
        </ScrollView>

    );
};



const styles = StyleSheet.create({
    container: {
        // backgroundColor: '#343C46',
    },
    content: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    cover: {
        width: '50%',
        height: Dimensions.get('window').width / 2,
    },
});