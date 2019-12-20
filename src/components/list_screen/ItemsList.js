import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemCard from './ItemCard';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import { Link } from 'react-router-dom';
import TodoListCard from '../home_screen/TodoListCard';


class ItemsList extends React.Component {
    render() {
        const todoList = this.props.todoList;
        const items = this.props.todoList.items;
        console.log("ItemsList: todoList.id " + todoList.id);
        return (
            <div className="todo-lists section">
                {items && items.map(function(item) {
                    item.id = item.key;
                    return (
                         <Link to={{
                            pathname: '/item/' + item.id + '/todoList/' +todoList.id,
                            todoItem: item
                            }}>
                            <ItemCard todoList={todoList} item={item} />
                     </Link>
                    );})
                }
                <Link to={{
                    pathname: '/item/' + todoList.items.length + '/todoList/' +todoList.id,
                    todoItem: {
                        description: '',
                        assigned_to: '',
                        due_date: '',
                        completed: false,

                    }
                    }}>
                    <div className="list_item_add_card hoverable">+</div>
                </Link>
            </div>
            
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const todoList = ownProps.todoList;
    return {
        todoList,
        auth: state.firebase.auth,
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'todoLists' },
    ]),
)(ItemsList);