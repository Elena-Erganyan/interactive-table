import { tableNames } from './SideBar.config';
import './SideBar.style.scss';

export function SideBar() {

  return (
    <aside className="sidebar">
      <header className="sidebar__header">
        <span>Название проекта</span>
        <span>Aббревиатура</span>
      </header>
      <nav className="sidebar__nav">
        {tableNames.map((name, i) => <a key={i}>{name}</a>)}
      </nav>
    </aside>
  );
}