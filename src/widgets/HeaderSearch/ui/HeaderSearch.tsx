"use client";

import React, {useEffect, useId, useRef, useState} from "react";
import {AnimatePresence, motion, useAnimation, useReducedMotion} from "framer-motion";
import {useRouter} from "next/navigation";
import {Container} from "react-bootstrap";
import Cookies from "js-cookie";
import SearchIcon from "@/components/icons/SearchIcon";
import CloseIcon from "@/components/icons/CloseIcon";
import {formatPrice} from "@/functions/format";
import {getProducts} from "@/api/products/api";
import {ProductResponse} from "@/api/products/types";
import {ProductImage} from "@/components/product/ProductImage";
import styles from "./HeaderSearch.module.css";

const MIN_QUERY_LENGTH = 3;
const SUGGESTION_LIMIT = 10;
const SEARCH_DELAY_MS = 280;

const easeOut = [0.22, 1, 0.36, 1] as const;

type SearchStatus = "idle" | "loading" | "ready" | "error";

const Highlight: React.FC<{ text: string; query: string }> = ({ text, query }) => {
	const normalized = query.trim();
	if (!normalized) return <>{text}</>;

	const escaped = normalized.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
	const parts = text.split(new RegExp(`(${escaped})`, "ig"));

	return (
		<>
			{parts.map((part, index) => (
				part.toLowerCase() === normalized.toLowerCase()
					? <mark key={index}>{part}</mark>
					: <React.Fragment key={index}>{part}</React.Fragment>
			))}
		</>
	);
};

const ProductPhoto: React.FC<{ product: ProductResponse }> = ({ product }) => {
	const filename = product.images?.[0]?.filename;
	if (!filename) return null;

	return (
		<ProductImage
			src={`${process.env.NEXT_PUBLIC_CLOUD_URL}/${filename}`}
			alt={product.name}
			fill
			sizes="56px"
			className={styles.photoImg}
		/>
	);
};

