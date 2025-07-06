import {$host} from "@/api";
import {RepairServiceResponse} from "@/api/repair-service/types";

export const getRepairServices = async (): Promise<RepairServiceResponse[]> => {
	const {data} = await $host.get('/repair-service');
	return data;
}