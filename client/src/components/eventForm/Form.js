import React from 'react'
import ErrorList from "../ErrorList.js"
import theme from '../mui/theme.js' 
import useStyles from './styling.js'

import { Grid, TextField, Button, MenuItem } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/core/styles'
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'

import DateFnsUtils from '@date-io/date-fns'
import AsyncSelect from 'react-select/async'

const EventForm = ({
  eventRecord,
  eventTypes,
  onSubmitHandler,
  handleStartDateChange,
  handleEndDateChange,
  handleChange,
  handleInputChange,
  handleGameDetailsChange,
  clearForm,
  loadGames,
  errors,
  formName
}) => {
  const classes = useStyles();

  let specialFields = ''
  if (eventRecord.eventTypeId == 1) {
    specialFields = (
      <AsyncSelect
        id='gameDetails'
        name='gameDetails'
        className='react-select-menu'
        value={eventRecord.gameDetails}
        cacheOptions
        getOptionLabel={e => e.name}
        getOptionValue={e => e.id}
        loadOptions={loadGames}
        onInputChange={handleInputChange}
        onChange={handleGameDetailsChange}
      />
    )
  } else if (eventRecord.eventTypeId == 2) {
    specialFields = (
      <TextField
        className={classes.longFormInput}
        name="studyTopic"
        id="outlined-name"
        label="Study Topic"
        value={eventRecord.studyTopic}
        variant="outlined"
        onChange={handleChange}
      />
    )
  } else if (eventRecord.eventTypeId == 3) {
    specialFields = (
      <TextField
        className={classes.longFormInput}
        name="otherType"
        id="outlined-name"
        label="Other Type of Event"
        value={eventRecord.otherType}
        variant="outlined"
        onChange={handleChange}
      />
    )
  }

  return (
    <Grid container
      alignItems="center"
      justify="center"
    >
      <Grid item xs={10} sm={8}>
        <ThemeProvider theme={theme}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <ErrorList errors={errors} />
            <form className={classes.root} onSubmit={onSubmitHandler}>
              <Grid container spacing={3}
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Grid item xs={12} className={classes.formTitle}>
                  {formName}
              </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    className={classes.formInput}
                    required
                    name="name"
                    id="outlined-name"
                    label="Name"
                    value={eventRecord.name}
                    variant="outlined"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    required
                    className={classes.formInput}
                    name="description"
                    id="outlined-description"
                    label="Description"
                    value={eventRecord.description}
                    variant="outlined"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    className={classes.formInput}
                    id="outlined-location"
                    name="location"
                    label="Location"
                    type="text"
                    value={eventRecord.location}
                    variant="outlined"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    className={classes.formInput}
                    id="outlined-select-currency"
                    select
                    name='eventTypeId'
                    label="Select"
                    value={eventRecord.eventTypeId}
                    onChange={handleChange}
                    variant="outlined"
                  >
                    {eventTypes.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  {specialFields}
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <DateTimePicker
                    required
                    className={classes.formInput}
                    label="Start Date and Time"
                    inputVariant="outlined"
                    value={eventRecord.startDate}
                    onChange={handleStartDateChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <DateTimePicker
                    required
                    className={classes.formInput}
                    label="End Date and Time"
                    inputVariant="outlined"
                    value={eventRecord.endDate}
                    onChange={handleEndDateChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    id="outlined-meetUrl"
                    className={classes.formInput}
                    name="meetUrl"
                    label="Zoom/Hangouts URL"
                    type="text"
                    value={eventRecord.meetUrl}
                    variant="outlined"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6} sm={3} md={3}>
                  <Button variant="contained" color="secondary" type="submit">
                    Submit</Button>
                </Grid>
                <Grid item xs={6} sm={3} md={3}>
                  <Button variant="contained" color="primary" onClick={clearForm}>
                    Clear</Button>
                </Grid>
              </Grid>
            </form>
          </MuiPickersUtilsProvider>
        </ThemeProvider>
      </Grid>
    </Grid>
  );
}

export default EventForm
