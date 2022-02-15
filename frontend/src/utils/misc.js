// non-deep compare of two objects
export const shallowEqual = (objA, objB) => {
  if (!objA || !objB) {
    return objA === objB
  }
  return !Boolean(
    Object
      .keys(Object.assign({}, objA, objB))
      .find((key) => objA[key] !== objB[key])
  )
};

export const deepEqual = (a, b) => {
  return JSON.stringify(a) === JSON.stringify(b);
};
