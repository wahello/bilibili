/**
 *@flow
 */

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

}

/**
 * 正常
 */
class BrightColor implements ThemeColor{

    brightBackGroundColor='#FBFBFB';
    brightBackGroundImage='';
    brightNavBackGroundColor='#F7F7F7';
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

}

/**
 * 夜间
 */
class DarkColor implements ThemeColor{

    brightBackGroundColor='#202020';
    brightBackGroundImage='';
    brightNavBackGroundColor='#303030';
    brightTextColor='#FBFBFB';
    brightNavTextColor='#FBFBFB';
    brightItemSeparatorComponent='#FBFBFB';
    brightTabBarBackGroundColor='#202020';
    brightSuccessColor='#5BB75B';
    brightPrimaryColor='#FF0000';
    brightTopTabBottomColor='#F7F7F7';
    brightBackImage=require('../assest/icon/back_bright.png');
    brightStatusBarStyle='light-content';
    brightRecommended='#303030';
    brightDefaultColor='#303030';

}

const brightColor = new BrightColor();
const darkColor = new DarkColor();


export {
    brightColor,darkColor
}