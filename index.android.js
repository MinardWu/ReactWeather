/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View
} from 'react-native';
import Swiper from 'react-native-swiper';

import Loading from './app/Loading.js';
import XiaoMi from './app/XiaoMi/js/XiaoMi.js';
import Weather1 from './app/Weather1/js/Weather1.js';
import Weather2 from './app/Weather2/js/Weather2.js';


export default class WuWeather extends Component {
  render() {
    return (
        <Swiper
            showsButtons={false}
            dot={<View style={{backgroundColor: 'rgba(0,0,0,.2)', width: 4, height: 4, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
            activeDot={<View style={{backgroundColor: '#000', width: 4, height: 4, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}>
            <View>
                <Weather1/>
            </View>
            <View>
                <XiaoMi/>
            </View>
            <View>
                <Weather2/>
            </View>
        </Swiper>
    );
  }
}

const styles = StyleSheet.create({

});

AppRegistry.registerComponent('WuWeather', () => WuWeather);
