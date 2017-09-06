
import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    Text,
    View,
    Dimensions,
    FlatList,
    StatusBar,
    ScrollView,
} from 'react-native';
import Loding from './Loading'

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

var REQUEST_URL = 'https://free-api.heweather.com/v5/forecast?city=hefei&key=fb085091e2844bf1ae01a22249ce57f3';
var REQUEST_URL_TODAY = 'https://free-api.heweather.com/v5/now?city=hefei&key=fb085091e2844bf1ae01a22249ce57f3';
var REQUEST_URL_TODAY_AIR = 'https://free-api.heweather.com/v5/aqi?city=hefei&key=fb085091e2844bf1ae01a22249ce57f3';

const styles = StyleSheet.create({
    root:{
        backgroundColor:"#f9f9f9",
        width:SCREEN_WIDTH,
        height:SCREEN_HEIGHT,
        flexDirection:'column',
        justifyContent:'flex-start',
    },
    whole: {
        backgroundColor:"#f9f9f9",
        width:SCREEN_WIDTH,
        height:SCREEN_HEIGHT,
        flexDirection:'column',
        justifyContent:'flex-start',
    },
    bg: {
        width:SCREEN_WIDTH,
        height:SCREEN_HEIGHT*11/20,
        flexDirection:'column',
        justifyContent:'space-between'
    },
    header:{
        marginLeft:30,
        marginTop:20,
    },
    text_city: {
        paddingTop:8,
        color: '#fbffff',
        fontSize: 12,
    },
    text_temp:{
        color: '#fbffff',
        fontSize: 60,
    },
    text_weather_and_air: {
        paddingBottom:10,
        color: '#fbffff',
        fontSize: 12,
    },

    middle:{
        marginLeft:50,
        marginRight:50,
        marginBottom:10,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    middle_item:{
        flexDirection:'column',
        alignItems:'center'
    },
    middle_item_text_title:{
        color: '#fbffff',
        fontSize: 12,
    },
    middle_item_text_value:{
        color: '#fbffff',
        fontSize: 24,
    },

    scrollview:{
        borderRadius:25,
        alignItems:'center'
    },
    scrollview_item:{
        width:SCREEN_WIDTH,
        height:70,
        paddingLeft:30,
        paddingRight:30,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    scrollview_item_left:{
        color: '#4b4b4b',
        fontSize: 14,
    },
    scrollview_item_middle:{
        flexDirection:'row',
        alignItems:'center'
    },
    scrollview_item_right:{
        color: '#4b4b4b',
        fontSize: 24,
    },
    scrollview_item_middle_text:{
        color: '#4b4b4b',
        fontSize: 14,
    },
    scrollview_item_middle_img:{
        width:20,
        height:20,
    },

    footer:{
        width:SCREEN_WIDTH,
        flexDirection:'row',
        justifyContent:'space-between',
        paddingLeft:20,
        paddingRight:20,
        marginBottom:20,
    },
    footer_img:{
        width:20,
        height:20,
    },

    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5',
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9',
    },
    text: {
        color: '#fbffff',
        fontSize: 16,
    },
});

export default class All extends Component {
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
        fetch(REQUEST_URL, {method: 'GET'})
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
            <View style={styles.root}>
                <StatusBar
                    backgroundColor='#3d8cbf'
                    translucent={true}
                    hidden={false}
                    animated={true}
                />
                <View>
                    <View style={styles.whole} >
                        <Image source={require('./img/xiaomi/bg.png')} style={styles.bg}>
                            <View style={styles.header}>
                                <Text style={styles.text_city}>{today.basic.city}</Text>
                                <Text style={styles.text_temp}>{today.now.tmp}°</Text>
                                <Text style={styles.text_weather_and_air}>{today.now.cond.txt}  |  空气{today_air.aqi.city.qlty} {today_air.aqi.city.aqi} </Text>
                            </View>

                            <View style={styles.middle}>
                                <View style={styles.middle_item}>
                                    <Text style={styles.middle_item_text_title}>{today.now.wind.dir}</Text>
                                    <Text style={styles.middle_item_text_value}>{today.now.wind.spd}</Text>
                                </View>
                                <View style={{height:40,width:1,backgroundColor:'#fffcf9',opacity: 0.5}}/>
                                <View style={styles.middle_item}>
                                    <Text style={styles.middle_item_text_title}>相对湿度</Text>
                                    <Text style={styles.middle_item_text_value}>{today.now.hum}%</Text>
                                </View>
                                <View style={{height:40,width:1,backgroundColor:'#fffcf9',opacity: 0.5}}/>
                                <View style={styles.middle_item}>
                                    <Text style={styles.middle_item_text_title}>体感温度</Text>
                                    <Text style={styles.middle_item_text_value}>{today.now.fl}°</Text>
                                </View>
                            </View>
                        </Image>

                        <FlatList
                            ItemSeparatorComponent={this._separator}
                            onRefresh={this.refreshing}
                            refreshing={true}
                            data={[
                                today_and_future.daily_forecast[0],
                                today_and_future.daily_forecast[1],
                                today_and_future.daily_forecast[2],
                            ]}
                            renderItem={({item}) =>
                                <View style={styles.scrollview_item}>
                                    <Text style={styles.scrollview_item_left}>{item.date}</Text>
                                    <View style={styles.scrollview_item_middle}>
                                        {/*<Image source={btnIons[item.cond.code_d-100]} style={styles.scrollview_item_middle_img}/>*/}
                                        <Image source={{uri:item.cond.code_d}} style={styles.scrollview_item_middle_img}/>
                                        <Text style={styles.scrollview_item_middle_text}>  {item.cond.txt_d}</Text>
                                    </View>
                                    <Text style={styles.scrollview_right}>{item.tmp.min}°/{item.tmp.max}°</Text>
                                </View>
                            }
                        />
                        <View style={styles.footer}>
                            <Image source={require('./img/xiaomi/addcity.png')} style={styles.footer_img}/>
                            <Image source={require('./img/xiaomi/setting.png')} style={styles.footer_img}/>
                        </View>
                    </View>
                </View>

                {/*底部*/}
                <View style={styles.slide2}>
                    <Text style={styles.text}>Beautiful</Text>
                </View>
                <View style={styles.slide3}>
                    <Text style={styles.text}>And simple</Text>
                </View>

            </View>
        );
    }

    _separator = () => {
        return <View style={{height:0.5,backgroundColor:'#a1a1a1',opacity: 0.5,paddingLeft:20}}/>;
    }
}
