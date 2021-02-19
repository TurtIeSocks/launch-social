import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundColor: '#EEEEEE',
    border: 'solid 5px #ED1A7A',
    borderRadius: theme.spacing(4),
    color: '#33485E',
    backgroundColor: '#EEEEEE',
    margin: theme.spacing(2)
  },
  divider: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  title: {
    color: '#ED1A7A',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  date: {
    color: '#ED1A7A',
    fontWeight: 'bold',
  },
  time: {
    color: '#49AEB9',
  },
  avatar: {
    maxWidth: 15,
    maxHeight: 15,
    borderRadius: 10,
    display: 'in'
  },
  headers: {
    color: '#33485E',
    fontWeight: 'bold',
  },
  eventDescription: {
    color: '#33485E',
    textAlign: 'left',
  },
  gameSummary: {
    color: '#49AEB9',
    textAlign: 'left',
  },
  platformImage: {
    maxHeight: 50,
    maxWidth: 50
  },
  platforms: {
    paddingTop: theme.spacing(2),
    color: '#969696',
  },
  carouselImage: {
    height: 250,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    border: 'solid 5px #33485E',
    borderRadius: theme.spacing(3)
  },
  carouselVideo: {
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  coverArt: {
    padding: theme.spacing(2),
    margin: '0 auto'
  },
  buttons: {
    margin: theme.spacing(1)
  }
}))

export default useStyles