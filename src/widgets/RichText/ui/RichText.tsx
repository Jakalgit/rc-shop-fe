import React from "react";

interface RichTextProps {
	text: string;
}

export const RichText: React.FC<RichTextProps> = ({ text }) => {
	const parts = text.split(/<br\s*\/?>/i);

	return (
		<>
			{parts.map((part, i) => (
				<React.Fragment key={i}>
					{parseStrong(part)}
					{i < parts.length - 1 && <br />}
				</React.Fragment>
			))}
		</>
	);
};

function parseStrong(text: string) {
	const regex = /<strong>(.*?)<\/strong>/gi;
	const result = [];
	let lastIndex = 0;
	let match;
	let key = 0;

	while ((match = regex.exec(text)) !== null) {
		if (match.index > lastIndex) {
			result.push(text.substring(lastIndex, match.index));
		}
		result.push(<strong key={key++}>{match[1]}</strong>);
		lastIndex = regex.lastIndex;
	}

	if (lastIndex < text.length) {
		result.push(text.substring(lastIndex));
	}

	return result;
}
