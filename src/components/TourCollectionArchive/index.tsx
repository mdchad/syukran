import { cn } from '@/utilities/ui'
import React from 'react'

import { TourCard, CardTourData } from '@/components/TourCard'

export type Props = {
  tours: CardTourData[]
}

export const TourCollectionArchive: React.FC<Props> = (props) => {
  const { tours } = props

  return (
    <div className={cn('container')}>
      <div>
        <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-y-4 gap-x-4 lg:gap-y-8 lg:gap-x-8 xl:gap-x-8">
          {tours?.map((result, index) => {
            if (typeof result === 'object' && result !== null) {
              return (
                <div className="col-span-4" key={index}>
                  <TourCard className="h-full" doc={result} showCategories />
                </div>
              )
            }

            return null
          })}
        </div>
      </div>
    </div>
  )
}
