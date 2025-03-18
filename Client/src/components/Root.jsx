import {
  Header,
  Footer,
  HeroSection,
  BestSellers,
  Advantages,
  Collections,
} from "./Components";

 const Root = () => {
  return (
    <>
      <Header />
      <HeroSection />
      <BestSellers />
      <section className="advantages">
        <Advantages />
      </section>
      <Collections />
      <Footer />
    </>
  );
}
export default Root;
