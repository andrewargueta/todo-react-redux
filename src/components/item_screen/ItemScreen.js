import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { NavLink, Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';

export class ItemScreen extends Component {
    constructor(props) {
            super(props);
            this.state = {
                itemDescription: this.props.todoItem.description,
                itemAssignedTo: this.props.todoItem.assigned_to,
                itemDueDate: this.props.todoItem.due_date,
                itemCompleted: this.props.todoItem.completed,
            };
        }


    updateItemDescription = (e) =>{
       this.setState({itemDescription: e.target.value});
    }

    updateItemAssignedTo = (e) =>{
        this.setState({itemAssignedTo: e.target.value});
     }

     updateItemDueDate = (e) =>{
        this.setState({itemDueDate: e.target.value});
     }

     updateItemCompleted = (e) =>{
        this.setState({itemCompleted: e.target.checked});
     }

     updateSubmit= ()=>{
        
        if(this.props.todoItem.key < this.props.todoList.items.length){
            this.props.todoItem.description = this.state.itemDescription;
            this.props.todoItem.assigned_to = this.state.itemAssignedTo;
            this.props.todoItem.due_date = this.state.itemDueDate;
            this.props.todoItem.completed = this.state.itemCompleted;
            
            this.props.todoList.items[this.props.todoItem.id] = this.props.todoItem;
        }
        else{

            this.props.todoItem.description = this.state.itemDescription;
            this.props.todoItem.assigned_to = this.state.itemAssignedTo;
            this.props.todoItem.due_date = this.state.itemDueDate;
            this.props.todoItem.completed = this.state.itemCompleted;
            this.props.todoItem.id = this.props.todoList.items.length;
            this.props.todoItem.key = this.props.todoList.items.length;
            
            this.props.todoList.items.push(this.props.todoItem);
        }
            
            const firestore = getFirestore();
            console.log(this.props.todoList.id);
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
            <div id="todo_item" >
                <h3 id="item_heading">Edit Item</h3>
                <div id="item_form_container">
                <div id="item_description_container" className="text_toolbar">        
                    <span className="item_prompt" id="item_description_prompt">Description:</span>
                    <input type="text" className="item_input" id="item_description_textfield"
                    defaultValue={(() => {
                        if(this.props.todoItem)
                            return this.props.todoItem.description;
                        else
                            return "";
                    })()}
                    onChange ={this.updateItemDescription}
                    />
                </div>
            
                <div id="item_assigned_to_container" className="text_toolbar">        
                    <span className="item_prompt" id="item_assigned_to_prompt">Assigned To:</span>
                    <input type="text" className="item_input" id="item_assigned_to_textfield"
                    defaultValue=
                    {(() => {
                        if(this.props.todoItem)
                            return this.props.todoItem.assigned_to;
                        else
                            return "";
                    })()}
                    onChange ={this.updateItemAssignedTo}/>
                </div>
            
                <div id="item_due_date_container" className="text_toolbar">        
                    <span className="item_prompt" id="item_due_date_prompt">Due Date:</span>
                    <input type="date" className="item_input" id="item_due_date_picker"
                    defaultValue={(() => {
                        if(this.props.todoItem)
                            return this.props.todoItem.due_date;
                        else
                            return "";
                    })()}
                    onChange ={this.updateItemDueDate}/>
                </div>
                
                <div id="item_completed_container" className="text_toolbar">        
                    <span className="item_prompt" id="item_completed_prompt">Completed:</span>
                    
                    <p>
                    <label>
                    <input type="checkbox" id="item_completed_checkbox"
                    defaultChecked={(() => {
                        if(this.props.todoItem)
                            return ;
                        else
                            return false;
                    })()}
                    onChange ={this.updateItemCompleted}
                    />
                    
                    </label>
                    </p>
                </div>
                
                
            </div>
                <Link to={'/todoList/' + this.props.todoList.id}>
                    <button type="item_input" id="item_form_submit_button" onClick={this.updateSubmit}>Submit</button>
                </Link>
                <Link to={'/todoList/' + this.props.todoList.id}>
                    <button type="item_input" id="item_form_cancel_button" >Cancel</button>
                </Link>
        </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => {
    const { id } = ownProps.match.params;
    const { todoLists } = state.firestore.data;
    const todoList = todoLists ? todoLists[id] : null;

    if(todoList)
        todoList.id = id;
    const todoItem = ownProps.location.todoItem;
    return {
      todoList,
      todoItem,
      auth: state.firebase.auth,
    };
  };

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'todoLists' },
    ]),
)(ItemScreen);

