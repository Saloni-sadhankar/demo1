import React, { useEffect, useState } from 'react';
import {
  Button,
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

function App(){
  const isDarkMode = useColorScheme() === 'dark';

  //api == https://testapi.getlokalapp.com/common/jobs?page=1

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const safePadding = '5%';

  const [userData , setUserData] = useState([])

  useEffect(() =>{
      getApiData()
  },[])

  const getApiData = async() =>{
      const url = 'https://testapi.getlokalapp.com/common/jobs?page=1';
      const api = await fetch(url);
      const res = await api.json();
      setUserData(res.results)
      console.warn('res:::',res)
  }


  console.warn('userData:::',userData)

  return (
    <View style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        style={backgroundStyle}>
        <View style={{paddingRight: safePadding}}>
          <Header/>
        </View>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
            paddingHorizontal: safePadding,
            paddingBottom: safePadding,
          }}>
         <Text>User Data</Text>
         <Button title='fetch Data'/>
         <FlatList 
          data={userData}
          renderItem={({item}) => <View style={styles.list}>
            <Text style={styles.listText}>Title: {item.title}</Text>
            <Text style={styles.listText}>Place: {item.primary_details?.Place}</Text>
            <Text style={styles.listText}>Salary: {item.primary_details?.Salary}</Text>
          </View>}
         />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  list:{
    padding:15,
    margin:5,
    borderColor:"black",
    borderWidth:2,
  },
  listText:{
    fontSize:18,
    padding:5
  }
});

export default App;
