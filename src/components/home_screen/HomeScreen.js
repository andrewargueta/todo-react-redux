import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, Redirect } from 'react-router-dom';
import { firestoreConnect, getFirebase } from 'react-redux-firebase';
import TodoListLinks from './TodoListLinks'
import { getFirestore } from 'redux-firestore';


class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todoList: null,
        }
    }
    handleNewList(){
        
        var firestore = getFirestore();
        firestore.collection("todoLists").add({
                name: "Unknown",
                owner: "Unknown",
                items: [],
                time_edited: (Date.now().toString())
        })
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
            //this.setState({todoList: docRef});
            window.location = '/todoList/'+docRef.id;
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
        
    }
    render() {
        if (!this.props.auth.uid) {
            return <Redirect to="/login" />;
        }

        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m4">
                        <TodoListLinks />
                    </div>

                    <div className="col s8">
                        <div className="banner" >
                            @todo<br />
                            List Maker
                        </div>
                        
                        <div className="home_new_list_container">
                                <button className="home_new_list_button" onClick={this.handleNewList}>
                                    Create a New To Do List
                                </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
    
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'todoLists', orderBy: ['time_edited', 'desc'] },
    ]),
)(HomeScreen);