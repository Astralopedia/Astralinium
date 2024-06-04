import { getImages } from '@/actions/api/Bunny'
import CardContainer from '@/components/CardContainer'
import Pagination from '@/components/Pagination'
import Toolbar from '@/components/Toolbar'
import { DateTime } from 'luxon'
import { SearchParams } from 'nuqs/parsers'
import { Suspense } from 'react'
import Loading from './loading'
import { searchParamsCache } from './searchParams'

interface PageProps {
	searchParams: SearchParams
}

export default async function Gallery({ searchParams }: PageProps) {
	searchParamsCache.parse(searchParams)

	const { p, pp, q, s } = searchParamsCache.all()
	const cardPerPage = pp
	const currentPage = p

	const data = await getImages()

	const indexOfLastCard = currentPage * Number(cardPerPage)
	const indexOfFirstCard = indexOfLastCard - Number(cardPerPage)
	const cards = data.slice(indexOfFirstCard, indexOfLastCard)
	const maxPages = Math.ceil(data.length / Number(cardPerPage))

	if (s === 'newest') {
		cards.sort((a, b) => {
			const datetimeA = DateTime.fromISO(a.datetime)
			const datetimeB = DateTime.fromISO(b.datetime)
			return datetimeB.diff(datetimeA).milliseconds
		})
	}

	return (
		<div className='min-h-screen w-full'>
			<div className='mt-6 w-full'>
				<p className='text-5xl font-semibold text-center'>Gallery</p>
				<p className='text-2xl font-light text-center'>
					Discover awesome pictures uploaded by players
				</p>
				<Toolbar />
				<Pagination maxPages={maxPages} />
				<Suspense fallback={<Loading />}>
					<CardContainer images={cards} search={q} />
				</Suspense>
				<Pagination maxPages={maxPages} />
			</div>
			<div className=''></div>
		</div>
	)
}
