import Button from "../Button/Button";
import "./heroSection.scss";
import { useNavigate } from "react-router-dom";
import { Resp } from "../Components";

const headingsData = [
  {
    text: "make a",
    baseTag: "h2",
    altTag: "h1",
    baseClass: "S64_L78 bold_text",
    altClass: "Mobile bold_text",
  },
  {
    text: "great",
    baseTag: "h1",
    altTag: "h2",
    baseClass: "S72_L94 italic",
    altClass: "Mobile italic",
  },
  {
    text: "first",
    baseTag: "h2",
    altTag: "h1",
    baseClass: "S64_L78 bold_text",
    altClass: "Mobile bold_text",
  },
  {
    text: "Impression",
    baseTag: "h2",
    altTag: "h1",
    baseClass: "S64_L78 bold_text",
    altClass: "Mobile bold_text",
  },
];

const HeroSection = ({ BgClass, className = "", children }) => {
  const HasBg = BgClass && BgClass.trim() !== "";
  const Haschildren = !!children;
  return (
    <section className={`hero-section ${HasBg ? BgClass : ""}`}>
      <Container className={className} />
      {Haschildren ? children : null}
    </section>
  );
};
export default HeroSection;

const Container = ({ className }) => {
  const navigate = useNavigate();

  return (
    <div className={`container ${className}`}>
      <div className="text_with-button">
        <div className="textbox">
          <div className="title">
            {headingsData.map((heading, index) => (
              <Resp
                key={index}
                Tag={heading.baseTag}
                AltTag={heading.altTag}
                Class={heading.baseClass}
                altClass={heading.altClass}
              >
                {heading.text}
              </Resp>
            ))}
          </div>
          <div className="subtext">
            <Resp Tag="p" Class="pargraph S18_L26" altClass="p2">
              Add images and text to give focus to your chosen product,
              collection, or blog post
            </Resp>
          </div>
        </div>
        <Button Width="180px" Onclick={() => navigate("/Collection")}>
          Shop Now
        </Button>
      </div>
    </div>
  );
};
