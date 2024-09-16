import style from './style.module.css'

/**
 * A component that renders a screenshot of the Archives UI.
 *
 * @returns A JSX element representing the screenshot.
 * @example
 * <Showcase />
 */
export default function Showcase() {
  return (
    <div className={style.container}>
      <div className={`${style.outer} bg-nav border border-black-100`}></div>
    </div>
  )
}
