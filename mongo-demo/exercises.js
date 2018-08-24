const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/mongo-exercises");

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: {
    type: Date,
    default: Date.now
  },
  isPublished: Boolean,
  price: Number
});

const Course = mongoose.model("Course", courseSchema);

// getCoursesAsync();
// getCoursesAsync2();
getCoursesAsync3();

async function getCoursesAsync() {
  const courses = await Course.find({
    isPublished: true,
    tags: "backend"
  })
    .sort({ name: 1 })
    .select({ name: 1, author: 1 });
  console.log(courses);
}

async function getCoursesAsync2() {
  const courses = await Course.find({
    isPublished: true,
    tags: { $in: ["backend", "frontend"] }
  })
    .sort({ price: -1 })
    .select({ name: 1, author: 1, price: 1 });
  console.log(courses);
}

async function getCoursesAsync3() {
  const courses = await Course.find({ isPublished: true })
    .or([{ name: /.*by.*/i }, { price: { $gte: 15 } }])
    .sort({ price: -1 })
    .select({ name: 1, author: 1, price: 1 });
  console.log(courses);
}
