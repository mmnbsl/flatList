import React, { useState, useEffect } from 'react';
import { SafeAreaView, TextInput , View, FlatList, Image, Text, StyleSheet, StatusBar, Platform} from 'react-native';

const FlatListExample = () =>{
    const [jsonData, setJsonData] = useState()
    const [searchText, setSearchText] = useState(null);

    const mainContainer = Platform.select({
        ios: style.mainContainerIos,
        android : style.mainContainerAndroid
    })

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

    const _filter = (text) =>{
        const newData = jsonData.filter((item)=>{
            const listItem = `${item.title.toLowerCase()}`; 
            return listItem.indexOf(text.toLowerCase()) > -1;
        }) 
        setJsonData(newData)
        setSearchText(text)
    }

    const _headerComponent = () =>{
        return (
            <View style = {style.inputContainer}>
                <TextInput
                    style = {style.input}
                    placeholder = 'Search..'
                    value = {searchText}
                    onChangeText = {(text) => {
                        //setSearchText(text)
                        _filter(text)
                   
                    }}
                    keyboardType= 'default' 
                />
            </View>
        )
    }
    return(
        <SafeAreaView style = {mainContainer}>
            <FlatList
                data = {jsonData}
                renderItem = {_renderItem}
                keyExtractor = {(item) => item.id.toString()}
                ListHeaderComponent = {_headerComponent}
                stickyHeaderIndices = {[0]} //Header'ı sabitledi
            />
        </SafeAreaView>
    )
}
const style = StyleSheet.create({
    mainContainerIos : {
        flex : 1,
        paddingTop : StatusBar.currentHeight
    },
    mainContainerAndroid: {
        flex: 1,
        paddingTop: StatusBar.currentHeight
    },
    viewContainer: {
        flex: 1,
        paddingVertical : 10,
        borderBottomWidth : 1,
        borderBottomColor : '#eee',
    },
    itemContainer : {
        flexDirection : 'row',
        alignItems : 'center',
    },
    avatar : {
        height : 50,
        width : 50,
        borderRadius : 25,
        marginHorizontal : 10
    },
    inputContainer : {
        flex : 1,
        borderWidth : 0.5,
        borderColor : '#000',
        borderRadius : 10,
        marginHorizontal : 5,
        backgroundColor : 'white'
    },
    input : {
        height : 50,
        marginHorizontal :10,
    }
})

export default FlatListExample