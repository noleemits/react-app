import React from "react";
import ReactDOM from "react-dom/client";

function ExampleComponent() {
  return (
    <div>
      <h1>The sky is blue, yes sir</h1>
      <p>Yes it is</p>
    </div>
  );
}

const root = ReactDOM.createRoot(document.querySelector("#app"));
root.render(<ExampleComponent />);
if (module.hot) {
  module.hot.accept();
}

const entryContent = document.querySelector("#et-main-area");
const TabularMenuSection = document.querySelector("#TabularMenuSection");
function addPaddingTop() {
  if (getComputedStyle(TabularMenuSection, null).display == "block" && window.innerWidth > 769) {
    entryContent.style.paddingTop = "60px";
  }
}
addPaddingTop();

window.addEventListener("resize", myFunction);
