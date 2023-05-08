
import { Api } from "@/@shared";
import { API_HOST } from "@/common/const";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

export function useGetItem(params: { id: number | false }) {
	return useQuery(["paid", "etc", params.id], async () => {
		if (params.id === false) {
			return null;
		}
		const resp = await axios.get<Api.PaidByCashItemResponse>(
			`${API_HOST}/paid/${params.id}/etc`
		);
		return resp.data;
	});
}

export function useCreate() {
	const queryClient = useQueryClient();

	return useMutation(
		async (params: { data: Api.PaidByCashCreateRequest }) => {
			const resp = await axios.post(
				`${API_HOST}/paid/etc`,
				params.data
			);
			return resp.data;
		},
		{
			onSuccess: async () => {
				await queryClient.invalidateQueries(["paid", "etc"]);
			},
		}
	);
}

export function useUpdate() {
	const queryClient = useQueryClient();

	return useMutation(
		async (params: { data: Api.PaidByCashUpdateRequest; id: number }) => {
			const resp = await axios.put(
				`${API_HOST}/paid/${params.id}/etc`,
				params.data
			);
			return resp.data;
		},
		{
			onSuccess: async () => {
				await queryClient.invalidateQueries(["paid", "etc"]);
			},
		}
	);
}

export function useDelete() {
	const queryClient = useQueryClient();

	return useMutation(
		async (id: number) => {
			const resp = await axios.delete(`${API_HOST}/paid/${id}}/etc`);
			return resp.data;
		},
		{
			onSuccess: async () => {
				await queryClient.invalidateQueries(["paid", "etc"]);
			},
		}
	);
}


// ----------------------------------------------------------------------

export function useGetCollectedItem(params: { id: number | false }) {
	return useQuery(["collected", "etc", params.id], async () => {
		if (params.id === false) {
			return null;
		}
		const resp = await axios.get<Api.CollectedByCashItemResponse>(
			`${API_HOST}/collected/${params.id}/etc`
		);
		return resp.data;
	});
}

export function useCollectedCreate() {
	const queryClient = useQueryClient();

	return useMutation(
		async (params: { data: Api.CollectedByCashCreateRequest }) => {
			const resp = await axios.post(
				`${API_HOST}/collected/etc`,
				params.data
			);
			return resp.data;
		},
		{
			onSuccess: async () => {
				await queryClient.invalidateQueries(["collected", "etc"]);
			},
		}
	);
}

export function useCollectedUpdate() {
	const queryClient = useQueryClient();

	return useMutation(
		async (params: { data: Api.CollectedByCashUpdateRequest; id: number }) => {
			const resp = await axios.put(
				`${API_HOST}/collected/${params.id}/etc`,
				params.data
			);
			return resp.data;
		},
		{
			onSuccess: async () => {
				await queryClient.invalidateQueries(["collected", "etc"]);
			},
		}
	);
}

export function useCollectedDelete() {
	const queryClient = useQueryClient();

	return useMutation(
		async (id: number) => {
			const resp = await axios.delete(`${API_HOST}/collected/${id}}/etc`);
			return resp.data;
		},
		{
			onSuccess: async () => {
				await queryClient.invalidateQueries(["collected", "etc"]);
			},
		}
	);
}
