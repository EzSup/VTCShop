import { useState, useEffect } from "react";
import "./header.scss";
import { Message } from "../Components";
import { Link } from "react-router-dom";

const Header = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalText, setModalText] = useState("");

  const HandleShowModal = (text) => {
    setModalText(text);
    setModalOpen(true);
  };
  const closeMessage = () => {
    setModalOpen(false);
  };

  const [isMobile, setIsMobile] = useState(window.innerWidth < 1200);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1200);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className="header-with_promo">
      <PromoDiv />
      <div className="header">
        <div className="wrap">
          <div className="header-part left-part">
            {!isMobile ? (
              <ul>
                <HeaderHref Href="/Collection?type=long-sleeve" Class="p2">
                  Crew Necks
                </HeaderHref>
                <HeaderHref Href="/Collection?type=t-short" Class="p2">
                  V-Necks
                </HeaderHref>
                <HeaderHref
                  Href="/Collection?type=long-sleeve%2Ct-short"
                  Class="p2"
                >
                  Activewear
                </HeaderHref>
                <HeaderHref Href="/Collection?color=other" Class="p2">
                  Bundles
                </HeaderHref>
                <MoreDiv Class="p2" />
              </ul>
            ) : (
              <BurgerMenu OnClick = {() => HandleShowModal("Error: Page Not Found")}/>
            )}
          </div>
          <div className="nav_logo">
            <Link to="/" className="Focused_logo"></Link>
          </div>
          <div className="header-part right-part">
            <ul>
              <HeaderHref Href="/Collection/" Class="cart" />
              <HeaderHref
                onClick={() => HandleShowModal("Error: Page Not Found")}
                Class="search"
              />
              <HeaderHref
                onClick={() => HandleShowModal("Error: Page Not Found")}
                Class="user"
              />
              <Message
                open={modalOpen}
                duration={2000}
                onClose={closeMessage}
                type="error"
              >
                {modalText}
              </Message>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;

const HeaderHref = ({ Href, Class, children, onClick }) => {
  const hasHref = Href && Href.trim() !== "";
  const handleClick = (e) => {
    if (!hasHref && onClick) {
      e.preventDefault();
      onClick();
    }
  };
  return (
    <li>
      {hasHref ? (
        <Link to={Href} className={Class}>
          {children}
        </Link>
      ) : (
        <button onClick={handleClick} className={Class} title={Class}>
          {children}
        </button>
      )}
    </li>
  );
};

const PromoDiv = () => {
  return (
    <div className="promoSection">
      <div className="promo-content">
        <div className="textbox">
          <div className="System S12_L20 UpC">
            free united kingdom shipping $200 +
          </div>
        </div>
      </div>
    </div>
  );
};

const MoreDiv = ({ Class }) => {
  const [hidden, setHidden] = useState(true);
  const ShowMore = () => {
    setHidden(hidden ? false : true);
  };
  const handleClickOutside = (e) => {
    if (!e.target.closest(".More-button") && !e.target.closest(".more")) {
      setHidden(true);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <HeaderHref onClick={ShowMore} Class="More-button">
        <svg
          width="18"
          height="10"
          viewBox="0 0 18 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${!hidden ? "hide" : ""}`}
        >
          <path
            d="M16.5 1L9 8.5L1.5 1"
            stroke="#212322"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </HeaderHref>
      <div className={`more ${!hidden ? "shown" : ""}`}>
        <div className="list">
          <Link to="/About/" className={Class}>
            About Us
          </Link>
          <Link to="/Contacts/" className={Class}>
            Contact Us
          </Link>
          <Link to="/Collection/" className={Class}>
            Collection
          </Link>
        </div>
      </div>
    </>
  );
};

const BurgerMenu = ({ OnClick }) => {
  const [isOpen, SetIsOpen] = useState(false);

  const ToggleBurgerMenu = () => {
    SetIsOpen((prev) => !prev);
  };
  return (
    <>
      <div
        className={`burgerMenu ${isOpen ? "opened" : ""}`}
        onClick={ToggleBurgerMenu}
      >
        <div className="burger"></div>
        <ul className="burger_list">
          <HeaderHref Href="/Collection?type=long-sleeve" Class="p2">
            Crew Necks
          </HeaderHref>
          <HeaderHref Href="/Collection?type=t-short" Class="p2">
            V-Necks
          </HeaderHref>
          <HeaderHref Href="/Collection?type=long-sleeve%2Ct-short" Class="p2">
            Activewear
          </HeaderHref>
          <HeaderHref Href="/Collection?color=other" Class="p2">
            Bundles
          </HeaderHref>
          <HeaderHref Href="/About/" Class="p2">
            About Us
          </HeaderHref>
          <HeaderHref Href="/Contacts/" Class="p2">
            Contact Us
          </HeaderHref>
          <HeaderHref Href="/Collection/" Class="p2">
            Collection
          </HeaderHref>
        </ul>
      </div>
      <ul>
      <HeaderHref
        onClick={OnClick}
        Class="search"
      />
      </ul>
    </>
  );
};
