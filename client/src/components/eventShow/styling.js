import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(5),
    backgroundColor: '#EEEEEE',
    border: 'solid 5px #ED1A7A',
    borderRadius: theme.spacing(4),
    padding: theme.spacing(1),
    color: '#33485E',
    width: '90%',
    display: 'flex',
    textAlign: 'center',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: '#EEEEEE',
  },
  divider: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  title: {
    color: '#ED1A7A',
    fontWeight: 'bold',
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
  },
  username: {
  },
  headers: {
    color: '#33485E',
    fontWeight: 'bold',
  },
  eventDescription: {
    color: '#33485E',
    textAlign: 'left',
    margin: '1vw 1vw 0 1vw'
  },
  gameSummary: {
    color: '#49AEB9',
    textAlign: 'left',
    margin: '1vw 1vw 0 1vw'
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
    padding: theme.spacing(1),
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  coverArt: {
    padding: theme.spacing(2)
  },
  buttons: {
    margin: theme.spacing(1)
  }
}));

export default useStyles