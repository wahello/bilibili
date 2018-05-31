/**
 * @flow
 */
import * as React from 'react';
import {Image,StyleSheet} from 'react-native';
import {createStackNavigator,createDrawerNavigator,createSwitchNavigator,SwitchNavigator,createBottomTabNavigator} from 'react-navigation';
import CardStackStyleInterpolator from 'react-navigation/src/views/StackView/StackViewStyleInterpolator';
import {scaleSize} from "../utils/ScreenUtils";
import {BaseString,BaseTheme} from '../base';
import BaseImage from '../base/BaseImage';
import {BookScreen} from '../page/book/index';
import {LikeScreen} from '../page/like/index';
import {MineScreen} from '../page/mine/index';
import SplashScreen from '../page/SplashScreen';
import {observer} from 'mobx-react';

const Home = observer(createBottomTabNavigator({

    Like:{screen:LikeScreen,navigationOptions:()=>(TabBarItem(BaseString.TabBarItem.LIKE,BaseImage.home_selected,BaseImage.home_uncheck))},
    Book:{screen:BookScreen,navigationOptions:()=>(TabBarItem(BaseString.TabBarItem.BOOK,BaseImage.class_selected,BaseImage.class_uncheck))},
    Mine:{screen:MineScreen,navigationOptions:()=>(TabBarItem(BaseString.TabBarItem.MINE,BaseImage.mine_selected,BaseImage.mine_uncheck))},

},{
    initialRouteName:'Book',
    tabBarOptions:{
        tabStyle:{
            backgroundColor:new BaseTheme().brightNavBackGroundColor
        },
}}));

const configAppNavigator = createStackNavigator({
    Home:{screen:Home},
    // ClassListView:{screen:ClassListView},
    // BookComments:{screen:BookComments},
    // BookCommentPer:{screen:BookCommentPer},
    // directory:{screen:directory}
},{
    headerMode: 'none',
    transitionConfig:()=>({
        screenInterpolator:props=>{
            return CardStackStyleInterpolator.forHorizontal(props)
        }
    })
});

const ModalView = createStackNavigator({
    HomeView:{screen:configAppNavigator},
    // BookReaderScreen:{screen:BookReaderScreen}
},{
    headerMode: 'none',
    initialRouteName: 'HomeView',
    mode:'modal',
});

const SplashView = initialRouteName=>createSwitchNavigator({
    Splash:{screen:SplashScreen},
    ModalView:{screen:ModalView}
},{
    initialRouteName:'Splash',
});

export default SplashView;

const TabBarItem =(title:string,selected:string|number,uncheck:string|number)=>{
    return{
        tabBarLabel:title,
        title:title,
        headerTitle:null,
        tabBarIcon:({tintColor,focused})=>{
            return(
                focused? TabBarItemImage(selected) :TabBarItemImage(uncheck)
            )
        }
    }
};

const TabBarItemImage=(source:string|number)=>{
    return(
        <Image
            style={styles.icon}
            source={source}
        />
    )
};

const styles = StyleSheet.create({
    icon:{
        width:scaleSize(42),
        height:scaleSize(42)
    },
});