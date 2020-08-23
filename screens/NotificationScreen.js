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
    FlatList} from 'react-native';
    import {ListItem,Card,Header,Icon} from 'react-native-elements'

import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader.js'
import SwipeableFlatlist from '../components/SwipeableFlatlist'

export default class NotificationScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            userId:firebase.auth().currentUser.email,
            allNotifications:[]
        }
        this.notificationRef = null;
    }
    getNotifications = ()=>{
        this.notificationRef = db.collection("all_notifications")
        .where("notification_status","==","unread")
        .where("targeted_user_id","==",this.state.userId)
        .onSnapshot((snapshot)=>{
            var allNotifications = []
            snapshot.docs.map((doc)=>{
                var notification = doc.data()
                notification["doc_id"]=doc.id
                allNotifications.push(notification)
            })
                this.setState({
                    allNotifications:allNotifications
                })
                
        })
    }
    componentDidMount(){
        this.getNotifications()
    }
    componentWillMount(){
        this.notificationRef
    }
    keyExtractor = (item,index)=>index.toString()

    renderItem = ({item,index})=>{
        <ListItem
        key = {index}
        leftElement = {<Icon name = "book" type = "font/awesome" color = '#696969'/>}
        title = {item.book_name}
        titleStyle = {{color:'black',fontWeight:'bold'}}
        subtitle = {item.message}
        bottomDivider/>


    }
    render(){
        return(
            <View style = {{flex:1}}>
                <View style = {{flex:1}}>
                    <MyHeader navigation = {this.props.navigation} title = "Notifications"/>
                    </View>
                    <View style = {{flex:0.9}}>{
                        this.state.allNotifications.length === 0
                        ?(
                            <View style = {{flex:1,justifyContent:'center',alignItems:'center'}}>
                                <Text style = {{fontSize:20}}>View Notifications</Text>
                            </View>
                         ):(
                             <SwipeableFlatlist allNotifications = {this.state.allNotifications}/>
                         )
                    }
                </View>
            </View>
        )
    }
}