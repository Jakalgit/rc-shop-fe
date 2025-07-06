import React from 'react';
import ProcessIcon from "@/components/icons/ProcessIcon";
import classNames from "classnames";

interface IProps {
	className?: string;
}

const Loading: React.FC<IProps> = ({className}) => {

	return (
		<ProcessIcon
			className={classNames('loadingRotate', className)}
		/>
	);
};

export default Loading;