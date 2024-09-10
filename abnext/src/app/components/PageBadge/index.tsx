interface PageBadgeProps {
  children: any
}

export default async function PageBadge({ children }: PageBadgeProps) {
  return (
    <span className='bg-badge cursor-default w-fit py-2 px-4 flex items-center justify-center gap-2 rounded-lg'>
      {children}
    </span>
  )
}
