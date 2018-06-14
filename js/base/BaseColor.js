/**
 *@flow
 * 颜色管理类
 */

import {BaseImage} from './BaseImage';

interface ThemeColor {

    brightBackGroundColor:string;
    brightBackGroundImage:string;
    brightNavBackGroundColor:string;
    brightTextColor:string;
    brightNavTextColor:string;
    brightItemSeparatorComponent:string;
    brightTabBarBackGroundColor:string;
    brightSuccessColor:string;
    brightPrimaryColor:string;
    brightTopTabBottomColor:string;
    brightBackImage:string;
    brightStatusBarStyle:string;
    brightRecommended :string;
    brightDefaultColor:string;
    brightReadTextColor:string;
    brightSettingItemColor:string;
    brightSearchColor:string,
    brightSearchImage:string,
    brightSearchClose:string,
}

/**
 * 正常
 */
class BrightColor implements ThemeColor{

    brightBackGroundColor='#FBFBFB';
    brightBackGroundImage='';
    brightNavBackGroundColor='#FBFBFB';
    brightTextColor='#666666';
    brightNavTextColor='#000';
    brightItemSeparatorComponent='#A7A7AA';
    brightTabBarBackGroundColor='#F7F7F7';
    brightSuccessColor='#5BB75B';
    brightPrimaryColor='#FF0000';
    brightTopTabBottomColor='#FF0000';
    brightBackImage=require('../assest/icon/back_dark.png');
    brightStatusBarStyle='dark-content';
    brightRecommended ='#F0F0F5';
    brightDefaultColor='#EAEAEA';
    brightReadTextColor='#604733';
    brightSettingItemColor='#F7F7F7';
    brightSearchColor='#dfdfdf';
    brightSearchImage = require('../assest/icon/search_dark.png');
    brightSearchClose = require('../assest/icon/search_close_bright.png');

}

/**
 * 夜间
 */
class DarkColor implements ThemeColor{

    brightBackGroundColor='#202020';
    brightBackGroundImage='';
    brightNavBackGroundColor='#303030';
    brightTextColor='#FFFFFF';
    brightNavTextColor='#FBFBFB';
    brightItemSeparatorComponent='#FBFBFB';
    brightTabBarBackGroundColor='#303030';
    brightSuccessColor='#5BB75B';
    brightPrimaryColor='#FF0000';
    brightTopTabBottomColor='#FBFBFB';
    brightBackImage=require('../assest/icon/back_bright.png');
    brightStatusBarStyle='light-content';
    brightRecommended='#303030';
    brightDefaultColor='#303030';
    brightReadTextColor='#FBFBFB';
    brightSettingItemColor='#303030';
    brightSearchColor = '#202020';
    brightSearchImage = require('../assest/icon/search_bright.png');
    brightSearchClose = require('../assest/icon/search_close_dark.png');


}

const brightColor = new BrightColor();
const darkColor = new DarkColor();

export {
    brightColor,darkColor
}