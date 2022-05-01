import React, {
    useState,
    useEffect,
    useRef
} from 'react';

import {
    Image,
    TouchableOpacity,
    ImageBackground,
    ImageProps,
    Platform
} from 'react-native';
import FastImage from 'react-native-fast-image';

const resolveAssetSource = Image.resolveAssetSource;

type Props = ImageProps & {
    width?: number,
    height?: number,
    onPress?(): void,
    onSize?(data: { width: number, height: number }): void,
    background?: boolean,
}

const ImageRatio: React.FC<Props> = ({
    background = false,
    onSize = size => { },
    ...props
}) => {
    const ImageComponent: any = background
        ? ImageBackground
        : Platform.OS === 'android' ? FastImage : Image;;

    const [scalableWidth, setScalableWidth] = useState<number>();
    const [scalableHeight, setScalableHeight] = useState<number>();
    // const [image, setImage] = useState(<ImageComponent />);
    const mounted = useRef(false);

    useEffect(() => {
        mounted.current = true;

        return () => {
            mounted.current = false;
        }
    }, []);

    useEffect(() => {
        onProps(props);
    });

    const onProps = (localProps: any) => {
        const { source } = localProps;
        if (source.uri) {
            const sourceToUse = source.uri
                ? source.uri
                : source;

            Image.getSize(
                sourceToUse,
                (width, height) => adjustSize(width, height, props),
                console.log
            );
        }
        else {
            const sourceToUse = resolveAssetSource(source);
            adjustSize(sourceToUse.width, sourceToUse.height, props);
        }
    };

    const adjustSize = (sourceWidth: number, sourceHeight: number, localProps: any) => {
        // console.log(sourceWidth, sourceHeight, localProps)
        const { width, height } = localProps;

        let ratio = 1;

        if (width && height) {
            ratio = Math.min(width / sourceWidth, height / sourceHeight);
        }
        else if (width) {
            ratio = width / sourceWidth;
        }
        else if (height) {
            ratio = height / sourceHeight;
        }

        if (mounted.current) {
            const computedWidth: number = sourceWidth * ratio;
            const computedHeight: number = sourceHeight * ratio;

            // console.log('computed', computedHeight, computedWidth)

            setScalableWidth(computedWidth);
            setScalableHeight(computedHeight);

            onSize({ width: computedWidth, height: computedHeight });
        }
    };

    if (!scalableWidth || !scalableHeight)
        return null;

    const image = <ImageComponent
        {...props}
        style={[props.style, {
            width: scalableWidth,
            height: scalableHeight
        }]}
    />;

    if (!props.onPress) {
        return image;
    }
    else {
        return (
            <TouchableOpacity onPress={props.onPress}>
                {image}
            </TouchableOpacity>
        );
    }
};



export default ImageRatio;