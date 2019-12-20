import React from 'react';
import { firestoreConnect, getFirebase } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Button, Icon } from 'react-materialize';


class ItemCard extends React.Component {
    state = {
        showButtons: true,
    }
    moveUp =(index, e)=>{
        const { target } = e;
        if(target.className.indexOf('disabled')>=0)
            e.preventDefault();
        else{
            e.preventDefault();
            let tempItem = this.props.todoList.items[index-1];
            let itemSwap = this.props.todoList.items[index];
            itemSwap.key = tempItem.key;
            let newKey = parseInt(tempItem.key);
            newKey +=1;
            tempItem.key = newKey;
            this.props.todoList.items[index-1] = this.props.todoList.items[index];
            this.props.todoList.items[index] = tempItem;
            var firestore = getFirestore();
            firestore.collection('todoLists').doc(this.props.todoList.id).set({
                name: this.props.todoList.name,
                owner: this.props.todoList.owner,
                items: this.props.todoList.items
            });
    }   
    }
    moveDown =(index, e)=>{
        const { target } = e;
        if(target.className.indexOf('disabled')>=0)
            e.preventDefault();
        else{
            e.preventDefault();
            let tempItem = this.props.todoList.items[index+1];
            let itemSwap = this.props.todoList.items[index];
            itemSwap.key = tempItem.key;
            let newKey = parseInt(tempItem.key);
            newKey -=1;
            tempItem.key = newKey;
            this.props.todoList.items[index+1] = this.props.todoList.items[index];
            this.props.todoList.items[index] = tempItem;
            var firestore = getFirestore();
            firestore.collection('todoLists').doc(this.props.todoList.id).set({
                name: this.props.todoList.name,
                owner: this.props.todoList.owner,
                items: this.props.todoList.items
            });
    }   
    }
    itemDelete =(index, e)=>{
        e.preventDefault();
        this.props.todoList.items.splice(index, 1);
        for(let i = 0; i < this.props.todoList.items.length; i++){
            this.props.todoList.items[i].key = i;
        }
        var firestore = getFirestore();
            firestore.collection('todoLists').doc(this.props.todoList.id).set({
                name: this.props.todoList.name,
                owner: this.props.todoList.owner,
                items: this.props.todoList.items
        });
    }
    render() {
        const { item } = this.props;
        return (
            <div className="list_item_card hoverable todo-list-link">
                <div className="card-content grey-text text-darken-3">
                    <div className='list_item_card_description'>
                        {item.description}
                    </div>
                        <div className='list_item_card_assigned_to'>
                            Assigned To: <strong>{item.assigned_to}</strong>
                        </div>
                    <div className='list_item_card_due_date'>
                    {item.due_date}
                    </div>
                    <div className='list_item_card_completed'>
                    {(() => {
                        switch (item.completed) {
                        case true:    return "Completed";
                        case false:   return "";
                        default:      return "Error";
                        }
                    })()}
                    </div>
                    <div className='list_item_card_not_completed'>
                    {(() => {
                        switch (item.completed) {
                        case true:    return "";
                        case false:   return "Pending";
                        default:      return "Error";
                        }
                    })()}
                    </div>
                    <div className="list_item_card_toolbar">

                    <div id={"item_card_"+item.key+"_up"} 
                    className =  {(() => {
                        if(item.key === 0)
                            return "list_item_card_up disabled";
                        else
                            return "list_item_card_up";
                    })()}
                    onClick={this.moveUp.bind(this,item.key)}
                    style={{display: this.state.showButtons ? 'block' : 'none'}}>&#x21e7;</div>


                    <div id={"item_card_"+item.key+"_down"} 
                    className =  {(() => {
                        if(item.key === (this.props.todoList.items.length-1))
                            return "list_item_card_down disabled";
                        else
                            return "list_item_card_down";
                    })()}
                    onClick={this.moveDown.bind(this,item.key)}
                    style={{display: this.state.showButtons ? 'block' : 'none'}}
                    >&#x21e9;</div>
                    <div className="list_item_card_delete hoverable" id={"item_card_"+item.key+"_delete"}
                    style={{display: this.state.showButtons ? 'block' : 'none'}}
                    onClick={this.itemDelete.bind(this,item.key)}
                    
                    >
                        &#10005;
                        </div>
                    
                        
                    </div>
                    
                </div>
                
            </div>
        );
    }
}
export default ItemCard;