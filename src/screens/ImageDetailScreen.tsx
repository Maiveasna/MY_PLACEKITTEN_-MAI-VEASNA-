import { View , Text, Dimensions, StyleSheet } from "react-native"
import  React from "react"
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamType } from "../types/RootStackParamType";
import ImageRatio from "../components/image/ImageRatio";

type Props =  NativeStackScreenProps<RootStackParamType ,  "imageDetail">
const ImageDetailScreen = ({navigation , route}  : Props) => {
    const  width = Dimensions.get("window").width
    return (
        <View>
             <View>
                 <ImageRatio
                    source={{uri : route.params.url}}
                     width={width}
                 />
             </View>
           <View style={{paddingVertical : 10 , paddingHorizontal : 10}}>
              <Text style={{...styles.title}}>{route?.params?.name}</Text>
           </View>
           <View style={{paddingHorizontal : 10}}>
              <Text style={{...styles.description}}>{route?.params?.description}</Text>
           </View>
        </View>
    )
    
}

const styles = StyleSheet.create({
     title :{
        fontSize : 20 ,
        fontWeight : "bold" ,
        textAlign : "left",
     },
     description : {
        fontSize : 15 ,
     }
})

export  default  ImageDetailScreen