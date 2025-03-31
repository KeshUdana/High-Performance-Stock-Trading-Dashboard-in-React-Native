import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, useColorScheme, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const WS_URL = "http://0.0.0.0:8000 "; // Ensure this matches your FastAPI server

type ChartData = {
  labels: string[];
  datasets: { data: number[] }[];
};

export default function StockChart() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const [chartData, setChartData] = useState<ChartData>({ labels: [], datasets: [{ data: [] }] });

  useEffect(() => {
    const ws = new WebSocket(WS_URL);

    ws.onmessage = (event) => {
      try {
        const stockData = JSON.parse(event.data);
        const time = stockData.time;
        const price = parseFloat(stockData.price);

        setChartData((prev) => {
          const newLabels = [...prev.labels.slice(-49), time]; // Keep last 50 timestamps
          const newData = [...prev.datasets[0].data.slice(-49), price]; // Keep last 50 prices

          return { labels: newLabels, datasets: [{ data: newData }] };
        });
      } catch (error) {
        console.error("WebSocket Error:", error);
      }
    };

    ws.onerror = (error) => console.error("WebSocket Error:", error);
    ws.onclose = () => console.log("WebSocket disconnected");

    return () => ws.close();
  }, []);

  const chartConfig = {
    backgroundColor: isDarkMode ? '#121212' : '#f9f9f9',
    backgroundGradientFrom: isDarkMode ? '#1a1a1a' : '#f0f0f0',
    backgroundGradientTo: isDarkMode ? '#2a2a2a' : '#ffffff',
    decimalPlaces: 2,
    color: (opacity = 1) => isDarkMode ? `rgba(0, 230, 118, ${opacity})` : `rgba(0, 150, 136, ${opacity})`,
    labelColor: (opacity = 1) => isDarkMode ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity})`,
    style: { borderRadius: 16 },
    propsForDots: { r: '3', strokeWidth: '1', stroke: isDarkMode ? '#00e676' : '#009688' }
  };

  return (
    <View style={[styles.chartContainer, isDarkMode && styles.darkContainer]}>
      <Text style={[styles.title, isDarkMode && styles.darkTitle]}>NASDAQ (NDAQ) - Live</Text>
      <LineChart
        data={chartData}
        width={Dimensions.get('window').width - 40}
        height={220}
        yAxisLabel="$"
        chartConfig={chartConfig}
        bezier
        withHorizontalLabels={false}
        withVerticalLabels={false}
        withInnerLines={false}
        withOuterLines={false}
        style={{ marginVertical: 8, borderRadius: 12 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  chartContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 16,
    padding: 16,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3
  },
  darkContainer: { backgroundColor: '#1a1a1a', shadowColor: '#333' },
  title: { fontSize: 18, fontWeight: '600', marginBottom: 8, color: '#333' },
  darkTitle: { color: '#fff' }
});
