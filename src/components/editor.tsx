'use client'
import { useState, useEffect } from 'react'
import { ReactJsonWrapper } from './react-json-view-wrapper'

export const url =
  'https://www.notion.so/oauth2callback?state=eyJjYWxsYmFja1R5cGUiOiJuYXRpdmVjYWxlbmRhcnJlZGlyZWN0IiwiZW5jcnlwdGVkVG9rZW4iOiJ2MDI6bG9naW5fd2l0aF9nb29nbGU6Um1fWkRXeXpCZUNxYWVxZHBzT2V3cklET1JNSWMwTHFTcEhmWlAxV01Zb2lXSU1LZTZtVE81WENocExUa0NIRVZSd1NTNVRrSWhNY0pwQUFtN1JnaHdxeWp1YW1pS2Fic3h3eFZvQnNieFZLMnM3LXBmX0FPNVNWTXhkTko1LWNEOTVpIn0=&code=4/0AVMBsJgR8zxfr1qPkaFqWXZ0CXvg5QMLOkEKPxWNtCG8I-tmDzA-IVlerWsgbap622OVig&scope=email%20profile%20https://www.googleapis.com/auth/directory.readonly%20https://www.googleapis.com/auth/admin.directory.resource.calendar.readonly%20https://www.googleapis.com/auth/contacts.other.readonly%20https://www.googleapis.com/auth/contacts%20https://www.googleapis.com/auth/calendar.settings.readonly%20https://www.googleapis.com/auth/calendar.events%20https://www.googleapis.com/auth/calendar%20https://www.googleapis.com/auth/userinfo.profile%20https://www.googleapis.com/auth/userinfo.email%20openid&authuser=0&prompt=consent'

const setting = {
  decodeURIComponent: true,
}

export function Editor() {
  const [input, setInput] = useState(url)
  const [src, setSrc] = useState<null | Record<string, any>>(null)

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
      <EditorSettings />
      <div className="flex flex-row gap-4 h-full">
        <div className="flex-1 min-w-0 flex flex-col">
          <label htmlFor="input">URL input:</label>
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
          <label>URL searchParams Output:</label>
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

function EditorSettings() {
  return (
    <div className="">
      <h2>Output Settings:</h2>
      <div className="flex flex-row gap-1">
        <input type="checkbox" id="decodeURIcomponent" />
        <label htmlFor="decodeURIcomponent">Enable decodeURIcomponent</label>
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
  const params: Record<string, any> = {}

  searchParams.forEach(function (val, key) {
    if (params[key] !== undefined) {
      if (!Array.isArray(params[key])) {
        params[key] = [params[key]]
      }
      params[key].push(val)
    } else {
      params[key] = options.decodeURIComponent ? decodeURIComponent(val) : val
    }
  })

  return params
}

export default Editor
