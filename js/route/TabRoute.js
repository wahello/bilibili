/**
 * @flow
 */
import * as React from 'react';
import {createBottomTabNavigator, createStackNavigator, createSwitchNavigator} from 'react-navigation';
import {BookScreen} from '../page/book/index';
import {LikeScreen} from '../page/like/index';
import {MineScreen} from '../page/mine/index';
import {observer} from "mobx-react";
import {BaseString, BaseTheme,BaseStack} from "../base";
import BaseImage from "../base/BaseImage";
import SplashScreen from "../page/SplashScreen";
import StackRoute from './StackRoute';

export const Book = createStackNavigator({
    BookScreen:BaseStack.StackTabItem(BookScreen,BaseString.TAB_BAR_HEADER_BOOK),
    ...StackRoute,
},
    BaseStack.StackTabItemConfig
);

export const Like = createStackNavigator({
    LikeScreen:BaseStack.StackTabItem(LikeScreen,BaseString.TAB_BAR_HEADER_LIKE),
    ...StackRoute,
},
    BaseStack.StackTabItemConfig
);

export const Mine = createStackNavigator({
        MineScreen:BaseStack.StackTabItem(MineScreen,BaseString.TAB_BAR_HEADER_MINE),
        ...StackRoute,
},
    BaseStack.StackTabItemConfig
);

const Tab = observer(createBottomTabNavigator({
    Like:{screen:Like,navigationOptions:()=>(BaseStack.TabBarItem(BaseString.TAB_BAR_BOTTOM_LABEL_LIKE,BaseImage.home_selected,BaseImage.home_uncheck))},
    Book:{screen:Book,navigationOptions:()=>(BaseStack.TabBarItem(BaseString.TAB_BAR_BOTTOM_LABEL_BOOK,BaseImage.class_selected,BaseImage.class_uncheck))},
    Mine:{screen:Mine,navigationOptions:()=>(BaseStack.TabBarItem(BaseString.TAB_BAR_BOTTOM_LABEL_MINE,BaseImage.mine_selected,BaseImage.mine_uncheck))},

}, {
        initialRouteName:'Book',
        tabBarVisible:true,
        tabBarOptions:{
            tabStyle:{backgroundColor:new BaseTheme().brightNavBackGroundColor}
        }
    }
));

const SplashView = initialRouteName=>createSwitchNavigator({
    Splash:{screen:SplashScreen},
    Tab:{screen:Tab}
},{
    initialRouteName:'Splash',
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



