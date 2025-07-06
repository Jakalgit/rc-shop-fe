import {NextRequest, NextResponse} from 'next/server';
import {routing} from "@/i18n/routing";

export function middleware(request: NextRequest) {
	const {pathname} = request.nextUrl;

	// Проверяем, есть ли уже локаль в пути (например, /ru)
	const pathnameHasLocale = routing.locales.some((locale: string) =>
		pathname.startsWith(`/${locale}`)
	);
	if (pathnameHasLocale) return;

	// Получаем язык из заголовка Accept-Language
	let locale = request.headers.get('accept-language')?.split(',')[0].split('-')[0];

	if (!routing.locales.includes(locale!)) {
		locale = routing.defaultLocale; // Если язык не поддерживается, используем дефолтный
	}

	// Если язык = defaultLocale (ru), оставляем путь без изменений
	if (locale === routing.defaultLocale) {
		return NextResponse.next();
	}

	// Перенаправляем на нужную локаль
	return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
}

export const config = {
	matcher: '/((?!_next|api|favicon.ico).*)',
};