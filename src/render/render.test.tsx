import { createElement } from "../createElement/createElement";
import { render } from "./render";

describe("render", () => {
  test(`<div>
  <p
    id="foo"
  />
</div>`, () => {
    const element = createElement("p", { id: "foo" });
    const container = document.createElement("div");
    render(element, container);
    expect(container).toMatchInlineSnapshot(`
      <div>
        <p
          id="foo"
        />
      </div>
    `);
  });

  test(`<div>
  <a
    href="bar"
    id="foo"
  >
    foo
  </a>
</div>`, () => {
    const element = createElement("a", { id: "foo", href: "bar" }, "foo");
    const container = document.createElement("div");
    render(element, container);
    expect(container).toMatchInlineSnapshot(`
      <div>
        <a
          href="bar"
          id="foo"
        >
          foo
        </a>
      </div>
    `);
  });
});
