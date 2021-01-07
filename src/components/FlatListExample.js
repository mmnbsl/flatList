import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, FlatList, Image, Text, StyleSheet, Platform, StatusBar} from 'react-native';

const FlatListExample = () =>{
    const [jsonData, setJsonData] = useState([])

    useEffect(()=>{
        fetch('https://jsonplaceholder.typicode.com/photos')
        .then(response => response.json())
        .then(data => setJsonData(data))
    },[])

    const _renderItem =( {item} ) => {
        return(
            <View style={[style.viewContainer, {backgroundColor : item.id % 2 === 1 ? '#f9f9f9' : ''}]}>   
                <View style = {style.itemContainer}>
                    <Image
                        style={style.avatar}
                        source={{ uri: item.thumbnailUrl }}
                    />
                    <Text>{item.title}</Text>
                </View>
            </View>
        )
    }

    return(
        <SafeAreaView>
            <FlatList
                data = {jsonData}
                renderItem = {_renderItem}
                keyExtractor = {(item) => item.id}
            />
        </SafeAreaView>
    )
}
const style = StyleSheet.create({
    viewContainer: {
        flex: 1,
        paddingVertical : 10,
        borderBottomWidth : 1,
        borderBottomColor : '#eee'
    },
    itemContainer : {
        flexDirection : 'row',
        alignItems : 'center'
    },
    avatar : {
        height : 50,
        width : 50,
        borderRadius : 25,
        marginHorizontal : 10
    }
})

export default FlatListExample