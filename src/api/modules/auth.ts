import { url } from "@/constant/url";
import { useMutation } from "react-query";
import api from "../api";

const useLoginUserMutation = () => useMutation((loginData: Auth.Login) => {
    return api.post(url.login, loginData)
})
const useMeUserMutation = () => useMutation(() => {
    return api.get(url.me)
})
const useLogoutUserMutation = () => useMutation(() => {
    return api.post(url.logout)
})

export {
    useLoginUserMutation, useLogoutUserMutation, useMeUserMutation
};
