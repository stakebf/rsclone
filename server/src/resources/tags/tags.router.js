const router = require('express').Router({ mergeParams: true });
const { OK, NO_CONTENT } = require('http-status-codes');
const Tag = require('./tags.model');
const tagsService = require('./tags.service');
const taskService = require('../tasks/task.service');
const commentsSchemas = require('./tags.schema');
const validator = require('../../validator/validator');
const catchErrors = require('../../errors/catchError');

router.route('/').get(
  catchErrors(async (req, res) => {
    const { taskId } = req.params;
    const tags = await tagsService.getAll(taskId);
    res.status(OK).json(tags.map(Tag.toResponse));
  })
);

router.route('/').post(
  catchErrors(async (req, res) => {
    const { taskId } = req.params;
    const requestData = req.body;
    const tag = await tagsService.createTag(taskId, requestData);
    await taskService.addTagToTask(taskId, tag);
    res.status(OK).json(Tag.toResponse(tag));
  })
);

router.route('/:id').put(
  // catchErrors(validator.validateSchemaPut(commentsSchemas.schemaForPut)),
  catchErrors(async (req, res) => {
    const { id, taskId } = req.params;
    const requestData = req.body;
    const tag = await tagsService.updateTag(id, taskId, requestData);
    // await taskService.updateCommentInTask(id, comment);
    res.status(OK).json(Tag.toResponse(tag));
  })
);

router.route('/:id').delete(
  catchErrors(async (req, res) => {
    const { id, taskId } = req.params;
    await tagsService.deleteTag(id, taskId);
    await taskService.deleteFieldItemFromTask(taskId, id, 'comments');
    res
      .status(NO_CONTENT)
      .json(`Comment with id ${id} has been succesfully deleted`);
  })
);

module.exports = router;
