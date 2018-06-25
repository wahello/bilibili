/**
 * @flow
 */
import * as React from 'react';
import {createBottomTabNavigator, createStackNavigator, createSwitchNavigator} from 'react-navigation';
import Home from '../ui/home/';
import Hot from '../ui/hot/';
import Mine from '../ui/mine/';
import Discovery from '../ui/discovery/';
import {TabBarItem,StackTabItemConfig} from './BaseStack';
import {configRoute} from 'react-navigation-easy-helper';
import {Tab_Title} from "../assest/String";
import {Tab_Icon} from "../assest/Image";

const HomeScreen = createStackNavigator(
    configRoute({
        HomeScreen:{
            screen:Home
        },
    }),
    StackTabItemConfig
);

const DiscoveryScreen = createStackNavigator(
    configRoute({
        DiscoveryScreen:{
            screen:Discovery
        },
    }),
    StackTabItemConfig
);

const HotScreen = createStackNavigator(
    configRoute({
        HotScreen:{
            screen:Hot
        },
    }),
    StackTabItemConfig
);


const MineScreen = createStackNavigator(
    configRoute({
        MineScreen:{screen:Mine},

    }),
    StackTabItemConfig
);

const Tab = createBottomTabNavigator({
        Home:{screen:HomeScreen,navigationOptions:()=>(TabBarItem(Tab_Title.TITLE_HOME,Tab_Icon.ic_home_selected,Tab_Icon.ic_home_normal))},
        Discovery:{screen:DiscoveryScreen,navigationOptions:()=>(TabBarItem(Tab_Title.TITLE_DISCOVERY,Tab_Icon.ic_discovery_selected,Tab_Icon.ic_discovery_normal))},
        Hot:{screen:HotScreen,navigationOptions:()=>(TabBarItem(Tab_Title.TITLE_HOT,Tab_Icon.ic_hot_selected,Tab_Icon.ic_hot_normal))},
        Mine:{screen:MineScreen,navigationOptions:()=>(TabBarItem(Tab_Title.TITLE_MINE,Tab_Icon.ic_mine_selected,Tab_Icon.ic_mine_normal))},

    }, {
        initialRouteName:'Home',
        tabBarVisible:true,
        tabBarOptions:{
            backgroundColor:'rgba(255,255,255,.6)'
        },
    }
);


const SplashView = initialRouteName=>createSwitchNavigator({
    //Splash:{screen:SplashScreen},
    Tab:{screen:Tab}
},{
    initialRouteName:initialRouteName,
});

export default SplashView;

HomeScreen.navigationOptions=({navigation})=>{
    let { routeName } = navigation.state.routes[navigation.state.index];
    let navigationOptions = {};
    if (routeName !== 'HomeScreen') {
        navigationOptions.tabBarVisible = false;
    }
    return navigationOptions;
};

DiscoveryScreen.navigationOptions=({navigation})=>{
    let { routeName } = navigation.state.routes[navigation.state.index];
    let navigationOptions = {};
    if (routeName !== 'DiscoveryScreen') {
        navigationOptions.tabBarVisible = false;
    }
    return navigationOptions;
};

HotScreen.navigationOptions=({navigation})=>{
    let { routeName } = navigation.state.routes[navigation.state.index];
    let navigationOptions = {};
    if (routeName !== 'HotScreen') {
        navigationOptions.tabBarVisible = false;
    }
    return navigationOptions;
};

MineScreen.navigationOptions=({navigation})=>{
    let { routeName } = navigation.state.routes[navigation.state.index];
    let navigationOptions = {};
    if (routeName !== 'MineScreen') {
        navigationOptions.tabBarVisible = false;
    }
    return navigationOptions;
};



