/**
 * 控制主题的一个store
 */
import {action,observable,computed} from 'mobx';
import {Platform, StatusBar,DeviceInfo} from 'react-native';
import {brightColor,darkColor} from "./BaseColor";

interface Theme{
    isDark:boolean;
    isIPhoneX:boolean;
    statusBarHeight:()=>mixed;
    changeTheme:()=>mixed
}

export default class BaseTheme implements Theme{

    @observable brightBackGroundColor = brightColor.brightBackGroundColor;
    @observable brightBackGroundImage = brightColor.brightBackGroundImage;
    @observable brightNavBackGroundColor = brightColor.brightNavBackGroundColor;
    @observable brightTextColor = brightColor.brightTextColor;
    @observable brightNavTextColor = brightColor.brightNavTextColor;
    @observable brightItemSeparatorComponent = brightColor.brightItemSeparatorComponent;
    @observable brightTabBarBackGroundColor = brightColor.brightTabBarBackGroundColor;
    @observable brightSuccessColor = brightColor.brightSuccessColor;
    @observable brightPrimaryColor = brightColor.brightPrimaryColor;
    @observable brightTopTabBottomColor = brightColor.brightTopTabBottomColor;
    @observable brightBackImage = brightColor.brightBackImage;
    @observable brightStatusBarStyle = brightColor.brightStatusBarStyle;
    @observable brightRecommended = brightColor.brightRecommended;
    @observable brightDefaultColor = brightColor.brightDefaultColor;

    @observable isDark =false;
    @observable isIPhoneX = DeviceInfo.isIPhoneX_deprecated;

    @computed get statusBarHeight(){
        return this.isIPhoneX? 44 : Platform.OS ==='android'?Platform.Version<21?0:StatusBar.currentHeight:20
    }

    @action changeTheme=()=>{

        this.brightBackGroundColor = darkColor.brightBackGroundColor;
        this.brightBackGroundImage = darkColor.brightBackGroundImage;
        this.brightNavBackGroundColor = darkColor.brightNavBackGroundColor;
        this.brightTextColor = darkColor.brightTextColor;
        this.brightNavTextColor = darkColor.brightNavTextColor;
        this.brightItemSeparatorComponent = darkColor.brightItemSeparatorComponent;
        this.brightTabBarBackGroundColor = darkColor.brightTabBarBackGroundColor;
        this.brightSuccessColor = darkColor.brightSuccessColor;
        this.brightPrimaryColor = darkColor.brightPrimaryColor;
        this.brightTopTabBottomColor = darkColor.brightTopTabBottomColor;
        this.brightBackImage = darkColor.brightBackImage;
        this.brightStatusBarStyle = darkColor.brightStatusBarStyle;
        this.brightRecommended = darkColor.brightRecommended;
        this.brightDefaultColor = darkColor.brightDefaultColor;
        this.isDark = true
    }
}