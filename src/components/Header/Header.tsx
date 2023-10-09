import './Header.style.scss';
import squeres from '../../assets/squares.svg';
import arrow from '../../assets/arrow.svg';

export function Header () {
  return (
    <header className="header">
      <a className="header__link header__link--squeres">
        <img src={squeres} alt="squares" width={24} height={24} />
      </a>
      <a className="header__link header__link--arrow">
        <img src={arrow} alt="arrow" width={24} height={24} />
      </a>
      <a className="header__link header__link--active">Просмотр</a>
      <a className="header__link">Управление</a>
    </header>
  );
}
