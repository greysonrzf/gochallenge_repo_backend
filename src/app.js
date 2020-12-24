const express = require("express");
const cors = require("cors");
const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const data = request.body

  const repository = {
    id: uuid(),
    ...data,
    likes: 0
  }

  repositories.push(repository)

  return response.json(repository)
});

app.put("/repositories/:id", (request, response) => {
  const id = request.params.id
  const data = request.body

  const { likes } = repositories.find(object => object.id === id)

  const updatedRepoitory = {
    id,
    ...data,
    likes,
  }

  repositories.forEach((repository, index) => {
    if (repository.id === id) repositories[index] = updatedRepoitory
  })

  return response.json(updatedRepoitory)
});

app.delete("/repositories/:id", (request, response) => {
  const id = request.params.id

  repositories.forEach((repository, index) => {
    if (repository.id === id) repositories.splice(index, 1)
  })

  return response.json({ message: "Repository deleted." })
});

app.post("/repositories/:id/like", (request, response) => {
  const id = request.params.id

  const { title, url, techs, likes } = repositories.find(object => object.id === id)

  const increaseLikes = likes + 1

  const updatedRepoitory = {
    id,
    title,
    url,
    techs,
    likes: increaseLikes,
  }

  repositories.forEach((repository, index) => {
    if (repository.id === id) repositories[index] = updatedRepoitory
  })

  return response.json(updatedRepoitory)

});

module.exports = app;
