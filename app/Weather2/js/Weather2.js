import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    Text,
    View,
    Dimensions,
    FlatList,
    ScrollView,
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
        backgroundColor:"#fff",
        width:SCREEN_WIDTH,
        height:SCREEN_HEIGHT,
        flexDirection:'column',
        justifyContent:'center',
    },
    bg: {
        width:SCREEN_WIDTH,
        height:SCREEN_HEIGHT*6/10,
        flexDirection:'column',
        justifyContent:'center'
    },
    header:{
        alignItems:'center'
    },
    text_temp:{
        color: '#fbffff',
        fontSize: 70,
        fontWeight:'900',
    },
    text_weather: {
        paddingBottom:10,
        color: '#fbffff',
        fontSize: 12,
    },

    flatlist:{
        paddingTop:10,
    },
    flatlist_item:{
        width:SCREEN_WIDTH,
        height:70,
        paddingLeft:60,
        paddingRight:60,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    flatlist_item_left:{
        color: '#a5a5a5',
        fontSize: 16,
        fontWeight:'900',
    },
    flatlist_item_left_first:{
        color: '#161616',
        fontSize: 16,
        fontWeight:'900',
    },
    flatlist_item_right:{
        flexDirection:'row',
    },
    flatlist_item_right_text:{
        color: '#a5a5a5',
        fontSize: 16,
        fontWeight:'900',
    },
    flatlist_item_right_text_first:{
        color: '#161616',
        fontSize: 16,
        fontWeight:'900',
    },
    flatlist_item_right_img:{
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
                    hhidden={true}
                    animated={true}
                />
                <View>
                    <View style={styles.whole} >
                        <Image source={require('../img/bg.png')} style={styles.bg}>
                            <View style={styles.header}>
                                <Text style={styles.text_temp}>{today.now.tmp}°</Text>
                                <Text style={styles.text_weather}>{today.basic.city}  |  {today.now.cond.txt}  |  空气{today_air.aqi.city.qlty} {today_air.aqi.city.aqi} </Text>
                            </View>
                        </Image>
                        {/*<FlatList*/}
                            {/*style={styles.flatlist}*/}
                            {/*onRefresh={this.refreshing}*/}
                            {/*refreshing={true}*/}
                            {/*data={[*/}
                                {/*today_and_future.daily_forecast[0],*/}
                                {/*today_and_future.daily_forecast[1],*/}
                                {/*today_and_future.daily_forecast[2],*/}
                            {/*]}*/}
                            {/*renderItem={({item}) =>*/}
                                {/*<View style={styles.flatlist_item}>*/}
                                    {/*<Text style={styles.flatlist_item_left}>{item.date}</Text>*/}
                                    {/*<View style={styles.flatlist_item_right}>*/}
                                        {/*<Image source={{uri:item.cond.code_d}} style={styles.flatlist_item_right_img}/>*/}
                                        {/*<Text style={styles.flatlist_item_right_text}>   {item.tmp.min}°-{item.tmp.max}°</Text>*/}
                                    {/*</View>*/}
                                {/*</View>*/}
                            {/*}*/}
                        {/*/>*/}
                        <ScrollView>
                            <View style={styles.flatlist_item}>
                                <Text style={styles.flatlist_item_left_first}>{today_and_future.daily_forecast[0].date}</Text>
                                <View style={styles.flatlist_item_right}>
                                    <Image source={{uri:today_and_future.daily_forecast[0].cond.code_d}} style={styles.flatlist_item_right_img}/>
                                    <Text style={styles.flatlist_item_right_text_first}>   {today_and_future.daily_forecast[0].tmp.min}°-{today_and_future.daily_forecast[0].tmp.max}°</Text>
                                </View>
                            </View>
                            <View style={styles.flatlist_item}>
                                <Text style={styles.flatlist_item_left}>{today_and_future.daily_forecast[1].date}</Text>
                                <View style={styles.flatlist_item_right}>
                                    <Image source={{uri:today_and_future.daily_forecast[1].cond.code_d}} style={styles.flatlist_item_right_img}/>
                                    <Text style={styles.flatlist_item_right_text}>   {today_and_future.daily_forecast[1].tmp.min}°-{today_and_future.daily_forecast[1].tmp.max}°</Text>
                                </View>
                            </View>
                            <View style={styles.flatlist_item}>
                                <Text style={styles.flatlist_item_left}>{today_and_future.daily_forecast[2].date}</Text>
                                <View style={styles.flatlist_item_right}>
                                    <Image source={{uri:today_and_future.daily_forecast[2].cond.code_d}} style={styles.flatlist_item_right_img}/>
                                    <Text style={styles.flatlist_item_right_text}>   {today_and_future.daily_forecast[2].tmp.min}°-{today_and_future.daily_forecast[2].tmp.max}°</Text>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </View>
        );
    }
}
