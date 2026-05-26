import type { TestimonialsBlock as TestimonialsBlockProps } from '@/payload-types'

import React from 'react'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'

export const TestimonialsBlock: React.FC<
  TestimonialsBlockProps & {
    id?: string
  }
> = (props) => {
  const { id, introContent, testimonials } = props

  const hasTestimonials = testimonials && Array.isArray(testimonials) && testimonials.length > 0

  return (
    <div className="my-16" id={`block-${id}`}>
      {introContent && (
        <div className="container mb-16">
          <RichText className="ms-0 max-w-[48rem]" data={introContent} enableGutter={false} />
        </div>
      )}
      {hasTestimonials && (
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => {
              const { quote, author, role, rating, image } = testimonial

              return (
                <div
                  key={index}
                  className="rounded-lg border border-border bg-card p-6 flex flex-col"
                >
                  {rating != null && (
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span
                          key={i}
                          className={i < rating ? 'text-yellow-500' : 'text-muted-foreground/30'}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  )}
                  <blockquote className="flex-1 mb-4 text-muted-foreground">
                    &ldquo;{quote}&rdquo;
                  </blockquote>
                  <div className="flex items-center gap-3 mt-auto">
                    {image && typeof image === 'object' && (
                      <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
                        <Media
                          resource={image}
                          size="40px"
                          imgClassName="object-cover w-full h-full"
                        />
                      </div>
                    )}
                    <div>
                      <p className="font-semibold text-sm">{author}</p>
                      {role && <p className="text-xs text-muted-foreground">{role}</p>}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
