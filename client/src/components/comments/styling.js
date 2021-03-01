import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(2),
    },
    flexGrow: 1,
    marginTop: theme.spacing(3),
    backgroundColor: '#EEEEEE',
    border: 'solid 5px #ED1A7A',
    borderRadius: theme.spacing(4),
    textAlign: 'center',
    padding: theme.spacing(3),
    color: '#33485E',
  },
  formTitle: {
    fontWeight: 'bold',
    fontSize: 50,
  },
  formInput: {
    width: '80%',
    textAlign: 'center',
  },
  avatar: {
    maxHeight: 25,
    maxWidth: 25,
    borderRadius: theme.spacing(3)
  },
  divider: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  formSpacing: {
    padding: '10px 0'
  }
}))

export default useStyles