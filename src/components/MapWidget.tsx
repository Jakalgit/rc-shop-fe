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
				href="https://yandex.ru/maps/213/moscow/house/ogorodny_proyezd_9as1/Z04YcAdiQEYOQFtvfXRxeHRkYA==/?ll=37.603080%2C55.809917&utm_medium=mapframe&utm_source=maps&z=17.66"
				style={{color: "#eee", fontSize: 12, position: 'absolute', top: 14}}>
				Огородный проезд, 9Ас1 — Яндекс Карты
			</a>
			<iframe
				className={styles.iframe}
				src="https://yandex.ru/map-widget/v1/?ll=37.603080%2C55.809917&mode=search&ol=geo&ouri=ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgg1Njc2MDkwMxJD0KDQvtGB0YHQuNGPLCDQnNC-0YHQutCy0LAsINCe0LPQvtGA0L7QtNC90YvQuSDQv9GA0L7QtdC30LQsIDnQkNGBMSIKDWlpFkIVUD1fQg%2C%2C&z=17.66"
				frameBorder="1" style={{position: 'relative'}}></iframe>
		</div>
	);
};

export default MapWidget;