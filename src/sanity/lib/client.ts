import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'
import { product } from '../schemaTypes/product'

export const client = createClient({
  projectId,
  dataset, 
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
  token: 'skbec10Sp6N81HWfRICWTesxGCHdZGHKepew1qgEurraGi38b3ENuLJ4t7sGH6CEA6ZbRGmDRLXDoGZYJG5a1DIN9fgoXDZTQoy0aU6QS0LOtXOV5SoiqfO5aBUuV4qjMq64KzYI7iEsn06oREoQqL4zhsi3jH7k4R5huPONfv2TlqrVZPVE',
})
