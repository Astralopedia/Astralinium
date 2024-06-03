import { initEdgeStore } from '@edgestore/server'
import { createEdgeStoreNextHandler } from '@edgestore/server/adapters/next/app'
import { initEdgeStoreClient } from '@edgestore/server/core'

const es = initEdgeStore.create()

const edgeStoreRouter = es.router({
	publicFiles: es.fileBucket().beforeDelete(({ ctx, fileInfo }) => {
		return true
	}),
})

export const backendEdgeStoreClient = initEdgeStoreClient({
	router: edgeStoreRouter,
})
export const handler = createEdgeStoreNextHandler({
	router: edgeStoreRouter,
})
export type EdgeStoreRouter = typeof edgeStoreRouter
