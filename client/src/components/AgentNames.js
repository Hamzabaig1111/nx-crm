import { useQuery } from "@tanstack/react-query";
import { axios } from "../components/BaseURL";

export const GetAgentNamesDirect = () => {
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["agentsnamesData"],
    queryFn: () =>
      axios
        .get("/agents/getagentsnames", {
          withCredentials: true,
        })
        .then((res) => {
          return res.data;
        }),
  });
  const mycustemDatalist = data;
  return { mycustemDatalist };
};
