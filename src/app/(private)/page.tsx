import Filters from "@/components/filters";
import Loader from "@/components/loader";
import { Suspense } from "react";
import PropertiesData from "./_components/properties-data";

export default async function Home({ searchParams }: { searchParams: any }) {
  const key = JSON.stringify(searchParams);
  return (
    <div>
      <Filters 
        searchParams={searchParams}
      />
      <Suspense fallback={<Loader />} key={key}>
        <PropertiesData 
          searchParams={searchParams}
        />
      </Suspense>
    </div>
  );
}
