
import  React from "react" 
import  {ActivityIndicator, Dimensions, StyleSheet, Text, TouchableOpacity, View }from "react-native"
import { ItemType } from "../../types/itemType"
import ImageRatio from "../image/ImageRatio"

type Props = ItemType & {
    onClick ?: ({data} : { data ?: ItemType}) => void
}

const CardImage  = (props : Props) => {
    const width = Dimensions.get("window").width
 return (
     <TouchableOpacity 
         onPress={() => props?.onClick && props?.onClick({data : { name : props.name , id : props.id , url : props.url , description : props.description }})}
           style={{...styles.conatin}}>
            <View>
                <ImageRatio
                   onLoad={() => <ActivityIndicator />}
                   source={{ uri : props.url}}
                   width={width}
                />
            </View>
            <View style={{padding : 10}}>
                <Text>{props?.name}</Text>
            </View>
     </TouchableOpacity>
 )
}


const styles = StyleSheet.create({
    conatin : {
        borderColor : "#CCCCCC" ,
        flexDirection : "column" ,
        width : "100%" ,
        overflow : 'hidden',
        borderWidth : 1 ,
        marginTop : 10, 
        borderRadius : 10 ,
     } ,
     title : {
        
     }
})
export  default  CardImage