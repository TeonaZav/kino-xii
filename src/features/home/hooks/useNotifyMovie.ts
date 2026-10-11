import { notifyMovie } from "@/src/lib/api/movies";
import { useMutation } from "@tanstack/react-query";


export const useNotifyMovie = () => {
  return useMutation({
    mutationFn: notifyMovie,
  });
};
