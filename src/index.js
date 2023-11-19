import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './extra.css';
import reportWebVitals from './reportWebVitals';
import { marked } from 'marked';



const DEFAULT_INPUT = 
`
# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`

const Toolbar = (props) => {
  return (
    <div className="toolbar">
      <i className="fa-brands fa-free-code-camp"></i>
      {props.name}
      <i className="fa fa-arrows-alt"></i>
    </div>
  )
}

class Editor extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div id="editorwrap">
        <Toolbar name="Editor" />
        <textarea
          id="editor"
          type="text"
          value={this.props.input}
          onChange={this.props.handler}
          rows="30">
        </textarea>
      </div>
     )
  }
}

class Previewer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let dangerousHtml = {
      __html : marked.parse(this.props.input, {breaks: true, gfm: true})
    }
    return (
      <div id="previewerwrap">
        <Toolbar name="Preview" />
        <div id="preview" dangerouslySetInnerHTML={dangerousHtml}></div>
      </div>
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      input: DEFAULT_INPUT,
    }
    this.changeHandler = this.changeHandler.bind(this);
  }
  
  changeHandler(event) {
    this.setState({
      input: event.target.value
    })
  }
  
  render() {
    const {input} = this.state
    return (
    <div>
      <Editor input={input} handler={this.changeHandler} />
      <Previewer input={input} />
    </div>
    )
  }
}



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
