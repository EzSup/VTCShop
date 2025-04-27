import { Header, Footer, HeroSection, Shop, Resp } from "./Components";

const CollectionPage = () => {
  return (
    <>
      <Header />
      <HeroSection BgClass="Collection_Bg" className="Container_OnlyTitle">
        {/* <div className="HeroSection_title" style={{ color: "#1577c1" }}>
          <Resp
            Tag="h3"
            Class="S36_L46"
            altClass="Mobile S26"
            targetWidth="640"
          >
            Мерч нашого улюбленого коледжу
          </Resp>
        </div> */}
      </HeroSection>
      <Shop />
      <Footer />
    </>
  );
};
export default CollectionPage;
