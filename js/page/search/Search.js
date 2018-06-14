import React from 'react';
import {View, Animated, Easing, TextInput, StatusBar,Image, TouchableOpacity, Text, Keyboard} from 'react-native';
import {BaseImage,BaseString} from '../../base';
import {observer,inject} from 'mobx-react';
import {style} from "./Style";

@inject('baseTheme','basePageStore','bookSearchStore')
@observer
export class Search extends React.Component{

        // 构造
          constructor(props) {
            super(props);
            // 初始状态
            this.top = this.props.baseTheme.statusBarHeight;
            this.brightBackGroundColor = this.props.baseTheme.brightBackGroundColor;
            this.brightSettingItemColor = this.props.baseTheme.brightSettingItemColor;
            this.brightTextColor = this.props.baseTheme.brightTextColor;
            this.brightSearchColor = this.props.baseTheme.brightSearchColor;
            this.isDark = this.props.baseTheme.isDark;
            this.bookSearchStore = this.props.bookSearchStore;
            this.basePageStore = this.props.basePageStore;
            this.state={
                searchTopView:new Animated.Value(0),
                searchBottomView:new Animated.Value(0),
            }
          }

        componentDidMount() {
            this.showSearchView()
        }
          showSearchView=()=>{
              this.state.searchTopView.setValue(0);
              this.state.searchBottomView.setValue(0);
              this.isDark? StatusBar.setBarStyle('light-content',true):StatusBar.setBarStyle('dark-content',true)
              Animated.parallel([
                  Animated.spring(this.state.searchTopView,{
                      toValue:1,
                      friction: 8,
                      tension: 50,
                      useNativeAnimations:true
                  }),
                  Animated.spring(this.state.searchBottomView,{
                      toValue:1,
                      friction: 8,
                      tension: 50,
                      useNativeAnimations:true
                  } )
              ]).start();
          };

          hideSearchView=()=>{
              Keyboard.dismiss();
              Animated.parallel([
                  Animated.spring(this.state.searchTopView,{
                      toValue:0,
                      friction: 8,
                      tension: 50,
                      useNativeAnimations:true
                  }),
                  Animated.spring(this.state.searchBottomView,{
                      toValue:0,
                      friction: 8,
                      tension: 50,
                      useNativeAnimations:true
                  } )
              ]).start(()=>{
                  !this.isDark? StatusBar.setBarStyle('dark-content',true):null;
              });
              this.timer = setTimeout(()=>{
                  this.basePageStore.showSearch(false)
              })
          };

        render(){

            const searchTop = this.state.searchTopView.interpolate({
                inputRange:[0,1],
                outputRange:[-44-this.top,0]
            });

            const searchBottom = this.state.searchBottomView.interpolate({
                inputRange:[0,1],
                outputRange:[HEIGHT*2,(50+this.top)]
            });


            return[
                <StatusBar barStyle='dark-content'/>,
                <Animated.View style={[style.topSearchView,{
                    height:44+this.top,
                    width:WIDTH,
                    paddingTop:this.top,
                    backgroundColor:this.brightSettingItemColor,
                    transform:[{translateY:searchTop}]}]}>
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
                            value={this.bookSearchStore.textInputContext}
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
                        onPress={this.onCancel}
                        activeOpacity={0.9}
                        style={style.cancel}>
                    <Text style={{color:this.brightTextColor}}>{BaseString.CANCEL}</Text>
                    </TouchableOpacity>

                     </Animated.View>,
                    <Animated.View
                        style={[style.bottomSearchView,{
                            backgroundColor:this.brightBackGroundColor,
                                height:HEIGHT,
                                transform:[{translateY:searchBottom}]
                        }]}>

                    </Animated.View>
            ]
        }

    //搜索按钮
    onSubmitEditing=()=>{
        this.bookSearchStore.fetchSearchData()
    };

    onChangeText(e){
       this.bookSearchStore.inputTextContext(e);
    };

    onChange=()=>{
        this.bookSearchStore.fetchAutoData()
    };

    //清楚输入框内容
    clearTextInputContext=()=>{
        this.bookSearchStore.clearTextInputContext();
    };
    //取消
    onCancel=()=>{
        this.hideSearchView()
    };
}
