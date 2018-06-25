/**
 * @flow
 * 图书列表
 */
import React from 'react';
import {View,FlatList,ActivityIndicator,Text,StyleSheet,TouchableOpacity} from 'react-native';
import {observer,inject} from 'mobx-react'
import {BaseApi} from "../../../assest/api";
import {ImageView} from "../../../component/ImageView";
import {BookListLoading} from "../../../component/Loading/BookListLoading";
import {style} from "../Styles";
import {BaseString,BaseContainer} from '../../../base/index';
import AutoSizingImage from "../../../component/AutoSizingImage";
import {scaleSize} from "../../../utils/ScreenUtils";

type Props = {
    onEndReached:()=>void,
    data:Array<any>
}

@inject('bookClassListStore','baseTheme')
@observer
export class ClassBookListView extends React.Component<Props,any>{

      constructor(props) {
        super(props);
        // 初始状态
          this.bookClassListStore= this.props.bookClassListStore;
          this.brightBackGroundColor=this.props.baseTheme.brightBackGroundColor;
          this.brightDefaultColor = this.props.baseTheme.brightDefaultColor;
          this.brightNavTextColor = this.props.baseTheme.brightNavTextColor;
          this.brightTextColor = this.props.baseTheme.brightNavTextColor;
          this.brightTopTabBottomColor= this.props.baseTheme.brightTopTabBottomColor;
      }

    render(){

        return(

            <BaseContainer
                navBar={null}
                store={this.bookClassListStore}
                loading_children={<BookListLoading/>}
            >
            <FlatList
                data={this.props.data}
                keyExtractor={this._keyExtractor}
                showsVerticalScrollIndicator={false}
                onEndReachedThreshold={0.5}
                initialNumToRender={10}
                renderItem={this._renderItem}
                onEndReached={this.props.onEndReached}
                ListFooterComponent={this._ListFooterComponent}/>
            </BaseContainer>

        )
    }

    _keyExtractor=(item,i)=>i+'';

    _renderItem=({item})=>{

        let bookTitle = item.title;
        let shortIntro = item.shortIntro;
        let cover = BaseApi.BookBase4 + item.cover;
        let retentionRatio = item.retentionRatio;
        let _id = item._id;
        if (item.latelyFollower-10000>0){
          this.latelyFollower = (item.latelyFollower/10000).toFixed(1);
        }else {
          this.latelyFollower =item.latelyFollower;
        }

        return(
            <TouchableOpacity
                onPress={()=>this.props.jump(_id,bookTitle)}
                activeOpacity={1}>
                <View style={[style.bookLoadView]}>
                    <View style={ [style.leftBookView,{ backgroundColor:this.brightDefaultColor}]} >
                        <AutoSizingImage
                            uri={cover}
                            width={scaleSize(140)}
                        />
                    </View>
                <View style={style.rightBookView}>
                    <Text style={[style.BookViewTitle,{ color: this.brightNavTextColor,}]} numberOfLines={1}>{bookTitle}</Text>
                    <Text numberOfLines={2} style={[style.BookViewContext,{ color: this.brightTextColor}]}>{shortIntro}</Text>
                    <View style={{flexDirection:'row'}}>
                        <View style={{marginRight:20,flexDirection:'row'}}>
                            <Text style={[style.latelyFollower,{ color:this.brightTopTabBottomColor}]}>{this.latelyFollower}</Text>
                            {(item.latelyFollower-10000>0)?
                                <Text style={[style.latelyFollower,{ color:this.brightTopTabBottomColor}]}>{BaseString.WAN}</Text>:null}
                            <Text style={[style.retentionRatio,{ color: this.brightTextColor}]}>{BaseString.SENTIMENT}</Text>
                        </View>
                        <View  style={{marginRight:20,flexDirection:'row'}}>
                            <Text style={[style.latelyFollower,{color:this.brightTopTabBottomColor}]}>{retentionRatio}% </Text>
                            <Text style={[style.retentionRatio,{ color: this.brightTextColor}]}>{BaseString.READED_RETAINED}</Text>
                        </View>
                    </View>
                </View>
                <View style={[style.bookLoadBottomView,{ backgroundColor:this.brightDefaultColor}]}/>
                </View>
            </TouchableOpacity>
        )
    };


    _ListFooterComponent=()=>{

        if (!this.bookClassListStore.loadingMore){
            return(
                <View style={style.loadingMore}>
                    <ActivityIndicator size='small'/>
                    <Text style={{fontSize:12,marginLeft:5}}>{BaseString.LOADING_TITLE}</Text>
                </View>
            )
        }else {
            return(
                <View style={style.loadingMore}>
                   <Text style={{fontSize:12}} >{BaseString.LOADING_OVER}</Text>
                </View>
            )
        }
    };

}

