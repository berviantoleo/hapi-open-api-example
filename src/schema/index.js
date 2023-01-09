const Joi = require("joi");

const noteResponse = Joi.object({
    id: Joi.number(),
    title: Joi.string(),
    content: Joi.string(),
}).label('Note');
const noteRequest = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
  }).label("Note Request");

module.exports = { noteRequest, noteResponse };