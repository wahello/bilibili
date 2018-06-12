/**
 * @flow
 */
import * as React from 'react';
import {createBottomTabNavigator, createStackNavigator, createSwitchNavigator,createMaterialTopTabNavigator} from 'react-navigation';
import {BookScreen} from '../page/book/index';
import {LikeScreen} from '../page/like/index';
import {MineScreen} from '../page/mine/index';
import {observer,inject} from "mobx-react";
import {BaseString, BaseTheme,BaseStack} from "../base";
import BaseImage from "../base/BaseImage";
import SplashScreen from "../page/SplashScreen";
import StackRoute from './StackRoute';
import {configRoute} from 'react-navigation-easy-helper';
import {ClassListView} from "../page/book/list/ClassListView";
import {BookDetail} from "../page/book/detail/BookDetail";
import CustomTabComponent from '../component/CustomTabComponent';

const confing = {
    gesturesEnabled:true,
    headerBackTitleStyle:{color:'#000'},
    headerTintColor:'#000',

};


export const Book = createStackNavigator(
    configRoute({
        BookScreen:{
            screen:BookScreen
        },
        ...StackRoute,
    }),
    BaseStack.StackTabItemConfig
)

export const Like = observer(
    createStackNavigator(
        configRoute({
            LikeScreen:{screen:LikeScreen,navigationOptions:({navigation})=>({
                    headerTitle:BaseString.TAB_BAR_HEADER_LIKE,
                    headerStyle:{
                        borderBottomWidth:0,
                    }
                })},

        }),
        BaseStack.StackTabItemConfig
    )
)

export const Mine = createStackNavigator(
        configRoute({
            MineScreen:{screen:MineScreen,navigationOptions:({navigation})=>({
                    headerTitle:BaseString.TAB_BAR_HEADER_MINE,
                    headerStyle:{

                    }
                })},

        }),
    BaseStack.StackTabItemConfig
);

const Tab = createBottomTabNavigator({
    Like:{screen:Like,navigationOptions:()=>(BaseStack.TabBarItem(BaseString.TAB_BAR_BOTTOM_LABEL_LIKE,BaseImage.home_selected,BaseImage.home_uncheck))},
    Book:{screen:Book,navigationOptions:()=>(BaseStack.TabBarItem(BaseString.TAB_BAR_BOTTOM_LABEL_BOOK,BaseImage.class_selected,BaseImage.class_uncheck))},
    Mine:{screen:Mine,navigationOptions:()=>(BaseStack.TabBarItem(BaseString.TAB_BAR_BOTTOM_LABEL_MINE,BaseImage.mine_selected,BaseImage.mine_uncheck))},

}, {
        initialRouteName:'Book',
            tabBarVisible:true,
            tabBarOptions:{

            },
        // tabBarComponent:CustomTabComponent
    }
);


const SplashView = initialRouteName=>createSwitchNavigator({
    Splash:{screen:SplashScreen},
    Tab:{screen:Tab}
},{
    initialRouteName:initialRouteName,
});

export default SplashView;

Book.navigationOptions=({navigation})=>{
    let { routeName } = navigation.state.routes[navigation.state.index];
    let navigationOptions = {};
    if (routeName !== 'BookScreen') {
        navigationOptions.tabBarVisible = false;
    }
    return navigationOptions;
};

Like.navigationOptions=({navigation})=>{
    let { routeName } = navigation.state.routes[navigation.state.index];
    let navigationOptions = {};
    if (routeName !== 'LikeScreen') {
        navigationOptions.tabBarVisible = false;
    }
    return navigationOptions;
};

Mine.navigationOptions=({navigation})=>{
    let { routeName } = navigation.state.routes[navigation.state.index];
    let navigationOptions = {};
    if (routeName !== 'MineScreen') {
        navigationOptions.tabBarVisible = false;
    }
    return navigationOptions;
};



