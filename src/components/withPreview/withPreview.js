import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import queryString from 'query-string'

const withPreview = (args = { preview: false }) => Component => {
  const previewComponent = props => {
    const parsed = queryString.parse(props.location.search)
    const { nonce, preview, post, category } = parsed

    const id = parseInt(post, 10)

    if (!preview) {
      return <Component preview={false} {...props} />
    }

    const { loading, error, data } = useQuery(args.preview, {
      variables: { id, category, nonce },
    })

    if (loading)
      return (
        <div className="flex items-center justify-center w-full min-h-screen">
          <h2 className="mb-20 font-normal text-32 leading-body">
            Loading preview...
          </h2>
        </div>
      )
    if (error)
      return (
        <div className="flex items-center justify-center w-full min-h-screen">
          <h2 className="mb-20 font-normal text-32 leading-body">
            Error: {error.message}
            <section>{JSON.stringify(error, null, 2)}</section>
          </h2>
        </div>
      )

    return <Component preview={data} {...props} />
  }

  return previewComponent
}

export default withPreview
