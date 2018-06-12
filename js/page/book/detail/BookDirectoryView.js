/**
 * @flow
 * 图书章节目录
 */
import React from 'react';
import {View,TouchableOpacity,Text,FlatList} from 'react-native';
import {SafeAreaView } from 'react-navigation';
import {inject,observer} from "mobx-react";
import {style} from "../Styles";
import {DrawerActions} from "react-navigation";

@inject('bookDetailStore','baseTheme')
@observer
export class BookDirectoryView extends React.Component{

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.bookDetailStore = this.props.bookDetailStore;
        this.brightBackGroundColor = this.props.baseTheme.brightBackGroundColor;
        this.brightTextColor =this.props.baseTheme.brightTextColor;
    }

    render(){

        return(

            <SafeAreaView
                style={[style.container,{
                    backgroundColor:this.brightBackGroundColor
                }]}>

                <View style={style.chapter_view}>
                    <Text style={[style.chapter_title,{ color:this.brightNavTextColor,}]}>{this.bookDetailStore.bookTitle}</Text>
                </View>

                <FlatList
                    data={this.bookDetailStore.chapter_data.slice(0)}
                    keyExtractor={this._keyExtractor}
                    showsVerticalScrollIndicator={false}
                    onEndReachedThreshold={0.5}
                    initialNumToRender={10}
                    renderItem={this._renderItem}
                />

            </SafeAreaView>
        )

    }
    _keyExtractor=(item,i)=>i+'';

    _renderItem=({item})=>{
        return(
            <TouchableOpacity
                onPress={()=>this.onPress(item)}
                style={style.chapter_item}>
                <Text style={[style.chapter_item_title,{ color:this.brightTextColor}]}>{item.title}</Text>
            </TouchableOpacity>
        )
    }

    onPress(item){

        let link = item.link;
        this.props.navigation.dispatch(DrawerActions.closeDrawer());
        setTimeout(()=>{
            this.props.navigation.navigate('BookReaderScreen',{link:link})
        },100)
    }
}

