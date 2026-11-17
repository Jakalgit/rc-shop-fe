"use client";

import React, {useEffect, useRef, useState} from "react";
import Image from "next/image";
import styles from "./ProductImage.module.css";

interface ProductImageProps {
	src: string;
	alt: string;
	width?: number;
	height?: number;
	fill?: boolean;
	sizes?: string;
	className?: string;
	frameClassName?: string;
	style?: React.CSSProperties;
	frameStyle?: React.CSSProperties;
	onClick?: () => void;
}

export const ProductImage: React.FC<ProductImageProps> = ({
	src,
	alt,
	width = 500,
	height = 500,
	fill = false,
	sizes,
	className,
	frameClassName,
	style,
	frameStyle,
	onClick,
}) => {
	const frameRef = useRef<HTMLSpanElement>(null);
	const [loaded, setLoaded] = useState(false);
	const [failed, setFailed] = useState(false);

	useEffect(() => {
		setFailed(false);
		const img = frameRef.current?.querySelector("img");
		if (img?.complete && img.naturalWidth > 0) {
			setLoaded(true);
			return;
		}
		setLoaded(false);
	}, [src]);

	const imageClassName = [
		styles.image,
		loaded ? styles.imageLoaded : "",
		className,
	].filter(Boolean).join(" ");

	return (
		<span
			ref={frameRef}
			className={[
				styles.frame,
				fill ? styles.frameFill : "",
				frameClassName,
			].filter(Boolean).join(" ")}
			style={frameStyle}
		>
			{!loaded && !failed && <span className={styles.shimmer} aria-hidden="true" />}
			{!failed && (
				<Image
					src={src}
					alt={alt}
					width={fill ? undefined : width}
					height={fill ? undefined : height}
					fill={fill}
					sizes={fill ? sizes : undefined}
					className={imageClassName}
					style={style}
					onClick={onClick}
					onLoad={() => setLoaded(true)}
					onError={() => {
						setFailed(true);
						setLoaded(true);
					}}
				/>
			)}
		</span>
	);
};

export const ProductImageCover: React.FC<{ className?: string }> = ({ className }) => (
	<span className={[styles.cover, className].filter(Boolean).join(" ")} aria-hidden="true" />
);
