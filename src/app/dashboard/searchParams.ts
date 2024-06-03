import { createSearchParamsCache, parseAsStringLiteral } from 'nuqs/server'

export const searchParams = {
	t: parseAsStringLiteral([
		'my-gallery',
		'upload-files',
		'appearance',
		'review-images',
	] as const).withDefault('my-gallery'),
}

export const searchParamsCache = createSearchParamsCache(searchParams)
