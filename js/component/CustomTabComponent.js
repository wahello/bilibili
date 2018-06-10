/**
 * @flow
 */
import *as React from 'react';
import { Keyboard } from 'react-native';
import { BottomTabBar } from 'react-navigation-tabs';

type Prop = {};
type State = { visible: boolean };

export default class CustomTabComponent extends React.Component<Prop,State>{

    state:State = {
        visible:true
    }

    componentDidMount() {
        this.kbShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardWillShow);
        this.kbHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardWillHide);
    }

    keyboardWillShow = () => {
        console.log('keyboardwillshow');
        this.setState({ visible: false });
    };

    keyboardWillHide = () => {
        console.log('keyboardwillhide');
        this.setState({ visible: true });
    };

    componentWillUnmount() {
        this.kbShowListener.remove();
        this.kbHideListener.remove();
    }

    render() {
        return this.state.visible && <BottomTabBar {...this.props}/>;
    }
}