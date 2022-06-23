import { Global } from '@emotion/react'

// https://fonts.cdnfonts.com/css/panton-black-caps

const Fonts = () => (
  <Global
    styles={`
      @font-face {
    font-family: 'Panton';
    font-style: italic;
    font-weight: 400;
    src: local('Panton'), url('https://fonts.cdnfonts.com/s/14450/PantonDemoBlackItalic.woff') format('woff');
}
@font-face {
    font-family: 'Panton Narrow';
    font-style: italic;
    font-weight: 400;
    src: local('Panton Narrow'), url('https://fonts.cdnfonts.com/s/14450/PantonNarrowDemoBlackItalic.woff') format('woff');
}
@font-face {
    font-family: 'Panton';
    font-style: normal;
    font-weight: 290;
    src: local('Panton'), url('https://fonts.cdnfonts.com/s/14450/PantonDemoLight.woff') format('woff');
}
@font-face {
    font-family: 'Panton Narrow';
    font-style: normal;
    font-weight: 290;
    src: local('Panton Narrow'), url('https://fonts.cdnfonts.com/s/14450/PantonNarrowDemoLight.woff') format('woff');
}
@font-face {
    font-family: 'Panton';
    font-style: italic;
    font-weight: 300;
    src: local('Panton'), url('https://fonts.cdnfonts.com/s/14450/PantonDemoLightItalic.woff') format('woff');
}
@font-face {
    font-family: 'Panton Narrow';
    font-style: italic;
    font-weight: 300;
    src: local('Panton Narrow'), url('https://fonts.cdnfonts.com/s/14450/PantonNarrowDemoLightItalic.woff') format('woff');
}
@font-face {
    font-family: 'Panton';
    font-style: normal;
    font-weight: 390;
    src: local('Panton'), url('https://fonts.cdnfonts.com/s/14450/PantonDemoBlack.woff') format('woff');
}
@font-face {
    font-family: 'Panton Narrow';
    font-style: normal;
    font-weight: 390;
    src: local('Panton Narrow'), url('https://fonts.cdnfonts.com/s/14450/PantonNarrowDemoBlack.woff') format('woff');
}


      `}
  />
)

export default Fonts
