export type Fiber = {
  dom: HTMLElement | null;
  type: string;
  props: object & { children: DidactElement[] };
  parent?: Fiber;
  child?: Fiber;
  sibling?: Fiber;
};
export type DidactElement = {
  type: string;
  props: object & { children: DidactElement[] };
};
export type NextUnitOfWork = Fiber | null;
