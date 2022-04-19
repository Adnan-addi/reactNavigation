//import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image , TouchableOpacity ,StatusBar} from 'react-native';
import React, { useState } from 'react'
//important for navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {FontAwesome5,FontAwesome} from "@expo/vector-icons";

//important for bottom-tabs navigation
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

function HomeScreen({navigation}){
return (
  <View style ={styles.container}>
  <View style={{width:"100%",flex: 1,marginTop:64}}>
    <Image 
    source ={require('./assets/home.png')} 
    style = {{width:undefined , height:undefined ,flex:1}} 
    resizeMode = "contain"
    />
  </View>
  <View style = {{flex : 2 , alignItems:'center'}}>
    <Text style = {{fontWeight : "100" , fontSize : 32 }}>Home Screen</Text>
    <TouchableOpacity style={styles.button} onPress={() => {

        navigation.navigate("Music",{
          userName:"Adnan Quraishi",
          action: "React Native Developer!"
        });


    }}>
      <Text style={{color: "#FFF" }}>Go to the Music Screen</Text>
    </TouchableOpacity>

    <TouchableOpacity 
    style={[styles.button,{borderColor:"#23A6D9", borderWidth:1,marginTop:12,backgroundColor:"#FFF" }]} 
    onPress={() => {
    navigation.navigate("Settings");
    }}>
     <Text style = {{color:"#23A6D9"}}>Go to Settings</Text>
    </TouchableOpacity>
  </View>
</View>
);
}

function MusicScreen({route,navigation}){
  let {userName,action} = route.params;

  let [liked,setLiked] = React.useState(false)

  React.useLayoutEffect(() =>{
    navigation.setOptions({
      headerRight:()=>(
        <TouchableOpacity onPress={()=> setLiked((prev)=> !prev)}>
          <FontAwesome name = {liked ? "heart":"heart-o"} size = {24} color="#FFF" style = {{marginRight:16}}/>
        </TouchableOpacity>

      )
    })
  })
  return(
  <View style ={styles.container}>
  <View style={{width:"100%",flex: 1,marginTop:64}}>
    <Image 
    source ={require('./assets/music.png')} 
    style = {{width:undefined , height:undefined ,flex:1}} 
    resizeMode = "contain"
    />
  </View>
  <View style = {{flex : 2 , alignItems:'center'}}>
    <Text style = {{fontWeight : "100" , fontSize : 32 }}>Music Screen</Text>
   
   <Text style = {{fontWeight:"600" , marginVertical:32}}>
     {userName} is the {action}
   </Text>
    <TouchableOpacity style={styles.button} onPress={() => {

        navigation.navigate("Home");
        

    }}>
      <Text style={{color: "#FFF" }}>Go to the Home Screen</Text>
    </TouchableOpacity>

    <TouchableOpacity style={[styles.button,
    {borderColor:"#23A6D9",
    borderWidth: 1,
  marginTop : 12,
backgroundColor:"#FFF"}]} 
    onPress={() => {
      navigation.goBack();
    }}> 
      <Text style={{color: "#23A6D9" }}>Go Back</Text>
</TouchableOpacity>
  </View>
</View>
  );
}

function CustomHeader(){
  return <FontAwesome5 name = "music" size = {24} color = "#fff"/>;
}

function SettingsScreen(){
  return (
    <View style={styles.container}>
      <View style = {{width:"100%",flex:1,marginTop:64}}>
        <Image source = {require('./assets/settings.png')} 
        style = {{width:undefined,height:undefined,flex:1}} 
        resizeMode="contain">
        </Image>
        <View style={{flex:2,alignItems:'center'}}>
          <Text style={{fontWeight:"100",fontSize:32}}>Settings Screen</Text>
        </View>
      </View>
      
    </View>
  )
}

function DetailsScreen(){
  return(
    <View style={styles.container}>
    <View style = {{width:"100%",flex:1,marginTop:64}}>
      <Image source = {require('./assets/details.png')} 
      style = {{width:undefined,height:undefined,flex:1}} 
      resizeMode="contain">
      </Image>
      <View style={{flex:2,alignItems:'center'}}>
        <Text style={{fontWeight:"100",fontSize:32}}>Details Screen</Text>
      </View>
    </View>
    
  </View>
  )
}

function Badge({name,count,color,size}){
  return (
    <View style={{width:24,height:24}}>
      <FontAwesome name = {name} size={size} color = {color}/>

{count>0 && (
      <View style={styles.badge}>
        <Text style={{color:"white", fontSize:10 , fontWeight:"600" }}>{count}</Text>
      </View>
)}
    </View>
  )
}


const Main = createStackNavigator();
const Settings = createBottomTabNavigator();

function SettingTabs(){
  return(
    <Settings.Navigator screenOptions={({route}) => ({
      tabBarIcon:({color,size}) =>{
        if(route.name === 'SettingsScreen'){
          return <Badge name = "cog" color={color} size={size} count={8}/>;
        }
        return <FontAwesome name = "paperclip" size = {size} color = {color} />;

      }
    })}
    
    tabBarOptions = {{
      activeTintColor:"#23A6D9",
      inactiveTinrColor:"gray",
    }}
    
    >
      <Settings.Screen name="SettingsScreen" component={SettingsScreen}/>
      <Settings.Screen name="DetailsScreen" component = {DetailsScreen}/>
    </Settings.Navigator>
  )
}


export default function App() {
  return (
     <NavigationContainer>
       <StatusBar barStyle="light-content"/>
       <Main.Navigator screenOptions={{
         headerStyle:{
           backgroundColor:"#23A6D9",
         },
         headerTintColor:"#FFF",
         headerTitleStyle:{
           fontWeight:"200",
           fontSize: 30,
         }
       }}>
         <Main.Screen name = "Home" component={HomeScreen}/>
         <Main.Screen name = "Music" component={MusicScreen} options={{
         headerTitle: props => <CustomHeader {...props} />,
         }}/>
         <Main.Screen name = "Settings" component={SettingTabs}/>
       </Main.Navigator>
     </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button:{
    marginTop:32,
    backgroundColor:"#23A6D9",
    paddingVertical:12,
    width:250,
    borderRadius: 12,
    alignItems:'center',
  },
  badge:{
    position:"absolute",
    right: -6,
    top:-3,
    backgroundColor:"#FF6583",
    borderRadius:6,
    width:12,
    height:12,
    justifyContent:"center",
    alignItems:"center"
  }
});
