# design-units 
Lightweight alternative to [styled-system](https://github.com/jxnblk/styled-system)

Only [`~700b`](https://bundlephobia.com/result?p=design-units) bytes (minified and gzipped) and does not force developers to use component props for styling

Read more about [design systems](https://varun.ca/styled-system/)

# examples

```js
import styled from "react-emotion";
import units from "design-units";

const Footer = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  ${units({
    backgroundColor: "primary",
    width: 1,
    fontSize: [1, 2]
  })};
`;

```

This requires theme provider with theme units 

```js

export const theme = {
  breakpoints: [320, 480, 640],
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fontSizes: [12, 14, 16, 20, 24, 36, 48, 80, 96],
  // ...
}

import { ThemeProvider } from 'emotion-theming'

 <ThemeProvider theme={theme}>
    <Footer />
  </ThemeProvider>

```

# Usage
for any value `design-units` tries to find defined units in the theme, if it's a number, then it looks by array index, if it's a string, then it's just a dictionary lookup

```
styled.div`
  ${units({
    fontSize: 1,
    color: "red",
    width: "100em"
  })}
`  
```  
  is equivalent to 
```
styled.div`
    fontSize: ${props => props.theme.fontSizes[1]};
    color: ${props => props.theme.colors.red};
    width: 100em;
  `
```
if desgin value is not found, then original value is used

## Space (padding and margins)

Units for `padding` and `margin` (including `paddingLeft`, `marginTop` etc..) are mapped to `theme.space`

## Width
If width value `<= 1`, then it is used as percentage, e.g. 
`width: 1/2` is equivalent `width: "50%"`

for values bigger than `1` it's converted to pixels `width: 200` -> `width: '200px'`

## Colors 
properties that have `color` keyword in it are mapped to `theme.colors`

## All other props
All other props are mapped to `${popertyName}s`, e.g. `lineHeight: heading` -> `theme.lineHeights.heading`

## Responsive 
Whenever multiple values defined the unit, it means that those values should be used for different breakpoints 

```
theme = { 
  breakpoints: [320, 480, 640],
  ...
}

styled.div`
${units({
  width: [1, 1/2, 1/4]
})}
`
```
is converted to

```
styled.div`
  width: 100%;
  @media (min-width: 320px) {
    width: 50%;
  }  

  @media (min-width: 480px) {
    width: 25%;
  }

`
```

## Nested selectors 
```js
styled.div`
${units({
  color: "black", 
  "&:hover": {
    color: "blue"
  }
})}
`

```

