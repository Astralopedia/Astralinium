'use client'

import { searchParams } from '@/app/gallery/searchParams'
import cn from '@/utils/cn'
import { ChevronLeft, ChevronRight, Ellipsis } from 'lucide-react'
import { useQueryState } from 'nuqs'

interface PaginationProps {
	maxPages: number
}

export default function Pagination({ maxPages }: PaginationProps) {
	const [page, setPage] = useQueryState(
		'p',
		searchParams.p.withOptions({
			shallow: false,
		}),
	)

	return (
		<div className='w-full grid place-items-center my-2'>
			<div className='inline-flex justify-center items-center gap-3'>
				<button
					className={cn('btn rounded-2xl', {
						'btn-disabled': page === 1,
					})}
					onClick={() => setPage(Math.max(1, page - 1))}>
					<ChevronLeft />
				</button>
				<button
					className={cn('btn rounded-2xl', {
						'btn-active': page === 1,
					})}
					onClick={() => setPage(1)}>
					1
				</button>
				<button
					className={cn('btn rounded-2xl btn-disabled hidden ', {
						'md:block': !(page <= 2),
					})}>
					<Ellipsis className='text-base-content' />
				</button>
				<button
					className={cn('btn rounded-2xl hidden', {
						'md:block': !(page <= 2),
					})}
					onClick={() => {
						page === maxPages
							? setPage(page - 2)
							: setPage(page - 1)
					}}>
					{page === maxPages ? page - 2 : page - 1}
				</button>
				<button
					className={cn('btn rounded-2xl', {
						'btn-active': page !== 1 && page !== maxPages,
					})}
					onClick={() => {
						page === 1
							? setPage(page + 1)
							: page === maxPages
								? setPage(page - 1)
								: setPage(page)
					}}>
					{page === 1
						? page + 1
						: page === maxPages
							? page - 1
							: page}
				</button>
				<button
					className={cn('btn rounded-2xl hidden', {
						'md:block': !(page > maxPages - 2),
					})}
					onClick={() => {
						page === 1 ? setPage(page + 2) : setPage(page + 1)
					}}>
					{page === 1 ? page + 2 : page + 1}
				</button>
				<button
					className={cn('btn rounded-2xl btn-disabled hidden ', {
						'md:block': !(page > maxPages - 2),
					})}>
					<Ellipsis className='text-base-content' />
				</button>
				<button
					className={cn('btn rounded-2xl', {
						'btn-active': page === maxPages,
					})}
					onClick={() => setPage(maxPages)}>
					{maxPages}
				</button>
				<button
					className={cn('btn rounded-2xl', {
						'btn-disabled': page === maxPages,
					})}
					onClick={() => setPage(Math.min(maxPages, page + 1))}>
					<ChevronRight />
				</button>
			</div>
		</div>
	)
}
