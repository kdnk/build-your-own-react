const Didact = {
  createElement,
  render,
};

/** @jsxRuntime classic */
/** @jsx Didact.createElement */
const element = (
  <div>
    <h1>Hello World</h1>
    <h2>from Didact</h2>
  </div>
);

console.log(element);
const container = document.getElementById("root") as HTMLElement;
Didact.render(element, container);

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

function render(element: JSX.Element, container: HTMLElement) {
  const dom =
    element.type === "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(element.type);

  const isProperty = (key: string) => key !== "children";
  Object.keys(element.props)
    .filter(isProperty)
    .forEach((name: string) => {
      dom[name] = element.props[name];
    });

  element.props.children.forEach((child: any) => {
    render(child, dom);
  });
  container.appendChild(dom);
}

export {};
