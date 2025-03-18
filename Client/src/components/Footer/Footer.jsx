import classes from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer>
      <div className={classes["footer-wrap"]}>
        <div className={classes["top-part"]}>
          <div className={classes["Footer-nav"]}>
            <NavFrame title={"shop"}>
              <TextBlock A>Best Sellers</TextBlock>
              <TextBlock A>Crew Neck</TextBlock>
              <TextBlock A>V - Neck</TextBlock>
              <TextBlock A>Bundle Builder</TextBlock>
            </NavFrame>
            <NavFrame title={"contact"}>
              <TextBlock P>Palm St, 456</TextBlock>
              <TextBlock P>London, UK</TextBlock>
              <TextBlock A>+ (345) 789 89 98</TextBlock>
            </NavFrame>
            <NavFrame title={"more info"}>
              <TextBlock A>Blog</TextBlock>
              <TextBlock A>Terms and conditions</TextBlock>
              <TextBlock A>Private Policy</TextBlock>
            </NavFrame>
            <NavFrame title={"get 10% of cashback"}>
              <TextBlock>
                <input placeholder="Your E-mail" type="email" className="p2"></input>
              </TextBlock>
              <TextBlock>
                <div className={classes.media}>
                  <a href="#" className={classes.linkedId}></a>
                  <a href="#" className={classes.facebook}></a>
                  <a href="#" className={classes.inst}></a>
                </div>
              </TextBlock>
            </NavFrame>
          </div>
        </div>
        <div className={classes["bot-part"]}>
          <div className={classes["bot-wrap"]}>
            <div className={classes["white-logo"]}></div>
            <div>
              <p className="p2">© 2023 | Focused Fits | All Rights Reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer

const NavFrame = ({ title, children }) => {
  return (
    <div className={classes.frame}>
      <div className={classes.title}>
        <p className="p2 UpC">{title}</p>
      </div>
      <div className={classes.list}>
        <ul>{children}</ul>
      </div>
    </div>
  );
}

const TextBlock = ({ P, A, children, href = "#" }) => {
  return (
    <li>
      {P && <p className="p2">{children}</p>}
      {A && (
        <a href={href} className="p2">
          {children}
        </a>
      )}
      {!P && !A && <span>{children}</span>}
    </li>
  );
}
