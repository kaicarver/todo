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
        <TodoDetail/>
        <div>Just a random toggle: <Toggle/></div>
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
          <TodoItem key={item.id} count={i} items={this.props.items} />
        ))}
      </ul>
    );
  }
}

class TodoItem extends React.Component {
  handleClick(items, count) {
    document.getElementById("detailtext").innerText = `heyy item ${count + 1} ${items[count].id}`;
    // BUG: this is insufficiently reactive
    items.push({
      text: 'Click!',
      id: Date.now()
    });
  }
  render() {
    let count = this.props.count;
    let item = this.props.items[count];
    return (
      <li
        onClick={() => this.handleClick(this.props.items, count)}>
        <span>{count + 1}.</span> {item.text}
      </li>
    );
  }
}

function TodoDetail() {
  // BUG: the Delete button should only display when there is some detail
  return (
    <div id="detail">
      <div id="detailtext">...</div>
      <button>Delete</button>
    </div>
  );
}

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};
    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }
  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

export default TodoApp;
