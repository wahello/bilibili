import React from 'react';
import {Text} from 'react-native';
import {observer,inject} from 'mobx-react';

const TextView = inject('baseTheme')(observer((baseTheme,props)=>{
    return <Text {...props}/>
}));