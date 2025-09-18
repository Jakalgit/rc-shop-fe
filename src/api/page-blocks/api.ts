import {$host} from "@/api";
import {PageBlockResponse, PageEnum} from "@/api/page-blocks/types";

export const getPageBlocks = async (pageType: PageEnum): Promise<PageBlockResponse[]> => {
	const {data} = await $host.get(`/page-block/${pageType}`);
	return data;
}