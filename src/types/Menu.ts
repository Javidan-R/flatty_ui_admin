import React from "react";

export interface Menu {
  name: string;
  icon: React.ReactElement; // More specific than 'any'
  url: string;
  subItems?: Menu[];
}
