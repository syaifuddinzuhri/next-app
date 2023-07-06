import { url } from "@/constant/url";
import { useMutation, useQuery } from "react-query";
import api from "../api";
const querystring = require('querystring');

type useGroupParamsReq = {
    params?: DatatableDefault.params,
}
const useGetGroupAll = (props?: useGroupParamsReq) => useQuery(['GetGroupAll', props], () => {
    const data = querystring.stringify(props?.params);
    return api.get(url.group.prefix + '?' + data)
})

const useCreateGroup = () => useMutation((body) => {
    return api.post(url.group.prefix, body)
})

const useUpdateGroup = (id: number) => useMutation((body) => {
    return api.put(`${url.group.prefix}/${id}`, body)
})

const useDeleteGroup = () => useMutation((id: number) => {
    return api.delete(`${url.group.prefix}/${id}`)
})

const useDetailGroup = () => useMutation((id: number) => {
    return api.get(`${url.group.prefix}/${id}`)
})

const useGetAllGroup = () => useMutation(() => {
    return api.get(`${url.group.prefix}/${url.group.get_all}`)
})

export {
    useCreateGroup, useDeleteGroup, useDetailGroup, useGetAllGroup, useGetGroupAll, useUpdateGroup
};

