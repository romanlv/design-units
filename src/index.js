const defaultBreakpoints = ["40em", "52em", "64em"];

const is = n => n !== undefined && n !== null;
const num = n => typeof n === "number" && !isNaN(n);
const px = n => (num(n) ? `${n}px` : n);

// const neg = n => n < 0;
const arr = n => (Array.isArray(n) ? n : [n]);

const getWidth = n => (!num(n) || n > 1 ? px(n) : `${n * 100}%`);
const get = (obj, path, fallback) =>
  path.reduce((a, b) => (a && a[b] ? a[b] : null), obj) || fallback;

const mq = n => `@media (min-width: ${px(n)})`;

const media = bp => (d, i) => (is(d) ? (bp[i] ? { [bp[i]]: d } : d) : null);

const breaks = props => [
  // null,
  ...get(props, ["theme", "breakpoints"], defaultBreakpoints).map(mq)
];

const merge = (a, b) =>
  Object.assign(
    {},
    a,
    b,
    Object.keys(b || {}).reduce(
      (obj, key) =>
        Object.assign(obj, {
          [key]:
            a[key] !== null && typeof a[key] === "object"
              ? merge(a[key], b[key])
              : b[key]
        }),
      {}
    )
  );

const getUnitValue = (theme, cssProp, n) => {
  if (cssProp === "width") {
    return getWidth(n);
  }

  // TODO: pick from `${cssProp}s` path if no rule found
  if (/color$/i.test(cssProp)) {
    return get(theme, ["colors", n], n);
  }

  if (/^fontFamily$/i.test(cssProp)) {
    return get(theme, ["fonts", n], n);
  }

  if (!num(n)) {
    return n;
  }
  const space = get(theme, ["space", n], n);
  return px(space);
};

export const designUnits = obj => props => {
  // TODO: do not create `bp` until found item with multiple values
  const bp = breaks(props);
  const { theme } = props;

  const procItem = cssProp => {
    const item = obj[cssProp];
    const getVal = n => getUnitValue(theme, cssProp, n);

    if (!Array.isArray(item)) {
      const val = getVal(item);
      return { [cssProp]: val };
    }

    return arr(item)
      .map(getVal)
      .map(n => ({ [cssProp]: n }))
      .map(media(bp))
      .reduce(merge, {});
  };

  return Object.keys(obj)
    .map(procItem)
    .reduce(merge, {});
};

export default designUnits;
