import GetData from "../GetData";
import Loading from "../Loading";
import classes from "./advantages.module.scss";
import { Resp } from "../Components";

const Advantages = () => {
  const { items, loading } = GetData({ name: "advantages" });

  if (loading) return <Loading />;

  return (
    <div className={classes["adv-wrap"]}>
      {items.map((item, index) => (
        <Item key={index} preview={item.preview}>
          {item.title}
        </Item>
      ))}
    </div>
  );
};
export default Advantages;

const Item = ({ preview, children }) => {
  return (
    <div className={classes["adv-item"]}>
      <div className={classes["Item-preview"]}>
        <img src={preview} alt={preview}></img>
      </div>
      <div className={classes.textbar}>
        <Resp Tag="p" Class="p2" altClass="System S12_L20 UpC">{children}</Resp>
      </div>
    </div>
  );
};
