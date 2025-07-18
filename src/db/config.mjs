import { connect } from "mongoose";

const dbconnect = connect(process.env.MONGO_URL); // Options after process.env.MONGO_URL is not needed now. It was there in the previous versions. Because now by default those are there.

export default dbconnect;
