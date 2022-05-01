import React, { useState } from 'react';
import { ImageProps, Image } from 'react-native';
import FastImage from 'react-native-fast-image';

type Props = ImageProps & {
    fallback: React.ReactElement
};
const FallbackImage: React.FC<Props> = ({
    fallback,
    ...props
}) => {
    const [error, setError] = useState(false);

    const allProps: any = {
        ...props,
        onError: () => { setError(true); }
    }

    return error ? fallback : (
        <FastImage {...allProps} />
    );
}
export default FallbackImage;
