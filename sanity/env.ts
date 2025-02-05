export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-02-04'

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)

export const token = assertValue(
  "skJ1vWvr9kd4qaCLLyM1Hahkjyu9oCQO0J1kzVy3sBHbzTAMrbMXLodRTUXy8dOavJOYv0LpF830WX0dvwhjBpcWtDiEiPm5pN8jOUgPby4LTUPSkDgllV7Q80vKfyIcn4cDpXt8grw61EMeM0ptsCCxuro2eWmGvVZb7Xmxu9W0JDabPk9A",
  'Missing environment variable: NEXT_PUBLIC_SANITY_AUTH_TOKEN'
)
function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
