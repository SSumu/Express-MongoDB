// There is a way to create a model.
// 1. First we have to create a schema. Schema is a pattern or flow of architecture. In here, Mongoose uses document. In SQL we about tables. In here, there it talks about documents. So in table in SQL matches to document in ODM(Object Document Mapping) in here.
// MongoDB is faster than SQL.

import { model, Schema, Types } from "mongoose";

// This is the schema. Schema contains objects.
const userSchema = new Schema( // There the new keyword must be there before the Schema. Because Schema is a class. So an object must be created. So the userSchema is the object.
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
    // There it must has a property to relate the two schemas. There it must has a property to connect these two schemas. If we want we can give ProfileId directly. But if we make this as the relation exist, there it should give the profile in user's side.
    profile: {
      // Options
      type: Types.ObjectId, // Here the ObjectId means id that automatically comes.
      ref: "Profile", // ref means to whom this reference has to. This reference has to Profile. This "Profile" name must equal to the name in schema. This "Profile" name must equal to the name "Profile" in profile.mjs which it is that included in "". ( const Profile = model("Profile", profileSchema); ). When user and profile are connected by one-to-one relation, ObjectId must be put to the type with putting ref(reference).
      // profile must be connected to the user. But id in the profile must be connected. That is why ObjectId is also in here. But profile is not required because user may or may not has a profile. So only the reference is here.
      unique: true, // Only one profile can be existed for one user.
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

// There is a One-to-One connection between userSchema and profileSchema.
// As this is a fact that related to the user, we can make this in here. If we want, we can take this seperately.

// const profileSchema = new Schema({
//   // We have to write what we expect put in the collections. The data what we expect to pass.
//   image:{
//     required:true,
//     type:String
//   }
// },{
//   timestamps:true // This is for createAt, updateAt
// }) // There it passes an object inside of it.

// This profileSchema has to be moved to the profile.mjs in model folder as there is a default User in here.

// Now we have to relate these two Schemas.

const User = model("User", userSchema); // model(name: typically it is capitalized, schema). From here model(User) is created. Here the model name is User.

// model is the active part. That means active part in the mongoose is the model.

export default User;

// In here, we have to do this in two ways. But we can do this in one line. But in here it was done like this for our understanding. Profile connect to the User and User connect to the Profile. Both of them are joind using a reference. There is a one-to-one connection. In Profile side, there it necessarily has a User. But in User side, there it may or may not has a Profile.
