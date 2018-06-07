/**
 * @flow
 */
import React from 'react';
import {View,Text,ScrollView} from 'react-native';
import {observer,inject} from 'mobx-react';
import {BookDetailLoading,BookDetailBottomView} from "../../component/BookDetailLoading";
import {BookDetailTopView} from './BookDetailTopView';
import {style} from "./Styles";
import {BookDetailComments} from './BookDetailComments';
import {BookDetailMoreBook} from './BookDetailMoreBook';
import {RouteHelper} from 'react-navigation-easy-helper';
import {createDrawerNavigator} from "react-navigation";
import {BookDirectoryView} from "./BookDirectoryView";
import {confing} from "../../route/StackRoute";

@inject('bookDetailStore','baseTheme',)
@observer
export class BookDetail extends React.Component{

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.id = this.props.navigation.state.params.id;
        this.bookTitle = this.props.navigation.state.params.bookTitle;
        this.bookDetailStore = this.props.bookDetailStore
        this.brightBackGroundColor = this.props.baseTheme.brightBackGroundColor;
    }

    componentDidMount() {
        this.fetchDate(this.props.id)
    }

    fetchDate=(id)=>{
        this.bookDetailStore.fetchBookDetail(id);
    };

    render(){


        if (this.bookDetailStore.isLoading){
            return <BookDetailLoading/>
        }

        return(
            <View style={{flex:1,backgroundColor: this.brightBackGroundColor}}>

                <ScrollView
                    style={{flex:1}}
                    showsVerticalScrollIndicator={false}>
                    <BookDetailTopView/>
                    <BookDetailComments/>
                    <BookDetailMoreBook/>

                    {this.bookDetailStore.showCopyright?
                        <View>
                            <Text style={style.IntroductionTitle}>图书信息</Text>
                            <View style={{flexDirection:'row',marginLeft:30}}>
                                <Text style={{color:this.brightNavTextColor}}>版权:</Text>
                                <Text style={{color:this.brightNavTextColor}}>{this.bookDetailStore.copyright}</Text>
                            </View>
                        </View>
                        :null}
                    <View style={{width:WIDTH,height:100}}/>
                </ScrollView>
                <BookDetailBottomView
                    startRead={this.startRead}
                    />
            </View>
        )
    }

    startRead=()=>{
        setTimeout(()=>{
            RouteHelper.navigate('BookReaderScreen',{link:0})
        },200)
    };

}




