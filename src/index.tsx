const Didact = {
  createElement,
};

/** @jsxImportSource Didact.createElement */
const element = Didact.createElement(
  "div",
  { id: "foo" },
  Didact.createElement("a", null, "bar"),
  Didact.createElement("b")
);

console.log(element);
const container = document.getElementById("root");

function createElement(
  type: string,
  props?: object | null,
  ...children: Array<object | string>
) {
  function createTextElement(text: string) {
    return {
      type: "TEXT_ELEMENT",
      props: {
        nodeValue: text,
        children: [],
      },
    };
  }

  return {
    type,
    props: {
      ...props,
      children: children.map((child) => {
        if (typeof child === "object") {
          return child;
        } else {
          return createTextElement(child);
        }
      }),
    },
  };
}

export {};
