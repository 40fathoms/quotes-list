import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import classes from './Comments.module.css';
import NewCommentForm from './NewCommentForm';

import useHttp from '../../hooks/use-http';
import { getAllComments } from '../../lib/api';
import LoadingSpinner from '../UI/LoadingSpinner';
import CommentsList from './CommentsList'

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);

  const params = useParams()

  const { sendRequest, status, data: loadedComments } = useHttp(getAllComments)

  React.useEffect(() => {
    sendRequest(params.quoteId)
  }, [sendRequest, params.quoteId])

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  const onAddedComment = React.useCallback(() => {
    sendRequest(params.quoteId)
  }, [sendRequest, params.quoteId])



  let comments

  if (status === 'pending') {
    comments = (
      <div className="centered">
        <LoadingSpinner />
      </div>
    )
  }

  if (status === 'completed' && (loadedComments || loadedComments.length > 0)) {
    comments = <CommentsList comments={loadedComments} />
  }

  if (status === 'completed' && (!loadedComments || loadedComments.length === 0)) {
    comments = <p className="centered">No comments were added yet!</p>
  }

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className='btn' onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && <NewCommentForm onAddedComment={onAddedComment} quoteId={params.quoteId} />}
      {comments}
    </section>
  );
};

export default Comments;
