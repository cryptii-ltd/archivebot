/**
 * A section component that renders a styled HTML section element.
 *
 * @param {{ children: React.ReactNode, id?: string, titleBadge?: React.ReactNode, subtitle?: string, className?: string, extra?: React.ReactNode, style?: string }} props
 * The props for the component.
 * @returns {JSX.Element} The section element.
 * @example
 * <Section>
 *   <div>Content</div>
 * </Section>
 */

export default async function Section({
  id,
  titleBadge,
  subtitle,
  children,
  className,
  extra,
  style,
}: {
  children: React.ReactNode
  id?: string
  titleBadge?: React.ReactNode
  subtitle?: string
  className?: string
  extra?: React.ReactNode
  style?: string
}) {
  return (
    <section
      id={id}
      className={`${className ? className : ''} bg-black-900 text-text w-full`}
    >
      <div className='flex flex-col items-top justify-start gap-20 px-6 py-20 w-full max-w-[100rem] m-auto '>
        {(titleBadge || subtitle) && (
          <div className='grid gap-8'>
            {titleBadge && titleBadge}
            {subtitle && (
              <h2
                className='m-0'
                style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
              >
                {subtitle}
              </h2>
            )}
            {extra}
          </div>
        )}

        {children}
      </div>
    </section>
  )
}
