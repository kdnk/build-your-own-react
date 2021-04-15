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
  // TODO
}

const Didact = {
  createElement,
  render,
};
export default Didact;
