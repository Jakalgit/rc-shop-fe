import React from 'react';
import styles from "@/styles/components/MapWidget.module.css";

const MapWidget = () => {
	return (
		<div className={styles.widget} style={{position: 'relative', overflow: 'hidden'}}>
			<a
			href="https://yandex.ru/maps/213/moscow/?utm_medium=mapframe&utm_source=maps"
			style={{color: "#eee", fontSize: 12, position: 'absolute', top: 0}}>
				Москва
			</a>
			<a
			href="https://yandex.ru/maps/213/moscow/house/spartakovskaya_ploshchad_10s12/Z04YcABnT0MGQFtvfXt2dn9nZw==/?ll=37.677946%2C55.777347&utm_medium=mapframe&utm_source=maps&z=19.46"
			style={{color: "#eee", fontSize: 12, position: 'absolute', top: 14}}>
				Спартаковская площадь, 10с12 — Яндекс Карты
			</a>
			<iframe
				className={styles.iframe}
				src="https://yandex.ru/map-widget/v1/?ll=37.677946%2C55.777347&mode=whatshere&whatshere%5Bpoint%5D=37.677465%2C55.777342&whatshere%5Bzoom%5D=17&z=19.46"
				frameBorder="1" style={{position: 'relative'}}></iframe>
		</div>
	);
};

export default MapWidget;