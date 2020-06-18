/** @jsx jsx */
import { jsx } from '@emotion/core'
import styled from '@emotion/styled';
import React from 'react';
import du, { dx, Color } from './units';
import { ThemeProvider } from 'emotion-theming'
import theme from './theme';
import './App.css';


const StyledDiv = styled.div`
${du({
  backgroundColor: 'primary',
  color: 'text',
  border: '1px solid',
  borderColor: '#aabbcc' as Color, // use custom color not from the theme
  padding: 3,
  fontSize: 'small',
  fontWeight: 'bold',
  '&:hover': {
    color: 'muted'
  },
  // all other props are not checked
  wrap: 'nowrap'
})};
 display: block;
`

function InnnerApp() {
  return (
    <div className="App">
      <div css={dx({
        backgroundColor: 'secondary',
        padding: 2
      })}>
        Styled with emotion
      </div>
      <StyledDiv>Another styled div</StyledDiv>
      <div>
        Hello
      </div>
    </div>
  );
}
// TODO: add example of styled-component and emotion in different files

const App = () => (
  <ThemeProvider theme={theme}>
    <InnnerApp />
  </ThemeProvider>
)

export default App;
