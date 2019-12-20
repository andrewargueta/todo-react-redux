import React, { Component } from 'react'
import { firestoreConnect, getFirebase } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';


export class ListItemsTable extends Component {
    state = {
        currentSort: 'ascending',
    }
    sortByTask = (todoListSorted) => {
        if(this.state.currentSort === 'descending'){
                todoListSorted.items.sort((a, b) => (a.description < b.description) ? 1 : -1);
                for(let i = 0; i < todoListSorted.items.length; i++){
                    todoListSorted.items[i].key = i;
                }
                this.setState({currentSort: 'ascending'});
            }
            else{
                todoListSorted.items.sort((a, b) => (a.description > b.description) ? 1 : -1)
                for(let i = 0; i < todoListSorted.items.length; i++){
                    todoListSorted.items[i].key = i;
                }
                this.setState({currentSort: 'descending'});
            }
            var firestore = getFirestore();
            firestore.collection('todoLists').doc(this.props.todoList.id).set({
                name: this.props.todoList.name,
                owner: this.props.todoList.owner,
                items: this.props.todoList.items
            });
          
    }
    sortByDueDate = (todoListSorted) => {
        if(this.state.currentSort === 'descending'){
                todoListSorted.items.sort((a, b) => (a.due_date < b.due_date) ? 1 : -1);
                for(let i = 0; i < todoListSorted.items.length; i++){
                    todoListSorted.items[i].key = i;
                }
                this.setState({currentSort: 'ascending'});
            }
            else{
                todoListSorted.items.sort((a, b) => (a.due_date > b.due_date) ? 1 : -1)
                for(let i = 0; i < todoListSorted.items.length; i++){
                    todoListSorted.items[i].key = i;
                }
                this.setState({currentSort: 'descending'});
            }
            var firestore = getFirestore();
            firestore.collection('todoLists').doc(this.props.todoList.id).set({
                name: this.props.todoList.name,
                owner: this.props.todoList.owner,
                items: this.props.todoList.items
            });
          
    }
    sortByCompleted = (todoListSorted) => {
        if(this.state.currentSort === 'descending'){
                todoListSorted.items.sort((a, b) => (a.completed < b.completed) ? 1 : -1);
                for(let i = 0; i < todoListSorted.items.length; i++){
                    todoListSorted.items[i].key = i;
                }
                this.setState({currentSort: 'ascending'});
            }
            else{
                todoListSorted.items.sort((a, b) => (a.completed > b.completed) ? 1 : -1)
                for(let i = 0; i < todoListSorted.items.length; i++){
                    todoListSorted.items[i].key = i;
                }
                this.setState({currentSort: 'descending'});
            }
            var firestore = getFirestore();
            firestore.collection('todoLists').doc(this.props.todoList.id).set({
                name: this.props.todoList.name,
                owner: this.props.todoList.owner,
                items: this.props.todoList.items
            });
          
    }

    render() {
        return (
            <div id="list_items_container">
                <div className="list_item_header_card">
                <div className="list_item_task_header" onClick={this.sortByTask.bind(this, this.props.todoList)}>Task</div>
                <div className="list_item_due_date_header" onClick={this.sortByDueDate.bind(this, this.props.todoList)}>Due Date</div>
                <div className="list_item_status_header"onClick={this.sortByCompleted.bind(this, this.props.todoList)}>Status</div>
                
                </div>
                
            </div>
            
        )
    }
}

export default ListItemsTable
