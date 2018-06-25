import React from 'react';
import {View,FlatList, TouchableOpacity, Image , ScrollView,Text} from 'react-native';
import {observer,inject} from 'mobx-react';
import {style} from "./Style";
import {BaseString} from '../../base';
import {RouteHelper} from "react-navigation-easy-helper";

@inject('baseTheme','bookSearchStore')
@observer
export class SearchContext extends React.Component{

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.bookSearchStore = this.props.bookSearchStore;
        this.brightTextColor = this.props.baseTheme.brightTextColor;
      }

    render(){

        if (this.bookSearchStore.textInputContext.length>0){
            return(
                <FlatList
                    data={this.bookSearchStore.automatically.slice(0)}
                    keyExtractor={this._keyExtractor}
                    showsVerticalScrollIndicator={false}
                    onEndReachedThreshold={0.1}
                    initialNumToRender={10}
                    renderItem={this._renderItem}/>
            )
        }

        return(
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{width:WIDTH}}>
                    <View style={style.hot_word}>
                        <Text style={[style.hot_word_left,{color:this.brightTextColor}]}>{BaseString.SEARCH_HOT_WORD}</Text>
                        <Text style={[style.hot_word_right,{color:this.brightTextColor}]}>{BaseString.LOOK_MORE} ></Text>
                    </View>
                    <View style={style.hot_word_item}>

                    </View>
                </View>
            </ScrollView>
        )
    }

    _keyExtractor=(item,i)=>i+'';

    _renderItem=({item})=>{
        console.log(item);
        return(
            <TouchableOpacity
                onPress={()=>this.onPress(item)}
                activeOpacity={0.9}
                style={style.keywords}>
                <Text style={{color:this.brightTextColor}}>{item.text}</Text>
            </TouchableOpacity>
        )
    };

    onPress(item){
        // console.log(item);
        if(item.tag ==='bookname'){
            RouteHelper.navigate('BookDetail',{id:item.id,bookTitle:item.text})
        }else if(item.tag === 'cat'){
            //TODO 跳转分类页  gender,major,minor,text

        }else if(item.tag ==='bookauthor'){
            //TODO 跳转到作者列表
            this.bookSearchStore.atuher = item.text;
        }

    }

}