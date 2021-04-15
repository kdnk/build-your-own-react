import { createElement } from "../createElement/createElement";
import { render } from "../render/render";

let nextUnitOfWork = null;

function workLoop(deadline: { timeRemaining: () => number }) {
  let sholdYield = false;
  while (nextUnitOfWork && !sholdYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    sholdYield = deadline.timeRemaining() < 1;
  }
  (window as any).requestIdleCallback(workLoop);
}

(window as any).requestIdleCallback(workLoop);

function performUnitOfWork(nextUnitOfWork) {
  // 1. add the element to the DOM
  // 2. create the fibers for the element's children
  // 3. select the next unit of work
}

const Didact = {
  createElement,
  render,
};
export default Didact;
