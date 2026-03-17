const UnderlineLink = ({
  children,
  href,
  onClick,
  target,
  rel,
  className = "",
}) => {
  return (
    <a
      href={href}
      onClick={onClick}
      target={target}
      rel={rel}
      className={`relative inline-block w-fit group ${className}`}
    >
      {children}
      <span className="absolute bottom-0 left-0 h-px w-full bg-current origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" />
    </a>
  );
};

export default UnderlineLink;
