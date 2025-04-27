import classes from "./contacts.module.scss";
import { Resp } from "../Components.js";

const Contacts = () => {
  return (
    <section className={classes.contactsSection}>
      <div className={classes.contacts_wrap}>
        <div className={classes.textBox}>
          <Resp Tag="p" Class="b1" altClass="S18_L26">
            Ми цінуємо ваш бізнес і хочемо, щоб ви були задоволені нашими
            товарами! Будь ласка, зв'яжіться з нами, якщо у вас виникнуть
            будь-які питання щодо продукту, або якщо ми можемо вам чимось
            допомогти :)
          </Resp>
        </div>
        <Container
          className={classes.email}
          image="/Dev_test-react/Contact/email1.svg"
        >
          <Resp Tag="p" Class="b2" altClass="p2">
            Клієнтська підтримка:{" "}
          </Resp>
          <Resp
            Tag="a"
            Class="b2"
            altClass="p2"
            href="mailto:contact@gopurepod.com"
          >
            contact@vtcshop.com
          </Resp>
          <Resp Tag="p" Class="b2" altClass="p2">
            Для комерційних пропозицій:{" "}
          </Resp>
          <Resp
            Tag="a"
            Class="b2"
            altClass="p2"
            href="mailto:jim@blocenterprises.com"
          >
            jim@vtcshop.com
          </Resp>
          <Resp Tag="p" Class="b2" altClass="p2">
            Для преси:{" "}
          </Resp>
          <Resp
            Tag="a"
            Class="b2"
            altClass="p2"
            href="mailto:info@blocenterprises.com"
          >
            info@vtcshop.com
          </Resp>
        </Container>
        <Container
          className={classes.adress}
          image="/Dev_test-react/Contact/adress.svg"
        >
          <Resp Tag="p" Class="b2" altClass="p2">
            Адреса для листів:
          </Resp>
          <Resp
            Tag="a"
            href="https://maps.app.goo.gl/RUeWabeuZnnF6tsx8"
            Class="b2"
            altClass="p2"
            target="_blank"
          >
            вул, Хмельницьке шосе, 91/2, м. Вінниця, Вінницька область, Україна
          </Resp>
          <Resp Tag="p" Class="b2" altClass="p2">
            21000
          </Resp>
        </Container>
      </div>
    </section>
  );
};
export default Contacts;

const Container = ({ className, children, image }) => {
  return (
    <div className={classes.block}>
      <div className={className}>
        <div className={classes.imageBlock}>
          <img src={image} alt={className} />
        </div>
        <adress className={classes.textBlock}>{children}</adress>
      </div>
    </div>
  );
};
