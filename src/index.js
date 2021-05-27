const express = require("express");
const { v4: uuidv4, validate } = require("uuid");
// const { isUuid } = require("uuidv4");

const app = express();

/**
 * Middleware:
 * É um interceptador de requisições,
 * -pode interromper uma requisição
 * -ou pode alterar dados da requisição
 * -
 *
 *
 *
 */

app.use(express.json());
//acima é utilizado para o express reconhecer JSON

app.use("/projects/:id", validateProjectId); //aqui aplicamos o middlewares somente nas rotas com esse caminho

//------------------------------------------

const theProjects = [];

function logRequests(req, res, next) {
  const { method, url } = req;

  const logLabel = `[${method.toUpperCase()}] ${url} `;

  console.log(logLabel);

  // console.log("1");
  console.time(logLabel);

  // return next();
  next();

  // console.log("2");
  console.timeEnd(logLabel);
}

function validateProjectId(req, res, next) {
  const { id } = req.params;

  if (!validate(id)) {
    //aqui caso o ID nao seja válido ele vai retornar o erro status 400
    return res.status(400).json({ error: "Invalid project ID." });
  }

  return next();
}

app.use(logRequests); //aqui o middleware é executado seguindo o fluxo do node

//aqui abaixo o middleware é executado somente nessa requisição
// app.get("/projects", logRequests, (req, res) => {
app.get("/projects", (req, res) => {
  // console.log("3");
  const { title, owner } = req.query;

  const results = title
    ? theProjects.filter((proj) => proj.title.includes(title))
    : theProjects;

  // console.log(title, owner);

  return res.json(results);
}); //MÉTODO GET

//------------------------------------------

app.post("/projects", (req, res) => {
  const { title, owner } = req.body;

  const project = { id: uuidv4(), title, owner };

  theProjects.push(project);

  return res.json(project);
});

//------------------------------------------

app.put("/projects/:id", (req, res) => {
  const { id } = req.params;
  const { title, owner } = req.body;

  const theProjectsIndex = theProjects.findIndex((project) => project.id == id);

  if (theProjectsIndex < 0) {
    return res.status(400).json({ error: "Project not found." });
  }

  const projectX = {
    id,
    title,
    owner,
  };

  theProjects[theProjectsIndex] = projectX;

  return res.json(projectX);
});

//------------------------------------------

app.delete("/projects/:id", (req, res) => {
  const { id } = req.params;

  const theProjectsIndex = theProjects.findIndex((project) => project.id == id);

  if (theProjectsIndex < 0) {
    return res.status(400).json({ error: "Project not found." });
  }

  theProjects.splice(theProjectsIndex, 1);

  return res.status(204).send();
});

//------------------------------------------

app.listen(3333, () => {
  console.log("🚀Back-end started!");
});
