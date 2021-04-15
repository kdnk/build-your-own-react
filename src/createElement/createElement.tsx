import { Child, DidactElement } from "../type";

export function createElement(
  type: string,
  props?: object | null,
  ...children: Child[]
): DidactElement {
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
