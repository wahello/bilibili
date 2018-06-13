import React from 'react';
import {View} from 'react-native';
import {BaseContainer} from '../../base';
import {observer,inject} from 'mobx-react';

@inject('baseTheme')
@observer
class Search extends React.Component{

        render(){
            return(
                <BaseContainer>

                </BaseContainer>
            )
        }
}