'use client'
import { useState, useEffect } from 'react'
import { ReactJsonWrapper } from './react-json-view-wrapper'

export const url =
  'https://example.com/search?q=typescript%20react&category=programming&tags=web%20development&page=1&limit=10&sort=date&order=desc&filter=published&author=john%20doe&year=2024'

const setting = {
  decodeURIComponent: true,
}

export function Editor() {
  const [input, setInput] = useState(url)
  const [src, setSrc] = useState<null | Record<string, unknown>>(null)

  useEffect(() => {
    try {
      const url = new URL(input)
      const parsedSearchParams = getParams(url.searchParams)
      setSrc(parsedSearchParams)
    } catch {
      setSrc(null)
    }
  }, [input])

  return (
    <div className="h-full flex flex-col gap-4">
      <div className="flex flex-row gap-4 h-full">
        <div className="flex-1 min-w-0 flex flex-col">
          <label htmlFor="input" className='font-bold'>URL input:</label>
          <textarea
            id="input"
            className="grow shrink flex-auto min-w-0"
            onChange={(e) => {
              setInput(e.target.value)
            }}
            value={input}
          />
        </div>
        <div className="flex-1 min-w-0 flex flex-col">
          <label className='font-bold'>URL searchParams Output:</label>
          <ReactJsonWrapper
            style={{ flex: '1 1 auto', overflowX: 'scroll', height: '100%' }}
            src={src ?? {}}
            theme={'monokai'}
          />
        </div>
      </div>
    </div>
  )
}

/**
 * https://gomakethings.com/how-to-get-all-of-the-query-string-parameters-from-a-url-with-vanilla-js/
 */
export function getParams(
  searchParams: URLSearchParams,
  options: typeof setting = {
    decodeURIComponent: false,
  }
) {
  const params: Record<string, unknown> = {}

  searchParams.forEach(function (val, key) {
    if (params[key] !== undefined) {
      if (!Array.isArray(params[key])) {
        params[key] = [params[key]]
      }
      (params[key] as unknown[]).push(val)
    } else {
      params[key] = options.decodeURIComponent ? decodeURIComponent(val) : val
    }
  })

  return params
}

export default Editor
