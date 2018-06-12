# design-units 
Lightweight alternative to [styled-system](https://github.com/jxnblk/styled-system)
Only `~800` bytes (gzipped)

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

