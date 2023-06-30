const Link = ({ href, isExternal = false, children, style }) => {
  return (
    <a
      href={href}
      target={isExternal ? "_blank" : "_self"}
      rel={isExternal ? "noopener noreferrer" : ""}
      style={style}
    >
      {children}
    </a>
  );
};

export default Link;
