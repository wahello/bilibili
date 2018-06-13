import React from 'react';
import {View,ScrollView,Text,Image,TextInput,} from 'react-native';
import StarRating from 'react-native-star-rating';
import {observer,inject} from 'mobx-react';
import {BaseContainer,BaseImage} from '../../../base';
import {ImageView} from "../../../component/AutoSizingImage";
import {style} from "../Styles";


@inject('baseTheme')
@observer
export class BookCommentDetail extends React.Component{

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
          const params = this.props.navigation.state.params;
          this.baseTheme= this.props.baseTheme;
          this.content = params.content;
          this.avatar = params.avatar;
          this.created = params.created;
          this.lv = params.lv;
          this.nickname = params.nickname;
          this.title = params.title;
          this.rating= params.rating;
          this.cover = params.cover;
          this.bookTitle =params.bookTitle;

      }

     render(){
          return(
              <BaseContainer
                showGoBack={true}
                title={this.title}>
                  <ScrollView
                      showsVerticalScrollIndicator={false}
                      contentContainerStyle={{paddingLeft:20,paddingRight:20}}>
                      <View style={[style.bookReviewScreenViewBottom,{marginTop:20}]}>
                          <ImageView uri={this.avatar} styles={[style.evaluationItemImageView,{borderColor:this.baseTheme.brightTextColor,}]}/>
                          <View>
                              <View style={{flexDirection:'row'}}>
                                  <Text style={{ color:this.baseTheme.brightTextColor,}}>{this.nickname}</Text>
                                  <View style={[style.avatarLvView,{ borderColor:this.baseTheme.brightTextColor,}]}>
                                      <Text style={[style.avatarLv,{ color:this.baseTheme.brightTextColor,}]}>lv.{this.lv}</Text>
                                  </View>
                              </View>
                              <Text style={[style.wordCount1,{ color:this.baseTheme.brightTextColor,}]}>{this.created}</Text>
                          </View>
                      </View>
                      <Text style={[style.bookCommentPerTopTitle,{marginTop:20, color:this.baseTheme.brightTextColor,}]} numberOfLines={2}>{this.title}</Text>
                      <Text style={[style.wordCount1,{lineHeight:25,marginTop:20,color:this.baseTheme.brightTextColor}]}>{this.content}</Text>
                      {this.rating?
                          <View style={[style.bookCommentPerBottom,{ backgroundColor:this.baseTheme.brightSettingItemColor,}]}>
                              <ImageView uri={this.cover} styles={[style.leftBookView,{ backgroundColor:this.baseTheme.brightDefaultColor,}]} />
                              <View style={{marginLeft:20,height:100}}>
                                  <Text style={[style.bookDetailViewTopTitleRight,{fontWeight:'500',fontSize:18,marginBottom:10, color: this.baseTheme.brightNavTextColor}]}>{this.bookTitle}</Text>
                                  <Text style={[style.authorView,{color:this.baseTheme.brightNavTextColor,fontSize:14,marginBottom:10}]}>楼主打分</Text>
                                  <StarRating
                                      disabled={false}
                                      maxStars={5}
                                      emptyStar={BaseImage.start1}
                                      fullStar={BaseImage.start3}
                                      halfStar={BaseImage.start2}
                                      starSize={18}
                                      rating={this.rating}
                                      containerStyle={{width:60,marginBottom:5}}/>
                              </View>
                          </View>:null
                      }
                      <View style={{width:WIDTH,height:110}}/>
                  </ScrollView>
              </BaseContainer>
          )
     }

}