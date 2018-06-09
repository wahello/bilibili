import React from 'react';
import {View,FlatList,TouchableOpacity, Text} from 'react-native';
import {observer,inject} from 'mobx-react';
import {SafeAreaView} from 'react-navigation';
import {style} from "./Styles";
import {RouteHelper} from 'react-navigation-easy-helper';

@inject('baseTheme','bookDetailStore')
@observer
export class BookSideMenu extends React.Component{

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.brightBackGroundColor= this.props.baseTheme.brightBackGroundColor;
        this.bookDetailStore = this.props.bookDetailStore;
        this.brightTextColor = this.props.baseTheme.brightTextColor
      }

    render(){

        this.chapter_data=this.bookDetailStore.chapter_data.slice(0);
        let title = this.bookDetailStore.bookTitle;

        return(
            <SafeAreaView style={{flex:1,backgroundColor:this.brightBackGroundColor}}>

                <View>

                </View>

                <FlatList
                    data={this.chapter_data}
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
                <Text style={[style.chapter_item_title,{color:this.brightTextColor}]}>{item.title}</Text>
            </TouchableOpacity>
        )
    }

    onPress(item){
        let link = item.link;
        setTimeout(()=>{
            RouteHelper.navigate('BookReaderScreen',{link:link})
        },100)

    }

}