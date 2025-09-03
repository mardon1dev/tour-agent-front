import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import { useAxios } from "../../hooks/useAxios";

// ---------------- GET ALL AVAILABLE PLACES ----------------
const getPlaces = async () => {
  const axios = useAxios();
  const { data } = await axios.get(`/places/all`);
  return data;
};

export const useGetPlaces = () => {
  return useQuery({
    queryKey: ["places"],
    queryFn: () => getPlaces(),
    placeholderData: keepPreviousData,
  });
};

// ---------------- GET SINGLE PLACE ----------------
const getPlaceById = async (id: string) => {
  const axios = useAxios();
  const { data } = await axios.get(`/places/${id}`);
  return data;
};

export const useGetPlace = (id: string) => {
  return useQuery({
    queryKey: ["places", id],
    queryFn: () => getPlaceById(id),
    enabled: !!id, // only fetch if id is provided
  });
};

// ---------------- ADD PLACE ----------------
export const useAddPlace = () => {
  const queryClient = useQueryClient();
  const axios = useAxios();
  return useMutation({
    mutationFn: (place: any) => axios.post("/places", place),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["places"] });
    },
  });
};

// ---------------- EDIT PLACE ----------------
export const useEditPlace = () => {
  const queryClient = useQueryClient();
  const axios = useAxios();
  return useMutation({
    mutationFn: ({ id, place }: { id: string; place: any }) =>
      axios.put(`/places/${id}`, place),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["places"] });
      queryClient.invalidateQueries({ queryKey: ["places", variables.id] });
    },
  });
};

// ---------------- DELETE PLACE ----------------
export const useDeletePlace = () => {
  const queryClient = useQueryClient();
  const axios = useAxios();
  return useMutation({
    mutationFn: (id: string) => axios.delete(`/places/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["places"] });
    },
  });
};

// ---------------- SEND TELEGRAM NOTIFICATION ----------------
export const useNotify = () => {
  const axios = useAxios();
  return useMutation({
    mutationFn: (message: string) =>
      axios.post("/sent-notification/notify", { message }),
  });
};
