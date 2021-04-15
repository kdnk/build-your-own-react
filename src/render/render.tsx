import { DidactElement } from "../type";

export function render(
  element: JSX.Element | DidactElement,
  container: HTMLElement
) {
  const dom =
    element.type === "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(element.type);
  const isProperty = (key: string) => {
    return key !== "children";
  };

  Object.keys(element.props)
    .filter(isProperty)
    .forEach((propsName) => {
      dom[propsName] = element.props[propsName];
    });
  element.props.children.forEach((childElement: DidactElement) => {
    render(childElement, dom);
  });
  container.appendChild(dom);
}
