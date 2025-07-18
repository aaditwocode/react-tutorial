import React from "react";
import ReactDOM from "react-dom/client";

const parent = React.createElement(
  "div",
  { id: "parent" },
  React.createElement(
    "div",
    { id: "child" },
    [
      React.createElement("h1", { key: "heading1" }, "I'm an h1 tag"),
      React.createElement("h2", { key: "heading2" }, "I'm an h2 tag")
    ]
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(parent);