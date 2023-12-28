import PageTitle from "@/components/page-title";
import React from "react";
import PropertiesForm from "../../_components/properties-form";
import prisma from "@/config/db";

interface Props {
  params: {
    id: string;
  };
}

async function EditPropertyPage({ params }: Props) {
  const property = await prisma.property.findUnique({
    where: {
      id: params.id,
    },
  });
  return (
    <div>
      <PageTitle title="Edit Property" />
      <PropertiesForm 
       initialValues={property}
       isEdit={true}
      />
    </div>
  );
}

export default EditPropertyPage;
