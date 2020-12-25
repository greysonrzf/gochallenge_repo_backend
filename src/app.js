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

  try {
    const { likes } = repositories.find(object => object.id === id)

    const updatedRepository = {
      id,
      ...data,
      likes,
    }

    repositories.map((repository, index) => {
      if (repository.id === id) repositories[index] = updatedRepository
    })

    return response.json(updatedRepository)
  } catch (err) {
    return response.status(400).json({ Erro: "ID Not Found" })
  }

});

app.delete("/repositories/:id", (request, response) => {
  const id = request.params.id

  const repositoryExists = repositories.find(object => object.id === id)

  if (repositoryExists) {
    repositories.map((repository, index) => {
      if (repository.id === id) repositories.splice(index, 1)
    })

    return response.status(204).json({ Message: "Repository Deleted" })
  }

  return response.status(400).json({ Erro: "ID Not Found" })
});

app.put("/repositories/:id/like", (request, response) => {
  const id = request.params.id

  try {
    const { title, url, techs, likes } = repositories.find(object => object.id === id)

    const increaseLikes = likes + 1

    const updatedRepository = {
      id,
      title,
      url,
      techs,
      likes: increaseLikes,
    }

    repositories.map((repository, index) => {
      if (repository.id === id) repositories[index] = updatedRepository
    })

    return response.json(updatedRepository)
  } catch (err) {
    return response.status(400).json({ Erro: "ID Not Found" })
  }


});

module.exports = app;
