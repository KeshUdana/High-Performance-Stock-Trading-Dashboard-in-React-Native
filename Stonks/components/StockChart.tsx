import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, useColorScheme, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import axios from 'axios';

const API_KEY = 'QTG78RGQ9R0XYD17'; // Replace with your key

type ChartData = {
  labels: string[];
  datasets: {
    data: number[];
  }[];
};

interface StockChartProps {
  timeRange: string;
}

export default function StockChart({ timeRange }: StockChartProps) {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState(true);
  const screenWidth = Dimensions.get('window').width;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=NDAQ&apikey=${API_KEY}`
        );
        
        const timeSeries = response.data['Time Series (Daily)'];
        const last7Days = Object.keys(timeSeries).slice(0, 7).reverse();
        
        setChartData({
          labels: last7Days.map(date => date.split('-')[2]), // Show just day numbers
          datasets: [{
            data: last7Days.map(date => parseFloat(timeSeries[date]['4. close']))
          }]
        });
      } catch (error) {
        console.error("API Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [timeRange]);

  const chartConfig = {
    backgroundColor: isDarkMode ? '#121212' : '#f9f9f9',
    backgroundGradientFrom: isDarkMode ? '#1a1a1a' : '#f0f0f0',
    backgroundGradientTo: isDarkMode ? '#2a2a2a' : '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => isDarkMode ? `rgba(0, 230, 118, ${opacity})` : `rgba(0, 150, 136, ${opacity})`,
    labelColor: (opacity = 1) => isDarkMode ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16
    },
    propsForDots: {
      r: '3',
      strokeWidth: '1',
      stroke: isDarkMode ? '#00e676' : '#009688'
    }
  };

  if (loading) return <Text style={[styles.text, isDarkMode && styles.darkText]}>Loading chart...</Text>;
  if (!chartData) return <Text style={[styles.text, isDarkMode && styles.darkText]}>Data unavailable</Text>;

  return (
    <View style={[styles.chartContainer, isDarkMode && styles.darkContainer]}>
      <Text style={[styles.title, isDarkMode && styles.darkTitle]}>NASDAQ (NDAQ) - {timeRange}</Text>
      <LineChart
        data={chartData}
        width={screenWidth - 40}
        height={220}
        yAxisLabel="$"
        yAxisInterval={2}
        chartConfig={chartConfig}
        bezier
        withHorizontalLabels={true}
        withVerticalLabels={true}
        withInnerLines={false}
        withOuterLines={false}
        style={{
          marginVertical: 8,
          borderRadius: 12
        }}
      />
      <Text style={[styles.subtitle, isDarkMode && styles.darkSubtitle]}>
        Last {timeRange} trading days
      </Text>
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
  darkContainer: {
    backgroundColor: '#1a1a1a',
    shadowColor: '#333'
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333'
  },
  darkTitle: {
    color: '#fff'
  },
  subtitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'right',
    marginTop: 4
  },
  darkSubtitle: {
    color: '#aaa'
  },
  text: {
    color: '#333',
    textAlign: 'center',
    padding: 20
  },
  darkText: {
    color: '#fff'
  }
});