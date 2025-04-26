import { Header, Footer, HeroSection, Contacts, Resp } from "./Components";

const Contact = () => {
  return (
    <>
      <Header />
      <HeroSection BgClass="ContactUs_Bg" className="Container_OnlyTitle">
        <div className="HeroSection_title">
          <Resp Tag="h1" Class="Headline" altClass="Mobile">
            Зв'язатись з нами
          </Resp>
        </div>
      </HeroSection>
      <Contacts />
      <Footer />
    </>
  );
};
export default Contact;
