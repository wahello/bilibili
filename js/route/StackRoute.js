/**
 * @flow
 */

import {ClassListView} from '../page/book/ClassListView'
import {BookDetail} from '../page/book/BookDetail';
import {createDrawerNavigator} from "react-navigation";
import {BookDirectoryView} from "../page/book/BookDirectoryView";

const confing = {
    gesturesEnabled:true,
    headerBackTitleStyle:{color:'#000'},
    headerTintColor:'#000',
};


const StackRoute = {
    ClassListView:{
        screen:ClassListView,
        navigationOptions:({navigation})=>({
            headerTitle:navigation.state.params.major,
            headerStyle:{borderBottomWidth:0},
            ...confing
        })
    },
    BookDetail:{
        screen:BookDetail,
        navigationOptions:({navigation})=>({
            headerTitle:navigation.state.params.bookTitle,
            headerStyle:{borderBottomWidth:0},
            ...confing
        })
    },
    //Test:BaseStack.StackItem(Test,'标题'),
};

export default StackRoute;

