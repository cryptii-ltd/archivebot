interface ButtonProps {
  type?: 'primary' | 'secondary' | 'accent' | 'accentOutline'
  onClick?: () => void
  children?: any
  className?: string
}

/**
 * The button component
 * @param {{ type?: 'primary' | 'secondary' | 'accent' | 'accentOutline', onClick?: () => void, children?: any, className?: string }} props
 * The properties for the button component
 * @returns {JSX.Element} The rendered button
 */
export default function Button({ type = 'primary', onClick, children, className }: ButtonProps) {
  let backgroundColor = 'bg-white-500 hover:bg-white-800'
  let textColor = 'text-black-900'

  /**
   * Switches the button type and changes the styles accordingly
   * @param {string} type The type of the button
   */
  switch (type) {
    case 'secondary':
      backgroundColor = 'bg-white-500-5 hover:bg-white-700'
      textColor = 'text-white-900 hover:text-black-900'
      break

    case 'accent':
      backgroundColor = 'bg-purple-500-10 hover:bg-purple-500 active:bg-purple-700'
      textColor = 'text-purple-500 hover:text-text'
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
        rounded-2xl
        transition
        ease
        duration-75
        ${className ? className : ''}
      `}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
