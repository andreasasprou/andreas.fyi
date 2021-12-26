import React, { Ref, useEffect, useState } from 'react'
import { Heading, LinkProps, StackProps } from '@chakra-ui/layout'
import { Stack } from '@chakra-ui/react'
import { Link } from 'ui/common'

export interface ProgressNavSection {
  id: string
  title: string
}

interface ProgressNavProps extends StackProps {
  title?: string
  sections: ProgressNavSection[]
}

const TOP = 100

const NavLink = React.forwardRef(function NavLink(
  {
    isActive,
    ...rest
  }: LinkProps & {
    isActive: boolean
  },
  ref: Ref<HTMLAnchorElement>
) {
  return <Link ref={ref} color={isActive ? 'blue.300' : 'whiteAlpha.800'} {...rest} />
})

export function ProgressNav({ title = 'Topics of Thought', sections, ...rest }: ProgressNavProps) {
  const [activeSection, setActiveSection] = useState<string | undefined>()

  const sectionIds = sections.map(({ id }) => id)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute('id')

          if (entry.intersectionRatio > 0) {
            setActiveSection(id as string)
          } else if (activeSection === id) {
            setActiveSection(undefined)
          }
        })
      },
      {
        threshold: 0.1
      }
    )

    document.querySelectorAll('section[id]').forEach((section) => {
      if (!sectionIds.includes(section.getAttribute('id') as string)) {
        return
      }

      observer.observe(section)
    })
  }, [activeSection, sectionIds])

  return (
    <Stack
      overflowY="auto"
      maxH={`calc(100vh - ${TOP}px)`}
      position="sticky"
      top={TOP}
      py={4}
      maxW={380}
      display={{
        base: 'none',
        md: 'flex'
      }}
      pl={20}
      {...rest}
    >
      <Heading fontWeight={700} size="sm">
        {title}
      </Heading>
      {sections.map(({ title, id }) => (
        <NavLink href={`#${id}`} key={id} isActive={activeSection === id}>
          {title}
        </NavLink>
      ))}
    </Stack>
  )
}
