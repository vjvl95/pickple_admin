import theme from "./theme"
const drawerWidth = 256;
const lightColor = 'rgba(255, 255, 255, 0.7)';

const styles = {
  root: {
    display: 'flex',
    minHeight: '100vh',
  },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    app: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
    },
    main: {
      flex: 1,
      padding: theme.spacing(6, 4),
      background: '#eaeff1',
    },
    menuButton: {
      marginLeft: -theme.spacing(1),
    },
    link: {
      textDecoration: 'none',
      color: lightColor,
      '&:hover': {
        color: theme.palette.common.white,
      },
    },
  };



  export default styles;