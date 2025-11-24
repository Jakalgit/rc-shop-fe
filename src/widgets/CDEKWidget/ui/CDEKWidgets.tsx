'use client';

import React, {useEffect, useCallback} from 'react';
import {CdekOfficeAddressType, CdekDeliveryEnum, CdekTariffCode, CdekDoorAddressType} from "../model/types";

export interface CDEKWidgetType {
	open: () => void; // Method to open the widget
}

interface CdekWidgetProps {
	goods: {width: number, height: number, length: number, weight: number}[];
	onChoosePointAction: (delivery: CdekDeliveryEnum, rate: CdekTariffCode, address: CdekOfficeAddressType | CdekDoorAddressType) => void;
	onReady?: () => void;
	widget: React.RefObject<CDEKWidgetType | null>;
}

export const CdekWidget: React.FC<CdekWidgetProps> = ({ goods, onChoosePointAction, onReady, widget }) => {
	// Function to log errors
	const logError = (message: string, error: any) => {
		console.error(message, error);
	};

	// Function to initialize the CDEK widget
	const initializeWidget = useCallback(() => {
		if ((window as any).CDEKWidget) {
			try {
				widget.current = new (window as any).CDEKWidget(getWidgetConfig());
			} catch (error) {
				logError('Error initializing CDEK Widget:', error);
			}
		} else {
			logError('CDEK Widget is not available', null);
		}
	}, []);

	// Widget configuration
	const getWidgetConfig = () => ({
		from: {
			country_code: 'RU',
			city: 'Москва',
			postal_code: 105082,
			code: 44,
			address: 'Спартаковская площадь, 10с12',
		},
		apiKey: process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY, // API key for Yandex Maps
		canChoose: true, // Ability to choose the pickup point
		servicePath: process.env.NEXT_PUBLIC_CDEK_PHP_URL, // Path to the PHP file
		hideFilters: {
			have_cashless: false, // Control visibility of the "Cashless Payment" filter
			have_cash: false, // Control visibility of the "Cash Payment" filter
			is_dressing_room: false, // Control visibility of the "Dressing Room Available" filter
			type: false, // Display the "Pickup Point Type" filter
		},
		debug: true, // Enable debug information output
		defaultLocation: 'Москва', // Default address
		lang: 'rus', // Widget language
		hideDeliveryOptions: {
			office: false, // Ability to choose delivery to the pickup point
			door: false, // Hide delivery to the door
		},
		goods,
		currency: 'RUB',
		tariffs: {
			office: [136, 234, 291],
			door: [137, 233, 294],
			pickup: [368, 378]
		},
		popup: true, // Open the widget in a modal window

		// Function called after the widget finishes loading
		onReady,
		// Function called after the customer selects a pickup point
		onChoose: onChoosePointAction,
	});

	useEffect(() => {
		if (document.readyState === 'complete') {
			initializeWidget();
		} else {
			window.addEventListener('load', initializeWidget);
		}

		return () => {
			window.removeEventListener('load', initializeWidget);
		};
	}, [initializeWidget]);

	return null;
};