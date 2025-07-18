// There is a way to create a model.
// 1. First we have to create a schema. Schema is a pattern or flow of architecture. In here, Mongoose uses document. In SQL we about tables. In here, there it talks about documents. So in table in SQL matches to document in ODM(Object Document Mapping) in here.
// MongoDB is faster than SQL.

import { model, Schema } from "mongoose";

// This is the schema. Schema contains objects.
const userSchema = Schema(
  {
    // We have to write what we expect put in the collections. Those are objects.
    name: String,
    username: /*String*/ {
      // Options (Those are the configurations)
      type: String,
      unique: true,
      required: true,
    },
    password: String,
    email: /*String*/ {
      // Options (Those are the configurations)
      type: String,
      required: true,
    },
  },
  {
    // Options
    timestamps: true, // This puts the createAt updateAt automatically.
  }
);

// This is the Model. Model is created after the schema was created.
// Schema describes how the way model should be created. (like architecture of the model)
// Then we put the schema into the model. Then it becomes active.

const User = model("User", userSchema); // model(name: typically it is capitalized, schema). From here model(User) is created.

// model is the active part. That means active part in the mongoose is the model.

export default User;
