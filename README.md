# design-units 
Lightweight alternative to [styled-system](https://github.com/jxnblk/styled-system)

Only `~1Kb` bytes (gzipped) and does not force developers to use component props for styling

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
