import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, ScrollView, View } from "react-native";

import Heading from "./components/Heading";
import Input from "./components/Input";
import Button from "./components/Button";
import TodoList from "./components/TodoList";

let todoIndex = 0;

class App extends Component {
  constructor() {
    super();
    this.state = {
      inputValue: "",
      todos: [],
      type: "All",
    };
    this.submitTodo = this.submitTodo.bind(this)
  }
  inputChange(inputValue) {
    console.log("Input value :", inputValue);
    this.setState({ inputValue });
  }
  submitTodo() {
    if (this.state.inputValue.match(/^\s*$/)) {
      return;
    }
    const todo = {
      title: this.state.inputValue,
      todoIndex,
      complete: false,
    };
    todoIndex++;
    const todos = [...this.state.todos, todo];
    this.setState({ todos, inputValue: "" }, () => {
      console.log("State: ", this.state);
    });
  }

  render() {
    const { inputValue,todos } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView keyboardShouldPersistTaps="always" style={styles.content}>
          <Heading />
          <Input
            inputValue={inputValue}
            inputChange={(text) => this.inputChange(text)}
          />
          <TodoList todos={todos}/>
          <Button submitTodo={this.submitTodo} />
        </ScrollView>
        <StatusBar style="auto" />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    flex: 1,
    paddingTop: 60,
  },
});

export default App;
