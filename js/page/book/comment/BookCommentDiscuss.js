import React from 'react';
import {View,Text,FlatList,Image, TouchableOpacity} from 'react-native';
import {observer,inject} from 'mobx-react';
import {getTime} from "../../../fun";
import {BaseApi} from "../../../assest/api";
import {RouteHelper} from 'react-navigation-easy-helper';
import {ImageView} from "../../../component/AutoSizingImage";
import {BaseImage} from '../../../base';
import {style} from "../Styles";

@inject('baseTheme','bookCommentStore')
@observer
export default class BookCommentDiscuss extends React.Component{

    // 构造
    constructor(props) {
        super(props);
        this.bookCommentStore = this.props.bookCommentStore;
        this.baseTheme = this.props.baseTheme;
    }

    render(){

        return(
            <FlatList
                data={this.bookCommentStore.bookComments.slice(0)}
                keyExtractor={this._keyExtractor}
                showsVerticalScrollIndicator={false}
                renderItem={this._renderItem}
                bounces={false}
                ListHeaderComponent={this.ListHeaderComponent}
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={ItemSeparatorComponent}
            />
        )
    }


    _keyExtractor=(item,i)=>i+'';

    _renderItem=({item})=>{

        let title = item.title;
        let created = getTime(item.created,new Date());
        let content = item.content;
        let likeCount = item.likeCount;
        let commentCount =item.commentCount;
        let avatar = BaseApi.BookBase4 +item.author.avatar;
        let nickname = item.author.nickname;
        let lv = item.author.lv;

        const params ={
            content:content,avatar:avatar,created:created,lv:lv,nickname:nickname,title:title
        };

        return(
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={()=> RouteHelper.navigate('BookCommentPer',params)}>
                <View style={[style.bookReviewScreenView,{ backgroundColor:this.baseTheme.brightBackGroundColor,}]}>
                    <Text style={[style.bookReviewScreenViewTitle,{color:this.baseTheme.brightNavTextColor}]} numberOfLines={2}>{title}</Text>
                    <View style={style.bookReviewScreenViewBottom}>
                        <ImageView uri={avatar} styles={[style.evaluationItemImageView,{ borderColor:this.baseTheme.brightTextColor,}]}/>
                        <View>
                            <View style={{flexDirection:'row'}}>
                                <Text style={{ color:this.baseTheme.brightTextColor,}}>{nickname}</Text>
                                <View style={[style.avatarLvView,{ borderColor:this.baseTheme.brightTextColor,}]}>
                                    <Text style={[style.avatarLv,{ color:this.baseTheme.brightTextColor,}]}>lv.{lv}</Text>
                                </View>
                            </View>
                            <Text style={[style.wordCount1,{ color:this.baseTheme.brightTextColor}]}>{created}</Text>
                        </View>
                    </View>
                    <View style={style.bookReviewScreenViewRight}>
                        <Image source={BaseImage.zan} style={style.commentTopViewLeft1}/>
                        <Text style={[style.wordCount1,{fontSize:13,marginRight:15, color:this.baseTheme.brightTextColor}]}>{likeCount}</Text>
                        <Image source={BaseImage.message} style={style.commentTopViewLeft1}/>
                        <Text  style={[style.wordCount1,{fontSize:13, color:this.baseTheme.brightTextColor}]}>{commentCount}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    };
    ListHeaderComponent=()=>{
        return(
            <View style={[style.commentTopView,{ backgroundColor:this.baseTheme.brightBackGroundColor,}]}>
                <Image style={style.commentTopViewLeft} source={BaseImage.message}/>
                <Text style={[style.commentTopViewRight,{ color:this.baseTheme.brightTextColor,}]}>{this.bookCommentStore.bookCommentsTotal}条讨论</Text>
            </View>
        )
    };

}

const ItemSeparatorComponent=()=>(
    <View style={style.itemSeparatorComponent}>
        <View style={{width:WIDTH-40,height:POXEL,backgroundColor:'#eaeaea'}}/>
    </View>
);