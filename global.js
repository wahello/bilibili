import {Dimensions,StyleSheet,Platform,StatusBar,YellowBox} from 'react-native';
global.IOS = (Platform.OS ==='ios');
global.ANDROID = (Platform.OS ==='android');
global.WIDTH = Dimensions.get('window').width;
global.HEIGHT = Dimensions.get('window').height;
global.POXEL = StyleSheet.hairlineWidth;

if (Platform.OS === 'android') {
    //StatusBar.setTranslucent(true);
    //StatusBar.setBackgroundColor('#FFF')
    //StatusBar.setBarStyle('dark-content')
}

if (!__DEV__) {
    global.console = {
        info: () => {
        },
        log: () => {
        },
        warn: () => {
        },
        error: () => {
        }
    };
}

YellowBox.ignoreWarnings([
    'Warning: isMounted(...) is deprecated',
    'Module RCTImageLoader'
]);
