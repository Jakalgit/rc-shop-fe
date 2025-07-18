import {useEffect} from "react";

export function usePreloadImagesWithCallback(urls: string[], onLoad?: () => void) {
	useEffect(() => {
		let loaded = 0;

		urls.forEach((url) => {
			const img = new Image();
			img.src = url;
			img.onload = img.onerror = () => {
				loaded++;
				if (loaded === urls.length && onLoad) {
					onLoad();
				}
			};
		});
	}, [urls, onLoad]);
}