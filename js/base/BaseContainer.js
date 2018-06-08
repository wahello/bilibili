/**
 * @flow
 */
import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    StatusBar,
} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import {observer,inject} from 'mobx-react';
// import {LoadingView} from "./LoadingView";
// import {ErrorView} from "./ErrorView";
import BaseNavBar from './BaseNavBar'
import {BaseError} from './index';
import {Loading,GifLoading} from "./BaseLoading";


type Props={
    store: any,
    onErrorPress: ()=>mixed,
    onLoading:()=>mixed,
}

@inject('baseTheme')
@observer
export default class BaseContainer extends Component <Props>{


      constructor(props) {
        super(props);
        this.baseTheme = this.props.baseTheme;
      }

    defaultPress = () => {
        const {store} = this.props;
        store.fetchAgain()
    };

    renderContent() {
        const {store, children, onErrorPress} = this.props;
        if (!store) return children;
        const {isLoading, isError} = store;
        if (isLoading) return <GifLoading/>;
        if (isError) return <BaseError onPress={onErrorPress || this.defaultPress}/>;
        return children;
    }


    renderNavView() {
        const {navBar, ...navProps} = this.props;
        let navView = null;
        if (typeof navBar === 'undefined') {
            navView = <BaseNavBar {...navProps}/>
        } else {
            navView = navBar;
        }
        return navView
    }

    render() {

        const {style} = this.props;

        return(
            <View
                style={[styles.container,style, {backgroundColor:this.baseTheme.brightBackGroundColor}]}>
                {this.renderNavView()}
                {this.renderContent()}
                <StatusBar
                    backgroundColor='#FFFFFF'
                    barStyle='dark-content'/>
            </View>
            )

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});