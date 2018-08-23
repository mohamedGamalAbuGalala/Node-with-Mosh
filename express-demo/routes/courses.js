var express = require("express");
var router = express.Router();
const Joi = require("joi");

let courses = [
  {
    id: 1,
    name: "course1"
  },
  {
    id: 2,
    name: "course2"
  },
  {
    id: 3,
    name: "course3"
  },
  {
    id: 4,
    name: "course4"
  }
];

/* GET courses listing. */
router.get("/", (req, res, next) => {
  // getting courses
  res.send(courses);
});

router.get("/:id", (req, res, next) => {
  // check existence
  let course = courses.find(u => u.id === +req.params.id);
  if (!course)
    return res.status(404).send(`The course with the given ID wasn't found`);

  // getting single course
  res.send(course);
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
  const course = {
    id: courses.length + 1,
    name: req.body.name
  };

  courses.push(course);
  res.send(course);
});

router.put("/:id", (req, res) => {
  // check existence
  let course = courses.find(u => u.id === +req.params.id);
  if (!course)
    return res.status(404).send(`The course with the given ID wasn't found`);

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
  course.name = req.body.name;
  res.send(course);
});

router.delete("/:id", (req, res) => {
  // check existence
  let course = courses.find(u => u.id === +req.params.id);
  if (!course)
    return res.status(404).send(`The course with the given ID wasn't found`);

  // removing
  courses = courses.filter(c => c.id !== +req.params.id);
  res.send(course);
});

module.exports = router;

const validateCourse = course => {
  /**
   * for more info about schema validation, visit:
   * https://www.npmjs.com/package/joi
   */
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };
  return Joi.validate(course, schema);
};
