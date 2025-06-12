import { User } from "../../models/User.js";

export const getByEmail = async (email) => {
  const user = await User.findOne(
    { email: email, status: "active" }
  ).lean(); // returns plain JS object, not Mongoose doc

  if (!user) return null;

  // Manually add `name` field like Sequelize CONCAT
  user.name = `${user.first_name} ${user.last_name}`;

  return user;
};