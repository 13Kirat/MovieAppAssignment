import React, { useState, useEffect, useRef } from 'react';
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';

let searchTimeout;

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const router = useRouter();
  const searchInputRef = useRef(null);

  const handleSearch = (searchTerm) => {
    if (searchTerm.trim() === '') {
      setResults([]);
      return;
    }

    axios
      .get(`https://api.tvmaze.com/search/shows?q=${searchTerm}`)
      .then((response) => setResults(response.data))
      .catch((error) => console.error('Error fetching data:', error));
  };

  useEffect(() => {
    if (searchTimeout) clearTimeout(searchTimeout);

    searchTimeout = setTimeout(() => {
      handleSearch(query);
    }, 300);
  }, [query]);

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus(); // Automatically focus the input field
    }
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        ref={searchInputRef} // Attach the ref
        style={styles.searchBar}
        placeholder="Search movies..."
        value={query}
        onChangeText={setQuery}
      />
      <FlatList
        data={results}
        keyExtractor={(item) => item.show.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              router.push({
                pathname: '/details',
                params: { movie: JSON.stringify(item.show) }, // Pass the whole movie object here
              })
            }
          >
            {/* <Image source={{ uri: item.show.image?.medium }} style={styles.thumbnail} />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.show.name}</Text>
              <Text style={styles.genre}>{item.show.genres.join(', ') || 'N/A'}</Text>
            </View> */}
            <Image source={{ uri: item.show.image?.medium }} style={styles.thumbnail} />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.show.name}</Text>
              <Text style={styles.genre}>{item.show.genres.join(', ') || 'N/A'}</Text>
              <Text numberOfLines={3} style={styles.summary}>
                {item.show.summary?.replace(/<\/?[^>]+(>|$)/g, '') || 'No description available'}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', padding: 10 },
  searchBar: { backgroundColor: '#fff', padding: 10, borderRadius: 5, marginBottom: 10 },
  // card: { flexDirection: 'row', marginBottom: 10, alignItems: 'center' },
  // textContainer: { flex: 1, padding: 10 },
  // thumbnail: { width: 50, height: 50, marginRight: 10, borderRadius: 5 },
  // title: { color: '#fff', fontSize: 16 },
  genre: { color: '#bbb', fontSize: 12, marginVertical: 5 },
  card: { flexDirection: 'row', marginBottom: 10, backgroundColor: '#1c1c1c', borderRadius: 5 },
  thumbnail: { width: 100, height: 150, borderRadius: 5 },
  textContainer: { flex: 1, padding: 10 },
  title: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  summary: { color: '#ccc', fontSize: 12 },
});
