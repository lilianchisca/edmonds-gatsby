const aspectRatio = require(`tailwindcss-aspect-ratio`)

module.exports = {
  theme: {
    aspectRatio: {
      square: [1, 1],
      '16/9': [16, 9],
      '4/3': [4, 3],
      '21/9': [21, 9],
    },
    container: {
      center: true,
      padding: `1.5rem`,
    },
    fontFamily: {
      body: [
        `"forma-djr-text"`,
        `Inter`,
        `-apple-system`,
        `BlinkMacSystemFont`,
        `"Segoe UI"`,
        `Roboto`,
        `"Helvetica Neue"`,
        `Arial`,
        `"Noto Sans"`,
        `sans-serif`,
        `"Apple Color Emoji"`,
        `"Segoe UI Emoji"`,
        `"Segoe UI Symbol"`,
        `"Noto Color Emoji"`,
      ],
      heading: [
        `"Libre Baskerville"`,
        `Georgia`,
        `Cambria`,
        `"Times New Roman"`,
        `Times`,
        `serif`,
      ],
    },
    screens: {
      xs: `414px`,
      sm: `640px`,
      md: `768px`,
      lg: `1024px`,
      xl: `1280px`,
      '2xl': `1400px`,
      '3xl': `1680px`,
      '4xl': `2400px`,
    },
    extend: {
      borderRadius: {
        none: `0`,
        sm: `0.125rem`,
        default: `0.25rem`,
        md: `0.375rem`,
        lg: `0.5rem`,
        full: `9999px`,
        5: `5px`,
      },
      borderWidth: {
        '5': `5px`,
        '9': `9px`,
      },
      boxShadow: {
        xs: `0 0 0 1px rgba(0, 0, 0, 0.05)`,
        sm: `0 1px 2px 0 rgba(0, 0, 0, 0.05)`,
        default: `0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)`,
        md: `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)`,
        lg: `0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)`,
        xl: `0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)`,
        '2xl': `0 25px 50px -12px rgba(0, 0, 0, 0.25)`,
        inner: `inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)`,
        outline: `0 0 0 3px rgba(66, 153, 225, 0.5)`,
        none: `none`,
        box: `0 10px 20px rgba(0, 0, 0, 0.1)`,
        form: `0 8px 16px -8px rgba(0, 0, 0, 0.3)`,
      },
      colors: {
        yellow: {
          500: `#ebb221`,
        },
        blue: {
          500: `#00254a`,
          600: `#001931`,
        },
        aqua: {
          200: `#eef1f9`,
          500: `#6784c9`,
          600: `#3e5079`,
        },
        gray: {
          border: `#dbe1eb`,
          100: `#f5f6f8`,
          200: `#e7ebee`,
          300: `#98a7b6`,
          400: `#6e788e`,
          500: `#686b6f`,
        },
      },
      fontSize: {
        reset: `0`,
        14: `0.875rem`,
        15: `0.9375rem`,
        16: `1rem`,
        18: `1.125rem`,
        19: `1.1875rem`,
        20: `1.25rem`,
        22: `1.375rem`,
        24: `1.5rem`,
        26: `1.625rem`,
        27: `1.6875rem`,
        30: `1.875rem`,
        32: `2rem`,
        34: `2.125rem`,
        40: `2.5rem`,
        110: `6.875rem`,
        120: `7.5rem`,
      },
      inset: {
        '-16': `-16px`,
        '-80': `-80px`,
        '-1': `-1px`,
        '50p': `50%`,
        50: `50px`,
        80: `80px`,
        120: `120px`,
      },
      letterSpacing: {
        tighter: `-0.05em`,
        tight: `-0.025em`,
        normal: `0`,
        wide: `0.025em`,
        wider: `0.05em`,
        widest: `0.1em`,
        button: `0.178571429em`,
        heading: `0.035714286em`,
        'heading-md': `0.062777778em`,
        'button-sm': `0.12em`,
        body: `0.046875em`,
        footer: `0.071428571em`,
      },
      lineHeight: {
        none: `1`,
        tight: `1.25`,
        snug: `1.375`,
        normal: `1.5`,
        heading: `1.525`,
        'heading-md': `1.727272727`,
        relaxed: `1.625`,
        body: `1.6875`,
        'body-lg': `1.461538462`,
        loose: `2`,
        button: `4`,
        'button-border': `3.714285714`,
        'button-sm': `3.4`,
        'button-border-sm': `3.114285714`,
        'heading-lg': `1.118181818`,
        'heading-xl': `1.851851852`,
      },
      minHeight: {
        263: `263px`,
        330: `330px`,
        620: `620px`,
        660: `660px`,
        760: `760px`,
      },
      minWidth: {
        60: `60px`,
        110: `110px`,
        166: `166px`,
        196: `196px`,
      },
      maxHeight: {},
      maxWidth: {
        310: `310px`,
        430: `430px`,
        460: `460px`,
        480: `480px`,
        550: `550px`,
        570: `570px`,
        630: `630px`,
        670: `670px`,
        730: `730px`,
        790: `790px`,
        830: `830px`,
        910: `910px`,
        980: `980px`,
        1020: `1020px`,
        1120: `1120px`,
        1150: `1150px`,
        1460: `1460px`,
      },
      opacity: {
        '0': `0`,
        '25': `0.25`,
        '50': `0.5`,
        '75': `0.75`,
        '100': `1`,
      },
      spacing: {
        '1/5': `20%`,
        '2/5': `40%`,
        '3/5': `60%`,
        2: `2px`,
        4: `4px`,
        6: `6px`,
        7: `7px`,
        10: `10px`,
        15: `15px`,
        17: `17px`,
        19: `19px`,
        20: `20px`,
        25: `25px`,
        27: `27px`,
        29: `29px`,
        30: `30px`,
        32: `32px`,
        35: `35px`,
        40: `40px`,
        41: `41px`,
        45: `45px`,
        50: `50px`,
        55: `55px`,
        60: `60px`,
        65: `65px`,
        68: `68px`,
        70: `70px`,
        80: `80px`,
        86: `86px`,
        90: `90px`,
        100: `100px`,
        110: `110px`,
        120: `120px`,
        130: `130px`,
        134: `134px`,
        140: `140px`,
        200: `200px`,
        220: `220px`,
        260: `260px`,
        295: `295px`,
        300: `300px`,
        380: `380px`,
        460: `460px`,
      },
      zIndex: {
        'n-2': -2,
        'n-1': -1,
        '1': 1,
      },
    },
  },
  variants: {
    borderWidth: [`responsive`, `odd`, `hover`, `focus`],
  },
  plugins: [aspectRatio()],
}
