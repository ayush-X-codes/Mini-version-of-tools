function createElement(type, props, ...children) {
  console.log("children is: ", children);
  let virtualDOM = {};

  virtualDOM["type"] = type;

  if (props === null) {
    if (children.length === 1) {
      virtualDOM["props"] = {};
      virtualDOM["props"]["children"] = children[0];
    } else {
      virtualDOM["props"]["children"] = children;
    }
  } else {
    virtualDOM["props"] = props;

    if (children.length === 1) {
      virtualDOM["props"]["children"] = children[0];
    } else {
      virtualDOM["props"]["children"] = children;
    }
  }

  console.log("virtual DOM is: ", virtualDOM);

  return virtualDOM;
}

const data = createElement(
  "p",
  { className: "text" },
  "Hello",
  "World",
  "continue",
);

let oldVirtualDOM = { ...data };

console.log("copy of new virtual DOM: ", oldVirtualDOM);

const secData = createElement("div", null, "Hello world");

// console.log("data is: ", data);

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

console.log("new DOM is: ", secData);
console.log("old DOM is: ", oldVirtualDOM);

function getDiff(oldDOM, newDOM) {
  const keysNewDOM = Object.keys(newDOM);
  console.log("new key DOM is: ", keysNewDOM);
}

const result = getDiff(oldVirtualDOM, secData);
console.log("result is: ", result)