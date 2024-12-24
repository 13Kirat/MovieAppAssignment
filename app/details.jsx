import { useLocalSearchParams } from 'expo-router';
import { ScrollView, Image, StyleSheet, Text, View, Linking } from 'react-native';

export default function DetailsScreen() {
  const { movie } = useLocalSearchParams() || {};
  const parsedMovie = movie ? JSON.parse(movie) : null;

  if (!parsedMovie) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorMessage}>Movie details are unavailable.</Text>
      </View>
    );
  }

  const renderList = (title, items) => {
    if (!items || items.length === 0) return null;
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {items.map((item, index) => (
          <Text key={index} style={styles.info}>
            - {item}
          </Text>
        ))}
      </View>
    );
  };

  const renderLink = (label, url) => {
    if (!url) return null;
    return (
      <Text style={[styles.info, styles.link]} onPress={() => Linking.openURL(url)}>
        {label}: {url}
      </Text>
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      {parsedMovie.image?.original && (
        <Image source={{ uri: parsedMovie.image.original }} style={styles.image} />
      )}
      {parsedMovie.name && <Text style={styles.title}>{parsedMovie.name}</Text>}
      {parsedMovie.language && (
        <Text style={styles.info}>
          <Text style={styles.label}>Language:</Text> {parsedMovie.language}
        </Text>
      )}

      {/* Summary Section */}
      {parsedMovie.summary && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Summary</Text>
          <Text style={styles.info}>
            {parsedMovie.summary.replace(/<\/?p>/g, '')}
          </Text>
        </View>
      )}

      {/* Key Details */}
      {(parsedMovie.type || parsedMovie.status || parsedMovie.premiered || parsedMovie.runtime || parsedMovie.averageRuntime || parsedMovie.rating?.average || parsedMovie.schedule?.days) && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Details</Text>
          {parsedMovie.type && (
            <Text style={styles.info}>
              <Text style={styles.label}>Type:</Text> {parsedMovie.type}
            </Text>
          )}
          {parsedMovie.status && (
            <Text style={styles.info}>
              <Text style={styles.label}>Status:</Text> {parsedMovie.status}
            </Text>
          )}
          {parsedMovie.premiered && (
            <Text style={styles.info}>
              <Text style={styles.label}>Premiered:</Text> {parsedMovie.premiered}
            </Text>
          )}
          {parsedMovie.runtime && (
            <Text style={styles.info}>
              <Text style={styles.label}>Runtime:</Text> {parsedMovie.runtime} minutes
            </Text>
          )}
          {parsedMovie.averageRuntime && (
            <Text style={styles.info}>
              <Text style={styles.label}>Average Runtime:</Text> {parsedMovie.averageRuntime} minutes
            </Text>
          )}
          {parsedMovie.rating?.average && (
            <Text style={styles.info}>
              <Text style={styles.label}>Rating:</Text> {parsedMovie.rating.average}
            </Text>
          )}
          {parsedMovie.schedule?.days && (
            <Text style={styles.info}>
              <Text style={styles.label}>Schedule:</Text> {parsedMovie.schedule.days.join(', ')} at {parsedMovie.schedule.time || 'N/A'}
            </Text>
          )}
        </View>
      )}

      {/* Genres */}
      {renderList('Genres', parsedMovie.genres)}

      {/* Network Information */}
      {(parsedMovie.network || parsedMovie.webChannel) && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Network Information</Text>
          {parsedMovie.network?.name && (
            <Text style={styles.info}>
              <Text style={styles.label}>Network:</Text> {parsedMovie.network.name}
            </Text>
          )}
          {parsedMovie.network?.country?.name && (
            <Text style={styles.info}>
              <Text style={styles.label}>Country:</Text> {parsedMovie.network.country.name}
            </Text>
          )}
          {parsedMovie.network?.country?.timezone && (
            <Text style={styles.info}>
              <Text style={styles.label}>Timezone:</Text> {parsedMovie.network.country.timezone}
            </Text>
          )}
          {parsedMovie.webChannel?.name && (
            <Text style={styles.info}>
              <Text style={styles.label}>Web Channel:</Text> {parsedMovie.webChannel.name}
            </Text>
          )}
        </View>
      )}

      {/* External Links */}
      {(parsedMovie.url || parsedMovie.officialSite) && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>External Links</Text>
          {renderLink('TVmaze', parsedMovie.url)}
          {renderLink('Official Site', parsedMovie.officialSite)}
        </View>
      )}

      {/* Externals */}
      {/* {(parsedMovie.externals?.imdb || parsedMovie.externals?.thetvdb || parsedMovie.externals?.tvrage) && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Externals</Text>
          {parsedMovie.externals?.imdb && (
            <Text style={styles.info}>
              <Text style={styles.label}>IMDB:</Text> {parsedMovie.externals.imdb}
            </Text>
          )}
          {parsedMovie.externals?.thetvdb && (
            <Text style={styles.info}>
              <Text style={styles.label}>The TVDB:</Text> {parsedMovie.externals.thetvdb}
            </Text>
          )}
          {parsedMovie.externals?.tvrage && (
            <Text style={styles.info}>
              <Text style={styles.label}>TVRage:</Text> {parsedMovie.externals.tvrage}
            </Text>
          )} 
        </View>
          )}*/}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', padding: 10 },
  image: { width: '100%', height: 500, borderRadius: 10, marginBottom: 20 },
  title: { color: '#fff', fontSize: 28, fontWeight: 'bold', marginBottom: 10 },
  section: { marginBottom: 20 },
  sectionTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  info: { color: '#ccc', fontSize: 16, marginBottom: 5 },
  label: { color: '#fff', fontWeight: 'bold' },
  link: { color: '#1e90ff', textDecorationLine: 'underline' },
  errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorMessage: { color: '#fff', fontSize: 18 },
});
