import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // Importing the search icon

export default function HomeScreen() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    axios.get('https://api.tvmaze.com/search/shows?q=all').then((response) => {
      setMovies(response.data);
    });
  }, []);

  const filteredMovies = movies.filter((item) =>
    item.show.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleSearchClick = () => {
    router.push(`/two`); // Navigate to Search Screen
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search movies..."
          value={query}
          onChangeText={setQuery}
          onPress={handleSearchClick}
        />
      </View>

      <FlatList
        data={filteredMovies}
        keyExtractor={(item) => item.show.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              router.push({
                pathname: '/details',
                params: { movie: JSON.stringify(item.show) }, // Pass the whole movie object here
              })
            }
            }
          >
            <Image source={{ uri: item.show.image?.medium }} style={styles.thumbnail} />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.show.name}</Text>
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
  searchContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  searchBar: { flex: 1, backgroundColor: '#fff', padding: 10, borderRadius: 5 },
  searchIcon: { marginLeft: 10 },
  card: { flexDirection: 'row', marginBottom: 10, backgroundColor: '#1c1c1c', borderRadius: 5 },
  thumbnail: { width: 100, height: 150, borderRadius: 5 },
  textContainer: { flex: 1, padding: 10 },
  title: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  summary: { color: '#ccc', fontSize: 12 },
});
