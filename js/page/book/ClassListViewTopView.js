/**
 * @flow
 */
import React from 'react';
import {View,Text,Image,TouchableOpacity,ScrollView,StyleSheet,Animated} from 'react-native';
import {scaleSize} from "../../utils/ScreenUtils";
import {BaseString} from '../../base';
import {observer,inject} from 'mobx-react';

type Props ={
    isClassType:boolean,
    classType:Array<any>,
    onChoose:()=>void,
    onChooseClass:()=>void,
};

type State={
    topIndex:number,
    bottomIndex:number,
};

@inject('baseTheme','bookClassListStore')
@observer
export class ClassListViewTopView extends React.Component<Props,State>{

    // 构造
      constructor(props) {
        super(props);
        this.baseTheme= this.props.baseTheme;
        this.bookClassListStore = this.props.bookClassListStore;

      }

    componentWillUnmount() {
        this.bookClassListStore.topIndex=0;
        this.bookClassListStore.bottomIndex=0;
    }

    render(){
        return(

            <View
                style={
                    [style.classListViewTopView,
                    {height:this.props.isClassType?scaleSize(160):scaleSize(90),
                    backgroundColor:this.baseTheme.brightNavBackGroundColor}]}>
                <View style={{flexDirection:'row',marginBottom:10,marginLeft:10,marginTop:10}}>
                {BaseString.BOOK_TOP_CLASS_TYPE.map((item,i)=>{
                    return(
                        <TouchableOpacity
                            key={i}
                            onPress={()=>this.onPress(i,item)}
                            activeOpacity={0.9}
                            style={[style.leftTypeView,{backgroundColor:this.bookClassListStore.topIndex===i?'red':null}]}>
                            <Text style={[style.drop_down_title,{color:this.bookClassListStore.topIndex===i?'#fff':'#666666'}]}>{item.title}</Text>
                        </TouchableOpacity>
                    )})}
                </View>

                {/*<View style={style.divider}/>*/}
                {this.props.isClassType?
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    style={{marginLeft:10,marginRight:20}}>
                    {this.props.classType.map((item,i)=>{
                        return(
                            <TouchableOpacity
                                key={i}
                                onPress={()=>this.onPress1(i,item)}
                                activeOpacity={0.9}
                                style={[style.leftTypeView,{width:WIDTH/5,backgroundColor:this.bookClassListStore.bottomIndex===i?'red':null}]}>
                                <Text style={[style.drop_down_title,{color:this.bookClassListStore.bottomIndex===i?'#fff':'#666666'}]}>{item.title}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </ScrollView>:null}
            </View>
        )
    }

    onPress=(index,item)=>{
         this.bookClassListStore.changeTopIndex(index);
         this.props.onChoose(item)
    };

    onPress1=(index1,item)=>{
        this.bookClassListStore.changeBottomIndex(index1);
        this.props.onChooseClass(item.title)
    }

}

const style = StyleSheet.create({
    classListViewTopView:{
        width:WIDTH,
        borderBottomWidth:StyleSheet.hairlineWidth,
        borderBottomColor:'#A7A7AA'
    },
    leftTypeView:{
        width:WIDTH/6,
        height:25,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:25
    },
    drop_down_title:{
        fontSize:scaleSize(23),
    },
});
