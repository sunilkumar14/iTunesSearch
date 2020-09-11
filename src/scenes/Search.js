import React from 'react';
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import GridItems from '../components/GridItems';
import FilterBy from '../components/FilterBy';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchName: '',
      entity: '',
      searchResults: [],
      loading: false,
      selectedTrackId: -1,
      loadMore: false,
      searchFailed: false,
      visibleModal: false,
    };
    this.renderEachItem = this.renderEachItem.bind(this);
  }

  getSearchResult = async () => {
    this.setState({loading: true});
    try {
      const response = await fetch(
        `https://itunes.apple.com/search?term=${this.state.searchName}&entity=${
          this.state.entity
        }&limit=${25}`,
      );
      const result = await response.json();
      this.setState({
        searchResults: result.results,
        loading: false,
        selectedTrackId: -1,
      });
    } catch (error) {
      this.setState({loading: false, selectedTrackId: -1, searchFailed: true});
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.upperView}>
          {this.renderInput()}
          {this.renderButton()}
        </View>
        {this.renderFilterByTitle()}
        {this.state.searchFailed ? this.renderError() : this.renderContents()}
        {this.renderFilterModal()}
      </View>
    );
  }

  renderInput() {
    return (
      <TextInput
        style={styles.input}
        onChangeText={this.searchArtistName}
        value={this.state.searchName}
        underlineColorAndroid="transparent"
        placeholder="Search for Movies, podcasts, music, videos & Tv Shows"
        placeholderTextColor="gray"
        autoCapitalize="none"
      />
    );
  }

  searchArtistName = (searchName) => {
    this.setState({searchName});
  };

  renderButton() {
    return <Button title="Search" onPress={this.getSearchResult} />;
  }

  renderFilterByTitle() {
    return (
      <View style={styles.filterView}>
        <TouchableOpacity
          style={styles.filterTextContainer}
          onPress={() => this.setState({visibleModal: true})}>
          <Text style={{fontWeight: '600'}}>
            Filter By: {this.state.entity || 'All'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderError() {
    return (
      <View style={styles.error}>
        <Text style={styles.errorText}> Artisit Details Not Found.</Text>
      </View>
    );
  }

  renderContents() {
    if (this.state.loading) {
      return this.renderLoader();
    }
    return (
      <FlatList
        data={this.state.searchResults}
        extraData={this.state}
        renderItem={this.renderEachItem}
        keyExtractor={(item, index) => item + index}
        numColumns={2}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        onEndReachedThreshold={0.5}
        onEndReached={this.loadMoreItems}
        ListFooterComponent={this.renderListFooter()}
        ListEmptyComponent={this.renderError()}
      />
    );
  }

  renderLoader() {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  renderEachItem({item}) {
    return (
      <GridItems
        details={item}
        onPressTile={() => this.onPressTile(item)}
        isSelected={item.trackId === this.state.selectedTrackId}
      />
    );
  }

  onPressTile(item) {
    this.setState({selectedTrackId: item.trackId});
    this.props.navigation.navigate('Details', {artistInfo: item});
  }

  renderListFooter() {
    return this.state.loadMore ? (
      <ActivityIndicator size="large" color="#00ff00" />
    ) : null;
  }

  loadMoreItems = async (info) => {
    if (info.distanceFromEnd > 0) {
      this.setState({loadMore: true});
      try {
        const response = await fetch(
          `https://itunes.apple.com/search?term=${this.state.searchName}&entity=${this.state.entity}`,
        );
        const result = await response.json();
        this.setState({
          searchResults: result.results,
          loadMore: false,
        });
      } catch (error) {
        this.setState({loadMore: false});
      }
    }
  };

  renderFilterModal() {
    return (
      <FilterBy
        visibleModal={this.state.visibleModal}
        dismissModal={this.dismissModal}
        selectedItem={this.state.entity}
      />
    );
  }

  dismissModal = (filtervalue) => {
    const value = filtervalue !== '' ? filtervalue : this.state.entity;
    this.setState({visibleModal: false, entity: value}, () =>
      this.getSearchResult(),
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
  error: {
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontSize: 18,
  },
  filterTextContainer: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderRadius: 15,
    borderColor: 'skyblue',
  },
  filterView: {
    alignItems: 'center',
    marginBottom: 15,
  },
  input: {
    padding: 10,
    height: 40,
    borderColor: 'gray',
    borderWidth: 2,
    flex: 1,
    borderRadius: 20,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  upperView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
});
