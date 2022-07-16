
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React, { useEffect, useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const replaceSuffixPattern = /--(active|big|small|very-big)/g;
const ICON_SIZE = 30;
const defaultIconProvider = MaterialCommunityIcons;

const icons = {
    feed: [25, '#8899a1', FontAwesome],
    'bell-o': [25, '#8899a1', FontAwesome],
    user: [25, '#8899a1', FontAwesome],
};

export const iconsMap = {};

export const iconsLoaded = () =>
    new Promise((resolve, reject) => {
        new Promise.all(
            Object.keys(icons).map((iconName) => {
                const Provider = icons[iconName][2] || defaultIconProvider;
                return Provider.getImageSource(
                    iconName.replace(replaceSuffixPattern, ''),
                    icons[iconName][0],
                    icons[iconName][1],
                );
            }),
        ).then((sources) => {
            Object.keys(icons).forEach(
                (iconName, idx) => (iconsMap[iconName] = sources[idx]),
            );
            resolve(true);
        });
    });



export const getIcon = (name, size, color) => {

    return <FontAwesome name={name} size={size} color={color} />;
}    