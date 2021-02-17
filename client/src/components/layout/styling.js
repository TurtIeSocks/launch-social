import { makeStyles } from '@material-ui/core/styles';

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
  }
}));

export default useStyles