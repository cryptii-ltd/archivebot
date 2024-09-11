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
    <div className={style.outer}>
      <div className={`${style.inner} bg-black-900`}>Screenshot of Archives UI</div>
    </div>
  )
}
