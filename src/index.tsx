import { createElement } from "./createElement/createElement";
import { render } from "./render/render";

const Didact = {
  createElement,
  render,
};

/** @jsxRuntime classic */
/** @jsx Didact.createElement */
const element = (
  <div>
    <a href="bar" id="foo">
      foo
    </a>
  </div>
);

console.log(element);
const container = document.getElementById("root") as HTMLElement;
Didact.render(element, container);
