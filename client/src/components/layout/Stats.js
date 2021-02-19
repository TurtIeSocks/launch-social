import React from 'react'
import { Link } from 'react-router-dom'
import { ThemeProvider, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import theme from '../mui/theme.js'
import useStyles from './styling.js'

const Stats = ({ stats, type }) => {
  const classes = useStyles()
  const statsLanguage = type === 'gaming' ? {
    subType: 'game',
    title: 'Games',
    rowHeader1: 'Game',
  } : {
    subType: 'studyTopic',
    title: 'Study Topics',
    rowHeader1: 'Topic',
  }

  const createRows = (name, total, id) => {
    return { name, total, id }
  }

  let rows
  if (stats !== undefined) {
    rows = stats.map(row => {
      const name =
        <Link to={`/${statsLanguage.subType}/${row[statsLanguage.subType].id}`}>
          {row[statsLanguage.subType].name}
        </Link>
      return createRows(
        name, row.total, row[statsLanguage.subType].id
      )
    })
  }

  return (
    <ThemeProvider theme={theme}>
      <TableContainer >
        <Typography color='secondary' className={classes.tableTitle}>
          {`Top 10 ${statsLanguage.title}`}
        </Typography>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>{statsLanguage.rowHeader1}</TableCell>
              <TableCell align="right">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows && rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ThemeProvider>
  )
}

export default Stats