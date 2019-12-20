import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getFirestore } from 'redux-firestore';

class TodoListCard extends React.Component {
    orderList = () => {
        var firestore = getFirestore();
        firestore.collection('todoLists').doc(this.props.todoList.id).set({
            name: this.props.todoList.name,
            owner: this.props.todoList.owner,
            items: this.props.todoList.items,
            time_edited:(Date.now().toString())
        
        }); 
    }
    render() {
        const { todoList } = this.props;
        console.log("TodoListCard, todoList.id: " + todoList.id);
        return (
            <div className="card z-depth-0 todo-list-link">
                <div className="card-content grey-text text-darken-3">
                    <span className="card-title hoverable"  onClick={this.orderList.bind(todoList)}>{todoList.name} </span>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    
    return {
        todoItem: null,
        todoLists: state.firestore.ordered.todoLists,
        auth: state.firebase.auth,
    };
};

export default compose(connect(mapStateToProps))(TodoListCard);