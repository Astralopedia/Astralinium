import {
	createSearchParamsCache,
	parseAsInteger,
	parseAsString,
	parseAsStringLiteral,
} from 'nuqs/server'

export const searchParams = {
	q: parseAsString.withDefault(''),
	s: parseAsStringLiteral(['relevance', 'newest'] as const).withDefault(
		'relevance',
	),
	p: parseAsInteger.withDefault(1),
	pp: parseAsStringLiteral(['5', '10', '15', '20', '50', '100']).withDefault(
		'10',
	),
}

export const searchParamsCache = createSearchParamsCache(searchParams)
