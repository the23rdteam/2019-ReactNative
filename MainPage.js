import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, ScrollView, View} from 'react-native';
import { Constants } from 'expo';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';



export default class MainPage extends React.Component {
  static navigationOptions = {
    title: 'Don`t you go This places??',
    headerStyle:{
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  constructor(props) {
    super(props);

  }


  render() {
    return (
      <> 
        <ScrollView style={styles.container}>
        <Card style={styles.container}>
            <CardImage 
              source={{uri: 'http://bit.ly/2GfzooV'}} 
              title="Clifton, Western Cape"
            />
            <CardTitle
              subtitle="Beautiful Sunset!"
            />
            <CardContent text="Cape Town Clifton, South Africa" />
        </Card>
        <Card style={styles.container}>
            <CardImage 
              source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/1/1d/Daejeon_montage.png'}} 
              title="Daejeon, Korea"
            />
            <CardTitle
              subtitle="Technical City of Korea"
            />
            <CardContent text="Daejeon, Korea" />

        </Card>
        <Card style={styles.container}>
            <CardImage 
              source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Seoul_City_Montage.png/375px-Seoul_City_Montage.png'}} 
              title="Seoul, Korea"
            />
            <CardTitle
              subtitle="Capital of Korea"
            />
            <CardContent text="Seoul, Korea" />
            
        </Card>
     
        </ScrollView>
        <TouchableOpacity style = {styles.button} onPress={() => this.props.navigation.navigate('CityList')}>
            <Text style={styles.text}>Check Weather!</Text>
        </TouchableOpacity>
        
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: Constants.statusBarHeight,
  },
  
  button: {
    flex:0.1,
    height: 5,
    marginBottom:10,
    marginTop:10,
    marginLeft:3,
    marginRight:3,
    borderColor: 'black',
    justifyContent: 'center',
    borderRadius: 50,
    perspective: 50,
    borderWidth: 1,
    backgroundColor: 'rgba(0,255,255,0.7)',
  },
  text: {
    fontSize: 30,
    textAlign: 'center',

  }
});

