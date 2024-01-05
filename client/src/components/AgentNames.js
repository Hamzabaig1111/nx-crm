import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const GetAgentNamesDirect = () => {
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["agentsnamesData"],
    queryFn: () =>
      axios
        .get("https://crm-lms-sever.vercel.app/api/agents/getagentsnames", {
          withCredentials: true,
        })
        .then((res) => {
          return res.data;
        }),
  });
  const mycustemDatalist = data;
  return { mycustemDatalist };
};
