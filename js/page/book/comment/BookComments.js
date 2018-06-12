/**
 * @flow
 */
import React from 'react';
import {View, ScrollView} from 'react-native';
import {observer,inject} from 'mobx-react';
import {BaseContainer} from '../../../base/index';
import {BookCommentLoading} from "../../../component/Loading/BookCommentLoading";
import {BookCommentTopView} from "./BookCommentTopView";
import {BookCommentTabView} from "./BookCommentTabView";

@inject('bookCommentStore','baseTheme')
@observer
export class BookComments extends React.Component{

    // 构造
      constructor(props) {
        super(props);
        this.id = this.props.navigation.state.params.id;
        this.bookCommentStore = this.props.bookCommentStore;

      }

    componentDidMount() {
          this.bookCommentStore.fetchBookComments(this.id)
    }

    render(){

          console.log(this.bookCommentStore.isLoading)

        return(
            <BaseContainer
                showGoBack={true}
                title='书评区'
                store={this.bookCommentStore}
                loading_children={<BookCommentLoading/>}>
                <BookCommentTopView onPress={this.collection}/>
                <BookCommentTabView/>
            </BaseContainer>
        )
    }
    collection=()=>{
          this.bookCommentStore.collection();
    }
}