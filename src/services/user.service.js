import User from '../config/fireStore';
import userModel from '../models/user.model';

//create new user
export const newUser = async (id, fullName, emailId, passWord) => {
  try {
    const user = userModel.createUser(id, fullName, emailId, passWord);
    const data = await User.add(user.toFirestore());
    //formating the response in proper way
    const docSnapshot = await data.get();
    const addedUser = userModel.getUserFromFirestore(docSnapshot);
    return addedUser;
  } catch (error) {
    throw new Error('User not created/added to the firestore database');
  }
};

