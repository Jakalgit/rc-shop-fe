import React from 'react';

const CheckIcon: React.FC<React.SVGProps<SVGSVGElement>> = React.memo(({ ...rest }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 -960 960 960"
			{...rest}
		>
			<path
				d="m382-388 321-321q19-19 45-19t45 19q19 19 19 45t-19 45L427-253q-19 19-45 19t-45-19L167-423q-19-19-19-45t19-45q19-19 45-19t45 19l125 125Z"/>
		</svg>
	);
});

export default CheckIcon;