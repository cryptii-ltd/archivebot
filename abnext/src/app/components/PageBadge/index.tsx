interface PageBadgeProps {
  children: any
}

/**
 * A component that renders a page badge (used as a page title in most cases)
 *
 * @param {{ children: any }} props The props for the component
 * @returns {JSX.Element} The rendered page badge
 */
export default async function PageBadge({ children }: PageBadgeProps) {
  return (
    <span className='bg-black-800 cursor-default w-fit py-2 px-4 flex items-center justify-center gap-2 rounded-lg'>
      {children}
    </span>
  )
}
