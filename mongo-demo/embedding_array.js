const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB...", err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model("Author", authorSchema);

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({ name: String, authors: [authorSchema] })
);

async function createCourse(name, authors) {
  const course = new Course({ name, authors });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(courseId) {
  await Course.update(
    {
      _id: courseId
    },
    {
      $set: {
        "author.name": "mohamed"
      }
    }
  );
  //   course.author.name = "galala";   course.save();
}

async function addAuthor(courseId, author) {
  const course = await Course.findById(courseId);
  course.authors.push(author);
  course.save();
}

async function removeAuthor(courseId, authorId) {
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId);
  author.remove();
  course.save();
}

// createCourse("Node Course", [
//   new Author({ name: "Mosh" }),
//   new Author({ name: "galala" })
// ]);
// updateAuthor('5b810babb1b91157b4df0f1c');
// addAuthor("5b810e9720053f0530816604", new Author({ name: "mohamed" }));
removeAuthor("5b810e9720053f0530816604", "5b810f99a1fd280e741f9c47");
