/**
 * @flow
 */
import React from 'react';
import {View,Text} from 'react-native';
import {BaseImage} from "../../base";
import {style} from "./Styles";
import {observer,inject} from 'mobx-react';
import {ImageView} from "../../component/ImageView";
import StarRating from 'react-native-star-rating';
import {BaseString} from '../../base'

type Props = {
    cover:string,
    title:string,
    score:number,
    author:string,
    majorCate:string,
    wordCount:number,
    date:string,
    originalPriceText:string,
    count:number,
    array1:Array<any>,
    array2:Array<any>,
    showRecommendedView:boolean,
    commentTitle:string,
    longIntro:string,
    lastChapter:string
}

@inject('baseTheme','bookDetailStore')
@observer
export class BookDetailTopView extends React.Component<Props,any>{

    // 构造
      constructor(props) {
        super(props);
          this.bookDetailStore= this.props.bookDetailStore;
          this.brightBackGroundColor = this.props.baseTheme.brightBackGroundColor;
          this.brightDefaultColor= this.props.baseTheme.brightDefaultColor;
          this.brightNavTextColor= this.props.baseTheme.brightNavTextColor;
          this.brightTextColor = this.props.baseTheme.brightTextColor;
          this.brightItemSeparatorComponent = this.props.baseTheme.brightItemSeparatorComponent;
          this.brightTopTabBottomColor = this.props.baseTheme.brightTopTabBottomColor;
          this.brightRecommended = this.props.baseTheme.brightRecommended;
      }

    render(){

        const {cover,title,score,author,count,majorCate,wordCount,date,originalPriceText,
            array1,array2,showRecommendedView,commentTitle,longIntro,lastChapter} = this.bookDetailStore;

        return(

            <View>
                <View style={style.bookDetailViewTop}>
                    <ImageView uri={cover} styles={[style.bookDetailViewTopLeftImg,{ backgroundColor:this.brightDefaultColor}]}/>
                    <View style={style.bookDetailViewTopTextView}>
                        <Text style={[style.bookDetailViewTopTitleRight,{color: this.brightNavTextColor}]} numberOfLines={1}>{title}</Text>
                        <View style={{flexDirection:'row',height:40,alignItems:'center'}}>
                            <Text style={style.scoreLeftTitle}>{score}</Text>
                            <StarRating disabled={false} maxStars={5} emptyStar={BaseImage.start1}
                                fullStar={BaseImage.start3} halfStar={BaseImage.start2} starSize={16}
                                rating={score/2} containerStyle={{width:80}}/>
                            <View style={{width:POXEL,height:15,backgroundColor:this.brightBackGroundColor,marginLeft:10,marginRight:10}}/>
                            <Text style={{color:this.brightTextColor}}>{count}</Text>
                            <Text style={{color:this.brightTextColor}}>{BaseString.PEOPEL_COMMEND}</Text>
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center',height:30}}>
                            <Text style={[style.authorView,{ color:this.brightTopTabBottomColor}]}>{author}</Text>
                            <View style={{width:POXEL,height:15,backgroundColor:this.brightItemSeparatorComponent,marginLeft:10,marginRight:10}}/>
                            <Text style={[style.wordCount1,{color:this.brightTextColor}]}>{majorCate}</Text>
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center',height:30}}>
                            <Text style={[style.wordCount1,{color:this.brightTextColor}]}>{wordCount}</Text>
                            <View style={{width:POXEL,height:15,backgroundColor:this.brightItemSeparatorComponent,marginLeft:10,marginRight:10}}/>
                            <Text style={[style.wordCount1,{color:this.brightTextColor}]}>{date}</Text>
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center',height:30}}>
                            <Text style={[style.wordCount1,{color:this.brightTextColor}]}>{originalPriceText}</Text>
                        </View>
                    </View>
                </View>

                <View style={style.bookDetailViewBottomView}>
                    <View style={{width:WIDTH-60}}>
                        <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                            {array2.map((item,i)=>{
                                return(
                                    <View key={i}
                                        style={style.bookDetailViewBottomTitle}>
                                        <Text style={[style.bookDetailViewBottomTitleStyle,{fontSize:18,fontWeight:'600',color:this.brightTextColor}]}>{item}</Text>
                                    </View>
                                )
                            })}
                        </View>
                        <View  style={{flexDirection:'row',justifyContent:'space-around'}}>

                            {array1.map((item,i)=>{
                                return(
                                    <View
                                        key={i}
                                        style={style.bookDetailViewBottomTitle}>
                                        <Text style={[style.bookDetailViewBottomTitleStyle,{color:this.brightTextColor}]}>{item.title}</Text>
                                    </View>
                                )
                            })}
                        </View>
                    </View>
                    <View style={[style.bookLoadBottomView,{width:WIDTH-60}]}/>
                </View>

                {showRecommendedView?
                    <View style={style.recommendedView}>
                        <View style={[style.recommended,{ backgroundColor:this.brightRecommended}]}>
                            <Text style={[style.recommendedTitle,{color:this.brightTextColor,}]}>{BaseString.RECOMMEND}</Text>
                            <Text style={[style.recommendedContext,{color:this.brightTextColor,}]} numberOfLines={4}>{commentTitle}</Text>
                        </View>
                    </View>
                    :null}

                <View style={style.IntroductionView1}>
                    <Text style={style.IntroductionTitle}>{BaseString.INTRODUCTION}</Text>
                    <View style={style.longIntroView}>
                        <Text numberOfLines={5} style={[style.longIntro,{color:this.brightNavTextColor,}]}>{longIntro}</Text>
                    </View>
                    <View style={[style.bookLoadBottomView,{width:WIDTH-60}]}/>
                </View>

                <View style={style.IntroductionView1}>
                    <Text style={style.IntroductionTitle}>{BaseString.NEW_CHAPTER}</Text>
                    <View style={{marginLeft:30}}>
                        <Text style={style.lastChapter}>{lastChapter}</Text>
                    </View>
                    <View style={style.longIntroView}>
                        <Text style={{marginTop:20,fontSize:16,color:this.brightTextColor}} onPress={()=>this.props.navigation.openDrawer()}>{BaseString.LOOK_ALL_CHARTER}</Text>
                    </View>
                    <View style={[style.bookLoadBottomView,{width:WIDTH-60}]}/>
                </View>
            </View>
        )
    }

}