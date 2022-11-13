import React from 'react'
import s from './s.module.css'

const Aside = () => {
  return (
    <aside className={s.aside}>
      <button className={s.btn_create}>Create New Task</button>
    </aside>
  )
}

export default Aside;