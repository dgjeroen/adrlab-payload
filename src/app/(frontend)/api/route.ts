import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import type { NextRequest } from 'next/server'

export const GET = async (request: NextRequest) => {
  const payload = await getPayloadHMR({ config: configPromise })

  return Response.json({
    message: 'Payload REST API',
    collections: Object.keys(payload.config.collections),
  })
}
