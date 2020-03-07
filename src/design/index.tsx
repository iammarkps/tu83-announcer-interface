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
    `}
  />
)
