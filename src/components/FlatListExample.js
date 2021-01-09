import React, { Component } from 'react';
import { SafeAreaView, TextInput , View, FlatList, Image, Text, StyleSheet, StatusBar, Platform, ActivityIndicator} from 'react-native';
import axios from 'axios';

export default class FlatListExample extends Component {

    constructor(){
        super()
        this.state = {
            jsonData : [],
            allJsonData : [], 
            searchText : '',
            isLoading : false,
        }
    }

    componentDidMount(){
        this.getData();
    }
    
    getData = async () => {
        this.setState({
            isLoading : true,
        })
        const { data: { results } } = await axios('https://randomuser.me/api/?results=50')
        this.setState({
            jsonData : results,
            allJsonData : results,
            isLoading: false,
        })
    }    
    render(){
        const mainContainer = Platform.select({ 
            ios: style.mainContainerIos,
            android: style.mainContainerAndroid
        }) 

        const _renderItem = ({ item }) => {
            return (
                <View style={[style.viewContainer, { backgroundColor: item.id % 2 === 1 ? '#f9f9f9' : '' }]}>
                    <View style={style.itemContainer}>
                        <Image
                            style={style.avatar}
                            source={{ uri: item.picture.thumbnail }}
                        />
                        <View>
                            <Text>{`${item.name.title} ${item.name.first} ${item.name.last}`}</Text>
                            <Text>{item.location.city}</Text>
                        </View>
                    </View>
                </View>
            )
        }

        const _filter = (text) => {
            const newData = this.state.allJsonData.filter((item) => {
                const listItem = `${item.name.first.toLowerCase()} ${item.name.last.toLowerCase()} ${item.location.city.toLowerCase()}`;
                return listItem.indexOf(text.toLowerCase()) > -1;
            })
            this.setState({jsonData : newData})
            this.setState({searchText : text}) 
        }

        const _headerComponent = () => {
            return (
                <View style={style.inputContainer}>
                    <TextInput 
                        style={style.input}
                        placeholder='Search..'
                        value={this.state.searchText}
                        onChangeText={item => {
                            _filter(item)

                        }}
                        keyboardType='default'
                    />
                </View>
            )
        }
        const _footerComponent = () => {
            if(!this.state.isLoading) return null;
            return (
                <View style={style.indicatorContainer}>
                    <ActivityIndicator size={'large'} color="#0000ff" />
                </View>
            )
        } 
        return ( 
            <SafeAreaView style={mainContainer}>
                <FlatList
                    data={this.state.jsonData}
                    renderItem={_renderItem}
                    keyExtractor={(item) => item.login.uuid}
                    ListHeaderComponent={_headerComponent}
                    stickyHeaderIndices={[0]} //Header'ı sabitledi
                    ListFooterComponent = {_footerComponent}
                />
            </SafeAreaView>
        )
    }
}
const style = StyleSheet.create({
    mainContainerIos : {
        flex : 1,
        width : '100%',
        paddingTop : StatusBar.currentHeight
    },
    mainContainerAndroid: {
        flex: 1,
        width: '100%',
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
    },
    indicatorContainer : {
        paddingVertical : 10
    }
})