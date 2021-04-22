import { DidactElement } from "../type";

export function createDom(fiber: any) {
  const dom =
    fiber.type === "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(fiber.type);
  const isProperty = (key: string) => {
    return key !== "children";
  };

  Object.keys(fiber.props)
    .filter(isProperty)
    .forEach((propsName) => {
      dom[propsName] = fiber.props[propsName];
    });
  return dom;
}
