import React from "react";
import { SignOut } from "../assets/icons/SignOut";
import { HouseLine } from "../assets/icons/HouseLine";
import { Users } from "../assets/icons/Users";
import { Settings } from "../assets/icons/Settings";
import { Menu } from "../types/Menu";

const menuItems: Menu[] = [
  {
    name: "Agents",
    icon: React.createElement(Users, {
      title: "Users icon",
      "aria-label": "Users",
    }),
    url: "/agents",
  },
  {
    name: "Posts",
    icon: React.createElement(HouseLine, {
      title: "Posts icon",
      "aria-label": "Posts",
    }),
    url: "/posts",
  },
  {
    name: "Settings",
    icon: React.createElement(Settings, {
      title: "Settings icon",
      "aria-label": "Settings",
    }),
    url: "/settings",
  },
  {
    name: "Sign out",
    icon: React.createElement(SignOut, {
      title: "Sign out icon",
      "aria-label": "Sign out",
    }),
    url: "/logout",
  },
];

export default menuItems;
