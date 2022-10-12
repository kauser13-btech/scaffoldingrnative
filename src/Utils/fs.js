import { Alert, Image } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import { isIOS } from './util';



export function getFileReadPath(issue) {
    return issue.replace('file://', '');
}

export const isValidUrl = (str) => {
    let regex =
        /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    return regex.test(str);
};
export function getImageDir() {
    return isIOS()
        ? RNFetchBlob.fs.dirs.DocumentDir
        : RNFetchBlob.fs.dirs.DCIMDir;
}

export function saveImage(path, image) {
    if (isIOS()) {
        return RNFetchBlob.fs.writeFile(path, image.base64 ? image.base64 : image, 'base64');
    }

    return RNFetchBlob.fs.writeFile(path, image.uri, 'uri');
}

export function generateImagePathForPost(identifier) {
    const dirs = RNFetchBlob.fs.dirs;
    const dir = isIOS() ? dirs.DocumentDir : dirs.DCIMDir;
    const time = Math.round(new Date().getTime() / 1000);
    const path = dir + '/' + `${identifier}_${identifier}_${time}.png`;
    return path;
}

export function getImageSize(uri: string) {
    const success = (resolve) => (width: number, height: number) => {
        resolve({
            width,
            height,
        });
    };

    const error = (reject: (reason?: any) => void) => (failure: Error) => {
        reject(failure);
    };

    return new Promise((resolve, reject) => {
        Image.getSize(uri, success(resolve), error(reject));
    });
}



export async function readImageDataFromUrl(url) {

    url = isIOS() ? getFileReadPath(url) : url;
    let imageData = '';
    // console.log(url);
    if (!isValidUrl(url)) {
        const exist = await RNFetchBlob.fs.exists(url);
        // console.log('eee');
        // console.log(exist);
        if (exist) {
            imageData = await RNFetchBlob.fs.readFile(url, 'base64');
        }
    }

    return imageData;
}
