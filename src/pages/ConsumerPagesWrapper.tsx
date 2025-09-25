import React, { useState } from "react";
import { ConsumerUpload } from "./ConsumerUpload";
import { ConsumerListings } from "./ConsumerListings";
import { mockComponents } from "@/data/mockData";

export const ConsumerPagesWrapper: React.FC<{ page: "upload" | "listings" }> = ({ page }) => {
  const [components, setComponents] = useState(mockComponents);

  const handleAddComponent = (newComponent: any) => {
    setComponents(prev => [newComponent, ...prev]);
  };

  if (page === "upload") {
    return <ConsumerUpload onAddComponent={handleAddComponent} />;
  }

  if (page === "listings") {
    return <ConsumerListings components={components} />;
  }

  return null;
};
