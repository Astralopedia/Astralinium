'use client'

import { useTheme } from 'next-themes'

export default function Appearance() {
	const { theme, setTheme } = useTheme()

	return (
		<div className='w-full max-w-6xl h-full py-16'>
			<div className='bg-base-300 rounded-2xl p-6'>
				<p className='text-3xl font-bold'>Color theme</p>
				<p className='text-lg my-2'>
					Select your preferred color theme for Astralinium
				</p>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
					{['dark', 'black', 'dracula', 'night', 'light'].map(
						colortheme => (
							<div
								className='card w-full bg-base-100 rounded-2xl'
								data-theme={colortheme}
								key={colortheme}>
								<div className='card-body'>
									<h2 className='card-title capitalize'>
										{colortheme}
									</h2>
									<p>
										The quick brown fox jumps over the lazy
										dog
									</p>
									<div className='card-actions justify-start '>
										<button
											className='btn btn-primary rounded-2xl'
											onClick={() =>
												setTheme(colortheme)
											}>
											Select{' '}
											{colortheme === theme
												? '(Current)'
												: ''}
										</button>
									</div>
								</div>
							</div>
						),
					)}
				</div>
			</div>
		</div>
	)
}
