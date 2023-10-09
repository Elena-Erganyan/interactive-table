import { tableNames } from './SideBar.config';
import './SideBar.style.scss';
import arrowDown from '../../assets/arrow-down.svg';
import table from '../../assets/table.svg';

export function SideBar() {

  return (
    <aside className="sidebar">
      <header className="sidebar__header">
        <div className="sidebar__header-text">
          <span>Название проекта</span>
          <span>Aббревиатура</span>
        </div>
        <button className="sidebar__header-btn">
          <img src={arrowDown} alt="arrow down" />
        </button>
      </header>
      <nav className="sidebar__nav">
        {tableNames.map((name, i) => (
          <a key={i}
            className={`sidebar__nav-link ${name === 'СМР' && 'sidebar__nav-link--active'}`}
          >
            <img src={table} alt="table" />
            {name}
          </a>
        ))}
      </nav>
    </aside>
  );
}