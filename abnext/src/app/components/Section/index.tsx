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
      className={`${className ? className : ''} bg-sectionDark text-sectionDarkText max-w-[100rem] m-auto w-full`}
    >
      <div className='flex flex-col items-top justify-start gap-20 px-6 py-20 w-full'>
        <div className='grid gap-8'>
          {titleBadge}
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

        {children}
      </div>
    </section>
  )
}
