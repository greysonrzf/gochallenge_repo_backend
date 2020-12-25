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

  const findRepositoryIndex = repositories.findIndex(repository => repository.id === id)

  if (findRepositoryIndex < 0) return response.status(400).json({ Erro: "Repository does not exists" })

  const updatedRepository = {
    id,
    ...data,
    likes: repositories[findRepositoryIndex].likes
  }

  repositories[findRepositoryIndex] = updatedRepository

  return response.json(updatedRepository)


});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params

  const findRepositoryIndex = repositories.findIndex(repository => repository.id === id)

  if (findRepositoryIndex >= 0) {
    repositories.splice(findRepositoryIndex, 1)
  } else {
    return response.status(400).json({ error: "Repository does not exists" })
  }

  return response.status(204).send()
});

app.put("/repositories/:id/like", (request, response) => {
  const { id } = request.params

  const findRepositoryIndex = repositories.findIndex(repository => repository.id === id)

  if (findRepositoryIndex < 0) return response.status(400).json({ Erro: "Repository does not exists" })

  repositories[findRepositoryIndex].likes++

  return response.json(repositories[findRepositoryIndex])
});

module.exports = app;
