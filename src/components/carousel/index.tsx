// TODO: Open Source this thing. It's actually pretty darn sweet....
import React, { useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import debounce from "debounce";
import classnames from "classnames";

interface Props {
  children: JSX.Element[];
}

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
  },
  container: {
    display: "flex",
    overflowX: "auto",
    overflowY: "hidden",
    width: "100%",
  },
  disabled: {
    "&&": {
      background: "#aaa",
      color: "#999",
    },
  },
  arrow: {
    background: "#eee",
    position: "absolute",
    zIndex: 2,
    top: "25%",
    transform: "translateY(-50%)",
    borderRadius: 100,
    width: 50,
    height: 50,
  },
  leftArrow: {
    left: 10,
    "&::after": {
      content: '"<"',
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      position: "absolute",
      fontWeight: "bold",
    },
  },
  rightArrow: {
    right: 10,
    "&::after": {
      content: '">"',
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      position: "absolute",
      fontWeight: "bold",
    },
  },
}));

const getClosestFixedScrollPos = (
  children: HTMLCollection,
  currentScrollLeft: number,
  offset: number = 0
) => {
  const elementPositions = Array.from(children).map((el: any) => el.offsetLeft);

  const closestValidOffsetLeft = elementPositions.reduce((prev, curr) =>
    Math.abs(curr - currentScrollLeft) < Math.abs(prev - currentScrollLeft)
      ? curr
      : prev
  );

  // Let us specify to return the item to the left or right by using Offset
  let newElIndex = elementPositions.indexOf(closestValidOffsetLeft) + offset;
  if (offset > 0) {
    newElIndex = Math.min(elementPositions.length - 1, newElIndex);
  }
  if (offset < 0) {
    newElIndex = Math.max(0, newElIndex);
  }

  return elementPositions[newElIndex];
};

const Carousel = (props: Props) => {
  const classes = useStyles();
  const containerRef = useRef<HTMLDivElement>(null);
  const [carouselScrollPos, setCarouselScrollPos] = useState<number>(0);

  const setScrollPos = (pos: number): void => {
    containerRef.current?.scrollTo({
      left: pos,
      behavior: "smooth",
    });

    setCarouselScrollPos(pos);
  };

  const handleManualScroll = debounce((event: any) => {
    const closestItemScrollPos = getClosestFixedScrollPos(
      event.target.children,
      event.target.scrollLeft
    );
    setScrollPos(closestItemScrollPos);
  }, 100);

  return (
    <div className={classes.root}>
      <div
        onScroll={(e) => {
          e.persist();
          handleManualScroll(e);
        }}
        className={classes.container}
        ref={containerRef}
      >
        {props.children}
      </div>
      <div
        className={classnames(classes.leftArrow, classes.arrow, {
          [classes.disabled]: carouselScrollPos === 0,
        })}
        onClick={(e: any) => {
          if (!containerRef.current) {
            return;
          }

          const newScrollPos = getClosestFixedScrollPos(
            containerRef.current.children,
            containerRef.current.scrollLeft,
            -1
          );

          setScrollPos(newScrollPos);
        }}
      />

      <div
        className={classnames(classes.rightArrow, classes.arrow, {
          [classes.disabled]:
            !!containerRef.current &&
            carouselScrollPos +
              containerRef.current?.getBoundingClientRect().width >=
              containerRef.current.scrollWidth,
        })}
        onClick={(e: any) => {
          if (!containerRef.current) {
            return;
          }

          const newScrollPos = getClosestFixedScrollPos(
            containerRef.current.children,
            containerRef.current.scrollLeft,
            +1
          );

          setScrollPos(newScrollPos);
        }}
      />
    </div>
  );
};

export default Carousel;
