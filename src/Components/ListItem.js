import React from 'react';

const ListItem = (props) => {
    return <li className="list-group-item">
        <button
            className="btn mr-4 btn-sm btn-info"
            onClick={props.editTodo}
        >
            U
        </button>
        {props.item.name}
        <button
            className="btn ml-4 btn-sm btn-danger"
            onClick={props.deleteTodo}
        >
            x
        </button>
    </li>
};

export default ListItem;