import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect, getFirebase } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';



export class ModalPopup extends Component {
    hideDialog=()=>{
        document.getElementById('modal_yes_no_dialog').classList.remove('is_visible');
    }
    deleteList=()=>{
        var firestore = getFirestore();
        firestore.collection("todoLists").doc(this.props.todoList.id).delete().then(function() {
            console.log("Document successfully deleted!");
            return <Redirect to="/" />;
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
        return <Redirect to="/" />;
    }

    render() {
        return (
            <div className="modal" id="modal_yes_no_dialog" data-animation="slideInOutLeft">
            <div className="modal_dialog">
                <header className="dialog_header">
                    Delete list?
                </header>
                <section className="dialog_content">
                    <p><strong>Are you sure you want to delete this list?</strong></p>
                </section>
                <Link to={'/'}> 
                    <button id="dialog_yes_button" onClick = {this.deleteList}>Yes</button>
                </Link>
                <Link>
                    <button id="dialog_no_button" onClick = {this.hideDialog} >No</button>
                </Link>
                <footer className="dialog_footer">
                    The list will not be retreivable.
                </footer>
            </div>
        </div>
        )
    }
}


export default (ModalPopup);