/**
 * @flow
 * 图书详情页
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
import SideMenu from 'react-native-side-menu';
import {BaseContainer} from "../../base";
import {BookSideMenu} from './BookSideMenu';

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
        this.brightNavTextColor = this.props.baseTheme.brightNavTextColor;
    }

    componentDidMount() {
        this.fetchDate(this.props.id)
    }

    fetchDate=(id)=>{
        this.bookDetailStore.fetchBookDetail(id);
    };

    showChapterModal=()=>{

        // let view = (
        //     <View
        //         side='right'
        //         rootTransform="scale"
        //         modal={false} ref={v => this.overlayPullView = v}>
        //         <View style={{backgroundColor: '#fff', minWidth: 250, minHeight: 260, justifyContent: 'center', alignItems: 'center'}}>
        //
        //         </View>
        //     </View>
        // );
        // let drawer = Drawer.open(view, 'bottom');
    };

    render(){

        return(

            <BaseContainer

                store={this.bookDetailStore}
                showGoBack={true}
                loading_children={ <BookDetailLoading/>}
                title={this.bookTitle}>

                <ScrollView
                    style={{flex:1}}
                    showsVerticalScrollIndicator={false}>
                    <BookDetailTopView openModal={this.showChapterModal}/>
                    <BookDetailComments/>
                    <BookDetailMoreBook/>

                    {this.bookDetailStore.showCopyright?
                        <View>
                            <Text style={[style.IntroductionTitle,{color:this.brightNavTextColor}]}>图书信息</Text>
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

            </BaseContainer>
        )
    }

    startRead=()=>{
        setTimeout(()=>{
            RouteHelper.navigate('BookReaderScreen',{link:0})
        },200)
    };

}




