"use client";

import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

const HomeView = () => {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.hello.queryOptions({ text: "Siddhartha" }));

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {data?.greeting}
    </div>
  );
};

export default HomeView;
