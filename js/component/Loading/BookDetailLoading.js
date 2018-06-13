/**
 * @flow
 * 详情页的loading界面
 */
import {inject, observer} from "mobx-react";
import {View,Image, Text,TouchableOpacity} from 'react-native';
import {BaseImage} from "../../base/index";
import React from "react";
import {style} from "../../page/book/Styles";
import {BaseString,BaseContainer} from '../../base/index';
import {GifLoading, Loading} from "../../base/BaseLoading";
import {scaleSize} from "../../utils/ScreenUtils";

export const BookDetailLoading =inject('baseTheme')(observer(({baseTheme})=>{
    return(
        <BaseContainer
            navBar={null}>

            <Loading/>

            <View style={style.bookDetailViewTop}>
                <View style={[style.bookDetailViewTopLeftImg,{ backgroundColor:baseTheme.brightDefaultColor,  height:scaleSize(300),shadowColor: baseTheme.brightDefaultColor}]}/>
                <View style={style.bookDetailViewTopTextView}>
                    <View style={[style.bookDetailViewTopRight,{ backgroundColor:baseTheme.brightDefaultColor}]}/>
                    <View style={{flexDirection:'row',height:40,alignItems:'center'}}>
                        <View style={[style.scoreLeft,{ backgroundColor:baseTheme.brightDefaultColor}]}/>
                        {BaseString.BOOK_TOP_CLASS_TYPE.map((item,i)=>{
                            return(
                                <Image key={i} source={BaseImage.my_evaluate_star_dark} style={style.score}/>
                            )
                        })}
                    </View>
                    <View style={{flexDirection:'row',height:20,alignItems:'center'}}>
                        <View style={[style.scoreLeft,{width:50,backgroundColor:baseTheme.brightDefaultColor}]}/>
                        <View style={[style.scoreLeft,{width:50,backgroundColor:baseTheme.brightDefaultColor}]}/>
                    </View>
                    <View style={[style.scoreLeft,{width:WIDTH/2-10,marginTop:15, backgroundColor:baseTheme.brightDefaultColor}]}/>
                    <View style={[style.scoreLeft,{width:WIDTH/2-40,marginTop:15, backgroundColor:baseTheme.brightDefaultColor}]}/>
                    <View style={[style.scoreLeft,{width:WIDTH/2-10,marginTop:15, backgroundColor:baseTheme.brightDefaultColor}]}/>
                </View>
            </View>
            <View style={style.bookDetailViewBottomView}>

                <View style={{width:WIDTH-60,flexDirection:'row'}}>
                    {BaseString.BOOK_DETAIL_CLASS.map((item,i)=>{
                        return(
                            <View
                                key={i}
                                style={style.bookDetailViewBottomTitle}>
                                <Text style={[style.bookDetailViewBottomTitleStyle,{ color:baseTheme.brightTextColor}]}>{item.title}</Text>
                            </View>
                        )
                    })}
                </View>

                <View style={[style.bookLoadBottomView,{width:WIDTH-60}]}/>

            </View>

            <View style={style.IntroductionView}>
                <Text style={[style.IntroductionTitle,{ color:baseTheme.brightNavTextColor}]}>{BaseString.INTRODUCTION}</Text>
                <View style={[style.IntroductionViewItem,{backgroundColor:baseTheme.brightDefaultColor}]}/>
                <View style={[style.IntroductionViewItem,{width:WIDTH-80, backgroundColor:baseTheme.brightDefaultColor}]}/>
                <View style={[style.IntroductionViewItem,{width:WIDTH-100,backgroundColor:baseTheme.brightDefaultColor}]}/>
                <View style={[style.IntroductionViewItem,{width:WIDTH-100,backgroundColor:baseTheme.brightDefaultColor}]}/>
            </View>

            <BookDetailBottomView/>
        </BaseContainer>
    )
}))

export const BookDetailBottomView = inject('baseTheme')(observer(({baseTheme,addBookcase,startRead})=>{
    return(
        <View style={[style.bookBottomView,{ backgroundColor:baseTheme.brightNavBackGroundColor,}]}>
            <View style={style.ChaseView}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={addBookcase}
                    style={style.dotChaseView}>
                    <Text style={[style.dotChaseTitle,{color:'#fff'}]}>+ 追更新</Text>
                </TouchableOpacity>
            </View>
            <View style={style.ChaseView}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={startRead}
                    style={[style.dotChaseView,{backgroundColor:'red'}]}>
                    <Text style={[style.dotChaseTitle,{color:'#FFF'}]}>开始阅读</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}));

