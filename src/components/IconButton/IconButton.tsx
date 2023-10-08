import { IconButtonProps } from './IconButton.types';
import './IconButton.style.scss';

export function IconButton ({
  title,
  className,
  handleClick,
  image,
  disabled,
  style
}: IconButtonProps) {
  return (
    <button
      style={style}
      className={className}
      onClick={handleClick}
      disabled={disabled}
    >
      {title}
      <img src={image} alt={title} />
    </button>
  );
}
