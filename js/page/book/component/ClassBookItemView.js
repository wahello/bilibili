import * as React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {observer,inject} from 'mobx-react';
import {style} from "../Styles";
import {ImageView} from "../../../component/AutoSizingImage";

type Props={
    onPress:()=>void,
    name:string,
    bookCount:number,
    image1:string,image2:string,image3:string
}

export const ClassBookItemView =inject('baseTheme')(observer(({baseTheme,onPress,name,bookCount,image1,image2,image3}:Props)=>{

    return(
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPress}
            style={[style.renderItemTitle,{
                backgroundColor:baseTheme.brightSettingItemColor
            }]}>

            <View style={style.ItemView}>
                <Text style={[style.itemTitle,{ color:baseTheme.brightTextColor}]}>{name}</Text>
                <Text style={[style.bookCount,{ color:baseTheme.brightTextColor}]}>{bookCount}本</Text>
            </View>

            <View style={style.bookItemImg}>
                <ImageView uri={image1} styles={style.bookItemImgView}/>
                <ImageView uri={image2} styles={style.bookItemImgView1}/>
                <ImageView uri={image3} styles={style.bookItemImgView2}/>
            </View>
        </TouchableOpacity>
    )
}));