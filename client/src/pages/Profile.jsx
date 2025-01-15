import React, { useEffect, useRef, useState } from "react";

const Profile = () => {
  return (
    <div className="max-w-[600px] mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">Update</h1>

      <form className="flex flex-col gap-4">
        <input className="input-box" type="text" placeholder="username" />
        <input className="input-box" type="email" placeholder="email" />

        <button type="submit" className="button-primary">
          Update
        </button>
      </form>
    </div>
  );
};

export default Profile;
