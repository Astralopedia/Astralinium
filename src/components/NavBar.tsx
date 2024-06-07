import Logo from '@/assets/svg/logo.svg'
import {
	OrganizationSwitcher,
	Protect,
	SignInButton,
	SignedIn,
	SignedOut,
	UserButton,
} from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'
import { LogIn, Menu } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function NavBar() {
	return (
		<nav className='navbar bg-base-200 text-base-content'>
			<div className='navbar-start'>
				<div className='dropdown'>
					<div
						tabIndex={0}
						role='button'
						className='btn btn-ghost lg:hidden'>
						<Menu />
					</div>
					<ul
						tabIndex={0}
						className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-2xl w-52'>
						<li>
							<Link href='/' className='font-medium'>
								Home
							</Link>
						</li>
						<li>
							<details>
								<summary>Dashboard</summary>
								<ul className='p-2 bg-base-200 rounded-t-none'>
									<li>
										<Link href='/my-gallery'>
											My Gallery
										</Link>
									</li>
									<li>
										<Link href='/upload-file'>
											Upload File
										</Link>
									</li>
									<li>
										<Link href='/appearance'>
											Appearance
										</Link>
									</li>
									<Protect role='org:admin'>
										<li>
											<Link href='/private-gallery'>
												Review Images
											</Link>
										</li>
									</Protect>
								</ul>
							</details>
						</li>
						<li>
							<Link href='/gallery' className='font-medium'>
								Gallery
							</Link>
						</li>
					</ul>
				</div>
				<Link href='/' className='btn btn-ghost text-xl'>
					<Image src={Logo} alt='logo' className='mr-1 w-8 h-8' />
					Astralinium
				</Link>
			</div>
			<div className='navbar-center hidden lg:flex'>
				<ul className='menu menu-horizontal px-1'>
					<li>
						<Link href='/' className='font-medium'>
							Home
						</Link>
					</li>
					<li>
						<details>
							<summary>Dashboard</summary>
							<ul className='p-2 bg-base-200 rounded-t-none z-[1]'>
								<li>
									<Link href='/my-gallery'>My Gallery</Link>
								</li>
								<li>
									<Link href='/upload-file'>Upload File</Link>
								</li>
								<li>
									<Link href='/appearance'>Appearance</Link>
								</li>
								<Protect role='org:admin'>
									<li>
										<Link href='/private-gallery'>
											Review Images
										</Link>
									</li>
								</Protect>
							</ul>
						</details>
					</li>
					<li>
						<Link href='/gallery' className='font-medium'>
							Gallery
						</Link>
					</li>
				</ul>
			</div>
			<div className='navbar-end'>
				<SignedIn>
					<div className='mr-3'>
						<OrganizationSwitcher />
						<UserButton />
					</div>
				</SignedIn>
				<SignedOut>
					<SignInButton>
						<div className='btn btn-accent btn-sm h-10'>
							<LogIn />
							Login
						</div>
					</SignInButton>
				</SignedOut>
			</div>
		</nav>
	)
}
