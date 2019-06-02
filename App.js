import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Constants } from 'expo';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cities: [],
    };
  }

  componentDidMount() {
    fetch('http://demo6468405.mockable.io/weather-crawlers/cities')
      .then(response => response.json())
      .then(cities => {
        console.log('cities =', cities.length);
        this.setState({
          cities
        });
      });
  }

  renderItem(city) {
    return (
      <View style={styles.item}>
        <Text style={styles.text}>{city}</Text>
      </View>
    );
  }

  render() {
    return (
      <FlatList style={styles.container}
                renderItem={({ item }) => this.renderItem(item)}
                keyExtractor={item => item}
                data={this.state.cities}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: Constants.statusBarHeight,
  },

  item: {
    flex: 1,
    height: 50,
    justifyContent: 'center',

    borderWidth: 1,
    borderColor: 'orange',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
  }
});
