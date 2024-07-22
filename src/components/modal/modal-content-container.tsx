interface ModalContentProps {
  children: JSX.Element;
  title: string;
  titleColor:
    | 'info'
    | 'success'
    | 'warning'
    | 'error'
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'neutral'
    | 'inherit';
}

export function ModalContentContainer({ children, title, titleColor }: ModalContentProps) {
  const titleStyle = `font-bold text-lg text-${titleColor}`;

  return (
    <div>
      <h3 className={titleStyle}>{title}</h3>
      <hr className="my-4" />

      {children}
    </div>
  );
}
