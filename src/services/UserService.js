import React from "react";
import {
  avatar1,
  avatar2,
  avatar3,
  avatar4,
  avatar5,
} from "../images/avatars";

  const avatarFetch = (avatarNumber) => {
    switch (avatarNumber) {
      case 1:
        return avatar1;
      case 2:
        return avatar2;
      case 3:
        return avatar3;
      case 4:
        return avatar4;
      case 5:
        return avatar5;
      default:
        return null;
    }
  };

  export {avatarFetch}