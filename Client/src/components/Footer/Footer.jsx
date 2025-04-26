import classes from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer>
      <div className={classes["footer-wrap"]}>
        <div className={classes["top-part"]}>
          <div className={classes["Footer-nav"]}>
            <NavFrame title={"в наявності"}>
              <TextBlock A>Худі</TextBlock>
              <TextBlock A>Футболки</TextBlock>
              <TextBlock A>Канцтовари</TextBlock>
              <TextBlock A>Аксесуари</TextBlock>
            </NavFrame>
            <NavFrame title={"контакти"}>
              <TextBlock P>Palm St, 456</TextBlock>
              <TextBlock P>London, UK</TextBlock>
              <TextBlock A>+ (345) 789 89 98</TextBlock>
            </NavFrame>
            <NavFrame title={"у співпраці із"}>
              <TextBlock A>Microsoft</TextBlock>
              <TextBlock A>Google</TextBlock>
              <TextBlock A>Cisco</TextBlock>
              <TextBlock A>JetBrains</TextBlock>
            </NavFrame>
            <NavFrame title={"ми з вами зв'яжемось"}>
              <TextBlock>
                <input
                  placeholder="Ваш E-mail"
                  type="email"
                  className="p2"
                ></input>
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
              <p className="p2">© 2025 | VTCShop | Всі права захищені.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;

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
};

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
};
