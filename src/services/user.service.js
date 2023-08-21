import User from '../config/fireStore';
import userModel from '../models/user.model';

//create new user
export const newUser = async (id, fullName, emailId, passWord) => {
  try {
    const user = userModel.createUser(id, fullName, emailId, passWord);
    const data = await User.add(user.toFirestore());

    //getting unformatted response from the firestore database
    const docSnapshot = await data.get();

    //passing that whole data into the function to filter out only required data.
    const addedUser = userModel.getUserFromFirestore(docSnapshot);
    return addedUser;
  } catch (error) {
    throw new Error('User not created/added to the firestore database');
  }
};

//service to get all user from the firestore database.
export const getAllUsers = async () => {
  const allData = await User.get();

  //assigning the id's of users with the perticular user and returning the result.
  const data = allData.docs.map((value) => ({ id: value.id, ...value.data() }));
  return data;
};

//Service to update an user details by using user id.
export const updateUserById = async (id, body) => {
  //searching for the document with id and updating with new data of body.
  await User.doc(id).update(body);

  //Fetching the whole data.
  const docSnapshot = await User.doc(id).get();

  //formating it for a proper response.
  const updatedUser = userModel.getUserFromFirestore(docSnapshot);
  return updatedUser;
};

//Service to delete an user with userId
export const deleteUserById = async (id) => {
  await User.doc(id).delete(); //delete user with Id
  return '';
};
