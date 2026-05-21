function createElement(type, props, ...children) {
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

const secData = createElement("div", null, "Hello world");

function render(oldDOM, newDOM) {
  if (!newDOM) {
    const element = oldDOM.type;
    const newEle = document.createElement(element);

    const textContent = oldDOM.props.children;

    if (typeof textContent === "string") {
      newEle.innerHTML = textContent;
    } else {
      const text = textContent.join(" ");
      newEle.innerHTML = text;
    }

    const root = document.getElementById("root");

    root.appendChild(newEle);
  }

  const diff = getObjectDiff(oldDOM, newDOM);

  if (diff.type.newValue) {
    const element = diff.type.newValue;
    const newEle = document.createElement(element);

    if (diff.children.newValue) {
      const textContent = diff.children.newValue;
      if (typeof textContent === "string") {
        newEle.innerHTML = textContent;
      } else {
        const text = textContent.join(" ");
        newEle.innerHTML = text;
      }
    }

    const root = document.getElementById("root");

    root.appendChild(newEle);
  }

  console.log("result is: ", diff);
}

render(oldVirtualDOM, secData);

function getObjectDiff(oldDOM, newDOM, path = "") {
  const diff = {};

  // create an object of unique keys from both doms
  const allKey = new Set([...Object.keys(oldDOM), ...Object.keys(newDOM)]);

  // output: {type, props}

  console.log("all keys are: ", allKey);

  // loop through all the unique keys and store in a variables
  allKey.forEach((key) => {
    const val1 = oldDOM[key];
    // output: p, {className: 'text', children: Array(3)}
    console.log("val1 : ", val1);
    const val2 = newDOM[key];
    // output: div, {children: 'Hello world'}
    console.log("val2 : ", val2);

    // path for deeper nesting of objects
    const currentPath = path ? `${path}.${key}` : key;

    // output: type, props
    console.log("current path is: ", currentPath);

    // if a key not exits in oldDOM but exits in newDOM so we add it with its key
    if (!(key in oldDOM)) {
      diff[currentPath] = { action: "added", newValue: val2 };
      console.log("add new value: ", diff);

      // if a key exits in oldDOM but not exits in newDOM so we remove it with its key
    } else if (!(key in newDOM)) {
      diff[currentPath] = { action: "remove", oldValue: val1 };
      console.log("remove value: ", diff);

      // for deeper nesting using recursion object inside another object
    } else if (
      typeof val1 === "object" &&
      val1 !== null &&
      typeof val2 === "object" &&
      val2 !== null
    ) {
      const nestedDiff = getObjectDiff(val1, val2, path);
      Object.assign(diff, nestedDiff);
      console.log("nested object value: ", diff);
    } else if (val1 !== val2) {
      diff[currentPath] = { action: "update", oldValue: val1, newValue: val2 };
      console.log("not match value: ", diff);
    }
  });

  return diff;
}

// const result = getObjectDiff(oldVirtualDOM, secData);
