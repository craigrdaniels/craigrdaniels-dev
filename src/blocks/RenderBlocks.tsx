import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ContentBlock } from '@/blocks/Content/Component'

const blockComponents = {
  content: ContentBlock,
}

export const RenderBlocks: React.FC<{ blocks: Page['layout'][0][] }> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const BlockComponent = blockComponents[block.blockType]

            if (BlockComponent) {
              return <BlockComponent key={index} {...block} />
            }
          }

          return null
        })}
      </Fragment>
    )
  }

  return null
}
