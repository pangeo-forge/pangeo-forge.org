import { Global } from '@emotion/react'

// https://fonts.cdnfonts.com/css/panton-black-caps

export const Fonts = () => (
  <Global
    styles={`
      @font-face {
    font-family: 'Panton';
    font-style: italic;
    font-weight: 400;
    src:  url('/fonts/PantonDemoBlackItalic.woff') format('woff');
}
@font-face {
    font-family: 'Panton Narrow';
    font-style: italic;
    font-weight: 400;
    src:  url('/fonts/PantonNarrowDemoBlackItalic.woff') format('woff');
}
@font-face {
    font-family: 'Panton';
    font-style: normal;
    font-weight: 290;
    src: url('/fonts/PantonDemoLight.woff') format('woff');
}
@font-face {
    font-family: 'Panton Narrow';
    font-style: normal;
    font-weight: 290;
    src: url('/fonts/PantonNarrowDemoLight.woff') format('woff');
}
@font-face {
    font-family: 'Panton';
    font-style: italic;
    font-weight: 300;
    src: url('/fonts/PantonDemoLightItalic.woff') format('woff');
}
@font-face {
    font-family: 'Panton Narrow';
    font-style: italic;
    font-weight: 300;
    src: url('/fonts/PantonNarrowDemoLightItalic.woff') format('woff');
}
@font-face {
    font-family: 'Panton';
    font-style: normal;
    font-weight: 390;
    src: url('/fonts/PantonDemoBlack.woff') format('woff');
}
@font-face {
    font-family: 'Panton Narrow';
    font-style: normal;
    font-weight: 390;
    src: url('/fonts/PantonNarrowDemoBlack.woff') format('woff');
}

      `}
  />
)
