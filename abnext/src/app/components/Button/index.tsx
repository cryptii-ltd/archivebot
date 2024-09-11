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
  let backgroundColor = 'bg-white-500'
  let textColor = 'text-black-500 '

  /**
   * Switches the button type and changes the styles accordingly
   * @param {string} type The type of the button
   */
  switch (type) {
    case 'secondary':
      backgroundColor = 'bg-black-800'
      textColor = 'text-white-900'
      break

    case 'accent':
      backgroundColor = 'bg-purple-500'
      textColor = 'text-white-700'
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
        hover:bg-purple-500
        hover:text-text
        duration-75
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
