import *as React from 'react';
import {View, Image,Text} from 'react-native';
import {style} from "./Style";
import {observer,inject} from 'mobx-react';

export const SettingItem = inject('baseTheme')(observer(({baseTheme})=>{
    return(
        <View style={[style.SettingItemView,{backgroundColor:baseTheme.brightSettingItemColor}]}>
            <View>
                <Image/>
                <Text style={{color:baseTheme.brightTextColor}}>123</Text>
            </View>
                <Image/>
        </View>
    )
}));


