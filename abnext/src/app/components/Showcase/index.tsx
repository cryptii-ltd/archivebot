import style from './style.module.css'

export default function Showcase() {
  return (
    <div className={style.outer}>
      <div className={`${style.inner} bg-sectionDark`}>Screenshot of Archives UI</div>
    </div>
  )
}
