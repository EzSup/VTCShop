import React, { useRef, useState, useEffect, useCallback } from "react";
import Item from "../Items/Item";
import "./bestSellers.scss";
import GetData from "../GetData";
import { SectionTitle as Title, Loading } from "../Components";

const BestSellers = () => {
  return (
    <section className="best-seller">
      <div className="wrap">
        <Title Href="/Collection" title="Best Sellers" />
        <ScrollContainer />
      </div>
    </section>
  );
};
export default BestSellers;

const ScrollContainer = () => {
  const scrollContainerRef = useRef(null);
  const scrollbarThumbRef = useRef(null);

  const { handleMouseDown, updateThumbPosition } = useCustomScroll(
    scrollContainerRef,
    scrollbarThumbRef
  );

  const { items, loading } = GetData({ name: "items" });
  const [bestSellers, setBestSellers] = useState([]);

  useEffect(() => {
    if (items.length > 5) {
      const randomSelection = items.sort(() => 0.5 - Math.random()).slice(0, 5);
      setBestSellers(randomSelection);
    }
  }, [items]);

  const handleScroll = useCallback(() => {
    updateThumbPosition();
  }, [updateThumbPosition]);

  if (loading) return <Loading />;

  return (
    <div className="scroll-wrapper">
      <div
        className="scroll-container"
        ref={scrollContainerRef}
        onScroll={handleScroll}
      >
        {bestSellers.map((item, index) => (
          <Item key={index} {...item} />
        ))}
      </div>
      <div className="customScrollbar">
        <div
          className="scrollbarThumb"
          ref={scrollbarThumbRef}
          onMouseDown={handleMouseDown}
        />
      </div>
    </div>
  );
};

const useCustomScroll = (scrollContainerRef, scrollbarThumbRef) => {
  const [isDragging, setIsDragging] = useState(false);

  const calculateDimensions = useCallback(() => {
    const scrollContainer = scrollContainerRef.current;
    const scrollbarThumb = scrollbarThumbRef.current;

    if (!scrollContainer || !scrollbarThumb) return null;

    const { scrollWidth, clientWidth, scrollLeft } = scrollContainer;
    const scrollbarWidth = scrollbarThumb.parentElement.offsetWidth;
    const maxThumbPos = scrollbarWidth - scrollbarThumb.offsetWidth;
    const maxScrollLeft = scrollWidth - clientWidth;

    return { scrollLeft, maxScrollLeft, maxThumbPos };
  }, [scrollContainerRef, scrollbarThumbRef]);

  const updateThumbPosition = useCallback(() => {
    const { scrollLeft, maxScrollLeft, maxThumbPos } =
      calculateDimensions() || {};
    if (maxScrollLeft === undefined) return;

    const thumbPos = (scrollLeft / maxScrollLeft) * maxThumbPos;
    scrollbarThumbRef.current.style.left = `${thumbPos}px`;
  }, [calculateDimensions, scrollbarThumbRef]);

  const handleMouseDown = useCallback((e) => {
    setIsDragging(true);
    e.preventDefault();
  }, []);

  const handleMouseMove = useCallback(
    (e) => {
      if (!isDragging) return;

      const { maxScrollLeft, maxThumbPos } = calculateDimensions() || {};
      if (maxScrollLeft === undefined) return;

      const thumbPos = Math.min(
        Math.max(0, e.clientX - scrollbarThumbRef.current.offsetWidth / 2),
        maxThumbPos
      );
      scrollContainerRef.current.scrollLeft =
        (thumbPos / maxThumbPos) * maxScrollLeft;
      updateThumbPosition();
    },
    [
      isDragging,
      calculateDimensions,
      updateThumbPosition,
      scrollContainerRef,
      scrollbarThumbRef,
    ]
  );

  const handleMouseUp = useCallback(() => setIsDragging(false), []);

  useEffect(() => {
    if (!isDragging) return;

    const handleGlobalMouseMove = (e) => handleMouseMove(e);
    const handleGlobalMouseUp = handleMouseUp;

    window.addEventListener("mousemove", handleGlobalMouseMove);
    window.addEventListener("mouseup", handleGlobalMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleGlobalMouseMove);
      window.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  useEffect(() => {
    updateThumbPosition();
  }, [updateThumbPosition]);

  return { handleMouseDown, updateThumbPosition };
};
