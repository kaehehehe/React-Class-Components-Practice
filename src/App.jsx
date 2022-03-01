import "./App.css";
import React, { Component } from "react";
import Habits from "./components/Habits";
import Navbar from "./components/Navbar";

class App extends Component {
  state = {
    habits: [
      { id: 1, name: "Reading", count: 0 },
      { id: 2, name: "Coding", count: 0 },
      { id: 3, name: "Sleeping", count: 0 },
    ],
  };
  handleIncrement = (habit) => {
    const newHabits = this.state.habits.map((item) => {
      if (item.id === habit.id) {
        return { ...habit, count: habit.count + 1 };
      }
      return item;
    });
    this.setState({ habits: newHabits });
  };

  handleDecrement = (habit) => {
    const newHabits = this.state.habits.map((item) => {
      if (item.id === habit.id) {
        const count = habit.count - 1;
        // 인자 habit를 복사한 뒤, count를 업데이트
        return { ...habit, count: count < 0 ? 0 : count };
      }
      return item;
    });
    this.setState({ habits: newHabits });
  };

  handleDelete = (habit) => {
    const newHabits = this.state.habits.filter((item) => item.id !== habit.id);
    this.setState({ habits: newHabits });
  };

  handleAdd = (name) => {
    const newHabits = [
      ...this.state.habits,
      { id: Date.now(), name: name, count: 0 },
    ];
    this.setState({ habits: newHabits });
  };

  handleReset = () => {
    const newHabits = this.state.habits.map(habit => {
      if(habit.count !== 0) {
        return {...habit, count: 0}
      }
      return habit;
    })
    this.setState({ habits: newHabits });
  };

  render() {
    return (
      <>
        <Navbar
          totalCount={
            this.state.habits.filter((habit) => habit.count !== 0).length
          }
        />
        <Habits
          habits={this.state.habits}
          onIncrement={this.handleIncrement}
          onDecrement={this.handleDecrement}
          onDelete={this.handleDelete}
          onAdd={this.handleAdd}
          onReset={this.handleReset}
        />
      </>
    );
  }
}

export default App;
