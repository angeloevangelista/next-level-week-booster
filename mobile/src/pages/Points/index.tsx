import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import Constants from 'expo-constants';
import MapView, { Marker } from 'react-native-maps';
import { SvgUri } from 'react-native-svg';
import Emoji from 'react-native-emoji';
import api from '../../services/api';

import { useNavigation } from '@react-navigation/native';

interface Item {
  id: number,
  title: string,
  image_url: string,
}

const Points = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const navigation = useNavigation();

  useEffect(() => {
    api.get('items')
      .then(({ data: items }) => {
        setItems(items);
      })
      .catch(err => {
        alert(err);
        navigation.goBack();
      });
  }, []);

  function handleNavigationback() {
    navigation.goBack();
  }

  function handleNavigateToDetail() {
    navigation.navigate('Detail');
  }

  const handleSelectItem = (itemId: number) => {
    const indexItem = selectedItems.indexOf(itemId);

    if (indexItem === -1)
      return setSelectedItems([...selectedItems, itemId]);

    const filteredItems = selectedItems.filter(item => item !== itemId);

    setSelectedItems(filteredItems);
  }

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleNavigationback}>
          <Icon name="arrow-left" size={24} color="#34CB79" />
        </TouchableOpacity>

        <View style={styles.title}>
          <Emoji style={styles.titleIcon} name="grinning" />
          <Text style={styles.titleText}>Bem vindo.</Text>
        </View>

        <Text style={styles.description}>Encontre no mapa um ponto de coleta.</Text>

        <View style={styles.mapContainer}>
          <MapView
            initialRegion={{
              latitude: -24.0083135,
              longitude: -46.5066368,
              latitudeDelta: 0.014,
              longitudeDelta: 0.014,
            }}
            style={styles.map}
          >
            <Marker
              onPress={handleNavigateToDetail}
              coordinate={{
                latitude: -24.0083135,
                longitude: -46.5066368,
              }}
            >
              <View style={styles.mapMarkerContainer}>
                <Image style={styles.mapMarkerImage} source={{
                  uri: 'https://images.unsplash.com/photo-1543083477-4f785aeafaa9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60'
                }} />
                <Text style={styles.mapMarkerTitle}>Mercado</Text>
              </View>
            </Marker>
          </MapView>
        </View>
      </View>

      <View style={styles.itemsContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        >
          {items.map(item => (
            <TouchableOpacity
              key={String(item.id)}
              onPress={() => handleSelectItem(item.id)}
              activeOpacity={0.6}
              style={[
                styles.item,
                selectedItems.includes(item.id) ? styles.selectedItem : {}
              ]}
            >
              <SvgUri width={42} height={42} uri={item.image_url} />
              <Text style={styles.itemTitle}>{item.title}</Text>
            </TouchableOpacity>
          ))}

        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 20 + Constants.statusBarHeight,
  },

  title: {
    marginTop: 24,
    alignContent: "center",
    flexDirection: 'row',
  },

  titleIcon: {
    fontSize: 24,
    marginTop: -2
  },

  titleText: {
    fontSize: 24,
    marginLeft: 10,
    fontFamily: 'Ubuntu_700Bold',
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 4,
    fontFamily: 'Roboto_400Regular',
  },

  mapContainer: {
    flex: 1,
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 16,
  },

  map: {
    width: '100%',
    height: '100%',
  },

  mapMarker: {
    width: 90,
    height: 80,
  },

  mapMarkerContainer: {
    width: 90,
    height: 70,
    backgroundColor: '#34CB79',
    flexDirection: 'column',
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center'
  },

  mapMarkerImage: {
    width: 90,
    height: 45,
    resizeMode: 'cover',
  },

  mapMarkerTitle: {
    flex: 1,
    fontFamily: 'Roboto_400Regular',
    color: '#FFF',
    fontSize: 13,
    lineHeight: 23,
  },

  itemsContainer: {
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 32,
  },

  item: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#eee',
    height: 120,
    width: 120,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'space-between',

    textAlign: 'center',
  },

  selectedItem: {
    borderColor: '#34CB79',
    borderWidth: 2,
  },

  itemTitle: {
    fontFamily: 'Roboto_400Regular',
    textAlign: 'center',
    fontSize: 13,
  },
});

export default Points;