import { StyleSheet, TouchableOpacity, Image, ScrollView, useColorScheme } from 'react-native';
import { Text, View } from '@/components/Themed';
import { LineChart } from 'react-native-chart-kit';

export default function TabOneScreen() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  // Chart data configuration
  const chartConfig = {
    backgroundColor: isDarkMode ? '#121212' : '#ffffff',
    backgroundGradientFrom: isDarkMode ? '#1E1E1E' : '#ffffff',
    backgroundGradientTo: isDarkMode ? '#2D2D2D' : '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => isDarkMode ? `rgba(100, 210, 255, ${opacity})` : `rgba(0, 122, 255, ${opacity})`,
    labelColor: (opacity = 1) => isDarkMode ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '4',
      strokeWidth: '2',
      stroke: isDarkMode ? '#64D2FF' : '#007AFF',
    },
  };

  return (
    <ScrollView 
      style={[styles.container, isDarkMode && styles.darkContainer]}
      contentContainerStyle={styles.scrollContent}
    >
      {/*Welcome Text*/}
      <Text style={[styles.title, isDarkMode && styles.darkTitle]}>Let's Start Investing</Text>
      <Text style={[styles.cardSubtitle, isDarkMode && styles.darkTitle]}>Tap on Unit Trust,Treasuries or Equities and tap to sign up</Text>
      
      <View style={styles.cardsContainer}>
      <TouchableOpacity style={[styles.card, isDarkMode && styles.darkCard]}>
          <View style={styles.cardHeader}>
            <Text style={[styles.stockSymbol, isDarkMode && styles.darkText]}>AAPL</Text>
            <Text style={[styles.stockPrice, isDarkMode && styles.darkText]}>$189.25</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Cards Grid */}
      <View style={styles.cardsContainer}>
        {/* 1. Stock Card */}
        <TouchableOpacity style={[styles.card, isDarkMode && styles.darkCard]}>
          <View style={styles.cardHeader}>
            <Text style={[styles.stockSymbol, isDarkMode && styles.darkText]}>AAPL</Text>
            <Text style={[styles.stockPrice, isDarkMode && styles.darkText]}>$189.25</Text>
          </View>
          <Text style={[styles.stockName, isDarkMode && styles.darkSubtext]}>Apple Inc.</Text>
          <View style={[styles.priceChange, { backgroundColor: '#4CAF50' }]}>
            <Text style={styles.changeText}>+2.34%</Text>
          </View>
        </TouchableOpacity>

        {/* 2. Stock Card */}
        <TouchableOpacity style={[styles.card, isDarkMode && styles.darkCard]}>
          <View style={styles.cardHeader}>
            <Text style={[styles.stockSymbol, isDarkMode && styles.darkText]}>TSLA</Text>
            <Text style={[styles.stockPrice, isDarkMode && styles.darkText]}>$175.50</Text>
          </View>
          <Text style={[styles.stockName, isDarkMode && styles.darkSubtext]}>Tesla Inc.</Text>
          <View style={[styles.priceChange, { backgroundColor: '#F44336' }]}>
            <Text style={styles.changeText}>-1.12%</Text>
          </View>
        </TouchableOpacity>

        {/* 3. Graph Card (Full Width) */}
        <View style={[styles.graphCard, isDarkMode && styles.darkCard]}>
          <Text style={[styles.cardTitle, isDarkMode && styles.darkText]}>NASDAQ Chart</Text>
          <LineChart
            data={{
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
              datasets: [{
                data: [12000, 12500, 13000, 13500, 14000, 14500],
              }],
            }}
            width={graphCardWidth - 32}
            height={160}
            yAxisLabel="$"
            chartConfig={chartConfig}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>

        {/* 4. Watchlist Card */}
        <TouchableOpacity style={[styles.card, isDarkMode && styles.darkCard]}>
          <View style={styles.cardHeader}>
            <Text style={[styles.cardTitle, isDarkMode && styles.darkText]}>Watchlist</Text>
            <Image 
              source={{ uri: 'https://icon-library.com/images/watchlist-icon/watchlist-icon-12.jpg' }} 
              style={[styles.icon, isDarkMode && styles.darkIcon]} 
            />
          </View>
          <Text style={[styles.cardSubtitle, isDarkMode && styles.darkSubtext]}>5 stocks tracked</Text>
        </TouchableOpacity>

        {/* 5. Portfolio Card */}
        <TouchableOpacity style={[styles.card, isDarkMode && styles.darkCard]}>
          <View style={styles.cardHeader}>
            <Text style={[styles.cardTitle, isDarkMode && styles.darkText]}>Portfolio</Text>
            <Image 
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3132/3132693.png' }} 
              style={[styles.icon, isDarkMode && styles.darkIcon]} 
            />
          </View>
          <Text style={[styles.portfolioValue, isDarkMode && styles.darkText]}>$24,589.32</Text>
          <Text style={[styles.cardSubtitle, isDarkMode && styles.darkSubtext]}>+5.2% today</Text>
        </TouchableOpacity>

        {/* 6. News Card */}
        <TouchableOpacity style={[styles.card, isDarkMode && styles.darkCard]}>
          <View style={styles.cardHeader}>
            <Text style={[styles.cardTitle, isDarkMode && styles.darkText]}>Market News</Text>
            <Image 
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2965/2965879.png' }} 
              style={[styles.icon, isDarkMode && styles.darkIcon]} 
            />
          </View>
          <Text style={[styles.newsHeadline, isDarkMode && styles.darkSubtext]}>Fed signals rate cuts in Q3</Text>
        </TouchableOpacity>

        {/* 7. Quick Trade Card */}
        <TouchableOpacity style={[styles.card, isDarkMode && styles.darkCard]}>
          <View style={styles.cardHeader}>
            <Text style={[styles.cardTitle, isDarkMode && styles.darkText]}>Quick Trade</Text>
            <Image 
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/159/159832.png' }} 
              style={[styles.icon, isDarkMode && styles.darkIcon]} 
            />
          </View>
          <View style={styles.tradeButtons}>
            <TouchableOpacity style={[styles.tradeButton, { backgroundColor: '#4CAF50' }]}>
              <Text style={styles.buttonText}>BUY</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.tradeButton, { backgroundColor: '#F44336' }]}>
              <Text style={styles.buttonText}>SELL</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const graphCardWidth = 320; // Define a constant for the graph card width

const styles = StyleSheet.create({
  graphCard: {
    width: graphCardWidth, // Use the constant here
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  scrollContent: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  darkTitle: {
    color: '#fff',
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  darkCard: {
    backgroundColor: '#1E1E1E',
    shadowColor: '#fff',
    shadowOpacity: 0.05,
  },
  
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  stockSymbol: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  stockPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  stockName: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  priceChange: {
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignSelf: 'flex-start',
  },
  changeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  portfolioValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 8,
    color: '#000',
  },
  newsHeadline: {
    fontSize: 14,
    marginTop: 8,
    color: '#666',
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: '#666',
  },
  darkIcon: {
    tintColor: '#999',
  },
  tradeButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  tradeButton: {
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    width: '48%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  darkText: {
    color: '#fff',
  },
  darkSubtext: {
    color: '#999',
  },
});