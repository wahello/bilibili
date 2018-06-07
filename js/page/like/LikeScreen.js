import * as React from 'react';
import {createMaterialTopTabNavigator} from 'react-navigation';
import HistoryBookScreen from './HistoryBookScreen';
import LikeBookScreen from './LikeBookScreen';
import UpdateBookScreen from './UpdateBookScreen';
import {BaseString} from '../../base';

export const LikeScreen = createMaterialTopTabNavigator({
    UpdateBookScreen:{screen:UpdateBookScreen,
        navigationOptions:({navigationOptions})=>({
            title:BaseString.BOOK_MINE_UPDATE
        })},
    HistoryBookScreen:{screen:HistoryBookScreen,
        navigationOptions:({navigationOptions})=>({
            title:BaseString.BOOK_MINE_HISTORY
        })
    },
    LikeBookScreen:{screen:LikeBookScreen,
        navigationOptions:({navigationOptions})=>({
            title:BaseString.BOOK_MINE_LIKE
        })},

},{
    swipeEnabled:true,
    tabBarOptions:{
        activeTintColor:'red',
        inactiveTintColor:'#000',
        indicatorStyle:{
            backgroundColor:'red',
            height:4,
            borderRadius:4,
            width:30
        },
        style:{
            backgroundColor:'#F7F7F7',
        },
        tabStyle:{
           // height:80,
        },
        labelStyle:{
            fontSize:14,

        },
    }
});


