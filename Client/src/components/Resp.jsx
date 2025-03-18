import React, { useState, useEffect } from "react";

const Resp = ({
  targetWidth = "768",
  Tag = "h1",
  AltTag = Tag,
  Class = "",
  altClass = Class,
  children,
  ...props
}) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= targetWidth);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= targetWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [targetWidth]);

  const Component = isMobile ? AltTag : Tag;
  const className = isMobile ? altClass : Class;

  return (
    <Component className={className} {...props}>
      {children}
    </Component>
  );
};

export default Resp;
