"use client";

import * as React from "react";

const Badge = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="px-1.5 py-1 bg-blue-100 rounded-lg text-xs text-gray-600">
      {children}
    </div>
  );
};

export default Badge;
