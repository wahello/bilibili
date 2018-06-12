/**
 * @flow
 */
import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import FastImage from 'react-native-fast-image';
import type {Style} from "../utils/type";

type Props={
    uri:string,
    width:number,
    style:Style,
    onLoad:()=>void
}

type State={
    height:number,
    width:number
}

export default class AutoSizingImage extends Component<Props,State> {
    state:State = {
        height: 0,
        width: 0,
    };

    onLoad = e => {
        const {
            nativeEvent: { width, height },
        } = e
        this.setState({ width, height })
        if (this.props.onLoad) this.props.onLoad(e)
    }

    getHeight = () => {
        if (!this.state.height) return this.props.defaultHeight
        const ratio = this.state.height / this.state.width
        const height = this.props.width * ratio
        return height
    }

    render() {
        const height = this.getHeight()
        return (
            <FastImage
                {...this.props}
                source={
                    {uri:this.props.uri, priority: FastImage.priority.normal,cache:'force-cache'}
                }
                resizeMode={FastImage.resizeMode.contain}
                onLoad={this.onLoad}
                style={[{ width: this.props.width, height ,borderRadius:5}, this.props.style]}
            />
        )
    }
}


type Props={
    styles:Style,
    uri:string|number,
    children:React.Children
}
/**
 * 图片显示组件
 * @param props
 * @returns {*}
 * @constructor
 */
export const ImageView=(props:Props)=>(
    <FastImage
        style={props.styles}
        source={
            {uri:props.uri, priority: FastImage.priority.normal,cache:'force-cache'}
        }
        resizeMode={FastImage.resizeMode.contain}>
        {props.children}
    </FastImage>
);

