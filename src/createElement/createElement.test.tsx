import { createElement } from "./createElement";

describe("createElement", () => {
  test("<div></div>", () => {
    const element = createElement("div", {});
    expect(element).toEqual({
      type: "div",
      props: { children: [] },
    });
  });

  test("<h1>Hello</h1>", () => {
    const element = createElement("h1", null, "Hello");
    expect(element).toEqual({
      type: "h1",
      props: {
        children: [
          {
            type: "TEXT_ELEMENT",
            props: {
              nodeValue: "Hello",
              children: [],
            },
          },
        ],
      },
    });
  });

  test("<div id='foo'><a>bar</a><b></b></div>", () => {
    const element = createElement(
      "div",
      {
        id: "foo",
      },
      createElement("a", null, "bar"),
      createElement("b")
    );
    expect(element).toEqual({
      type: "div",
      props: {
        id: "foo",
        children: [
          {
            type: "a",
            props: {
              children: [
                {
                  type: "TEXT_ELEMENT",
                  props: {
                    nodeValue: "bar",
                    children: [],
                  },
                },
              ],
            },
          },
          {
            type: "b",
            props: {
              children: [],
            },
          },
        ],
      },
    });
  });
});
