import React from 'react';
import {TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';

class MyBackButton extends React.Component {
    render() {
        return <TouchableOpacity
            {...this.props}
            onPress={() => { this.props.navigation.goBack() }} />;
    }
}
export default withNavigation(MyBackButton);