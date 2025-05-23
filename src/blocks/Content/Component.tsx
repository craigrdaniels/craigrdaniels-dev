import React from 'react'
import RichText from '@/components/RichText'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'

import './styles.scss'

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { columns } = props

  const colSpanClasses = {
    full: '12',
    twoThird: '8',
    half: '6',
    oneThird: '4',
  }

  return (
    <div>
      {columns &&
        columns.length > 0 &&
        columns.map((col, index) => {
          const { richText, size } = col

          return (
            <div key={index}>{richText && <RichText data={richText} enableGutter={false} />}</div>
          )
        })}
    </div>
  )
}
