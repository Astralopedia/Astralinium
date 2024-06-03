'use client'

import { searchParams } from '@/app/gallery/searchParams'
import { Search } from 'lucide-react'
import { useQueryState } from 'nuqs'

export default function Toolbar() {
	const [searchQuery, setSearchQuery] = useQueryState(
		'q',
		searchParams.q.withOptions({
			shallow: false,
		}),
	)
	const [sortBy, setSortBy] = useQueryState(
		's',
		searchParams.s.withOptions({
			shallow: false,
		}),
	)
	const [showPerPage, setShowPerPage] = useQueryState(
		'pp',
		searchParams.pp.withOptions({
			shallow: false,
		}),
	)

	return (
		<div className='grid gap-3 bg-base-200 place-items-center grid-cols-2 md:grid-cols-3 w-11/12 mx-auto mt-6 rounded-2xl p-6'>
			<label className='input input-bordered flex items-center col-span-2 md:col-span-1 w-full'>
				<Search />
				<input
					type='text'
					className='grow'
					placeholder='Search files...'
					onChange={e => setSearchQuery(e.target.value)}
					defaultValue={searchQuery}
				/>
			</label>
			<div className='inline-flex items-center col-span-2 sm:col-span-1 w-full'>
				<p className='text-nowrap mx-3'>Sort by</p>
				<select
					className='select select-bordered w-full'
					onChange={e => setSortBy(e.target.value as SortByType)}
					defaultValue={sortBy}>
					<option value={'relevance'}>Relevance</option>
					<option value={'newest'}>Recently uploaded</option>
				</select>
			</div>
			<div className='inline-flex items-center col-span-2 sm:col-span-1 w-full'>
				<p className='text-nowrap mx-3'>Show per page</p>
				<select
					className='select select-bordered w-full'
					onChange={e =>
						setShowPerPage(e.target.value as ShowPerPageType)
					}
					defaultValue={showPerPage}>
					<option value='5'>5</option>
					<option value='10'>10</option>
					<option value='15'>15</option>
					<option value='20'>20</option>
					<option value='50'>50</option>
					<option value='100'>100</option>
				</select>
			</div>
		</div>
	)
}

export type ShowPerPageType = '5' | '10' | '15' | '20' | '50' | '100'
export type SortByType = 'relevance' | 'newest'
