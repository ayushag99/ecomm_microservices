import mongoose from "mongoose";

// An interface to describe the properties
// required to create a new user

interface UserAttrs {
    email: string;
    password: string;
}

// An interface taht describes the properties
// that a User Model has
interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc;
}

// An interface taht describes the properties
// that a User Document has
interface UserDoc extends mongoose.Document {
    email: string;
    password: string;
}


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });


userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);


// // We are putting this buildUser so we can type check correctly
// const buildUser = (attrs: UserAttrs) => {
//     return new User(attrs)
// }

// export {User, buildUser};


export { User }