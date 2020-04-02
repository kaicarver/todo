import React from 'react';
import './App.css';

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [], text: 'Stay at home' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    document.title = "Kai's TODO App in React"
  }

  render() {
    return (
      <div className="App">
        <h3>TODO List</h3>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="new-todo">
            What needs to be done?
          </label>
          <br />
          <input
            id="new-todo"
            onChange={this.handleChange}
            value={this.state.text}
          />
          <button>
            Add #{this.state.items.length + 1}
          </button>
        </form>
        <TodoList items={this.state.items} />
        Source: <a
          className="App-link"
          href="https://github.com/kaicarver/todo"
          target="_blank"
          rel="noopener noreferrer"
        >Github</a>
      </div>
    );
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.text.length === 0) {
      return;
    }
    const newItem = {
      text: this.state.text,
      id: Date.now()
    };
    const todos = ['Something else', 'Go to bed', 'Have a drink', 'Github commit', 'Go shopping', 'Go jogging', 'Go crazy'];
    this.setState(state => ({
      items: state.items.concat(newItem),
      text: todos[Math.floor(Math.random() * todos.length)],
    }));
  }
}

class TodoList extends React.Component {
  render() {
    return (
      <ul>
        {this.props.items.map((item, i) => (
          <TodoItem count={i} items={this.props.items} />
        ))}
      </ul>
    );
  }
}

class TodoItem extends React.Component {
  handleClick(items, count) {
    alert(`heyy item ${count + 1} ${items[count].id}`)
    items.push({
      text: 'Click!',
      id: Date.now()
    });
  }
  render() {
    let count = this.props.count;
    let item = this.props.items[count];
    return (
      <li onClick={() => this.handleClick(this.props.items, count)} key={item.id}><span>{count + 1}.</span> {item.text}</li>
    );
  }
}

export default TodoApp;
