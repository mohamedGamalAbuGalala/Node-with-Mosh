const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => {
    console.log("connected to MongoDB...");
  })
  .catch(err => {
    console.log(("Couldn't connect to MongoDB", err));
  });

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255 /*,match:/pat/*/
  },
  category: {
    type: String,
    required: true,
    enum: ["web", "mobile", "network"],
    lowercase: true,
    // uppercase: true,
    trim: true
  },
  author: String,
  tags: {
    type: Array,
    validate: {
      isAsync: true,
      validator: function(v, callback) {
        setTimeout(() => {
          const result = v && v.length > 0;
          callback(result);
        }, 4000);
      },
      message: "A course should have at least one tag."
    }
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function() {
      // must be a function
      return this.isPublished;
    },
    min: 10,
    max: 200,
    get: v => Math.round(v),
    set: v => Math.round(v)
  }
});

const Course = mongoose.model("Course", courseSchema);

createCourseAsync();

async function createCourseAsync() {
  const course = new Course({
    name: "React",
    category: "Web",
    author: "Mosh",
    tags: ["react", "frontend"],
    isPublished: true,
    price: 22.8
  });
  try {
    // course.validate(err => {
    //   if (err) {
    //     // some error to user
    //   }
    // });
    const result = await course.save();
    console.log(result);
  } catch (ex) {
    for (const field in ex.errors) {
      const el = ex.errors[field];
      console.log(el.message);
    }
  }
}

// getCoursesAsync();

async function getCoursesAsync() {
  /**  comparison op
   * eq (equal)
   * ne (not equal)
   * gt (greater than)
   * gte (greater than ot equal to)
   * lt (less than)
   * lte (less than ot equal to)
   * in (in)
   * nin (not in)
   *
   */
  /** logical op
   *
   * or
   * and
   */
  const pageNumber = 2;
  const pageSize = 10;

  const courses = await Course.find({ author: "Mosh", isPublished: true })
    // comparison
    // .find({ price: { $gte: 10 } })
    // .find({ price: { $gte: 10, $lte: 20 } })
    // .find({ price: { $in: [10, 15, 20] } })
    // logical
    // .find()
    // .or([{author:'Mosh'},{isPublished:true}])
    // .and([{author:'Mosh'},{isPublished:true}])

    // starts with mosh
    // .find({ author: /^Mosh/ })

    // ends with Hamedani
    // .find({ author: /Hamedani$/i })

    // contains Mosh
    // .find({ author: /.*Mosh.*/i })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });
  // .count();
  console.log(courses);
}

async function updateCourseAsync_V1(id = "5b8039cc2cee906858bbf9b4") {
  const course = await Course.findById(id);
  if (!course) return;
  //   course.isPublished = true;
  //   course.author = "Another author";

  course.set({
    isPublished: true,
    author: "Another author"
  });

  const result = await course.save();
  console.log(result);
}

async function updateCourseAsync_V2(id = "5b8039cc2cee906858bbf9b4") {
  //   const result = await Course.update({_id:id},{
  //       $set:{
  //           author:'Mosh',
  //           isPublished:false
  //       }
  //   });
  //   console.log(result);

  const course = await Course.findByIdAndUpdate(
    id,
    {
      $set: {
        author: "Mosh",
        isPublished: false
      }
    },
    { new: true }
  );
  console.log(course);
}

// updateCourseAsync_V1();
// updateCourseAsync_V2();

async function deleteCourseAsync(id = "5b8039cc2cee906858bbf9b4") {
  //   const result = await Course.deleteOne({_id:id});
  //   console.log(result);

  const course = await Course.findByIdAndRemove(id);
  console.log(course);
}

// deleteCourseAsync();
