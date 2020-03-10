import { css, Global } from '@emotion/core'

export const GlobalStyle = () => (
  <Global
    styles={css`
      html,
      body,
      #__next {
        width: 100%;
        height: 100%;
        margin: 0;
      }

      #nprogress {
        pointer-events: none;
      }

      #nprogress .bar {
        background: #0070f3;
        position: fixed;
        z-index: 99999;
        top: 0;
        left: 0;
        width: 100%;
        height: 3px;
      }

      #nprogress .peg {
        display: block;
        position: absolute;
        right: 0px;
        width: 100px;
        height: 100%;
        box-shadow: 0 0 10px #0070f3, 0 0 5px #0070f3;
        opacity: 1;
        -webkit-transform: rotate(3deg) translate(0px, -4px);
        -ms-transform: rotate(3deg) translate(0px, -4px);
        transform: rotate(3deg) translate(0px, -4px);
      }
    `}
  />
)
