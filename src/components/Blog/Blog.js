import PropTypes from 'prop-types'
import React from 'react'

import Item from './Item'

const Blog = props => {
  const {posts} = props

  return (
    <React.Fragment>
      <main className="main">
        <ul>
          {posts.map(post => {
            const {
              node,
              node: {
                fields: {slug}
              }
            } = post
            return <Item key={slug} post={node}/>
          })}
        </ul>
      </main>
    </React.Fragment>
  )
}

Blog.propTypes = {
  posts: PropTypes.array.isRequired
}

export default Blog
