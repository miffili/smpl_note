import React, { Component } from "react";
import SimpleMDE from "react-simplemde-editor";

class Editor extends Component {
  render() {
    const toolbarSpecs = [
      "bold",
      "italic",
      "strikethrough",
      "|",
      "heading",
      "code",
      "quote",
      "|",
      "link",
      "image",
      "table",
      "|",
      "preview",
      "side-by-side",
      "fullscreen",
      "|",
      "guide",
      {
        name: "attention",
        className: "fa fa-info-circle",
        title: "Info: Lists aren't working properly atm."
      }
    ];
    return (
      <div className="editor column column-75 simpleMDE">
        <label style={{ fontSize: "2rem", fontWeight: "normal" }}>
          Title:{" "}
          <input
            onChange={this.props.changeNote}
            value={this.props.note.title}
            style={{
              fontSize: "inherit",
              border: "none"
            }}
            id={this.props.note.id}
            name="change title"
            className="change-title"
          />
        </label>
        <SimpleMDE
          ref="simpleMDE"
          onChange={this.props.changeNote}
          value={this.props.note.text}
          options={{
            autofocus: true,
            placeholder: "Happy noting... 🙂",
            spellChecker: false,
            toolbar: toolbarSpecs
          }}
        />
      </div>
    );
  }
}

export default Editor;
