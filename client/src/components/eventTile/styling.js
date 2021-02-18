import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({ spacing, palette }) => ({
  card: {
    display: 'flex',
    padding: spacing(2),
    borderRadius: 16,
  },
  activeCard: {
    display: 'flex',
    padding: spacing(2),
    borderRadius: 16,
    border: 'solid 4px rgb(235,35,122)'
  },
  media: {
    minWidth: '25%',
    maxWidth: '25%',
    flexShrink: 0,
    backgroundColor: palette.grey[200],
    borderRadius: 12,
    boxShadow: '0 2px 8px 0 #c1c9d7, 0 -2px 8px 0 #cce1e9',
  },
  rating: {
    verticalAlign: 'text-top',
  },
  content: {
    padding: spacing(0, 2, 0, 2)
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: '0.5px',
    color: 'rgb(235,35,122)',
    marginBottom: 0,
    marginRight: spacing(1.5),
    display: 'inline-block',
  },
  date: {
    fontSize: 14,
    fontWeight: 'light',
    letterSpacing: '0.5px',
    color: 'rgb(51,72,94)',
    marginBottom: 0,
    marginRight: spacing(1.5),
    display: 'inline-block',
  },
  body: {
    fontSize: 14,
    color: palette.grey[500],
  },
  divider: {
    margin: spacing(1, 0),
  },
  textFooter: {
    fontSize: 14,
  },
  icon: {
    fontSize: '1.2rem',
    verticalAlign: 'bottom',
  },
  avatar: {
    maxWidth: 20,
    maxHeight: 20
  },
  buttons: {
    textAlign: 'center'
  },
  username: {
    fontSize: 14,
    color: palette.grey[500],
  },
  eventDetails: {
    fontSize: 14
  }
}));

export default useStyles