const router = require('express').Router({ mergeParams: true });
const { OK, NO_CONTENT } = require('http-status-codes');
const Comment = require('./comments.model');
const commentsService = require('./comments.service');
const taskService = require('../tasks/task.service');
const commentsSchemas = require('./comments.schema');
const validator = require('../../validator/validator');
const catchErrors = require('../../errors/catchError');

router.route('/').get(
  catchErrors(async (req, res) => {
    const { taskId } = req.params;
    const comment = await commentsService.getAll(taskId);
    res.status(OK).json(comment.map(Comment.toResponse));
  })
);

router.route('/').post(
  catchErrors(async (req, res) => {
    const { taskId } = req.params;
    const requestData = req.body;
    const comment = await commentsService.createComment(taskId, requestData);
    await taskService.addCommentToTask(taskId, comment);
    res.status(OK).json(Comment.toResponse(comment));
  })
);

router.route('/:id').put(
  catchErrors(async (req, res) => {
    const { id, taskId } = req.params;
    const requestData = req.body;
    const comment = await commentsService.updateComment(id, taskId, requestData);
    await taskService.updateCommentInTask(id, comment);
    res.status(OK).json(Comment.toResponse(comment));
  })
);

router.route('/:id').delete(
  catchErrors(async (req, res) => {
    const { id, taskId } = req.params;
    await commentsService.deleteComment(id, taskId);
    await taskService.deleteFieldItemFromTask(taskId, id, 'comments');
    res
      .status(NO_CONTENT)
      .json(`Comment with id ${id} has been succesfully deleted`);
  })
);

module.exports = router;
