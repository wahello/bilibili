/**
 * @flow
  */

import * as React from 'react';
import {View, StatusBar} from 'react-native';
import {observer,inject} from 'mobx-react';
import {BaseContainer} from '../../../base/index';
import {BookReaderDetails} from './BookReaderDetails';
import {BookImageDetails} from '../detail/BookImageDetails';

@inject('baseTheme','bookReadStore','bookDetailStore')@observer
export class BookReaderScreen extends React.Component{

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
       this.baseTheme = this.props.baseTheme;
       this.bookReadStore = this.props.bookReadStore;
       this.link = this.props.navigation.state.params.link;
       this.chapter_data = this.props.bookDetailStore.chapter_data;
      }

    componentDidMount() {


        if (this.link ===0){
           this.bookReadStore.chapterFetch(this.chapter_data[0].link)
        } else {
            this.bookReadStore.chapterFetch(this.link)
        }
    }

    render(){

        let content_book = '\u3000\u3000' + this.bookReadStore.chapter;
        let content_image = this.bookReadStore.chapter.slice(0);
        let title =this.bookReadStore.chapterTitle;

        return(

            <BaseContainer
                navBar={null}
                store={this.bookReadStore}>

                <StatusBar hidden={true}/>
                {this.bookReadStore.isImages?<BookImageDetails data={content_image}/>: <BookReaderDetails title={title} content={content_book}/>}

            </BaseContainer>
        )
    }
}
