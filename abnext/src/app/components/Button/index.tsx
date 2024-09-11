interface ButtonProps {
  type?: 'primary' | 'secondary' | 'accent'
  onClick?: () => void
  children?: any
  className?: string
}

/**
 * The button component
 * @param {{ type?: 'primary' | 'secondary' | 'accent', onClick?: () => void, children?: any, className?: string }} props
 * The properties for the button component
 * @returns {JSX.Element} The rendered button
 */
export default function Button({ type = 'primary', onClick, children, className }: ButtonProps) {
  let backgroundColor = 'bg-buttonPrimary'
  let textColor = 'text-buttonPrimaryText'

  /**
   * Switches the button type and changes the styles accordingly
   * @param {string} type The type of the button
   */
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

  /**
   * Render the button
   * @returns {JSX.Element} The rendered button
   */
  return (
    <button
      className={`
        button
        ${backgroundColor}
        ${textColor}
        text-center
        flex
        gap-2
        justify-center
        items-center
        py-3
        px-4
        rounded-lg
        transition
        ease
        transform-gpu
        active:scale-95
        hover:bg-accent
        hover:text-buttonPrimary
        duration-75
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
