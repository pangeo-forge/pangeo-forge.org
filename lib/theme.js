const fonts = `system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Helvetica, sans-serif`

const theme = {
  colors: {
    text: 'black',
    background: 'white',
    primary: 'black',
    invert: 'white',
    pink: '#e50051',
    teal: '#00a3b0',
    green: '#5eb130',
    blue: '#003b71',
    purple: '#322173',
    // modes: {
    //   dark: {
    //     text: 'white',
    //     background: 'black',
    //     primary: 'white',
    //     invert: 'black',
    //     pink: '#e50051',
    //     teal: '#00a3b0',
    //     green: '#5eb130',
    //     blue: '#003b71',
    //     purple: '#6141dd',
    //   },
    // },
  },
  space: [0, 4, 8, 16, 24, 32, 48, 64, 96, 128, 172, 256, 512],
  fonts: {
    body: `Helvetica-Light, ${fonts}`,
    title: 'Panton',
    subtitle: 'Panton',
    monospace: 'Menlo, monospace',
  },
  fontSizes: [10, 12, 14, 16, 18, 24, 34, 48, 64, 80, 96, 128],
  fontWeights: {
    body: 400,
    title: 390,
    subtitle: 290,
  },
  lineHeights: {
    body: 1.25,
    title: 1.5,
    subtitle: 1.125,
  },
  letterSpacings: {
    body: 'normal',
  },
  layout: {
    container: {
      maxWidth: [1024, 1024, 1024, 1280],
      width: '100%',
      mx: 'auto',
      px: 3,
    },
  },
  styles: {
    root: {
      fontFamily: 'body',
      lineHeight: 'body',
      fontWeight: 'body',
      letterSpacing: 'body',
      fontSize: [3, 3, 3, 4],
    },
    h1: {
      fontSize: [5, 5, 6, 7],
      fontFamily: 'title',
      lineHeight: 'title',
      fontWeight: 'subtitle',
      letterSpacing: 'title',
      color: 'blue',
      mt: [5, 7, 7, 7],
      mb: [4, 5, 5, 5],
    },
    h2: {
      color: 'blue',
      fontFamily: 'subtitle',
      lineHeight: 'subtitle',
      fontWeight: 'subtitle',
      letterSpacing: 'title',
      fontSize: [4, 5, 6],
      mt: [4, 5, 5, 5],
      mb: [3, 4, 4, 4],
    },
    a: {
      color: 'green',
      '@media (hover: hover) and (pointer: fine)': {
        '&:active': {
          color: 'green',
        },
        '&:hover': {
          color: 'text',
        },
      },
      textDecoration: 'underline',
      cursor: 'pointer',
    },
  },
  breakpoints: ['40em', '64em', '102em'],
  config: {
    initialColorModeName: 'light',
    printColorModeName: 'light',
    useColorSchemeMediaQuery: false,
  },
}

export default theme
