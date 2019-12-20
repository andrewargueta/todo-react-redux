import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemsList from './ItemsList.js'
import ListTrash from './ListTrash'
import ModalPopup from './ModalPopup'
import { Modal } from 'react-materialize';
import { firestoreConnect, getFirebase } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import ListItemsTable from './ListItemsTable.js';

class ListScreen extends Component {
    state = {
        name: '',
        owner: '',
    }
    
    handleChange = (e) => {
        const { target } = e;
        this.props.todoList[target.name] = target.value;
        var firestore = getFirestore();
        firestore.collection('todoLists').doc(this.props.todoList.id).set({
            name: this.props.todoList.name,
            owner: this.props.todoList.owner,
            items: this.props.todoList.items
        });
    }

    render() {
        const auth = this.props.auth;
        const todoList = this.props.todoList;
        if (!auth.uid) {
            return <Redirect to="/login" />;
        }
        if(!todoList)
	        return <React.Fragment />;
        return (
            
            <div className="container">
                <h5 className="grey-text text-darken-3">Todo List</h5>
                <div className="input-field">
                    <label className="active">Name</label>
                    <input className="active" type="text" name="name" id="name" onChange={this.handleChange} defaultValue={todoList.name} />
                </div>
                <div className="input-field">
                    <label className="active">Owner</label>
                    <input className="active" type="text" name="owner" id="owner" onChange={this.handleChange} defaultValue={todoList.owner} />
                </div>
                
                <Modal className="list_trash" id="list_trash" trigger={<ListTrash />}>
                    <p>
                    Delete List
                    </p>
                    <br></br>
                    <p>
                    Are you sure you want to delete this list?
                    </p>
                </Modal>
                <ModalPopup 
                    todoLists={this.props.todoLists}
                    todoList={this.props.todoList} />
                <ListItemsTable todoList={todoList} />
                <ItemsList todoList={todoList} />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const { todoLists } = state.firestore.data;
  const todoList = todoLists ? todoLists[id] : null;
  if(todoList)
    todoList.id = id;
  
  return {
    todoList,
    todoLists,
    auth: state.firebase.auth,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'todoLists' },
  ]),
)(ListScreen);