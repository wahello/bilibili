/**
 * @flow
 */
import * as React from 'react';
import FastImage from 'react-native-fast-image'
import {Style} from "../utils/type";

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

