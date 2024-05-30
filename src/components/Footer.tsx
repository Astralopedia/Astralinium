'use client'

import Image from 'next/image'
import Link from 'next/link'
import logo from '../assets/svg/logo.svg'

export default function Footer() {
	return (
		<footer className='footer items-center p-4 bg-base-200 text-neutral-content'>
			<aside className='items-center grid-flow-col'>
				<Image src={logo} alt='logo' className='w-8 h-8' />
				<p>
					© 2024{' '}
					<Link
						href='https://github.com/Astralopedia'
						className='text-[#7369CA]'>
						Astralopedia
					</Link>
				</p>
			</aside>
			<nav className='grid-flow-col gap-4 md:place-self-center md:justify-self-end'>
				<Link href='https://discord.gg/mNeHyuZdqm' target='_blank'>
					<span className='i-fa6-brands-discord w-6 h-6'></span>
				</Link>
				<Link
					href='https://github.com/Astralopedia/Astralinium'
					target='_blank'>
					<span className=' i-fa6-brands-github w-6 h-6'></span>
				</Link>
			</nav>
		</footer>
	)
}
