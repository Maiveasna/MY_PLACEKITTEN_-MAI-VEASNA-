import { ActivityIndicator, FlatList, SafeAreaView , StatusBar, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from "react-native"
import  React, { useEffect, useMemo, useState } from "react"
import { ItemType } from "../types/itemType"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ImageDetailScreen from "./ImageDetailScreen";
import { RootStackParamType } from "../types/RootStackParamType";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import { InitialStateType } from "../redux/reducer/reducer";
import API from "../api/API";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreator } from "../redux";
import { State } from "../redux/reducer";
import ImageRatio from "../components/image/ImageRatio";
import CardImage from "../components/card-image";
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = "IMAGE"
const initialUrl = "/v1/images/search?size=med&mime_type=jpg,png&has_breeds=1" // initial url

export const  fetchData = async ({url} : {url : string}) => {
    if(url){
      const response = await API.get(url);
      return response.data as ItemType[];
    }
}

type Props =  NativeStackScreenProps<RootStackParamType , "home"> // initial screen

const HomeScreen = ({navigation , route} : Props) => {
    
  const isDarkMode = useColorScheme() === 'dark'; 
  const data = useSelector((state : State) => state.reducer)
  const dispatch = useDispatch()
  const [ loading , setLoading ] = useState<boolean>(true)
  
  const {dispatchSetImages ,dispatchSetImageDetail , dispatchSetImagesByPagination} = bindActionCreators(actionCreator, dispatch)
//  const initialData = fetchData({url : initialUrl})
   
useMemo( async () => {
    try {
       const dataLocal = await AsyncStorage.getItem(KEY)
      if(dataLocal){
        const tempData = JSON.parse(dataLocal) 
        dispatchSetImages(tempData[30]as ItemType[])
        setLoading(false)
      }else  {
         await  fetchData({url : initialUrl + "&limit=30"}).then( async (res) => {
          dispatchSetImages(res as ItemType[])
          const  getData = await AsyncStorage.getItem(KEY)
          const  tempData =  JSON.parse(getData)
          const  localData = {
            ...tempData ,
           [30] : res as ItemType[],
         }
          AsyncStorage.setItem(KEY, JSON.stringify(localData))
          setLoading(false)
        })
      }
      console.log("ddpppp" , dataLocal)
     
    } catch (error) {
       console.log("ERROR FIRST LOAD DATA :::" , error)
       setLoading(false)
    }
   } , [initialUrl])
   
   
   const handleDataPagination = async ({ page} : { page : number}) => {
        setLoading(true)
        const  getData = await AsyncStorage.getItem(KEY)
        const  tempData =  JSON.parse(getData)
        if(tempData[page]) {
          dispatchSetImagesByPagination(tempData[page])
          setLoading(false)
        }else  {
          const data = await  fetchData({url : `${initialUrl}&limit=${page}`})
          const  localData = {
            ...tempData ,
           [page] : data as ItemType[],
         }
          await AsyncStorage.setItem(KEY, JSON.stringify(localData))
          if(data) {
            dispatchSetImagesByPagination(data)
            setLoading(false)
          }
        }
        
        
     
   }
   
   
    if(loading) {
      return <View style={{ flex : 1 , justifyContent : 'center', alignItems : "center"}}>
        <ActivityIndicator />
      </View>
    }else {
      return (
        <View>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
              <View style={{...styles.buttonWarp}}>
                  <TouchableOpacity
                      onPress={() => handleDataPagination({page : 30})}
                       style={{...styles.button}}>
                      <Text>30</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                     onPress={() => handleDataPagination({page : 50})}
                     style={{...styles.button}}>
                      <Text>50</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                      onPress={() => handleDataPagination({page : 100})}
                      style={{...styles.button}}>
                      <Text>100</Text>
                  </TouchableOpacity>
              </View>
               <View  style={{...styles.banerTop}}>
                 <FlatList
                    data={data?.images}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => item?.id + "_" + index}
                     scrollEnabled = {true}
                     showsVerticalScrollIndicator = {false}
                     numColumns = {1}
                     renderItem = {
                         ({item , index}) => {
                             return (
                                <CardImage
                                  onClick={(props) => navigation.navigate("imageDetail",{ 
                                    name :props?.data?.name , 
                                    url :props?.data?.url ,
                                    description : props?.data?.description  })
                                  } 
                                   description={item && item?.breeds && item?.breeds[0]?.description}
                                   url={item?.url}
                                   name={item && item?.breeds && item?.breeds[0]?.name + "-" +  index}
                                />
                             )
                         }
                     }
                 />
             </View>
        </View>
      )
    }
  
    
}

const styles = StyleSheet.create({
    main : {
        width : "100%" ,
        backgroundColor : "black",
       
    },
   banerTop : {
        width : "100%" ,
        flexDirection : "row",
        paddingHorizontal : 10 ,
   },
   buttonWarp : {
       width : "100%" ,
       flexDirection : 'row' ,
       paddingTop : 20,
       justifyContent : "space-around"
   },
   button : {
       width : "30%" ,
      height : 40 ,
      alignItems : 'center' ,
      justifyContent :  "center" ,
      borderWidth : 0.5 ,
      borderRadius : 10 ,
      borderColor : "#CCCCCC" ,
   }
})

export  default HomeScreen