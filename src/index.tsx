const Didact = {
  createElement,
};

/** @jsxRuntime classic */
/** @jsx Didact.createElement */
const element = (
  <div id="foo">
    <a>bar</a>
    <b></b>
  </div>
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
