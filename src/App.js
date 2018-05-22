import React, { Component } from "react";
// import ReactDOM from "react-dom";
import "milligram";
import "./App.css";
import Editor from "./components/Editor";
import Sidebar from "./components/Sidebar";

class App extends Component {
  state = {
    id: 1,
    currId: 1,
    notes: [
      {
        id: 1,
        title: "Example Note",
        text: "",
        curr: true
      }
    ]
  };

  componentDidMount() {
    const localStorageRef = localStorage.getItem("localNoteManager");
    if (localStorageRef) this.setState(JSON.parse(localStorageRef));
  }

  componentDidUpdate() {
    localStorage.setItem("localNoteManager", JSON.stringify(this.state));
  }

  changeNote = e => {
    // get all relevant information
    const notes = Array.from(this.state.notes);
    const noteId = this.state.currId;
    const index = notes.findIndex(note => note.id === noteId);
    if (e.target) {
      // if title is changed
      const noteTitle = e.target.value;
      notes[index].title = noteTitle;
    } else {
      // if note content is changed
      const noteText = e;
      notes[index].text = noteText;
    }
    // give new data to state
    this.setState({ notes });
  };

  addNote = () => {
    // get stored notes data
    const notes = Array.from(this.state.notes);
    // generate new note
    const id = this.state.id + 1;
    const newNote = {
      id: id,
      title: `New Note`,
      text: ""
    };
    notes.push(newNote);
    // change new note to current note, so it gets displayed in the simpleMDE
    notes.forEach(note => {
      if (note.id === id) {
        note.curr = true;
      } else {
        note.curr = false;
      }
    });
    // give new data to state
    this.setState({ id, currId: id, notes });
  };

  deleteNote = e => {
    // get current state for notes
    const notes = Array.from(this.state.notes);
    // delete selected note
    const id = parseFloat(e.target.name);
    const index = notes.findIndex(note => note.id === id);
    notes.splice(index, 1);
    // give updated data to state
    this.setState({ notes });
  };

  updateCurrId = e => {
    // get current data
    const notes = Array.from(this.state.notes);
    // get clicked note
    const id = parseFloat(e.target.id);
    // update notes data
    notes.forEach(note => {
      if (note.id === id) note.curr = true;
      else note.curr = false;
    });
    // give new data to state
    this.setState({ currId: id, notes });
  };

  render() {
    const currNote = this.state.notes.find(note => note.curr === true);
    return (
      <div className="App container">
        <h1>🖌 SMPLnote</h1>
        <div className="row">
          <Sidebar
            notes={this.state.notes}
            addNote={this.addNote}
            deleteNote={this.deleteNote}
            updateCurrId={this.updateCurrId}
          />
          <Editor changeNote={this.changeNote} note={currNote} />
        </div>
      </div>
    );
  }
}

export default App;
