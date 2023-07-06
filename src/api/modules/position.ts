import { url } from "@/constant/url";
import { useMutation, useQuery } from "react-query";
import api from "../api";
const querystring = require('querystring');

type usePositionParamsReq = {
    params?: DatatableDefault.params,
}
const useGetPositionAll = (props?: usePositionParamsReq) => useQuery(['GetPositionAll', props], () => {
    const data = querystring.stringify(props?.params);
    return api.get(url.position.prefix + '?' + data)
})

const useCreatePosition = () => useMutation((body) => {
    return api.post(url.position.prefix, body)
})

const useUpdatePosition = (id: number) => useMutation((body) => {
    return api.put(`${url.position.prefix}/${id}`, body)
})

const useDeletePosition = () => useMutation((id: number) => {
    return api.delete(`${url.position.prefix}/${id}`)
})

const useDetailPosition = () => useMutation((id: number) => {
    return api.get(`${url.position.prefix}/${id}`)
})

const useGetAllPosition = () => useMutation(() => {
    return api.get(`${url.position.prefix}/${url.position.get_all}`)
})

export {
    useCreatePosition, useDeletePosition, useDetailPosition, useGetAllPosition, useGetPositionAll, useUpdatePosition
};

