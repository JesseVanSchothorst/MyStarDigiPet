/**
 * File:    App.js
 * Author:  Jesse Van Schothorst
 * Brief:   App will allow us to play with a digipet
 */
import React, { useCallback, useEffect, useState } from 'react';
import { Text, View, Pressable, stylessheet, StatusBar } from 'react-native';

import SaveButton from './components/saveButton';
import styles from './styles/styles.js';

export default function App() {

  return (
    <View style={styles.container}>

          {/* Header w/ Save in top right */}
          <View style={styles.header}>
              <SaveButton />
          </View>
          
          {/* The Star Digipet */}

          {/* Inventory options/options to do with star */}

          <StatusBar style="dark" />
    </View>
  );
}