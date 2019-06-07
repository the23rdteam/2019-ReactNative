import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { Constants, MapView } from 'expo';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { BarChart, Grid, XAxis } from 'react-native-svg-charts'

function changeTime(unixTime){
  var date = new Date(unixTime*1000);
// Hours part from the timestamp
var hours = date.getHours();
// Minutes part from the timestamp
var minutes = "0" + date.getMinutes();
// Seconds part from the timestamp
var seconds = "0" + date.getSeconds();

// Will display time in 10:30:23 format
var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

  return formattedTime;
}


export default class WeatherDetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: `Weather Info: ${navigation.getParam('city', 'Unknown')}`,
      headerStyle:{
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      isLoadingTest: true,
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const city = navigation.getParam('city', null);
    const apiKey = '741bd68d132d12191ea171efa3aeee3a';
    // const city = 'Daejeon';

    // fetch(`http://demo6468405.mockable.io/weather-crawlers/current-weathers/by-city-name/${city}`)
      fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}`)
      .then(response => response.json())
      .then(info => {
        this.setState({
          ...info,
          isLoading: false,
        });
      });

  }

  render() {
    const tableData = [];
    
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <Text>데이터를 불러오는 중입니다.</Text>
        </View>
      )
    }

    const apiKey = '741bd68d132d12191ea171efa3aeee3a';
    let celsius = this.state.main.temp - 273.15;
    let minCelsius = this.state.main.temp_min - 273.15;
    let maxCelsius = this.state.main.temp_max - 273.15;
    let sunrise = this.state.sys.sunrise;
    let sunset = this.state.sys.sunset;
    let pressure = this.state.main.pressure;
    let humidity = this.state.main.humidity;
    let windspeed = this.state.wind.speed;
    let winddeg = this.state.wind.deg;
    let clouds = this.state.clouds.all;
    let country = this.state.sys.country;
    let lon = this.state.coord.lon;
    let lat = this.state.coord.lat;
    let weatherIcon = this.state.weather[0].icon;
    let weatherDescription = this.state.weather[0].main;
    // console.log(weatherDescription)
    let Image_Http_URL = {uri:`http://openweathermap.org/img/w/${weatherIcon}.png`}
    fetch(`http://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`)
    .then(response => response.json())
    .then(info => {
      this.setState({
        ...info,
        isLoading: false,
      });
    });

    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <Text>데이터를 불러오는 중입니다.</Text>
        </View>
      )
    }

    let UVIndex = this.state.value;
    let date_iso = this.state.date_iso;

    let number = [weatherDescription,celsius.toFixed(1), minCelsius.toFixed(1), maxCelsius.toFixed(1), changeTime(sunrise),
    changeTime(sunset), pressure, humidity, windspeed, winddeg,
    clouds, country, lon, lat,UVIndex, date_iso];
    let indexer = ['Weather','Temperature', 'minTemperature', 'maxTemperature', 'sunrise',
      'sunset', 'pressure', 'humidity', 'windspeed', 'winddeg',
      'clouds', 'country', 'lon', 'lat','UVIndex','Time'];

    for(let i = 0 ; i< 16; i += 1){
      const rowData = [];
      for(let j = 0 ; j < 2 ;j +=1)
      {
        if(j==0)
        {
            rowData.push(indexer[i]);
        }
        else
            rowData.push(number[i]);
      }
      tableData.push(rowData);
    }
    
    const fill = 'rgb(134, 65, 244)'
    const data   = [ 0,celsius,minCelsius ,maxCelsius, 0]
    return (
    <>
      <ScrollView style={styles.container}>
       
        <Image
            style={{ width: 50 ,height: 50}}
            source={Image_Http_URL}
          />

        <Table borderStyle={{borderColor: '#C1C0B9'}}>
            { 
              tableData.map((rowData, index)=>(
                <Row
                  key={index}
                  data={rowData}
                  style={styles.item}
                />
              ))
            }
          </Table>
          
            <BarChart
                style={{height: 200 }}
                data={ data }
                svg={{ fill }}
                contentInset={{ top: 10, bottom: 10 }}
            >
                <Grid/>
            </BarChart>
            <XAxis
                    style={{ marginBottom: 10,  }}
                    data={ data }
                    formatLabel={ (value, index) => {
                      if(index==1)
                      {
                        return 'Temperature'
                      }
                      if(index==2)
                      {
                        return 'minTemperature'
                      }
                      if(index==3)
                      {
                        return 'maxTemperature'
                      }
                      return null
                    } }
                    contentInset={{ left: 1, right: 1 }}
                    svg={{ fontSize: 10, fill: 'black' }}
                />
            
      </ScrollView>
      <MapView 
      style={styles.mapitem}
       initialRegion={{
         latitude:lat,
         longitude:lon,
         latitudeDelta: 0.0922,
         longitudeDelta: 0.0421
       }}
      />
    </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  
  },
  item:{
    textAlign: 'center',
    fontSize: 20,
    fontWeight:'bold',
    fontFamily:'sans-serif',
  },  
  mapitem:{
    flex:1,
  }
});
