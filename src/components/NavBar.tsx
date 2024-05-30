import cn from '@/utils/cn'
import { createClient } from '@/utils/supabase/client'
import { User } from '@supabase/supabase-js'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import logo from '../assets/svg/logo.svg'

interface NavBarProps {
	user: User
	at: 'upload-file' | 'dashboard' | 'gallery'
	isCensor: boolean
}

export default function NavBar({ user, at, isCensor }: NavBarProps) {
	const signOut = async () => {
		'use server'
		await createClient().auth.signOut()
		redirect('/')
	}

	return (
		<div className='navbar bg-base-100'>
			<div className='navbar-start'>
				<div className='dropdown'>
					<div
						tabIndex={0}
						role='button'
						className='btn btn-ghost lg:hidden'>
						<span className='i-fa6-solid-bars'></span>
					</div>
					<ul
						tabIndex={0}
						className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52'>
						<li>
							<Link
								href='/upload-file'
								className={cn(
									'font-semibold',
									at === 'upload-file' ? 'active' : '',
								)}>
								Upload file
							</Link>
						</li>
						{isCensor ? (
							<li>
								<Link
									href='/dashboard'
									className={cn(
										'font-semibold',
										at === 'dashboard' ? 'active' : '',
									)}>
									Dashboard
								</Link>
							</li>
						) : null}
						<li>
							<Link
								href='/gallery'
								className={cn(
									'font-semibold',
									at === 'gallery' ? 'active' : '',
								)}>
								Gallery
							</Link>
						</li>
					</ul>
				</div>
				<Link className='btn btn-ghost text-xl' href='/'>
					<Image src={logo} alt='logo' className='w-8 h-8' />
				</Link>
			</div>
			<div className='navbar-center hidden lg:flex'>
				<ul className='menu menu-horizontal px-1 gap-3'>
					<li>
						<Link
							href='/upload-file'
							className={cn(
								'font-semibold',
								at === 'upload-file' ? 'active' : '',
							)}>
							Upload file
						</Link>
					</li>
					{isCensor ? (
						<li>
							<Link
								href='/dashboard'
								className={cn(
									'font-semibold',
									at === 'dashboard' ? 'active' : '',
								)}>
								Dashboard
							</Link>
						</li>
					) : null}
					<li>
						<Link
							href='/gallery'
							className={cn(
								'font-semibold',
								at === 'gallery' ? 'active' : '',
							)}>
							Gallery
						</Link>
					</li>
				</ul>
			</div>
			<div className='navbar-end'>
				<div className='dropdown dropdown-end'>
					<div
						tabIndex={0}
						role='button'
						className='btn btn-ghost btn-circle avatar'>
						<div className='w-10 rounded-full'>
							<Image
								alt='avatar'
								src={`https://api.dicebear.com/7.x/identicon/png?backgroundColor=ffffff&seed=${user.id}`}
								width={40}
								height={40}
							/>
						</div>
					</div>
					<ul
						tabIndex={0}
						className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-300 text-base-content rounded-box w-52'>
						<li>
							<form action={signOut}>
								<button className='font-semibold'>
									Sign Out
								</button>
							</form>
						</li>
					</ul>
				</div>
			</div>
		</div>
	)
}
