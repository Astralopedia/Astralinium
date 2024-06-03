'use server'

import Logo from '@/assets/svg/logo.svg'
import Image from 'next/image'
import Link from 'next/link'

interface FooterItem {
	name: string
	url: string
}

export default async function Footer() {
	const getCommitRef = () => {
		return process.env.COMMIT_REF?.substring(0, 7)
	}
	const footerItems: FooterItem[][] = [
		[
			{
				name: 'Support',
				url: '',
			},
			{
				name: 'Status',
				url: '',
			},
		],
		[
			{
				name: 'Discord',
				url: '',
			},
		],
		[
			{
				name: 'Terms of use',
				url: '',
			},
			{
				name: 'Privacy policy',
				url: '',
			},
			{
				name: 'Cookie policy',
				url: '',
			},
		],
	]

	return (
		<footer className='footer p-10 bg-base-200 text-base-content'>
			<aside>
				<Image
					src={Logo}
					alt='logo'
					loading='lazy'
					className='w-16 h-16'
				/>
				<p className=''>
					Astralinium is{' '}
					<a
						href='https://github.com/Astralopedia/Astralopedia'
						className='link link-primary link-hover link-info'>
						open source
					</a>
				</p>
				<p>
					astralopedia/astralinium@
					<a
						className='link link-primary link-hover link-info'
						href={`https://github.com/Astralopedia/Astralopedia/commit/${getCommitRef()}`}>
						{getCommitRef()}
					</a>
				</p>
			</aside>
			<nav>
				<h6 className='footer-title'>Resources</h6>
				{footerItems[0].map(({ name, url }) => (
					<Link key={name} href={url} className='link no-underline'>
						{name}
					</Link>
				))}
			</nav>
			<nav>
				<h6 className='footer-title'>Community</h6>

				{footerItems[1].map(({ name, url }) => (
					<Link key={name} href={url} className='link no-underline'>
						{name}
					</Link>
				))}
			</nav>
			<nav>
				<h6 className='footer-title'>Legal</h6>
				{footerItems[2].map(({ name, url }) => (
					<Link key={name} href={url} className='link no-underline'>
						{name}
					</Link>
				))}
			</nav>
		</footer>
	)
}
