import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import { useAxios } from "../../hooks/useAxios";

const getStays = async (userId: string) => {
  const axios = useAxios();
  const { data } = await axios.get(`/stays/${userId}`);
  return data;
};

export const useGetStays = (userId: string) => {
  return useQuery({
    queryKey: ["stays", userId],
    queryFn: () => getStays(userId),
    placeholderData: keepPreviousData,
  });
};
