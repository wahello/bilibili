/**
 * @flow
 * 抽取一些导航的公共配置
 *
 */
import * as React from 'react';
import CardStackStyleInterpolator from "react-navigation/src/views/StackView/StackViewStyleInterpolator";
import {scaleSize} from "../utils/ScreenUtils";
import {Image, StyleSheet} from "react-native";
import {observer} from 'mobx-react';

const StackTabItem = (stack:any,header:string) =>{
    return{
        screen:stack,
        navigationOptions:({navigation})=>({
            headerTitle:header,
            headerTruncatedBackTitle:'返回',
        })
    }
};

const StackTabItemConfig ={
    headerMode: 'none',
    headerTransitionPreset:'uikit',
    transitionConfig:()=>({
        screenInterpolator:props=>{
            return CardStackStyleInterpolator.forHorizontal(props)
        }
    }),
};


const TabBarItem =(title:string,selected:string|number,uncheck:string|number)=>{
    return{
        tabBarLabel:title,
        tabBarIcon:({tintColor,focused})=>{
            return(
                focused? TabBarItemImage(selected) :TabBarItemImage(uncheck)
            )
        },

    };

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

export {
    StackTabItem,StackTabItemConfig,TabBarItem
}
