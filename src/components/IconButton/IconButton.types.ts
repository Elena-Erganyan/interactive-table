export interface IconButtonProps {
  title: string;
  className: string;
  handleClick?: React.MouseEventHandler<HTMLButtonElement>;
  image: string;
  disabled: boolean;
  style?: React.CSSProperties;
}
