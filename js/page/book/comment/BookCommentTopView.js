import React from 'react';
import {View, Text,TouchableOpacity, Image} from 'react-native';
import {observer,inject} from 'mobx-react';
import {BaseString,BaseImage} from '../../../base';
import {style} from "../Styles";
import {ImageView} from "../../../component/AutoSizingImage";

export const BookCommentTopView =inject('baseTheme','bookDetailStore','bookCommentStore')(observer(({baseTheme,bookDetailStore,bookCommentStore,onPress})=>{
    return(
        <View style={[style.bookCommentsTopView]}>
            <View style={style.bookCommentsTopLeftImg}>
                <ImageView uri={bookDetailStore.cover} styles={style.bookCommentsTopLeftImg1}/>
            </View>
            <View style={style.bookCommentsTopTextView}>
                <View style={{flexDirection:'row',height:40,alignItems:'center'}}>
                    <Text style={[style.bookDetailViewTopTitleRight,{fontWeight:'500',fontSize:18,width:150,color:baseTheme.brightNavTextColor}]} numberOfLines={1}>{bookDetailStore.title}</Text>
                </View>
                <View style={{flexDirection:'row',height:20,alignItems:'center'}}>
                    {/*<Image source={BaseImage.header} style={style.authorImage}/>*/}
                    <Text style={[style.authorView1,{color:baseTheme.brightTextColor}]}>{bookDetailStore.author}</Text>
                </View>
                <View style={{flexDirection:'row',alignItems:'center',height:30}}>
                    <Text style={[style.wordCount1,{ color:baseTheme.brightTextColor}]}>{BaseString.DISCUSSION_SENTIMENT}{bookDetailStore.latelyFollower}</Text>
                    <View style={{width:POXEL,height:15,backgroundColor:baseTheme.brightSettingItemColor,marginLeft:10,marginRight:10}}/>
                    <Text style={[style.wordCount1,{ color:baseTheme.brightTextColor}]}>{BaseString.TODA_ADD_DISCUSS}{bookCommentStore.bookCommentsToday}</Text>
                </View>
            </View>
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={onPress}
                //onPress={()=>this.collection(this.id, this.cover,this.title,this.author)}
                style={[style.collectionView,{backgroundColor:'red'}]}>
                <Text style={{color:'#fff'}}>{BaseString.COLLECTION}</Text>
            </TouchableOpacity>
        </View>
    )
}))