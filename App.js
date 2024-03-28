/**
 * File:    App.js
 * Author:  Jesse Van Schothorst
 * Brief:   App will allow us to play with a digipet
 */
import React, { useCallback, useEffect, useState } from 'react';
import { Text, View, Pressable, stylessheet, ImageBackground, StatusBar, Alert } from 'react-native';
import { Audio } from 'expo-av';

// all from components
import SaveButton from './components/saveButton';
import Stars from './components/stars';
import HappinessBar from './components/happiness';

import styles from './styles/styles.js';

export default function App() {

    // Plays digipet background music!
    useEffect(() => {
        const soundObject = new Audio.Sound();

        const playSound = async () => {
            try {
                await soundObject.loadAsync(require('./assets/sounds/game-music.mp3'));
                await soundObject.setIsLoopingAsync(true)
                await soundObject.playAsync();
            } catch (error) {
                console.log('Error loading sound:', error);
            }
        };
        playSound();
        // Clean up on unmount
        return () => {
            soundObject.stopAsync();
            soundObject.unloadAsync();
        };
    }, []);

    // Happiness stuff
    const [starNumber, setStarNumber] = useState(2);
    const [happinessLevel, setHappinessLevel] = useState(100);
    const [starDied, setStarDied] = useState(false);
    const [starDiedAlert, setStarDiedAlert] = useState(false); // Add state to track if alert has been shown


    const [starState, setStarState] = useState({
        starNumber: 2,
        happinessLevel: 100,
        starDied: false,
        starDiedAlert: false
    });

    // Function to update star state
    const updateStarState = (newState) => {
        setStarState(newState);
    };



    const beHappier = () => {
        if (starNumber < 3) {
            setHappinessLevel(prevLevel => Math.min(prevLevel + 10, 100));
            if (happinessLevel === 80 && starNumber < 2) {
                setStarNumber(oldStar => oldStar + 1);
            }
        }
    };

    const beSadder = () => {
        if (starNumber > 0 && !starDied) {
            setHappinessLevel(prevLevel => Math.max(prevLevel - 10, 0));
            if (happinessLevel === 80) {
                setStarNumber(oldStar => oldStar - 1);
            }
        }
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (!starDied) {
                beSadder();
            }
        }, 2000);
        return () => clearTimeout(timeout);
    }, [happinessLevel, starDied]); // Include starDied in the dependency array

    useEffect(() => {
        if (happinessLevel === 0 && !starDied) {
            setStarNumber(oldStar => oldStar - 1);
            setStarDied(true);
        }
    }, [happinessLevel, starDied]);

    const restartGame = () => {
        setHappinessLevel(100);
        setStarNumber(2);
        setStarDied(false);
        setStarDiedAlert(false); // Reset alertShown state
    };

    useEffect(() => {
        if (starDied && !starDiedAlert) { // Show alert only if starDied and alert hasn't been shown
            Alert.alert(
                'Pet Died!',
                'You are irresponsible! Your Pet Died',
                [
                    {
                        text: 'Revive',
                        onPress: restartGame,
                    },
                ],
                { cancelable: false }
            );
            setStarDiedAlert(true); // Set alertShown to true after showing the alert
        }
    }, [starDied, starDiedAlert]);


    return (
        <ImageBackground source={require('./assets/images/star-background.gif')} style={styles.background}>
            <View style={styles.container}>
                {/* Header w/ Save in top right */}
                <View style={styles.header}>
                    <SaveButton />
                </View>

                <View style={styles.moodContainer}>
                    <HappinessBar happinessLevel={happinessLevel} />
                </View>

                {/* The Star Digipet */}
                <View style={styles.digipetContainer}>
                    <Pressable onPress={beHappier}>
                        <Stars starNumber={starNumber} /> 
                    </Pressable>
                </View>

                {/* Inventory options/options to do with star */}
                {/* You can add more components here as needed */}

                <StatusBar style="dark" />
            </View>
        </ImageBackground>
    );
}