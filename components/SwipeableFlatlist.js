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
    ScrollView,
    Animated,Dimensions} from 'react-native';

import {Header,Icon,Badge,ListItem} from 'react-native-elements';
import {SwipeListView} from 'react-native-swipe-list-view';
import db from '../config'
import { render } from 'react-dom';
export default class SwipeableFlatlist extends Component{
    constructor(props){
        super(props);
        this.state = {
            allNotifications:this.props.allNotifications,
        }
    }
    updateMarkAsRead = (notification)=>{
        db.collection("all_notifications").doc(notification.doc_id).update({
            "notification_status":"read"
        })
    }
    onSwipeValueChange = swipeData =>{
        var allNotifications = this.state.allNotifications
        const {key,value} = swipeData;
        if(value<-Dimensions.get('window').width){
            const newData = [...allNotifications];
            const prevIndex = allNotifications.findIndex(item=>item.key===key);
            this.updateMarkAsRead(allNotifications[prevIndex]);
            newData.splice(prevIndex,1);
            this.setState({allNotifications:newData})
        }
    }
    renderItem = data => (
        <Animated.View>
            <ListItem
            leftItem = {<Icon name = "book" type = "font-awesome" color = '#696969'/>}
            title = {data.item.book_name}
            titleStyle = {{color:'black',fontWeight:'bold'}}
            subtitle = {data.item.message}
            bottomDivider/>
        </Animated.View>
    )
    
    renderHiddenItem = ()=>(
        <View style = {styles.rowBack}>
            <View style = {[styles.backRightButton,styles.backRightButtonRight]}>
                <Text style = {styles.backTextWhite}></Text>
            </View>
        </View>
    )

    render(){
        return(
            <View style = {styles.container}>
                <SwipeListView
                disableRightSwipe
                data = {
                    this.state.allNotifications
                }
                renderItem = {this.renderItem}
                renderHiddenItem = {this.renderHiddenItem}
                rightOpenValue = {-Dimensions.get('window').width}
                previewRowKey = {'0'}
                previewOpenValue = {-40}
                previewOpenDelay = {3000}
                onSwipeValueChange = {this.onSwipeValueChange}/>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        backgroundColor:'white',
        flex:1,

    },
    backTextWhite:{
        color:'#ffffff',
        fontSize:15,
        fontWeight:'bold'
    },
    rowBack:{
        alignItems:'center',
        backgroundColor:'#29b6f6',
        flex:1,
        flexDirection:'row',
        justifyContent:"space-between",
        paddingLeft:15
    },
    backRightButton:{
        alignItems:'center',
        bottom:0,
        justifyContent:'center',
        position:'absolute',
        top:0,
        width:100
    },
    backRightButtonRight:{
        backgroundColor:'#29b6f6',
        right:0
    }
})