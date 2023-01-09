"use strict";

const Hapi = require("@hapi/hapi");
const Inert = require("@hapi/inert");
const Vision = require("@hapi/vision");
const HapiSwagger = require("hapi-swagger");
const Joi = require("joi");
const { noteResponse, noteRequest } = require("./schema");
const Pack = require("../package.json");

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
  });

  const swaggerOptions = {
    info: {
      title: "Test API Documentation",
      version: Pack.version,
    },
  };

  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions,
    },
  ]);

  server.route([
    {
      method: "GET",
      path: "/todo/{id}/",
      options: {
        handler: (request, h) => {
          return "Hello World!";
        },
        description: "Get todo",
        notes: "Returns a todo item by the id passed in the path",
        tags: ["api"], // ADD THIS TAG
        validate: {
          params: Joi.object({
            id: Joi.number().required().description("the id for the todo item"),
          }),
        },
        response: { schema: noteResponse },
      },
    },
    {
      method: "GET",
      path: "/todo/",
      options: {
        handler: (request, h) => {
          return "Hello World!";
        },
        description: "Get todo(s)",
        notes: "Returns a todo item by the id passed in the path",
        tags: ["api"],
        response: {
          schema: Joi.array().items(noteResponse).label("Note List"),
        },
      },
    },
    {
      method: "POST",
      path: "/todo",
      options: {
        handler: (request, h) => {
          return "OK";
        },
        description: "POST TODO",
        tags: ["api"],
        validate: {
          payload: noteRequest,
        },
        response: { status: { 201: noteResponse } },
      },
    },
    {
      method: "PUT",
      path: "/todo/{id}/",
      options: {
        handler: (request, h) => {
          return "OK";
        },
        description: "PUT TODO",
        tags: ["api"],
        validate: {
          params: Joi.object({
            id: Joi.number().required().description("the id for the todo item"),
          }),
          payload: noteRequest,
        },
        response: { schema: noteResponse },
      },
    },
    {
      method: "DELETE",
      path: "/todo/{id}/",
      options: {
        handler: (request, h) => {
          return "OK";
        },
        description: "DELETE TODO",
        tags: ["api"],
        validate: {
          params: Joi.object({
            id: Joi.number().required().description("the id for the todo item"),
          }),
        },
        response: { status: { 204: undefined } },
      },
    },
  ]);

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