export const HeaderSearch = () => {
	const router = useRouter();
	const reduceMotion = useReducedMotion();
	const controls = useAnimation();
	const listId = useId();
	const rootRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const listRef = useRef<HTMLDivElement>(null);
	const hintTimer = useRef<number | null>(null);
	const arrowUsed = useRef(false);

	const [query, setQuery] = useState("");
	const [open, setOpen] = useState(false);
	const [hint, setHint] = useState(false);
	const [activeIndex, setActiveIndex] = useState(0);
	const [suggestions, setSuggestions] = useState<ProductResponse[]>([]);
	const [status, setStatus] = useState<SearchStatus>("idle");

	const canSuggest = query.trim().length > MIN_QUERY_LENGTH;
	const menuOpen = open && canSuggest;

	useEffect(() => {
		controls.start({
			opacity: 1,
			y: 0,
			x: 0,
			transition: reduceMotion ? { duration: 0 } : { duration: 0.4, ease: easeOut },
		});
	}, [controls, reduceMotion]);

	useEffect(() => {
		const finder = new URLSearchParams(window.location.search).get("finder");
		if (finder) setQuery(finder);
	}, []);

	useEffect(() => {
		arrowUsed.current = false;
		setActiveIndex(0);
	}, [query]);

	useEffect(() => {
		const text = query.trim();
		if (text.length <= MIN_QUERY_LENGTH) {
			setSuggestions([]);
			setStatus("idle");
			return;
		}

		let cancelled = false;
		setStatus("loading");

		const timer = window.setTimeout(async () => {
			try {
				const data = await getProducts(
					{ finder: text, limit: SUGGESTION_LIMIT, page: 1 },
					Cookies.get("act") || "",
				);
				if (cancelled) return;
				setSuggestions((data.records ?? []).slice(0, SUGGESTION_LIMIT));
				setStatus("ready");
			} catch (error) {
				if (cancelled) return;
				console.error(error);
				setSuggestions([]);
				setStatus("error");
			}
		}, SEARCH_DELAY_MS);

		return () => {
			cancelled = true;
			window.clearTimeout(timer);
		};
	}, [query]);

	useEffect(() => {
		const onPointerDown = (event: PointerEvent) => {
			if (!rootRef.current?.contains(event.target as Node)) {
				setOpen(false);
			}
		};

		document.addEventListener("pointerdown", onPointerDown);
		return () => document.removeEventListener("pointerdown", onPointerDown);
	}, []);

	useEffect(() => {
		return () => {
			if (hintTimer.current) window.clearTimeout(hintTimer.current);
		};
	}, []);

	useEffect(() => {
		const root = listRef.current;
		const current = root?.querySelector<HTMLElement>("[data-active='true']");
		if (!root || !current) return;

		const rootRect = root.getBoundingClientRect();
		const itemRect = current.getBoundingClientRect();
		if (itemRect.top < rootRect.top) {
			root.scrollTop -= rootRect.top - itemRect.top;
		} else if (itemRect.bottom > rootRect.bottom) {
			root.scrollTop += itemRect.bottom - rootRect.bottom;
		}
	}, [activeIndex, suggestions]);

	const showHint = () => {
		setHint(true);
		if (hintTimer.current) window.clearTimeout(hintTimer.current);
		hintTimer.current = window.setTimeout(() => setHint(false), 1800);
	};

	const shake = async () => {
		if (reduceMotion) return;
		await controls.start({
			opacity: 1,
			y: 0,
			x: [0, -8, 8, -5, 5, 0],
			transition: { duration: 0.38 },
		});
	};

	const submitQuery = async (value: string) => {
		const text = value.trim();
		if (text.length <= MIN_QUERY_LENGTH) {
			showHint();
			await shake();
			inputRef.current?.focus();
			return;
		}

		setQuery(text);
		setOpen(false);
		setHint(false);
		router.push(`/catalog?finder=${encodeURIComponent(text)}`);
	};

	const openProduct = (article: string) => {
		setOpen(false);
		setHint(false);
		router.push(`/product/${encodeURIComponent(article)}`);
	};

	const onSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		void submitQuery(query);
	};

	const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.nativeEvent.isComposing) return;

		if (event.key === "ArrowDown" && canSuggest) {
			event.preventDefault();
			arrowUsed.current = true;
			setOpen(true);
			setActiveIndex((index) => {
				if (!menuOpen || suggestions.length === 0) return 0;
				return (index + 1) % suggestions.length;
			});
			return;
		}

		if (event.key === "ArrowUp" && canSuggest) {
			event.preventDefault();
			arrowUsed.current = true;
			setOpen(true);
			setActiveIndex((index) => {
				if (!menuOpen || suggestions.length === 0) return Math.max(suggestions.length - 1, 0);
				return (index - 1 + suggestions.length) % suggestions.length;
			});
			return;
		}

		if (event.key === "Enter" && menuOpen && arrowUsed.current && suggestions[activeIndex]) {
			event.preventDefault();
			openProduct(suggestions[activeIndex].article);
			return;
		}

		if (event.key === "Escape") {
			setOpen(false);
		}
	};

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const next = event.target.value;
		setQuery(next);
		setHint(false);
		setOpen(next.trim().length > MIN_QUERY_LENGTH);
	};

	const clear = () => {
		setQuery("");
		setOpen(false);
		setHint(false);
		inputRef.current?.focus();
	};

	const liveMessage = !menuOpen
		? ""
		: status === "loading" || status === "idle"
			? "Ищем товары"
			: status === "error"
				? "Не удалось загрузить товары"
				: suggestions.length
					? `Найдено предложений: ${suggestions.length}`
					: "Ничего не найдено";

	return (
		<div className={styles.band}>
			<Container>
				<div className={styles.anchor} ref={rootRef}>
					<motion.form
						className={styles.form}
						role="search"
						onSubmit={onSubmit}
						initial={reduceMotion ? false : { opacity: 0, y: 8 }}
						animate={controls}
					>
						<SearchIcon className={styles.searchIcon} />
						<input
							ref={inputRef}
							className={styles.input}
							value={query}
							onChange={onChange}
							onKeyDown={onKeyDown}
							onFocus={() => {
								if (query.trim().length > MIN_QUERY_LENGTH) setOpen(true);
							}}
							type="search"
							enterKeyHint="search"
							placeholder="Поиск товаров"
							aria-label="Поиск товаров"
							aria-autocomplete="list"
							aria-expanded={menuOpen}
							aria-controls={listId}
							aria-activedescendant={menuOpen && suggestions[activeIndex] ? `${listId}-${suggestions[activeIndex].id}` : undefined}
							autoComplete="off"
							autoCorrect="off"
							spellCheck={false}
						/>
						<AnimatePresence initial={false}>
							{query && (
								<motion.button
									key="clear"
									type="button"
									className={styles.clear}
									onClick={clear}
									aria-label="Очистить поиск"
									initial={reduceMotion ? false : { opacity: 0, scale: 0.7 }}
									animate={{ opacity: 1, scale: 1 }}
									exit={reduceMotion ? undefined : { opacity: 0, scale: 0.7 }}
									transition={{ duration: 0.16 }}
								>
									<CloseIcon />
								</motion.button>
							)}
						</AnimatePresence>
						<button className={styles.submit} type="submit" aria-label="Найти">
							<SearchIcon className={styles.submitIcon} />
							<span className={styles.submitText}>Найти</span>
						</button>
					</motion.form>

					<div className={styles.srOnly} aria-live="polite">
						{liveMessage}
					</div>

					<AnimatePresence>
						{hint && !menuOpen && (
							<motion.p
								key="hint"
								className={styles.hint}
								initial={reduceMotion ? false : { opacity: 0, y: -6 }}
								animate={{ opacity: 1, y: 0 }}
								exit={reduceMotion ? undefined : { opacity: 0, y: -4 }}
								transition={{ duration: 0.18 }}
							>
								Введите больше 3 символов
							</motion.p>
						)}
						{menuOpen && (
							<motion.div
								key="menu"
								id={listId}
								className={styles.menu}
								role="listbox"
								initial={reduceMotion ? false : { opacity: 0, y: -8, scale: 0.98 }}
								animate={{ opacity: 1, y: 0, scale: 1 }}
								exit={reduceMotion ? undefined : { opacity: 0, y: -6, scale: 0.98 }}
								transition={reduceMotion ? { duration: 0 } : { duration: 0.22, ease: easeOut }}
							>
								<div className={styles.menuScroll} ref={listRef}>
									{status === "ready" && suggestions.length > 0 ? (
										<ul className={styles.list}>
											<AnimatePresence initial={false}>
												{suggestions.map((product, index) => (
													<SuggestionRow
														key={product.id}
														id={`${listId}-${product.id}`}
														product={product}
														query={query}
														active={index === activeIndex}
														reduceMotion={!!reduceMotion}
														onHover={() => setActiveIndex(index)}
														onPick={() => openProduct(product.article)}
													/>
												))}
											</AnimatePresence>
										</ul>
									) : status === "error" ? (
										<div className={styles.empty}>
											<p>Не удалось загрузить товары</p>
											<span>Проверьте соединение и попробуйте ещё раз</span>
										</div>
									) : status === "ready" ? (
										<motion.div
											className={styles.empty}
											initial={reduceMotion ? false : { opacity: 0, y: 6 }}
											animate={{ opacity: 1, y: 0 }}
										>
											<span className={styles.emptyMark}>
												<SearchIcon />
											</span>
											<p>Ничего не найдено</p>
											<span>Попробуйте другое название или артикул</span>
										</motion.div>
									) : (
										<div className={styles.skeletons} aria-hidden="true">
											<span className={styles.skeleton} />
											<span className={styles.skeleton} />
											<span className={styles.skeleton} />
										</div>
									)}
								</div>
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</Container>
		</div>
	);
};

interface SuggestionRowProps {
	id: string;
	product: ProductResponse;
	query: string;
	active: boolean;
	reduceMotion: boolean;
	onHover: () => void;
	onPick: () => void;
}

const SuggestionRow: React.FC<SuggestionRowProps> = ({
	id,
	product,
	query,
	active,
	reduceMotion,
	onHover,
	onPick,
}) => {
	return (
		<motion.li
			initial={reduceMotion ? false : { opacity: 0, y: 8 }}
			animate={{ opacity: 1, y: 0 }}
			exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
			transition={{ duration: 0.18, ease: easeOut }}
		>
			<button
				id={id}
				type="button"
				role="option"
				aria-selected={active}
				data-active={active}
				className={`${styles.row} ${active ? styles.rowActive : ""}`}
				onMouseEnter={onHover}
				onClick={onPick}
			>
				<span className={styles.photo}>
					<ProductPhoto product={product} />
				</span>
				<span className={styles.name}>
					<Highlight text={product.name} query={query} />
				</span>
				<span className={styles.priceBlock}>
					<span className={styles.price}>{formatPrice(product.price, 2)}</span>
					<span className={styles.article}>{product.article}</span>
				</span>
			</button>
		</motion.li>
	);
};
