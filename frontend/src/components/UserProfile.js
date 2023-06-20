import React, { useState, useEffect } from "react";
import userApi from "../api/userApi";

const UserProfile = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const fetchedUser = await userApi.getUserProfile();
      setUser(fetchedUser);
    };
    fetchUser();
  }, []);

  return (
    <div className="user-profile-container">
      <h2>User Profile</h2>
      <table className="table">
        <tbody>
          <tr>
            <th scope="row">Username</th>
            <td>{user.username}</td>
          </tr>
          <tr>
            <th scope="row">Email</th>
            <td>{user.email}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UserProfile;
