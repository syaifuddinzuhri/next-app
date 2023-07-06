import { url } from "@/constant/url";
import { useMutation, useQuery } from "react-query";
import api from "../api";
const querystring = require('querystring');

type useUserListParams = {
    params?: DatatableDefault.params,
}
const useGetUsersAll = (props?: useUserListParams) => useQuery(['GetUsersAll', props], () => {
    const data = querystring.stringify(props?.params);
    return api.get(url.user.prefix + '?' + data)
})

const useCreateUser = () => useMutation((body) => {
    return api.post(url.user.prefix, body, { headers: { 'content-type': 'multipart/form-data' } })
})

const useUpdateUser = (id: number) => useMutation((body) => {
    return api.post(`${url.user.prefix}/${id}?_method=PUT`, body, { headers: { 'content-type': 'multipart/form-data' } })
})

const useDeleteUser = () => useMutation((id: number) => {
    return api.delete(`${url.user.prefix}/${id}`)
})

const useDetailUser = () => useMutation((id: number) => {
    return api.get(`${url.user.prefix}/${id}`)
})

const useGetAllUser = () => useMutation(() => {
    return api.get(`${url.user.prefix}/${url.user.get_all}`)
})

export {
    useCreateUser, useDeleteUser, useDetailUser, useGetAllUser, useGetUsersAll,
    useUpdateUser
};

