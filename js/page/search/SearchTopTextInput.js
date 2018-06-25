import React from 'react';
import {View, TextInput, TouchableOpacity,Text,Image} from 'react-native';
import {observer,inject} from 'mobx-react';
import {style} from "./Style";
import {BaseImage, BaseString} from "../../base";
import {Search} from "./Search";

@inject('baseTheme','bookSearchStore')
@observer
export class SearchTopTextInput extends React.Component{

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
          this.brightTextColor = this.props.baseTheme.brightTextColor;
          this.brightSearchColor = this.props.baseTheme.brightSearchColor;
          this.bookSearchStore = this.props.bookSearchStore;
      }

    render(){

        return(
            <View style={{flexDirection:'row'}}>
                <View style={style.searchInputView}>
                    <TextInput
                        ref='searchTextInput'
                        placeholder={BaseString.SEARCH_CONTEXT}
                        placeholderTextColor={this.brightTextColor}
                        underlineColorAndroid="transparent"
                        style={[style.searchView,{
                            backgroundColor:this.brightSearchColor,
                            borderRadius:30,color:this.brightTextColor
                        }]}
                        onChange={this.onChange}
                        returnKeyType='search'
                        onChangeText={(e)=>this.onChangeText(e)}
                        defaultValue={this.bookSearchStore.textInputContext}
                        onSubmitEditing={this.onSubmitEditing}
                    />
                    {this.bookSearchStore.textInputContext.length>0?
                        <TouchableOpacity
                            onPress={this.clearTextInputContext}
                            activeOpacity={1}
                            style={style.closeView}>
                            <Image
                                style={style.closeImage}
                                source={this.isDark?BaseImage.search_close_dark:BaseImage.search_close_bright}/>
                        </TouchableOpacity>: null}

                </View>
                <TouchableOpacity
                    onPress={this.props.onCancel}
                    activeOpacity={0.9}
                    style={style.cancel}>
                    <Text style={{color:this.brightTextColor}}>{BaseString.CANCEL}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    //搜索按钮
    onSubmitEditing=()=>{
        //TODO 点击键盘搜索,进入另外一个有书单的页面
        this.bookSearchStore.fetchSearchData()
    };

    onChangeText(e){
        //TODO 输入框模糊搜索,点击条目进入书本详情
        this.bookSearchStore.inputTextContext(e);
    };

    onChange=()=>{
        this.bookSearchStore.fetchAutoData()
    };

    //清楚输入框内容
    clearTextInputContext=()=>{
        this.bookSearchStore.clearTextInputContext();
    };

}