/**
 * @flow
  */

import * as React from 'react';
import {View} from 'react-native';
import {observer,inject} from 'mobx-react';
import {BaseContainer} from '../../base';

@inject('baseTheme')@observer
export class BookReaderScreen extends React.Component{

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
       this.baseTheme = this.props.baseTheme;
      }

    render(){

        return(

            <BaseContainer/>

        )

    }
}
