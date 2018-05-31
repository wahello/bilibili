/**
 * @flow
 */
import * as React from 'react';
import {SectionList,View,Text,FlatList,TouchableOpacity,StyleSheet,Animated,} from 'react-native';
import {ImageView} from "../../component/ImageView";
import {BaseString} from "../../base/";
import {BaseApi} from "../../assest/api";
import {inject, observer} from "mobx-react";

type Props={
    navigate:any,
    sections:any
}

type State ={
    lineXY:Animated,
    offset:number
}

@inject('baseTheme')
@observer
export class ClassBookView extends React.Component<Props,State>{

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.navigate = this.props.navigate;
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
                    style={[style.indicator,{transform:[{translateY:offset}],backgroundColor:this.baseTheme.brightTopTabBottomColor,}]}/>

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
                style={{marginTop:10,marginBottom:10}}
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
                onPress={()=>this.navigate('ClassListView',{
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

const style = StyleSheet.create({
    container:{
        flex:1,
    },
    leftScrollView:{
        width:60,
        justifyContent:'center'
    },
    indicator:{
        width:2,
        height:20,

        position:'absolute',
        left:6,
        top:15,
    },
    ListFooterComponent:{
        width:WIDTH,
        height:170,
        justifyContent:'center',
        marginLeft:WIDTH/2/2
    },
    leftArrayView:{
        width:60,
        height:50,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row'
    },
    leftLabelStyle:{
        fontSize:14,
    },
    renderSectionHeader:{
        width:WIDTH,
        height:35,
        justifyContent:'center',
    },
    renderSectionHeader1:{
        width:WIDTH-60,
        height:35,
        justifyContent:'center',
        alignItems:'center',
    },
    renderSectionHeaderTitle:{
        fontSize:12,
    },
    renderItemTitle:{
        width:WIDTH/3 +20,
        height:80,
        borderRadius:5,
        flexDirection:'row',
        alignItems:'center',
        marginLeft:10,
        marginBottom:10
    },
    itemTitle:{
        marginBottom:5,
        fontSize:13,
    },
    ItemView:{
        marginLeft:10,
    },
    bookCount:{
        fontSize:10,
    },

    bookItemImg:{
        position:'absolute',
        flexDirection:'row',
        width:WIDTH/5-10,
        alignItems:'flex-end',
        right:0,
        bottom:0,
    },
    bookItemImgView:{
        position:'absolute',
        bottom:0,
        width:42,
        height:60,
        zIndex:99,
        left:9
    },
    bookItemImgView1:{
        width:32,
        height:50
    },
    bookItemImgView2:{
        width:28,
        height:46
    },
});