import React, {Component} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  SectionList,
  StyleSheet,
} from 'react-native';

const mediaType = [
  {
    title: 'Movie',
    data: [{movieArtist: 'Movie Artist'}, {movie: 'Movie'}],
  },
  {
    title: 'Podcast',
    data: [
      {podcastAuthor: 'Poduction Cast Author'},
      {podcast: 'Poduction Cast'},
    ],
  },
  {
    title: 'Music',
    data: [
      {musicTrack: 'Music Track'},
      {album: 'Album'},
      {mix: 'Mix'},
      {song: 'Song'},
    ],
  },
  {
    title: 'Music Video',
    data: [{musicArtist: 'Music Artist'}, {musicVideo: 'Music Video'}],
  },
];

export default class FilterBy extends Component {
  constructor(props) {
    super(props);
    this.renderCategoryItem = this.renderCategoryItem.bind(this);
  }
  render() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.visibleModal}
        presentationStyle="overFullScreen"
        onRequestClose={() => this.props.dismissModal('')}>
        <View style={styles.modalContainer}>
          <View style={styles.borderView}>
            {this.renderCloseButton()}
            {this.renderContent()}
          </View>
        </View>
      </Modal>
    );
  }

  renderCloseButton() {
    return (
      <TouchableOpacity
        onPress={() => this.props.dismissModal('')}
        style={styles.closeContainer}>
        <Text style={styles.close}>Close</Text>
      </TouchableOpacity>
    );
  }

  renderContent() {
    return (
      <SectionList
        sections={mediaType}
        stickySectionHeadersEnabled={false}
        keyExtractor={(item, index) => item + index}
        renderSectionHeader={this.renderHeader}
        renderItem={this.renderCategoryItem}
        extraData={this.props}
      />
    );
  }

  renderHeader({section}) {
    return (
      <View style={styles.titleContainer}>
        <Text style={[styles.close, styles.headerText]}>{section.title}</Text>
      </View>
    );
  }

  renderCategoryItem({item}) {
    const displayValue = Object.values(item)[0];
    const passedValue = Object.keys(item)[0];
    const selectedTextStyle =
      this.props.selectedItem === passedValue
        ? styles.subTextSelected
        : styles.subText;
    return (
      <TouchableOpacity
        onPress={() => this.props.dismissModal(passedValue)}
        style={styles.itemRow}>
        <Text style={selectedTextStyle}>{displayValue}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  borderView: {
    maxHeight: '70%',
    borderWidth: 2,
    borderColor: 'skyblue',
    backgroundColor: 'white',
    width: '90%',
    paddingHorizontal: 25,
    paddingBottom: 35,
  },
  close: {
    color: 'red',
    fontSize: 16,
    fontWeight: '600',
  },
  closeContainer: {
    alignItems: 'flex-end',
    padding: 5,
  },
  itemRow: {
    paddingVertical: 5,
    marginVertical: 2,
    marginLeft: 20,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#00000040',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subText: {
    color: 'black',
    fontSize: 14,
  },
  subTextSelected: {
    color: 'green',
    fontSize: 16,
    fontWeight: '600',
  },
  titleContainer: {
    marginVertical: 10,
  },
  headerText: {
    color: 'black',
  },
});
