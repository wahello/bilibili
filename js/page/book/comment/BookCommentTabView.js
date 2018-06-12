/**
 * @flow
 */
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {TabView,TabBar, type NavigationState,  type Route,SceneMap} from 'react-native-tab-view';
import BookCommentDiscuss from './BookCommentDiscuss';
import BookCommentReview from './BookCommentReview';
import BookCommentShortReview from './BookCommentShortReview';
import {observer,inject} from 'mobx-react';

type State = NavigationState<
    Route<{
        key: string,
        title: string,
    }>>;

const initialLayout = {
    height: 0,
    width: WIDTH,
};
@inject('baseTheme')@observer
export class BookCommentTabView extends React.Component<*,State>{


    // 构造
      constructor(props) {
        super(props);
        this.baseTheme = this.props.baseTheme;
      }

    state = {
        index: 0,
        routes: [
            { key: 'discuss', title: '讨论' },
            { key: 'book_review', title: '书评' },
            { key: 'short_review', title: '短评' },
        ],
    };

    _handleIndexChange = index =>
        this.setState({
            index,
        });

    _renderTabBar = props => (
        <TabBar
            {...props}
            scrollEnabled
            indicatorStyle={{backgroundColor:this.baseTheme.brightTopTabBottomColor}}
            style={{backgroundColor:this.baseTheme.brightNavBackGroundColor}}
            tabStyle={{width:WIDTH/3}}
            labelStyle={{color:this.baseTheme.brightTextColor,fontWeight: '400',}}
        />
    );

    _renderScene = SceneMap({
        discuss: BookCommentDiscuss,
        book_review: BookCommentReview,
        short_review: BookCommentShortReview,
    });

    render() {
        return (
            <TabView
                style={[styles.container, this.props.style]}
                navigationState={this.state}
                renderScene={this._renderScene}
                renderTabBar={this._renderTabBar}
                onIndexChange={this._handleIndexChange}
                initialLayout={initialLayout}
            />
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabbar: {
        backgroundColor: '#FBFBFB',
    },
    tab: {
        width: 120,
    },
    indicator: {
        backgroundColor: 'red',
    },
    label: {
        color: '#000',
        fontWeight: '400',
    },
});