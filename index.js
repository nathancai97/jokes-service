const express = require("express");
const app = express();
const { Joke, Op } = require("./db");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/jokes", async (req, res, next) => {
  try {
    const { tags, content } = req.query;
    let where = {};

    if (tags) {
      where.tags = { [Op.like]: `%${tags}%` };
    }

    if (content) {
      where.joke = { [Op.like]: `%${content}%` };
    }

    const jokes = await Joke.findAll({ where });

    res.send(jokes);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

app.post("/jokes", async (req, res, next) => {
  try {
    const { joke, tags } = req.body;
    const newJoke = await Joke.create({ joke, tags });
    res.status(201).json(newJoke);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

app.delete("/jokes:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const joke = await Joke.findByPk(id);
    if (!joke) {
      const error = new Error("Joke not found");
      error.status = 404;
      throw error;
    }
    await joke.destroy();
    res.status(204).end();
  } catch (error) {
    console.error(error);
    next(error);
  }
});

app.put("/jokes/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const { joke, tags } = req.body;
    const foundJoke = await Joke.findByPk(id);
    if (!foundJoke) {
      const error = new Error("Joke not found");
      error.status = 404;
      throw error;
    }
    const updatedJoke = await foundJoke.update({ joke, tags });
    res.json(updatedJoke);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// we export the app, not listening in here, so that we can run tests
module.exports = app;
