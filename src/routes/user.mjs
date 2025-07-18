import { Router } from "express";
import User from "../model/user.mjs";

const userRouter = Router(); // Execution of userRouter

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

export default userRouter;
