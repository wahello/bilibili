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

@inject('baseTheme','bookCommentStore','bookDetailStore')
@observer
export default class BookCommentShortReview extends React.Component{

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
                data={this.bookCommentStore.bookShortComments.slice(0)}
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

        let nickname = item.author.nickname;
        let lv = item.author.lv;
        let avatar = BaseApi.BookBase4 +item.author.avatar;
        let rating = item.rating;
        let updated = getTime(item.updated,new Date());
        let likeCount = item.likeCount;
        let content = item.content

        return(
            <View style={[style.evaluationItemView,{ backgroundColor:this.baseTheme.brightBackGroundColor,}]}>
                <View style={style.evaluationItemTopView}>
                    <View style={{flexDirection:'row',alignItems:'center',marginLeft:20}}>
                        <ImageView uri={avatar} styles={[style.evaluationItemImageView,{backgroundColor:this.baseTheme.brightBackGroundColor}]}/>
                        <Text style={[style.avatarTitle,{color:this.baseTheme.brightTextColor,}]}>{nickname}</Text>
                        <View style={[style.avatarLvView,{ borderColor:this.baseTheme.brightTextColor,}]}>
                            <Text style={[style.avatarLv,{ color:this.baseTheme.brightTextColor}]}>LV.{lv}</Text>
                        </View>

                    </View>
                    <View>
                        <StarRating
                            disabled={false}
                            maxStars={5}
                            emptyStar={BaseImage.start1}
                            fullStar={BaseImage.start3}
                            halfStar={BaseImage.start2}
                            starSize={12}
                            rating={rating}
                            containerStyle={{width:60,marginRight:30,marginBottom:10}}
                        />
                    </View>
                </View>
                <View style={style.avatarContentView}>
                    <Text style={[style.avatarContent,{ color:this.baseTheme.brightTextColor,}]}>{content}</Text>
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-between',height:30,alignItems:'center',marginBottom:10}}>
                    <View style={{marginLeft:30}}>
                        <Text style={[style.avatarTitle,{color:this.baseTheme.brightTextColor,}]}>{updated}</Text>
                    </View>
                    <View style={{marginRight:30,flexDirection:'row',alignItems:'center'}}>
                        <Image source={BaseImage.praise} style={style.praise}/>
                        <Text style={[style.avatarTitle,{color:this.baseTheme.brightTextColor,}]}>{likeCount}</Text>
                    </View>
                </View>
            </View>
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