'use server'

import { clerkClient } from '@clerk/nextjs/server'

export default async function getUsernameById(id: string): Promise<string> {
	return (await clerkClient.users.getUser(id)).username!
}
