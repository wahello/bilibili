/**
 * @flow
 */

import * as React from 'react';
import {Provider} from 'mobx-react';
import Store  from './mobx/index';
import configAppNavigator from './route/TabRoute';
var AV = require('leancloud-storage');

var APP_ID = 'l4XQkKQfWm4rg9jQ0CtdEuhg-gzGzoHsz';
var APP_KEY = 'yv0V7QfBSh2iNjM6ih7V1z6o';

AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});

type State = {
    initApp:string;
    show:boolean
}

export default class App extends React.Component<any,State>{

    state={
        initApp:'',
        show:true
    };

    async componentDidMount() {
        await setTimeout(()=>{
          this.setState({
              initApp:'Tab'
          })
        })
    }

    render(){

        const {initApp} = this.state;
        if (!!initApp){
            const App = configAppNavigator(initApp);
            return(
                <Provider {...Store}>
                   <App/>
                </Provider>
            )
        }
        return null;
    }

}
