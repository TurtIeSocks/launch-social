import React from 'react'
import NewComment from './New.js'
import EditComment from './Edit.js'
import DeleteComment from './Delete.js'
import CommentTile from './Tile.js'
import { Grid } from '@material-ui/core'

const CommentLogic = ({ thisEvent, setThisEvent, commentState, setCommentState, user }) => {

  const handleEditSubmit = event => {
    setCommentState({ id: '', edit: false })
  }

  const allComments = thisEvent.comments.map((comment, index) => {
    const last = thisEvent.comments.length - 1
    if (comment.id === commentState.id && commentState.edit) {
      return (
        <Grid item xs={12}
          key={comment.id}
        >
          <EditComment
            comment={comment}
            eventId={thisEvent.id}
            handleEditSubmit={handleEditSubmit}
          />
        </Grid>
      )
    } else if (comment.id === commentState.id && !commentState.edit) {
      return (
        <Grid item xs={12}
          key={comment.id}
        >
          <DeleteComment
            handleEditSubmit={handleEditSubmit}
            thisEvent={thisEvent}
            comment={comment}
          />
        </Grid>
      )
    } else {
      return (
        <Grid item xs={12}
          key={comment.id}
        >
          <CommentTile
            comment={comment}
            user={user}
            index={index}
            last={last}
            setCommentState={setCommentState}
          />
        </Grid>
      )
    }
  })

  return (
    <Grid container
      direction="row"
      justify="center"
      alignItems="center"
    >
      {allComments}
      <Grid item xs={10} sm={12}>
        <NewComment
          user={user}
          thisEvent={thisEvent}
          setThisEvent={setThisEvent}
        />
      </Grid>
    </Grid>
  )
}

export default CommentLogic
