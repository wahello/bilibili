/**
 * @flow
 */
import React from 'react';
import {inject, observer} from "mobx-react";
import {View, Text} from 'react-native';
import {style} from "../../page/book/Styles";
import {BaseString,BaseContainer} from '../../base';
import {Loading} from "../../base/BaseLoading";


export const BookCommentLoading =inject('baseTheme')(observer(({baseTheme})=>{

    return(
        <BaseContainer  navBar={null}>

            <Loading/>

            <View style={[style.bookCommentsTopView,{ backgroundColor:baseTheme.brightBackGroundColor}]}>
                <View style={[style.bookCommentsTopLeftImg,{ backgroundColor:baseTheme.brightDefaultColor}]}/>
                <View style={style.bookCommentsTopTextView}>
                    <View style={{flexDirection:'row',height:40,alignItems:'center'}}>
                        <View style={style.scoreLeft}/>
                    </View>
                    <View style={{flexDirection:'row',height:20,alignItems:'center'}}>
                        <View style={[style.scoreLeft,{width:50, backgroundColor:baseTheme.brightDefaultColor}]}/>
                        <View style={[style.scoreLeft,{width:50, backgroundColor:baseTheme.brightDefaultColor}]}/>
                    </View>
                    <View style={[style.scoreLeft,{width:WIDTH/2-10,marginTop:15,backgroundColor:baseTheme.brightDefaultColor}]}/>
                    <View style={[style.scoreLeft,{width:WIDTH/2-40,marginTop:15,backgroundColor:baseTheme.brightDefaultColor}]}/>
                </View>
                <View style={[style.collectionView,{ backgroundColor:baseTheme.brightDefaultColor,}]}>
                    <Text style={{color:'#fff'}}>{BaseString.COLLECTION}</Text>
                </View>
            </View>
            <View style={[style.bookCommentsTabView,{ backgroundColor:baseTheme.brightNavBackGroundColor,}]}>
                {BaseString.BOOK_COMMENT_TAB.map((item,i)=>{
                    return(
                        <Text key={i} style={[style.bookCommentsTabTitle,{ color:baseTheme.brightTextColor,}]}>{item.title}</Text>
                    )
                })}
            </View>

            <View style={[style.bookCommentsItemView,{backgroundColor:baseTheme.brightBackGroundColor,}]}>
                {BaseString.BOOK_COMMENT_TAB.map((item,i)=>{
                    return(
                        <View key={i} style={style.bookCommentsItem}>
                            <View style={style.bookCommentsItemBottom}>
                                <View style={[style.bookCommentsItemBottomLeftImage,{  backgroundColor:baseTheme.brightDefaultColor,}]}/>
                                <View>
                                    <View style={[style.bookCommentsItemRight,{ backgroundColor:baseTheme.brightDefaultColor}]}/>
                                    <View style={[style.bookCommentsItemRight,{width:WIDTH/2-30,backgroundColor:baseTheme.brightDefaultColor}]}/>
                                    <View style={[style.bookCommentsItemRight,{width:WIDTH/2-40,backgroundColor:baseTheme.brightDefaultColor}]}/>
                                </View>
                            </View>
                        </View>
                    )
                })}
            </View>
        </BaseContainer>
    )
}));
