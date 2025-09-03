import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import { useAxios } from "../../hooks/useAxios";
import type { User } from "../../types";

// ---------------- GET ALL USERS ----------------
const getUsers = async () => {
  const axios = useAxios();
  const { data } = await axios.get(`/users`);
  return data;
};

export const useGetUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(),
    placeholderData: keepPreviousData,
  });
};

// ---------------- GET USER BY ID ----------------
const getUserById = async (id: string) => {
  const axios = useAxios();
  const { data } = await axios.get(`/users/${id}`);
  return data;
};

export const useGetUser = (id: string) => {
  return useQuery({
    queryKey: ["users", id],
    queryFn: () => getUserById(id),
    enabled: !!id, // only fetch if id exists
  });
};

// ---------------- ADD USER ----------------
export const useAddUser = () => {
  const queryClient = useQueryClient();
  const axios = useAxios();
  return useMutation({
    mutationFn: (user: User) => axios.post("/users", user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

// ---------------- EDIT USER ----------------
export const useEditUser = () => {
  const queryClient = useQueryClient();
  const axios = useAxios();
  return useMutation({
    mutationFn: ({ id, user }: { id: string; user: User }) =>
      axios.put(`/users/${id}`, user),
    onSuccess: (_, variables) => {
      // Invalidate both the list and the single user
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["users", variables.id] });
    },
  });
};

// ---------------- DELETE USER ----------------
export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const axios = useAxios();
  return useMutation({
    mutationFn: (id: string) => axios.delete(`/users/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
