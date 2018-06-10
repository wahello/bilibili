/**
 * @flow
 * 图书
 */
import * as React from 'react';
import {BaseContainer, BaseString} from '../../base';
import {observer,inject} from 'mobx-react';
import {toJS} from 'mobx';
import {ClassBookView} from "./ClassBookView";
import SplashScreen from 'react-native-splash-screen';
import {GifLoading} from "../../base/BaseLoading";

@inject('bookClassStore','baseTheme')
@observer
export class BookScreen extends React.Component{


    // 构造
    constructor(props) {
        super(props);
        this.bookClassStore = this.props.bookClassStore;
        this.baseTheme = this.props.baseTheme;
    }
    
    componentDidMount() {
        SplashScreen.hide();
        this.bookClassStore.fetchData()
    }

    render(){

        const {navigate} = this.props.navigation;
        let sections = toJS(this.bookClassStore.data);

        return(
            <BaseContainer
                title={BaseString.TAB_BAR_HEADER_BOOK}
                store={this.bookClassStore}
                loading_children={<GifLoading/>}>
                <ClassBookView
                    navigate={navigate}
                    sections={sections}/>
            </BaseContainer>
        )
    }
}

