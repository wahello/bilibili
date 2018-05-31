import * as React from 'react';
import {View} from 'react-native';
import {BaseContainer,BaseString} from '../../base';
import {observer,inject} from 'mobx-react';

@observer
export class MineScreen extends React.Component{

    render(){
        return(
            <BaseContainer title={BaseString.TabBarHeader.MINE}/>
        )
    }
}
