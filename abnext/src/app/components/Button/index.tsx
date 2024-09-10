interface ButtonProps {
  type?: 'primary' | 'secondary' | 'accent'
  onClick?: () => void
  children?: any
  className?: string
}

export default function Button({ type = 'primary', onClick, children, className }: ButtonProps) {
  let backgroundColor = 'bg-buttonPrimary'
  let textColor = 'text-buttonPrimaryText'

  switch (type) {
    case 'secondary':
      backgroundColor = 'bg-buttonSecondary'
      textColor = 'text-buttonSecondaryText'
      break

    case 'accent':
      backgroundColor = 'bg-accent'
      textColor = 'text-buttonSecondaryText'
      break
  }

  return (
    <button
      className={`button ${backgroundColor} ${textColor} text-center flex gap-2 justify-center items-center py-3 px-4 rounded-lg transition ease transform-gpu active:scale-95 hover:bg-accent hover:text-buttonPrimary duration-75 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
