function createElement(type, props, ...children) {
  let virtualDOM = {};

  virtualDOM["type"] = type;
  virtualDOM["props"] = props;

  console.log("virtual DOM is: ", virtualDOM);

  if (children.length === 1) {
    virtualDOM["props"]["children"] = children[0];
  } else {
    virtualDOM["props"]["children"] = children;
  }

  return virtualDOM;
}

const data = createElement(
  "p",
  { className: "text" },
  "Hello",
  "World",
  "continue",
);
const secData = createElement("p", { className: "text" }, "Hello");

console.log("data is: ", data);

function render(content) {
  const element = content.type;
  const newEle = document.createElement(element);

  console.log("new element is: ", newEle);

  const textContent = content.props.children;
  console.log("text content type is: ", textContent);

  if (typeof textContent === "string") {
    newEle.innerHTML = textContent;
  } else {
    const text = textContent.join(" ");
    newEle.innerHTML = text;
  }

  const root = document.getElementById("root");

  root.appendChild(newEle);
}

render(data);
render(secData);
