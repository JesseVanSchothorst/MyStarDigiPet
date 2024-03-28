import React from 'react';
import { Image, View } from 'react-native';
import styles from '../styles/styles.js';

const stars = [
    require('../assets/images/star-angry.png'),
    require('../assets/images/star-blank.png'),
    require('../assets/images/star-happy.png'),
    require('../assets/images/star-dizzy.png'),
    require('../assets/images/star-dead.png'),
];

const Stars = (props) => {
    return (
        <View>
            <Image
                style={ styles.digipetImage  }
                source={stars[props.starNumber]}
            />
        </View>
    );
}

export default Stars;
