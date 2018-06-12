/**
 * @flow
 * 详情页的loading
 */
import React from "react";
import {View} from 'react-native';
import {BaseString} from "../../base/index";
import {inject, observer} from "mobx-react";
import {style} from "../../page/book/Styles";
import {Loading,GifLoading} from "../../base/BaseLoading";

export const BookListLoading=inject('baseTheme')(observer(({baseTheme})=>{
    return(
        <View style={{flex:1}}>

            <Loading/>
            {
                BaseString.BOOK_TOP_CLASS_TYPE.map((item,i)=>{
                    return(
                        <View style={style.bookLoadView} key={i}>
                            <View style={[style.leftBookView, { backgroundColor:baseTheme.brightDefaultColor, shadowColor: baseTheme.brightDefaultColor}]}/>

                            <View style={style.rightBookView}>
                                <View style={[style.rightBookViewTitle,{backgroundColor:baseTheme.brightDefaultColor}]}/>
                                <View style={[style.rightBookViewTitle,{width:WIDTH/2,marginTop:15,backgroundColor:baseTheme.brightDefaultColor}]}/>
                                <View style={[style.rightBookViewTitle,{width:WIDTH/2-20,backgroundColor:baseTheme.brightDefaultColor}]}/>

                                <View style={{flexDirection:'row',marginBottom:10}}>
                                    <View style={[style.rightBookViewTitle,{width:WIDTH/6,marginRight:10,backgroundColor:baseTheme.brightDefaultColor}]}/>
                                    <View style={[style.rightBookViewTitle,{width:WIDTH/6,backgroundColor:baseTheme.brightDefaultColor}]}/>
                                </View>
                            </View>
                        </View>
                    )
                })
            }
        </View>
    )
}))