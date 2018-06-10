/**
 * @flow
 * 图书分类首页
 */
import * as React from 'react';
import {SectionList,View,Text,FlatList,TouchableOpacity,StyleSheet,Animated,} from 'react-native';
import {ImageView} from "../../component/ImageView";
import {BaseString} from "../../base/";
import {BaseApi} from "../../assest/api";
import {inject, observer} from "mobx-react";
import {RouteHelper} from 'react-navigation-easy-helper';
import {style} from "./Styles";

type Props={
    navigate:any,
    sections:any
}

type State ={
    lineXY:Animated.Value,
    offset:number
}

@inject('baseTheme')
@observer
export class ClassBookView extends React.Component<Props,State>{

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        //this.navigate = this.props.navigate;
        this.baseTheme = this.props.baseTheme;
    }

    state={
        lineXY:new Animated.Value(0),
        offset:0,
    };

    render(){

        const offset = this.state.lineXY.interpolate({
            inputRange:[0,1],
            outputRange:[0,this.state.offset]
        });

        const mHeight = this.state.lineXY.interpolate({
            inputRange:[0,0.5,1],
            outputRange:[20,40,20]
        })

        return(
            <View style={[style.container,{flexDirection:'row',backgroundColor:this.baseTheme.brightBackGroundColor}]}>
                <FlatList
                    ref='scrollView'
                    data={BaseString.BOOK_CLASS_ARRAY}
                    scrollEnabled={false}
                    keyExtractor={(item, index)=>'index'+index+item}
                    renderItem={this.renderItemLeft}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={style.leftScrollView}/>
                <Animated.View
                    style={[style.indicator,
                        {transform:[{translateY:offset}], backgroundColor:this.baseTheme.brightTopTabBottomColor,}]}/>

                <SectionList
                    ref='sectionList'
                    sections={this.props.sections}
                    renderItem={this._renderItem}
                    renderSectionHeader={this.renderSectionHeader}
                    keyExtractor={(item,i)=>item.bookCount}
                    onViewableItemsChanged = {(info)=>this.itemChange(info)}
                    ListFooterComponent={this.ListFooterComponent}
                    stickySectionHeadersEnabled={true}
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                    indicatorStyle='default'/>
            </View>
        )
    }

    ListFooterComponent=()=>{
        return(
            <View style={style.ListFooterComponent}>
                <Text style={{ color:this.baseTheme.brightTextColor}}>到底了(*^__^*) 嘻嘻……</Text>
            </View>
        )
    };
    renderItemLeft=({item,index})=>{

        return(
            <TouchableOpacity
                onLayout={this.onLayout}
                activeOpacity={0.9}
                onPress={()=>this.onChange(index)}
                style={style.leftArrayView}>
                <Text style={[style.leftLabelStyle,{ color:this.baseTheme.brightTextColor}]}>{item}</Text>
            </TouchableOpacity>
        )
    };

    onLayout=(event)=>{
        const {height} = event.nativeEvent.layout;
        this.setState({
            offset:height
        })
    };

    offsetAnimated=(i)=>{
        Animated.spring(this.state.lineXY,{
            toValue:i,
            damping:15,
            stiffness:150,
            useNativeAnimations:true
        }).start();
    };

    onChange(i){

        const params = {animated:true,itemIndex:0,sectionIndex:i,viewOffset:20};
        this.refs.sectionList.scrollToLocation(params)

    };

    itemChange(info){

        let section = info.viewableItems[0].section.key;
        if (section){
            let index = BaseString.BOOK_CLASS_ARRAY.indexOf(section);
            if (index<0){
                index = 0;
            }
            this.offsetAnimated(index);
            // this.refs.indicator.scrollTo({x:0,y:0,animated:true})
        }

    }

    renderSectionHeader=({section})=>{

        let headerTitle = section.key;

        return(
            <View style={[style.renderSectionHeader,{ backgroundColor:this.baseTheme.brightBackGroundColor,}]}>
                <View style={style.renderSectionHeader1}>
                    <Text style={[style.renderSectionHeaderTitle,{ color:this.baseTheme.brightTextColor}]}>{headerTitle}</Text>
                </View>
            </View>
        )
    };

    _renderItem=({item})=>{

        return(
            <FlatList
                data={item}
                numColumns = {2}
                renderItem = {this.renderItem}
                keyExtractor={(item, index)=>'index'+index+item}
            />
        )
    };

    renderItem=({item})=>{

        let image1 = BaseApi.BookBase4+item.bookCover[0];
        let image2 = BaseApi.BookBase4+item.bookCover[1];
        let image3 = BaseApi.BookBase4+item.bookCover[2];


        return(
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={()=>RouteHelper.navigate('ClassListView',{
                    major:item.name,
                    gender:item.type,
                    transition: 'forHorizontal1',
                })}
                style={style.renderItemTitle}>

                <View style={style.ItemView}>
                    <Text style={[style.itemTitle,{ color:this.baseTheme.brightTextColor}]}>{item.name}</Text>
                    <Text style={[style.bookCount,{ color:this.baseTheme.brightTextColor}]}>{item.bookCount}本</Text>
                </View>


                <View style={style.bookItemImg}>
                    <ImageView uri={image1} styles={style.bookItemImgView}/>
                    <ImageView uri={image2} styles={style.bookItemImgView1}/>
                    <ImageView uri={image3} styles={style.bookItemImgView2}/>
                </View>
            </TouchableOpacity>
        )
    };
}
