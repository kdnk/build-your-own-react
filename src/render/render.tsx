import { DidactElement, Fiber, NextUnitOfWork } from "../type";

// https://developers.google.com/web/updates/2015/08/using-requestidlecallback
(window as any).requestIdleCallback =
  (window as any).requestIdleCallback ||
  function (cb: any) {
    var start = Date.now();
    return setTimeout(function () {
      cb({
        didTimeout: false,
        timeRemaining: function () {
          return Math.max(0, 50 - (Date.now() - start));
        },
      });
    }, 1);
  };

(window as any).cancelIdleCallback =
  (window as any).cancelIdleCallback ||
  function (id: any) {
    clearTimeout(id);
  };

function createDom(fiber: any) {
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

export function render(
  element: JSX.Element | DidactElement,
  container: HTMLElement
) {
  wipRoot = {
    type: "",
    dom: container,
    props: {
      children: [element],
    },
  };

  nextUnitOfWork = wipRoot;
}

let nextUnitOfWork: NextUnitOfWork = null;
let wipRoot: Fiber | null = null;

function workLoop(deadline: { timeRemaining: () => number }) {
  let sholdYield = false;
  while (nextUnitOfWork && !sholdYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    sholdYield = deadline.timeRemaining() < 1;
  }
  (window as any).requestIdleCallback(workLoop);
}

(window as any).requestIdleCallback(workLoop);

function performUnitOfWork(fiber: Fiber): NextUnitOfWork {
  // 1. add the element to the DOM
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }

  if (fiber.parent) {
    fiber.parent.dom!.appendChild(fiber.dom!);
  }
  // 2. create the fibers for the element's children
  const elements = fiber.props.children;
  let index = 0;
  let prevSibling: Fiber | null = null;

  while (index < elements.length) {
    const element = elements[index];

    const newFiber: Fiber = {
      type: element.type,
      props: element.props,
      parent: fiber,
      dom: null,
    };

    if (index === 0) {
      fiber.child = newFiber;
    } else {
      if (prevSibling) {
        prevSibling.sibling = newFiber;
      }
    }

    prevSibling = newFiber;
    index++;
  }

  // 3. select the next unit of work
  if (fiber.child) {
    return fiber.child;
  }
  let nextFiber: Fiber | undefined = fiber;
  while (nextFiber) {
    if (nextFiber && nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.parent;
  }
  return null;
}
