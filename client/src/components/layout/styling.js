import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    flexGrow: 1,
  },
  topBar: {
    flexGrow: 1,
    color: 'white'
  },
  avatar: {
    maxWidth: 20,
    maxHeight: 20,
    borderRadius: 10
  },
  logo: {
    margin: theme.spacing(1),
    width: 65
  },
  link: {
    color: 'white',
    textAlign: 'center'
  },

  table: {
    minWidth: 225,
  },
  tableTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 25
  },
  tabs: {
    backgroundColor: theme.palette.background.paper,
    minWidth: 320,
    border: 'solid 10px #ED1A7A',
    borderRadius: 16
  },
  pagination: {
    "& > *": {
      justifyContent: "center",
      display: 'flex'
    },
    backgroundColor: 'white',
    borderRadius: 16,
    minHeight: 25,
    padding: 10,
    margin: '0 auto'
  },
  carouselImage: {
    height: 500,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    border: 'solid 5px #33485E',
    borderRadius: theme.spacing(3)
  },
  splashTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    margin: theme.spacing(2),
    color: 'white'
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    margin: theme.spacing(2),
  },
  carouselSplash: {
    backgroundColor: 'rgba(237,26,122, 0.5)',
    borderRadius: theme.spacing(2)
  },
  carouselFeatured: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderBottomLeftRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2)
  }
}))

export default useStyles