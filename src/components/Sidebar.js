import React, { Component } from "react";

class Sidebar extends Component {
  render() {
    const notes = this.props.notes;
    return (
      <div className="editor column column-25 sidebar">
        <button
          className="button button-custom"
          onClick={this.props.addNote}
          title="create new note"
        >
          + new note
        </button>
        <div
          style={{
            fontSize: "2rem",
            textTransform: "capitalize",
            marginTop: "1rem"
          }}
        >
          your notes
        </div>
        <hr />
        <ul>
          {notes.map(note => (
            <li key={note.id} className={note.curr ? "curr" : "inactive"}>
              <span onClick={this.props.updateCurrId} id={note.id}>
                {note.title}
              </span>
              <button
                className="button-clear del-button"
                onClick={this.props.deleteNote}
                name={note.id}
                title="delete note"
              >
                &times;
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Sidebar;
