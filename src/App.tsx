import React from 'react';
import AppLayout from './components/AppLayout';
import GlobalContextProvider from 'context';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {

    /* Breakpoints */
    --rak-breakpoints-mobile: 320px;

    /* Colors */
    --rak-palette-body_color: #000;
    --rak-palette-atmosphere: #009CDF;
    --rak-rgba-atmosphere: rgba(0, 156, 223, .1);
    --rak-palette-blackMana: #858585;
    --rak-rgba-blackMana: rgba(133, 133, 133, .3);
    --rak-palette-textSearch: #212121;
    --rak-palette-bd_red: #d61e1e;
    --rak-wintersDay: #DFF5FF;
    --rak-blackWash: #0D0D0D;
    --rak-power-hight: #0000ff; // blue
    --rak-power-low: #8f00ff; // violet
    --rak-power-default: #C71585; // Purple Haze
    --bs-modal-color: #212121;
    /*Screen*/
    
    --rak-xs: '(max-width: 575px)',
    --rak-sm: '(min-width: 576px)',
    --rak-md: '(min-width: 768px)',
    --rak-xl: '(min-width: 992px)',
    --rak-xxl: '(min-width: 1400px)',
  }
`;
const App: React.FC = () => {
  return (
    <React.Fragment>
      <GlobalContextProvider>
        <GlobalStyle />
        <AppLayout />
      </GlobalContextProvider>
    </React.Fragment>
  );
};

export default App;
