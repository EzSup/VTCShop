import classes from "./SectionTitle.module.scss";
import { Resp } from "../Components";

const SectionTitle = ({ Strong, Href, children = "View all", title }) => {
  return (
    <div className={`${classes.title } ${Strong ? classes.strong_title : ""}`}>
      <div className={classes['title-wrap']}>
        <div className={classes.caption}>
          <Resp Tag="h3" Class="S36_L46" altClass="Mobile S26">{title}</Resp>
        </div>
        {Strong ? (
          <div className="strong">{children}</div>
        ) : (
          <div className={classes['view-button']}>
            <a href={Href} className="p2">
              {children}
            </a>
          </div>
        )}
        <div className={classes.arrow}></div>
      </div>
    </div>
  );
}
export default SectionTitle