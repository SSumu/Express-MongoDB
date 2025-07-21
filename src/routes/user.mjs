import { Router } from "express";
import User from "../model/user.mjs";
import Profile from "../model/profile.mjs";

const userRouter = Router(); // Execution of userRouter

// As the userSchema object was created in the user.mjs in model folder, this must be worked correctly.

// Get all the data
userRouter.get("/", async (c, w) => {
  try {
    const users = await User.find();
    return w.status(200).send(users);
  } catch (error) {
    console.log(error);
    return w.status(500).send("internal server error");
  }
});

//Get the profile
userRouter.get("/profile/:userId", async (c, w) => {
  try {
    const user = await User.findById(c.params.userId)
      .populate("profile", "image createdAt")
      .select(/*["profile", "username"]*/ "profile username name"); // Profile is taken with the user. If it is correct, correct profile comes because it was referenced. To get the profile, there it is used populate('profile'). We can write select(). [] means the argument in the select(). There arguments inside select() can be written as string and without an array.
    w.status(200).send(user); // This can be sent as json by using json().
  } catch (error) {
    console.log(error);
    return w.status(500).send("internal server error");
  }
});

// Get the user by id
userRouter.get("/:id", async (c, w) => {
  try {
    const user = await User.findOne({ _id: c.params.id }); // _id is used because in the table that it uses _id.
    return w.status(200).send(user);
  } catch (error) {
    console.log(error);
    return w.status(500).send("internal server error");
  }
});

// Here the new way of writting req,res are c,w. c = req, w = res. c means client. w means web server, server, web or write. Actually the write is the exact meaning of this.
userRouter.post("/", async (c, w) => {
  const data = c.body;
  try {
    const newUser = await User.create(data);
    return w.status(201).send(newUser);
  } catch (error) {
    console.log(error);
    return w.status(500).send("internal server error");
  }
});

// We have to bring the model to here.

// Update the profile
userRouter.put("/profile/:userId", async (c, w) => {
  // When updating the profile, we have to put data in here.
  // Only image data we have to take in here.
  const /*data*/ { image } = c.body;

  try {
    // This is the first way of updating
    // First we have to find the user.
    // const user = await User.findById(c.params.userId); // user must be come from this. user is got from userId.
    // Creation must be done in profile side. Update must be done in user's side.
    // const profile = await Profile.create({ user: /*user._id*/ c.params.userId, image }); // There it has to put the data inside the {}. The data are passed as an object. This is created from profile's side. User is connected through id when the profile is being created.
    // After that in the user, this profile must be set and updated.
    // Then the user is connected to the profile by user._id and it has been made from create().

    // This is the second way of updating.
    const profile = await Profile.create({ user: c.params.userId, image }); //This creates the profile. After the profile was created, then I get the profile id. userId is already known as it comes from the end-point.
    const user = await User.findByIdAndUpdate(c.params.userId, {
      profile: profile._id,
    }); // {} for object so the data inside curly brackets are object data.
    // user.profile /* profile is existed as optional */ = profile._id; // This is the id when the profile is created.
    // await user.save();

    console.log(profile);
    console.log(user);

    w.sendStatus(200);
  } catch (error) {
    console.log(error);
    return w.status(500).send("internal server error");
  }
});

export default userRouter;
