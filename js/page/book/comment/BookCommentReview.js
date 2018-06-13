import React from 'react';
import {View,Text,FlatList,Image, TouchableOpacity} from 'react-native';
import {observer,inject} from 'mobx-react';
import {getTime} from "../../../fun";
import {BaseApi} from "../../../assest/api";
import {RouteHelper} from 'react-navigation-easy-helper';
import {ImageView} from "../../../component/AutoSizingImage";
import {BaseImage} from '../../../base';
import {style} from "../Styles";
import StarRating from "react-native-star-rating";
import {BookCommentDetail} from "./BookCommentDetail";

@inject('baseTheme','bookCommentStore','bookDetailStore')
@observer
export default class BookCommentReview extends React.Component{

    // 构造
    constructor(props) {
        super(props);
        this.bookCommentStore = this.props.bookCommentStore;
        this.bookDetailStore = this.props.bookDetailStore;
        this.baseTheme = this.props.baseTheme;
    }

    render(){

        return(
            <FlatList
                data={this.bookCommentStore.bookReviewsComments.slice(0)}
                keyExtractor={this._keyExtractor}
                showsVerticalScrollIndicator={false}
                renderItem={this._renderItem}
                bounces={false}
                ListHeaderComponent={this.ListHeaderComponent}
                ItemSeparatorComponent={ItemSeparatorComponent}
            />
        )
    }


    _keyExtractor=(item,i)=>i+'';

    _renderItem=({item})=>{

        let title = item.title;
        let content = item.content;
        let avatar = BaseApi.BookBase4 +item.author.avatar;
        let nickname = item.author.nickname;
        let lv = item.author.lv;
        let created = getTime(item.created,new Date());
        let yes = item.helpful.yes + '有用';
        let rating = item.rating;
        let state = item.state;  //"distillate" 精品
        let id = item.author._id;

        const params ={
            content:content,avatar:avatar,created:created,lv:lv,nickname:nickname,title:title,
            rating:rating,cover:this.bookDetailStore.cover,bookTitle:this.bookDetailStore.bookTitle
        };

        return(
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={()=> RouteHelper.navigate('BookCommentDetail',params)}>
                <View style={[style.bookReviewScreenView,{height:200,backgroundColor:this.baseTheme.brightBackGroundColor}]}>
                    <Text style={[style.bookReviewScreenViewTitle,{color:this.baseTheme.brightNavTextColor}]} numberOfLines={1}>{title}</Text>
                    <Text numberOfLines={3} style={[style.bookReviewScreenContent,{color:this.baseTheme.brightTextColor,}]}>{content}</Text>
                    <View style={style.bookReviewScreenViewBottom}>
                        <ImageView uri={avatar} styles={[style.evaluationItemImageView,{ borderColor:this.baseTheme.brightTextColor,}]}/>
                        <View style={{width:WIDTH}}>
                            <View style={{flexDirection:'row'}}>
                                <Text style={{ color:this.baseTheme.brightTextColor,}}>{nickname}</Text>
                                <View style={[style.avatarLvView,{ borderColor:this.baseTheme.brightTextColor,}]}>
                                    <Text style={[style.avatarLv,{ color:this.baseTheme.brightTextColor,}]}>lv.{lv}</Text>
                                </View>
                            </View>
                            <Text style={[style.wordCount1,{ color:this.baseTheme.brightTextColor}]}>{created}</Text>

                            <View style={style.ratingView}>
                                <StarRating
                                    disabled={false}
                                    maxStars={5}
                                    emptyStar={BaseImage.start1}
                                    fullStar={BaseImage.start3}
                                    halfStar={BaseImage.start2}
                                    starSize={14}
                                    rating={rating}
                                    containerStyle={{width:60,marginBottom:5}}/>
                                <Text style={[style.wordCount1,{ color:this.baseTheme.brightTextColor}]}>{yes}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    };

    ListHeaderComponent=()=>{
        return(
            <View style={[style.commentTopView,{ backgroundColor:this.baseTheme.brightBackGroundColor,}]}>
                <Image style={style.commentTopViewLeft} source={BaseImage.message}/>
                <Text style={[style.commentTopViewRight,{color:this.baseTheme.brightTextColor}]}>{this.bookCommentStore.bookReviewsTotal}条讨论</Text>
            </View>
        )
    };

}

const ItemSeparatorComponent=()=>(
    <View style={style.itemSeparatorComponent}>
        <View style={{width:WIDTH-40,height:POXEL,backgroundColor:'#eaeaea'}}/>
    </View>
);