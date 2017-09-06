import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    Dimensions,
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class Loading extends Component {
  render() {
    return (
        <View style={styles.container}>
          <Text>正在加载数据......</Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    container:{
        width:SCREEN_WIDTH,
        height:SCREEN_HEIGHT,
        justifyContent:'center',
        alignItems:'center'
    },
});

module.exports = Loading;