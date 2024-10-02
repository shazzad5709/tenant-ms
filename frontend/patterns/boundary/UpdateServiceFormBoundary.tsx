import { useState } from "react";

import ServiceForm from "@/components/forms/service/AddServiceForm";
import { ServiceFormData } from "./AddServiceFormBoundary";

type UpdateServiceFormBoundaryProps = {
  service: ServiceFormData;
  updateService: (data: ServiceFormData) => void;
};

export const UpdateServiceFormBoundary: React.FC<UpdateServiceFormBoundaryProps> = ({
  service,
  updateService,
}) => {
  const [data, setData] = useState<ServiceFormData>({ ...service });

  const handleSubmit = (event: any) => {
    event.preventDefault();
    updateService(data); // Passing data to control
  };

  return (
    <ServiceForm
      data={data}
      setData={setData}
      handleSubmit={handleSubmit}
      label="Update Service"
    />
  );
};