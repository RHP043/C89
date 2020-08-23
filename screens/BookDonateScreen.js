import React,{Component}from 'react';
import {
    View,
    Text,
    TextInput,
    Modal,
    KeyboardAvoidingView,
    StyleSheet,
    TouchableOpacity,
    Alert,
    FlatList,
    TouchableHighlightComponent} from 'react-native';
    import {ListItem} from 'react-native-elements'

import SantaAnimation from '../components/SantaClaus.js';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader.js'

export default class BookDonateScreen extends Component{
    constructor(){
        super()
        this.state = {
            userId:firebase.auth().currentUser.email,
            requestedBooksList:[]}
        this.requestRef = null
    }
    getRequestedBooksList = () => {
        this.requestRef = db.collection("requested_books")
        .onSnapshot((snapshot)=>{
            var requestedBooksList = snapshot.docs.map(doc => doc.data());
            this.setState({
                requestedBooksList:requestedBooksList
            })
        })
    }
    componentDidMount(){
        this.getRequestedBooksList();
    }
    
    componentWillUnmount(){
        this.requestRef();
    }
    keyExtractor = (item,index)=>index.toString()

    renderItem = ({item,i})=>{
        return(
            <ListItem
            key = {i}
            title = {item.book_name}
            subtitle = {item.reason_to_request}
            titleStyle = {{color:'black',fontWeight:'gold'}}
            rightElement = {
                <TouchableOpacity style = {styles.button}
                onPress = {()=>{
                    this.props.navigation.navigate("RecieverDetails",{"details":item})
                }}
                >
                    <Text style = {{color:'#fffff'}}>View</Text>
                </TouchableOpacity>
            }
            bottomDivider
            />
        )
    }
    render(){
        return(
            <View style = {{flex:1}}>
                <MyHeader title = "donateBooks" navigation = {this.props.navigation}/>
                <View style = {{flex:1}}>
                    {
                        this.state.requestedBooksList.length === 0
                        ?(
                            <View style = {styles.subContainer}>
                                <Text style = {{fontSize:20}}>List Of All Requested Books</Text>
                            </View>
                        ):(
                            <FlatList
                            keyExtractor = {this.keyExtractor}
                            data = {this.state.requestedBooksList}
                            renderItem = {this.renderItem}
                            />
                        )
                    }
                </View>
            </View>
        )
    }

}
const styles = StyleSheet.create({
    button:{
        width:100,
        height:30,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"#ff9800",
        shadowColor: "#000",
        shadowOffset: {
           width: 0,
           height: 8,
        },
      },
      subContainer:{
        flex:1,
        fontSize:20,
        alignItems: 'center',
        justifyContent: 'center'
      },
})

