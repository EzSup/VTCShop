import classes from "./flexContainer.module.scss";
import { Resp } from "../Components";

const FlexContainer = () => {
  return (
    <section className={classes.FlexContainer}>
      <div className={classes.AboutUs_Frame}>
        <FlexWrap
          className={classes.row}
          title="Про нас"
          source="https://vtc.vn.ua/images/logos/raster/logo_white_with_blue_bg.png"
        >
          <Resp Class="b2" altClass="System S12_L20" Tag="p">
            Вінницький технічний фаховий коледж – це заклад із багатою історією,
            який здобув широку популярність завдяки високій якості освіти та
            інноваційному підходу. Щороку сотні абітурієнтів обирають наш
            коледж, прагнучи стати частиною його дружньої та амбітної спільноти.
            Наші студенти пишаються тим, що навчаються тут, адже це не лише
            можливість отримати престижну освіту, а й шанс долучитися до
            традицій, що об’єднують покоління.
          </Resp>
          <Resp Class="b2" altClass="System S12_L20" Tag="p">
            Мрія про власний мерч коледжу жила в серцях студентів і випускників
            багато років. Ми вирішили втілити її в життя, створивши колекцію,
            яка відображає дух нашого закладу – сучасність, єдність і гордість.
            Кожен елемент мерчу покликаний підкреслити унікальність Вінницького
            технічного коледжу та стати символом приналежності до нашої великої
            родини.
          </Resp>
          <Resp Class="b2" altClass="System S12_L20" Tag="p">
            Цей проєкт – більше, ніж просто створення одягу чи аксесуарів. Це
            спосіб згуртувати нашу спільноту, дати студентам і випускникам
            можливість висловити свою любов до коледжу через стильні та якісні
            речі. Ми віримо, що наш мерч стане не лише частиною гардеробу, а й
            джерелом натхнення та гордості для всіх, хто пов’язаний із
            Вінницьким технічним фаховим коледжем.
          </Resp>
        </FlexWrap>
        <FlexWrap
          className={classes["row-reverse"]}
          title="Наші продукти"
          source="https://mybucketezsup.s3.eu-north-1.amazonaws.com/Products/bf22b8afb6e04f52.png?X-Amz-Expires=3600&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAXEFUNVYOGKL2NOFD%2F20250426%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Date=20250426T105912Z&X-Amz-SignedHeaders=host&X-Amz-Signature=95299bd3c5f6bf4e6d1a9a83acb90ef88113d67db8e6b19d97d95f08006be2fb"
        >
          <Resp Class="b2" altClass="System S12_L20" Tag="p">
            Ми пропонуємо широкий асортимент якісних товарів, створених
            спеціально для студентів і шанувальників Вінницького технічного
            коледжу: стильні худі, зручні футболки, практична канцелярія та
            оригінальні аксесуари. Кожен виріб виготовлений із високоякісних
            матеріалів, що забезпечують комфорт і довговічність. Наші дизайни
            поєднують сучасні тренди з унікальною символікою коледжу, щоб ви
            могли з гордістю демонструвати свою приналежність до нашої
            спільноти.
          </Resp>
          <Resp Class="b2" altClass="System S12_L20" Tag="p">
            Процес виготовлення нашого мерчу продуманий до найменших деталей. Ми
            співпрацюємо з перевіреними виробниками, які використовують сучасні
            технології друку та пошиття, щоб гарантувати бездоганну якість.
            Кожен етап – від розробки дизайну до пакування – проходить суворий
            контроль, адже ми прагнемо, щоб наші продукти не лише радували око,
            а й служили вам довгі роки.
          </Resp>
          <Resp Class="b2" altClass="System S12_L20" Tag="p">
            Окрім цього, ми постійно вдосконалюємо наш асортимент, додаючи нові
            ідеї та продукти, що відповідають потребам і бажанням нашої
            спільноти. Ми враховуємо відгуки студентів, щоб створювати мерч,
            який не лише виглядає стильно, а й є практичним у повсякденному
            житті. Наша мета – зробити кожен виріб особливим, щоб він став не
            просто річчю, а символом вашої гордості за Вінницький технічний
            коледж.
          </Resp>
        </FlexWrap>
      </div>
    </section>
  );
};
export default FlexContainer;

const FlexWrap = ({ className = "", children, ...props }) => {
  return (
    <div className={`${classes.FlexWrap} ${className}`}>
      <TextBlock {...props}>{children}</TextBlock>
      <ImageBlock {...props} />
    </div>
  );
};

const TextBlock = ({ title, children }) => {
  return (
    <div className={classes.TextBlock}>
      <div className={classes.title}>
        <Resp Tag="h2" Class="Headline" altClass="Headline S24_L32">
          {title}
        </Resp>
      </div>
      <div className={classes.content}>{children}</div>
    </div>
  );
};

const ImageBlock = ({ source }) => {
  return (
    <div className={classes.ImageBlock}>
      <img src={source} alt="" />
    </div>
  );
};
