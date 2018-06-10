/**
 * @flow
 * 图书详情页 更多推荐图书部分
 */
import React from 'react';
import {View,Text,TouchableOpacity,Image,FlatList} from 'react-native';
import {style} from "./Styles";
import {observer,inject} from 'mobx-react';
import {ImageView} from "../../component/ImageView";
import {BaseString} from '../../base';
import {BaseApi} from "../../assest/api";
import {RouteHelper} from 'react-navigation-easy-helper';

type Props={
    recommend_data:Array<any>
}

@inject('baseTheme','bookDetailStore')
@observer
export class BookDetailMoreBook extends React.Component<Props,any>{

    // 构造
    constructor(props) {
        super(props);
        this.bookDetailStore= this.props.bookDetailStore;
        this.brightBackGroundColor = this.props.baseTheme.brightBackGroundColor;
        this.brightTextColor = this.props.baseTheme.brightTextColor;
        this.brightDefaultColor= this.props.baseTheme.brightDefaultColor;
        this.brightNavTextColor = this.props.baseTheme.brightNavTextColor;
    }

    render(){

        const {recommend_data} = this.bookDetailStore;

        return(
            <View style={style.evaluationView}>
                <View style={{flexDirection:'row',alignItems:'center',height:60,marginTop:10}}>
                    <Text style={[style.evaluationViewTitle,{
                        color: this.brightNavTextColor,
                    }]}>{BaseString.MAY_LIKE}</Text>
                    <TouchableOpacity style={style.lookMoreView}><Text style={[style.lookMoreTitle,{color:this.brightNavTextColor}]}>{BaseString.LOOK_MORE}></Text></TouchableOpacity>
                </View>
                <FlatList
                    contentContainerStyle={{justifyContent:'center',alignItems:'center',marginBottom:30}}
                    data={recommend_data.slice(0,6)}
                    keyExtractor={this._keyExtractor}
                    showsVerticalScrollIndicator={false}
                    renderItem={this._renderItem}
                    numColumns={3}
                    bounces={false}

                />
                <View style={[style.bookLoadBottomView,{width:WIDTH-60}]}/>
            </View>
        )

    }

    _keyExtractor=(item,i)=>i+'';

    _renderItem=({item})=>{

        let recommend_image = BaseApi.BookBase4+item.cover;
        let recommend_title = item.title;
        let recommend_id = item._id;

        return(
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={()=>RouteHelper.replace('BookDetail',{id:recommend_id,bookTitle:recommend_title})}
                //onPress={()=>this.bookDetailStore.fetchBookDetail(recommend_id)}
                style={style.recommend_book}>
                <ImageView uri={recommend_image} styles={[style.recommend_image,{ backgroundColor:this.brightDefaultColor,}]}/>
                <Text style={{fontSize:12,width:WIDTH/3-40,color:this.brightTextColor}} numberOfLines={1}>{recommend_title}</Text>
            </TouchableOpacity>
        )
    }

}