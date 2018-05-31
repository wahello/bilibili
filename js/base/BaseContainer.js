/**
 * @flow
 */
import React, {Component} from 'react';
import {
    View,
    StyleSheet
} from 'react-native';

import {observer,inject} from 'mobx-react';
// import {LoadingView} from "./LoadingView";
// import {ErrorView} from "./ErrorView";
import BaseNavBar from './BaseNavBar'

type Props={

    store: any,
    onErrorPress: void,
    navBar: any,
    title: string,
    hideLeft: boolean,
    leftPress: any,
    leftTitle: string,
    leftView: any,
    leftIcon: string | number,
    hideRight: boolean,
    rightPress: void,
    rightView: any,
    rightIcon: any,
    rightTitle: string,
    hasShadow: boolean
}

@inject('baseTheme')
@observer
export default class BaseContainer extends Component <Props>{

    static defaultProps = {
        hasShadow:false
    }

    // 构造
      constructor(props) {
        super(props);
        this.baseTheme = this.props.baseTheme;
      }

    renderContent() {
        const {store, children, onErrorPress} = this.props;
        if (!store) return children;
        const {isLoading, isError} = store;
        if (isLoading) return <View/>;
        if (isError) return <View/>;
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

        return <View style={[styles.container,{backgroundColor:this.baseTheme.brightBackGroundColor}]}>
            {this.renderNavView()}
            {this.renderContent()}
        </View>
    }
}

const styles = StyleSheet.create({
    container: {flex: 1}
});