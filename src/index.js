const defaultBreakpoints = ["40em", "52em", "64em"];

const num = n => typeof n !== "string" && !isNaN(parseFloat(n)) && isFinite(n);

const px = n => (num(n) ? `${n}px` : n);

const getWidth = n => (!num(n) || n > 1 ? px(n) : `${n * 100}%`);
const get = (obj, path, fallback) =>
  path.reduce((a, b) => (a && a[b] ? a[b] : null), obj) || fallback;

const mq = n => `@media (min-width: ${px(n)})`;

const media = bp => (d, i) => (bp[i] ? { [bp[i]]: d } : i === 0 ? d : null);

const breaks = props => [
  null,
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
            a[key] !== null && a[key] instanceof Object
              ? merge(a[key], b[key])
              : b[key]
        }),
      {}
    )
  );

const mappings = [
  { re: /^padding/, to: "space" },
  { re: /^margin/, to: "space" },
  { re: /color$/i, to: "colors" },
  { re: /^(stroke|fill)$/i, to: "colors" },
  { name: "fontFamily", to: "fonts" }
];

const numValProps = [ "flexGrow" ];

const getUnitValue = (theme, cssProp, n) => {
  if (cssProp === "width") {
    return getWidth(n);
  }

  const map = mappings.find(
    m => m.name === cssProp || (m.re && m.re.test(cssProp))
  );
  const area = map ? map.to : `${cssProp}s`;

  const val = get(theme, [area, n], n);

  return numValProps.includes(cssProp) ? val : px(val);
};

const designUnits = obj => props => {
  const { theme } = props;

  const procItem = cssProp => {
    const item = obj[cssProp];
    const getVal = n => getUnitValue(theme, cssProp, n);

    if (!Array.isArray(item)) {
      let val;
      if (item instanceof Object) {
        val = designUnits(item)(props);
      } else {
        val = getVal(item);
      }

      return { [cssProp]: val };
    }

    const bp = breaks(props);
    return item
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
