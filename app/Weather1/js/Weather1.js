import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    Text,
    View,
    Dimensions,
    FlatList,
    StatusBar,
} from 'react-native';
import Loding from '../../Loading'

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

var REQUEST_URL_TODAY = 'https://free-api.heweather.com/v5/now?city=hefei&key=fb085091e2844bf1ae01a22249ce57f3';
var REQUEST_URL_TODAY_AIR = 'https://free-api.heweather.com/v5/aqi?city=hefei&key=fb085091e2844bf1ae01a22249ce57f3';
var REQUEST_URL_TODAY_AND_FUTURE = 'https://free-api.heweather.com/v5/forecast?city=hefei&key=fb085091e2844bf1ae01a22249ce57f3';

const styles = StyleSheet.create({
    whole: {
        backgroundColor:"#f9f9f9",
        width:SCREEN_WIDTH,
        height:SCREEN_HEIGHT,
        flexDirection:'column',
        justifyContent:'flex-start',
        alignItems:'center',
    },
    header:{
        marginTop:50,
        flexDirection:'column',
        alignItems:'center',
    },
    text_temp:{
        color: '#fbffff',
        fontSize: 60,
    },
    text_weather: {
        paddingTop:10,
        color: '#fbffff',
        fontSize: 16,
    },
    scrollview:{
        marginTop:280,
        paddingLeft:24,
        paddingRight:24,
        width:SCREEN_WIDTH,
    },
    scrollview_item:{
        height:60,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    scrollview_item_left:{
        color: '#fff',
        fontSize: 14,
    },
    scrollview_item_right:{
        flexDirection:'column',
        alignItems:'flex-end'
    },
    scrollview_item_right_high_text:{
        color: '#fff',
        fontSize: 14,
    },
    scrollview_item_right_low_text:{
        color: '#878787',
        fontSize: 14,
    },
});

export default class Weather1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            today:null,
            today_air:null,
            today_and_future: null,
            error:false,
            loaddata:false
        };
    }


    render() {
        if (!this.state.loaddata) {
            return this.renderLoadingView();
        }
        var today = this.state.today[0];
        var today_air = this.state.today_air[0];
        var today_and_future = this.state.today_and_future[0];
        return this.renderWeather(today,today_air,today_and_future);
    }

    componentDidMount() {
        this.fetchTodayData();
    }

    fetchTodayData() {
        fetch(REQUEST_URL_TODAY, {method: 'GET'})
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    today:responseData.HeWeather5,
                });
                this.fetchTodayAirData();
            })
            .catch((error) => {
                this.setState({
                    error: true,
                    errorInfo: error
                });
                callback(error);
            });
    }

    fetchTodayAirData() {
        fetch(REQUEST_URL_TODAY_AIR, {method: 'GET'})
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    today_air:responseData.HeWeather5,
                });
                this.fetchData();
            })
            .catch((error) => {
                this.setState({
                    error: true,
                    errorInfo: error
                });
                callback(error);
            });
    }

    fetchData() {
        fetch(REQUEST_URL_TODAY_AND_FUTURE, {method: 'GET'})
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    today_and_future:responseData.HeWeather5,
                    loaddata:true
                });
            })
            .catch((error) => {
                this.setState({
                    error: true,
                    errorInfo: error
                });
                callback(error);
            });
    }

    renderLoadingView() {
        return (
            <Loding/>
        );
    }

    renderWeather(today,today_air,today_and_future){
        var tag=0;
        for(let item of today_and_future.daily_forecast){
            //修改日期
            if(tag==0){
                item.date="今天";
            }if(tag==1){
                item.date="明天";
            }if(tag==2){
                item.date="后天";
            }
            tag++;
            //..转..处理
            if(item.cond.txt_d!=item.cond.txt_n){
                item.cond.txt_d = item.cond.txt_d+"转"+item.cond.txt_n;
            }
            //图标
            item.cond.code_d = 'http://minardwu.com/file/weathericon/'+item.cond.code_d+'.png';
        }
        return (
                <View>
                    <StatusBar
                        backgroundColor='#3d8cbf'
                        translucent={true}
                        hidden={true}
                        animated={true}
                    />
                    <Image source={require('../img/bg.png')} style={styles.whole}>
                        <View style={styles.header}>
                            <Text style={styles.text_temp}>{today.now.tmp}°</Text>
                            <Text style={styles.text_weather}>{today.now.cond.txt}</Text>
                        </View>

                        <View>
                            <FlatList
                                style={styles.scrollview}
                                ItemSeparatorComponent={this._separator}
                                onRefresh={this.refreshing}
                                refreshing={true}
                                data={[
                                    today_and_future.daily_forecast[1],
                                    today_and_future.daily_forecast[2],
                                ]}
                                renderItem={({item}) =>
                                    <View style={styles.scrollview_item}>
                                        <Text style={styles.scrollview_item_left}>{item.date}</Text>
                                        <View style={styles.scrollview_item_right}>
                                            <Text style={styles.scrollview_item_right_high_text}>{item.tmp.min}°</Text>
                                            <Text style={styles.scrollview_item_right_low_text}>{item.cond.txt_d}</Text>
                                        </View>
                                    </View>
                                }
                            />
                        </View>
                    </Image>
                </View>

        );
    }

    _separator = () => {
        return <View style={{height:0.8,backgroundColor:'#e7dae5',opacity: 0.5,paddingLeft:20}}/>;
    }
}
