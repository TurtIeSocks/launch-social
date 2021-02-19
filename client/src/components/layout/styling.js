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
  add: {
    paddingTop: theme.spacing(1)
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
      display:'flex'
    },
    backgroundColor: 'white',
    borderRadius: 16,
    minHeight: 25,
    padding: 10,
    margin: '0 auto'
  }
}))

export default useStyles