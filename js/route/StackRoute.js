/**
 * @flow
 */

import {ClassListView} from '../page/book/ClassListView'
import {BookDetail} from '../page/book/BookDetail';
import {createDrawerNavigator} from "react-navigation";
import {BookDirectoryView} from "../page/book/BookDirectoryView";
import {BaseTheme} from "../base";
import {BookSideMenu} from "../page/book/BookSideMenu";
import {BookReaderScreen} from "../page/book/BookReaderScreen";

const confing = {
    gesturesEnabled:true,
    headerBackTitleStyle:{color:'#000'},
    headerTintColor:'#000',
    headerTitleStyle:{
        color:new BaseTheme().brightNavTextColor
    },
};


const StackRoute = {
    ClassListView:{
        screen:ClassListView,
        navigationOptions:({navigation})=>({
            headerTitle:navigation.state.params.major,
            headerStyle:{
                borderBottomWidth:0,
                backgroundColor:new BaseTheme().brightNavBackGroundColor},
            ...confing
        })
    },
    BookDetail:{
        screen:BookDetail,
        navigationOptions:({navigation})=>({
            headerTitle:navigation.state.params.bookTitle,
            headerStyle:{
                borderBottomWidth:0,
                backgroundColor:new BaseTheme().brightBackGroundColor},
            ...confing
        })
    },
    BookSideMenu:{
        screen:BookSideMenu
    },
    BookReaderScreen:{
        screen:BookReaderScreen
    }
    //Test:BaseStack.StackItem(Test,'标题'),
};

export default StackRoute;

