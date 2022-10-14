import React, { useRef, useState, useEffect, memo } from 'react';
import { View, Button, Text, Pressable, ActivityIndicator } from 'react-native';
// import { memo } from 'react';
import { WebView } from 'react-native-webview';
import { getHtml } from '../../scripts/html';
export const WebViewComponent = ({ webView, uri, new_width, new_height, handleWebViewMessage }) => {
    return (
        <WebView
            ref={webView}
            // style={styles.webview}
            originWhitelist={['*']}
            javaScriptEnabled
            onMessage={handleWebViewMessage}
            source={{ html: getHtml(uri, new_width, new_height) }}
        />
    );

}


export default memo(WebViewComponent);