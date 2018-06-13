/**
 * @flow
 */

import {ClassListView} from '../page/book/list/ClassListView'
import {BookDetail} from '../page/book/detail/BookDetail';
import {BookSideMenu} from "../page/book/BookSideMenu";
import {BookReaderScreen} from "../page/book/read/BookReaderScreen";
import {BookComments} from "../page/book/comment/BookComments";
import {BookCommentDetail} from '../page/book/comment/BookCommentDetail';

const confing = {
    gesturesEnabled:true,
    headerBackTitleStyle:{color:'#000'},
    headerTintColor:'#000',
    headerTitleStyle:{

    },
};


const StackRoute = {
    ClassListView:{
        screen:ClassListView,
        navigationOptions:({navigation})=>({
            headerTitle:navigation.state.params.major,
            headerStyle:{
                borderBottomWidth:0,
                },
            ...confing
        })
    },
    BookDetail:{
        screen:BookDetail,
        navigationOptions:({navigation})=>({
            headerTitle:navigation.state.params.bookTitle,
            headerStyle:{
                borderBottomWidth:0,
               },
            ...confing
        })
    },
    BookSideMenu:{
        screen:BookSideMenu
    },
    BookReaderScreen:{
        screen:BookReaderScreen
    },
    BookComments:{
        screen:BookComments
    },
    BookCommentDetail:{
        screen:BookCommentDetail
    }
    //Test:BaseStack.StackItem(Test,'标题'),
};

export default StackRoute;

