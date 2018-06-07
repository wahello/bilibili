import * as React from 'react';
import {observer,inject} from 'mobx-react'
import {ClassListViewTopView} from "./ClassListViewTopView";
import {ClassBookListView} from "./ClassBookListView";
import {View} from 'react-native';
import {BaseContainer} from '../../base';
import {RouteHelper} from 'react-navigation-easy-helper';
import {BookListLoading} from "./ClassBookListView";

@inject('bookClassListStore')
@observer
export  class ClassListView extends React.Component{

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.gender = this.props.navigation.state.params.gender;
        this.major =  this.props.navigation.state.params.major;
        this.type = 'hot';
        this.minor = '';
        this.start = 0;
        this.bookClassListStore = this.props.bookClassListStore;

    }

    componentDidMount() {
        this.bookClassListStore.fetchClassSmall(this.gender,this.major);
        this.fetchData(this.gender,this.type, this.major,this.minor,);
    }

    fetchData=(gender,type,major,minor,start)=>{
        this.bookClassListStore.fetchData(gender,type,major,minor,start);
    };


    render(){

        return(
            <View style={{flex:1}}>

                {this.bookClassListStore.showTopType?
                    <ClassListViewTopView
                        ref='topList'
                        classType={this.bookClassListStore.classSmallData.slice(0)}
                        isClassType={this.bookClassListStore.isClassType}
                        onChoose={(item)=>this.onChoose(item)}
                        onChooseClass={(item)=>this.onChooseClass(item)}/>
                    :null}

                    <ClassBookListView
                        topList={this.refs.topList}
                        jump={(id,bookTitle)=>this.jump(id,bookTitle)}
                        data={this.bookClassListStore.data.slice(0)}
                        onEndReached={this.onEndReached}/>

            </View>
        )
    }
    onChoose(item){
        this.type = item.label;
        this.fetchData(this.gender,this.type,this.major,this.minor)
    }

    onChooseClass(item){
        this.minor = item;
        this.fetchData(this.gender,this.type,this.major,this.minor)
    }

    onEndReached=()=>{
        this.start += 20;
        this.bookClassListStore.fetchMoreData(this.gender,this.type,this.major,this.minor,this.start)

    };
    jump(id,bookTitle){
        RouteHelper.navigate('BookDetail',{id:id,bookTitle:bookTitle})
    }

}