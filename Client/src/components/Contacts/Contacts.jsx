import classes from "./contacts.module.scss";
import {Resp} from "../Components.js"

const Contacts = () => {
  return (
    <section className={classes.contactsSection}>
      <div className={classes.contacts_wrap}>
        <div className={classes.textBox}>
          <Resp Tag="p" Class="b1" altClass="S18_L26">
            We appreciate your business and want to ensure you are satisfied
            with your GOpure product! Please contact us with any questions you
            have about the product, or if we can help you in any way.
          </Resp>
        </div>
        <Container
          className={classes.email}
          image="/Dev_test-react/Contact/email1.svg" 
        >
          <Resp Tag="p" Class="b2" altClass="p2">For customer support: </Resp>
          <Resp Tag="a" Class="b2" altClass="p2" href="mailto:contact@gopurepod.com">
            contact@gopurepod.com
          </Resp>
          <Resp Tag="p" Class="b2" altClass="p2">For sales inquiries: </Resp>
          <Resp Tag="a" Class="b2" altClass="p2" href="mailto:jim@blocenterprises.com">
            jim@blocenterprises.com
          </Resp>
          <Resp Tag="p" Class="b2" altClass="p2">For press inquiries: </Resp>
          <Resp Tag="a" Class="b2" altClass="p2" href="mailto:info@blocenterprises.com">
            info@blocenterprises.com
          </Resp>
        </Container>
        <Container
          className={classes.adress}
          image="/Dev_test-react/Contact/adress.svg"
        >
          <Resp Tag="p" Class="b2" altClass="p2">Mailing Address:</Resp>
          <Resp Tag="a" href="https://maps.app.goo.gl/W4hFfYooXiB7aAoE6" Class="b2" altClass="p2" target="_blank">
            Bloc Enterprises, LLC, 11 Grumman Hill Road, Suite 1A
          </Resp>
          <Resp Tag="p" Class="b2" altClass="p2">Wilton, CT 06897</Resp>
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
