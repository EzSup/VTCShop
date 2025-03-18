import Title from "../SectionTitle/SectionTitle";
import "./Collections.scss";
import { useState, useEffect } from "react";

const Collections = () => {
  const [beforeItemPos, setBeforeItemPos] = useState(0.9);
  const [streakPos, setStreakPos] = useState(0.9);
  const [isDragging, setIsDragging] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const handleMouseOrTouchDown = () => {
    setIsDragging(true);
  };

  const handleMouseOrTouchMove = (e) => {
    if (!isDragging) return;
    const clientX = e.type === "mousemove" ? e.clientX : e.touches[0].clientX;
    const streakPosition = clientX / window.innerWidth;
    setBeforeItemPos(Math.max(0.1, Math.min(0.9, streakPosition)));
    setStreakPos(Math.max(0.1, Math.min(0.9, streakPosition)));
  };

  const handleMouseOrTouchUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseOrTouchMove);
      window.addEventListener("mouseup", handleMouseOrTouchUp);
      window.addEventListener("touchmove", handleMouseOrTouchMove);
      window.addEventListener("touchend", handleMouseOrTouchUp);
    } else {
      window.removeEventListener("mousemove", handleMouseOrTouchMove);
      window.removeEventListener("mouseup", handleMouseOrTouchUp);
      window.removeEventListener("touchmove", handleMouseOrTouchMove);
      window.removeEventListener("touchend", handleMouseOrTouchUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseOrTouchMove);
      window.removeEventListener("mouseup", handleMouseOrTouchUp);
      window.removeEventListener("touchmove", handleMouseOrTouchMove);
      window.removeEventListener("touchend", handleMouseOrTouchUp);
    };
  }, [isDragging]);

  return (
    <section className="collections">
      <div className="wrap">
        <Title Strong title="Compare in different size">
          <div className="tabs_container">
            <div className="tabs">
              <Tab isActive={activeTab === 0} onClick={() => handleTabClick(0)}>
                Medium
              </Tab>
              <Tab isActive={activeTab === 1} onClick={() => handleTabClick(1)}>
                Large
              </Tab>
              <Tab isActive={activeTab === 2} onClick={() => handleTabClick(2)}>
                X-Large
              </Tab>
            </div>
          </div>
        </Title>

        <div className="BeforeAfter-element">
          <Before Style={{ width: `${beforeItemPos * 100}%` }} />
          <div
            className="moving_streak"
            onMouseDown={handleMouseOrTouchDown}
            onTouchStart={handleMouseOrTouchDown}
            style={{ left: `${streakPos * 100}%` }}
          >
            <div className="arrows"></div>
          </div>
          <After />
        </div>
      </div>
    </section>
  );
};
export default Collections;

const Tab = ({ isActive, onClick, children }) => {
  return (
    <a
      href="#"
      className={isActive ? "active" : ""}
      onClick={(e) => {
        e.preventDefault();
        onClick(console.log({ children }));
      }}
    >
      {children}
    </a>
  );
};

const Before = ({ Style }) => {
  return (
    <div className="before" style={Style}>
      <div className="title">
        <h5 className="S24_L32 Bold">Other Brands</h5>
      </div>
      <div className="image">
        <img
          src="/Dev_test-react/Collections/OtherBrands.png"
          draggable="false"
          alt=""
        />
      </div>
    </div>
  );
};

const After = () => {
  return (
    <div className="after">
      <div className="title">
        <div className="focused-Logo"></div>
      </div>
      <div className="image">
        <img
          src="/Dev_test-react/Collections/Focused.png"
          draggable="false"
          alt=""
        />
      </div>
    </div>
  );
};
