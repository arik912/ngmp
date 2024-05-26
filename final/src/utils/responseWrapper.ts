export function responseWrapper(data: any = null, errorMessage: string | null = null) {
  return {
    data,
    error: (errorMessage) ? { message: errorMessage } : null
  }
}
