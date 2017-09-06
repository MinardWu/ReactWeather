/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Swiper from 'react-native-swiper';

import XiaoMi from './app/XiaoMi/js/XiaoMi.js';
import Loading from './app/Loading.js';


export default class WuWeather extends Component {
  render() {
    return (
        <Swiper
            showsButtons={false}
            dot={<View style={{backgroundColor: 'rgba(0,0,0,.2)', width: 4, height: 4, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
            activeDot={<View style={{backgroundColor: '#000', width: 4, height: 4, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}>
            <View>
                <XiaoMi/>
            </View>
            <View>
                <Loading/>
            </View>
        </Swiper>
    );
  }
}

const styles = StyleSheet.create({

});

AppRegistry.registerComponent('WuWeather', () => WuWeather);
