import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import loaderGif from '../src/img/loader.gif';

//import ListItem from './Components/ListItem';

class App extends Component {

    constructor() {
        super();

        this.state = {

            newTodo: '',

            notification: null,

            editing: false,

            updateTodoIndex: null,

            loading: true,

            todos: []
        };

        this.apiUrl = 'https://5b14662fc17fa90014770fef.mockapi.io';
        this.addTodo = this.addTodo.bind(this);
        this.deleteTodo = this.deleteTodo.bind(this);
        this.updateTodo = this.updateTodo.bind(this);

    }

    async componentDidMount() {
        const totosUrl = `${this.apiUrl}/todos`;
        const resp = await axios.get(totosUrl);
        setTimeout(() => {
            this.setState({
                todos: resp.data,
                loading: false
            });
        }, 1000);
    }

    handleChange = (evt) => {
        this.setState({
            newTodo: evt.target.value
        })

    };

    async updateTodo(){
        this.setState({
            loading: true
        });
        const key = this.state.todos[this.state.updateTodoIndex].id;
        await axios.put(`${this.apiUrl}/todos/${key}`, {
            name: this.state.newTodo
        });

        const response = await axios.get(`${this.apiUrl}/todos`);
        this.setState({
                todos: response.data,
                editing: false,
                updateTodoIndex: null,
                newTodo: '',
                loading: false
            }
        );
        this.alert("Todo updated successfully.");
    };

    async addTodo () {
        this.setState({
            loading: true
        });

        await axios.post(`${this.apiUrl}/todos`, {
            name: this.state.newTodo
        });

        const response = await axios.get(`${this.apiUrl}/todos`);


        this.setState({
            todos: response.data,
            newTodo: '',
            loading: false

        });

        this.alert("Todo added successfully.");
    };

    alert = (notification) => {
        this.setState({
            notification
        });

        setTimeout(() => {
            this.setState({
                notification: null
            });
        }, 1000)

    };

    async deleteTodo (index) {
        this.setState({
            loading: true
        });

        const key = this.state.todos[index].id;

        await axios.delete(`${this.apiUrl}/todos/${key}`);

        const response = await axios.get(`${this.apiUrl}/todos`);

        this.setState({
            todos: response.data,
            loading: false
        });

        this.alert("Todo deleted successfully.");
    };

    editTodo = (id) => {
        this.setState({
            editing: true,
            updateTodoIndex: id,
            newTodo: this.state.todos[id].name
        });
    };

    render() {
        const buttonDisabled = this.state.newTodo.length < 5;
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">CRUD REACT</h1>
                </header>
                <div className="container">
                    {
                        this.state.notification &&

                        <div className="alert alert-success mt-3">
                            <p className={"text-center"}>{this.state.notification}</p>
                        </div>
                    }

                    <input
                        type="text"
                        name={"todo"}
                        className="my-4 form-control"
                        placeholder={this.state.editing ? 'Update Todo entry' : 'Add a new Todo'}
                        onChange={this.handleChange}
                        value={this.state.newTodo}
                    />
                    <button
                        className={"btn btn-primary mb-3 form-control " + (buttonDisabled < 5 ? 'disable' : '')}
                        disabled={buttonDisabled}
                        onClick={this.state.editing ? this.updateTodo : this.addTodo}
                    >
                        {this.state.editing ? 'Update Todo' : 'Add Todo'}
                    </button>

                    {
                        this.state.loading &&
                        <img src={loaderGif} alt={'loading page'}/>
                    }
                    <ul
                        className={"list-group"}
                        hidden={this.state.editing || this.state.loading}
                    >
                        {this.state.todos.map((item, index) => {
                            return(
                            <ListItem
                                key={item.id}
                                item={item}
                                editTodo={() => { this.editTodo(index)}}
                                deleteTodo={() => { this.deleteTodo(index)}}
                            />
                            )
                        })}
                    </ul>
                </div>
            </div>
        );
    }
}

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

export default App;
