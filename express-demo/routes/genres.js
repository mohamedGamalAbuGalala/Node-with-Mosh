var express = require("express");
var router = express.Router();
const Joi = require("joi");

let genres = [
  { id: 1, name: "Action" },
  { id: 2, name: "Horror" },
  { id: 3, name: "Romance" },
  { id: 4, name: "Science Fiction" }
];

/* GET genres listing. */
router.get("/", (req, res, next) => {
  // getting genres
  res.send(genres);
});

router.get("/:id", (req, res, next) => {
  // check existence
  let genre = genres.find(u => u.id === +req.params.id);
  if (!genre)
    return res.status(404).send(`The genre with the given ID wasn't found`);

  // getting single genre
  res.send(genre);
});

router.post("/", (req, res) => {
  // validate
  const { error } = validateCourse(req.body);
  if (error)
    return res.status(400).send(
      error.details.reduce((ret, el) => {
        ret.push({
          message: el.message.replace(/\"/g, ``),
          context: el.context.key
        });
        return ret;
      }, [])
    );

  // Adding
  const genre = {
    id: genres.length + 1,
    name: req.body.name
  };

  genres.push(genre);
  res.send(genre);
});

router.put("/:id", (req, res) => {
  // check existence
  let genre = genres.find(u => u.id === +req.params.id);
  if (!genre)
    return res.status(404).send(`The genre with the given ID wasn't found`);

  // validate
  const { error } = validateCourse(req.body);
  if (error)
    return res.status(400).send(
      error.details.reduce((ret, el) => {
        ret.push({
          message: el.message.replace(/\"/g, ``),
          context: el.context.key
        });
        return ret;
      }, [])
    );

  // updating
  genre.name = req.body.name;
  res.send(genre);
});

router.delete("/:id", (req, res) => {
  // check existence
  let genre = genres.find(u => u.id === +req.params.id);
  if (!genre)
    return res.status(404).send(`The genre with the given ID wasn't found`);

  // removing
  genres = genres.filter(c => c.id !== +req.params.id);
  res.send(genre);
});

module.exports = router;

const validateCourse = genre => {
  /**
   * for more info about schema validation, visit:
   * https://www.npmjs.com/package/joi
   */
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };
  return Joi.validate(genre, schema);
};
