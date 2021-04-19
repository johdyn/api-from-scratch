const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const course = require("./models/course");
const student = require("./models/student");

const app = express();


app.use(express.json());
app.use(cors());


app.get("/courses", (req, res) => {
  course.find().then(posts => {
    res.status(200);
    res.json(posts);
  }).catch(error => {
    res.status(500);
    res.json({
      error: `Internal ServerError: ${error}`,
    });
});
});


app.get("/courses/:courseId", (req, res) => {
  let { courseId } = req.params;
   course.findById(courseId).then(foundPost => {
    res.json(foundPost);
     res.status(200);
     })
     .catch((error) => {
   res.status(500);
   res.json({
     error: "Internal server error",
   });      
     });
 });

 app.get("/courses/:courseId/students", (req, res) => {
  let { courseId } = req.params;
   student.find({ course: courseId }).then(foundPost => {
     res.json(foundPost);
     res.status(200);
     })
     .catch((error) => {
   res.status(500);
   res.json({
     error: "Internal server error",
   });      
     });
 });

 app.get("/courses/:courseId/students/:studentId", (req, res) => {
  let { courseId } = req.params;
  let { studentId } = req.params;
   student.find({ course: courseId, _id: studentId }).then(foundPost => {
     res.json(foundPost);
     res.status(200);
     })
     .catch((error) => {
   res.status(500);
   res.json({
     error: "Internal server error",
   });      
     });
 });

 app.get("/students", (req, res) => {
  student.find().then(posts => {
    res.status(200);
    res.json(posts);
  }).catch(error => {
    res.status(500);
    res.json({
      error: `Internal ServerError: ${error}`,
    });
});
});


app.post("/courses", (req, res) => {
  let courseLocation = req.body.location;
   if (courseLocation.length < 1) {
    courseLocation = "remote"; 
  } 
  
  const name = req.body.name;
  const type = req.body.type;

  course.create({ name: name, type: type, location: courseLocation }).then(newCourse => {
    res.status(200);
    res.json(newCourse);
  }).catch((error) => {
    res.status(500);
    res.json({
      error: "Internal server error",
    });

});
});

app.post("/students", (req, res) => {
  student.create(req.body).then(newPost => {
    res.status(200);
    res.json(newPost);
  }).catch((error) => {
    res.status(500);
    res.json({
      error: "Internal server error",
    });

});
});



app.post("/courses/:courseId/students", (req, res) => {
const { courseId } = req.params;
const firstName = req.body.firstName;
const lastName = req.body.lastName;
  student.create({firstName: firstName, lastName: lastName, course: courseId}).then(newStudent => {
    res.status(200);
    res.json(newStudent);
  }).catch((error) => {
    res.status(500);
    res.json({
      error: "Internal server error",
    });

});
});

app.patch("/courses/:courseId", (req, res) => {
  const { courseId } = req.params;
  let newLocation = req.body.location;
  let newName = req.body.name;
  let newType = req.body.type;


  if (newLocation.length < 1 || newName.length < 1 || newType.length < 1) {
  course.findById(courseId).then(foundPost => {
      res.json(foundPost);
       res.status(200);
       })
       .catch((error) => {
     res.status(500);
     res.json({
       error: "Internal server error",
     });      
       });
      } else {
  
  course.findByIdAndUpdate(courseId, { name: newName, type: newType, location: newLocation }, { new: true}).then(newPost => {
    res.status(200);
    res.json(newPost);
  }).catch((error) => {
    res.status(500);
    res.json({
      error: "Internal server error",
    });

});
}
});


app.patch("/students/:studentId", (req, res) => {
  let { studentId } = req.params;
  const newFirstName = req.body.firstName;
  const newLastName = req.body.lastName;
  const newCourseId = req.body.course;

  if (newFirstName.length < 1 || newLastName.length < 1 || newCourseId.length < 1)
  {
  student.findById(studentId).then(foundPost => {
    res.json(foundPost);
     res.status(200);
     })
     .catch((error) => {
   res.status(500);
   res.json({
     error: "Internal server error",
   });      
     });
    }
     else { 
       student.findByIdAndUpdate(studentId, { firstName: newFirstName, lastname: newLastName, course: newCourseId }, { new: true}).then(newPost => {
        res.status(200);
        res.json(newPost);
      }).catch((error) => {
        res.status(500);
        res.json({
          error: "Internal server error",
        });
    
      });
    }
    
  });


app.delete("/courses/:courseId", (req, res) => {
  let { courseId } = req.params;
   course.findByIdAndDelete(courseId).then(foundPost => {
     res.json(foundPost);
     res.status(200);
     })
     .catch((error) => {
   res.status(500);
   res.json({
     error: "Internal server error",
   });      
     });
 });

 app.delete("/students/:studentId", (req, res) => {
  let { studentId } = req.params;
   student.findByIdAndDelete(studentId).then(foundPost => {
    console.log(foundPost);
    res.json(foundPost);
    res.status(200);
    
    
     })
     .catch((error) => {
   res.status(500);
   res.json({
     error: "Internal server error",
   });      
     });
 });

mongoose.connect("mongodb://localhost/exercise", {useNewUrlParser: true, useUnifiedTopology: true});

const mongodb = mongoose.connection;

mongodb.on("open", () => {
app.listen(4000, () => {
  console.log("Listening on http://localhost:4000");
});
});
