import React, { Component } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import { connect } from 'react-redux';
import { addText } from '../../redux/actions/testAction';

class MapLoad extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startRegion: {
                latitude: 56.1779866,
                longitude: 15.5925124,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
            },
            markers: [
                {
                    latlng: {
                        latitude: 56.1779866,
                        longitude: 15.5925124,
                    },
                    title: "Test Title",
                    description: "A desc",
                },
                {
                    latlng: {
                        latitude: 56.1711866,
                        longitude: 15.5925124,
                    },
                    title: "Test Title",
                    description: "A desc",
                },
            ],
        }
        this.onRegionChange = this.onRegionChange.bind(this);
    }

    
    onRegionChange(region) {
        this.setState({ startRegion: region });
    }

    render() {
        return (
            <View style={styles.mapContainer}>
                <MapView
                    style={styles.map}
                    showsUserLocation={true}
                    region={this.state.startRegion}
                    /*onRegionChange={this.onRegionChange} DIS LAGGS, IX THIS*/
                >
                    {this.state.markers.map((marker, index) => (
                        <Marker
                            coordinate={marker.latlng}
                            title={marker.title}
                            description={marker.description}
                            key={index}
                        />
                    ))}
                    <Text>{this.props.text}</Text>
                </MapView>
                <Button title="Yello" onPress={() => this.props.dispatch(addText("test"))}></Button>
                <Text>{this.state.startRegion.latitude}</Text>
            </View>
        );
    }
}

export default connect((store) => {
    return {
        text: store.test.text
    }
})(MapLoad);

const styles = StyleSheet.create({
    mapContainer: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
})