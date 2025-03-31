import { useState } from 'react';
import { StyleSheet, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import StockChart from '@/components/StockChart';

export default function TabTwoScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [timeRange, setTimeRange] = useState('1W');

  const onRefresh = () => {
    setRefreshing(true);
    // Add API refresh logic here
    setTimeout(() => setRefreshing(false), 1000);
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <Text style={styles.title}>Market Analytics</Text>
      <StockChart timeRange={timeRange} />
      
      <View style={styles.timeSelector}>
        {['1W', '1M', '3M'].map(range => (
          <TouchableOpacity key={range} onPress={() => setTimeRange(range)}>
            <Text style={[styles.timeOption, timeRange === range && styles.selectedOption]}>
              {range}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>Swipe down to refresh data</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginHorizontal: 16,
    marginBottom: 8,
  },
  timeSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 12,
  },
  timeOption: {
    marginHorizontal: 10,
    fontSize: 16,
    color: '#009688',
  },
  selectedOption: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  infoBox: {
    backgroundColor: 'rgba(0, 150, 136, 0.1)',
    borderRadius: 12,
    padding: 16,
    margin: 16,
    marginTop: 8,
    alignItems: 'center',
  },
  infoText: {
    color: '#009688',
    fontSize: 14,
  },
});
