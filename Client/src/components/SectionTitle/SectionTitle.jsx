import classes from "./SectionTitle.module.scss";
import { Resp } from "../Components";
import { useNavigate } from "react-router-dom";

const SectionTitle = ({
  Strong,
  Href,
  children = "Переглянути усі",
  title,
}) => {
  return (
    <div className={`${classes.title} ${Strong ? classes.strong_title : ""}`}>
      <div className={classes["title-wrap"]}>
        <div className={classes.caption}>
          <Resp Tag="h3" Class="S36_L46" altClass="Mobile S26">
            {title}
          </Resp>
        </div>
        {Strong ? (
          <div className="strong">{children}</div>
        ) : (
          <div className={classes["view-button"]}>
            <span onClick={() => useNavigate("/Collection")}>
              <a className="p2">{children}</a>
            </span>
          </div>
        )}
        <div className={classes.arrow}></div>
      </div>
    </div>
  );
};
export default SectionTitle;
