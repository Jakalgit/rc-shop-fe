import React from 'react';

const TelegramIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({ ...rest }) => {
	return (
		<svg
			viewBox="0 0 40 40"
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
			{...rest}
		>
			<rect width="40" height="40" rx="20" fill="#0088CC"/>
			<rect x="7" y="7" width="25" height="25" fill="url(#pattern0_215_5)"/>
			<defs>
				<pattern id="pattern0_215_5" patternContentUnits="objectBoundingBox" width="1" height="1">
					<use xlinkHref="#image0_215_5" transform="scale(0.0111111)"/>
				</pattern>
				<image id="image0_215_5" width="90" height="90" preserveAspectRatio="none"
							 xlinkHref="data:image/png;base64,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"/>
			</defs>
		</svg>

	);
};

export default TelegramIcon;