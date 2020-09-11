import React from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchName: 'jack johnson',
      entity: '',
      country: '',
      limit: 25,
      searchList: [],
    };
  }

  searchArtistName = (searchResult) => {
    this.setState({searchName: searchResult});
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Search for Movies, podcasts, music, videos & Tv Shows"
          placeholderTextColor="#9a73ef"
          autoCapitalize="none"
          onChangeText={this.searchArtistName}
        />
        <Button
          title="Search"
          //  onPress={() => this.props.navigation.navigate('Details')}
          onPress={this.fetchSearchList}
        />
        <Text>{this.state.searchResult}</Text>
      </View>
    );
  }

  async fetchSearchList() {
    // GET request using fetch with async/await
    console.log('sunil fetchSearchList', this.state.searchName);
    try {
      const response = await fetch(
        `https://itunes.apple.com/search?term=${this.state.searchName}&entity=${this.state.entity}`,
      );
      const result = await response.json();
      // this.setState({searchList: result});
    } catch (error) {
      console.log('sunil error', error);
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
  input: {
    padding: 10,
    margin: 15,
    height: 40,
    borderColor: '#7a42f4',
    borderWidth: 1,
  },
});

export default Search;
