"use client";
import { useScroll, useTransform, motion, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";

export default function Home() {
  const target = useRef(null);
  const { scrollYProgress } = useScroll({
    target: target,
  });
  const [scaleYes, setScaleYes] = useState(1);
  const [scaleNo, setScaleNo] = useState(1);
  const [text, setText] = useState("");
  const [count, setCount] = useState(0);
  const messages = [
    "My rizz levels are critically low without your friendship.",
    "I'm as sorry as a cat who knocked over your favorite plant.",
    "Is your forgiveness WiFi? Because I'm trying to connect.",
    "My personal space awareness was on airplane mode.",
    "I promise to respect your boundaries like they're a spicy food warning.",
    "You deserve space like a cat deserves sunny spots.",
    "My friendship game needs a serious update.",
    "I'm about as smooth as chunky peanut butter right now.",
    "My emotional intelligence had a connection error.",
    "Can I ctrl+z my boundary issues?",
  ];
  const [yesClicked, setYesClicked] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  const logAction = async (action: string) => {
    try {
      await fetch("/api/log", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action,
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (error) {
      console.error("Failed to log action:", error);
    }
  };

  const handleClick = () => {
    setScaleYes((prev) => prev + 0.1);
    setScaleNo((prev) => prev - 0.1);
    setYesClicked(false);
    if (count < messages.length) {
      setText(messages[count]);
      setCount((prev) => prev + 1);
    } else {
      setText("Are you really really sure?");
    }

    // Log the "not yet" click
    logAction("clicked_not_yet");
  };

  const handleYesClick = () => {
    setYesClicked(true);
    // Log the "forgive" click
    logAction("clicked_forgive");
  };

  const scale1 = useTransform(scrollYProgress, [0, 0.2], [1, 1.3]);
  const opacity1 = useTransform(scrollYProgress, [0.1, 0.2], [1, 0]);

  const scale2 = useTransform(
    scrollYProgress,
    [0.2, 0.3, 0.3, 0.4], // Changed from [0.2, 0.4, 0.4, 0.6]
    [0.7, 1, 1, 1.3]
  );
  const opacity2 = useTransform(
    scrollYProgress,
    [0.2, 0.3, 0.35, 0.4], // Changed from [0.2, 0.4, 0.5, 0.6]
    [0, 1, 1, 0]
  );

  const scale3 = useTransform(
    scrollYProgress,
    [0.6, 0.65, 0.65, 0.7], // Changed from [0.6, 0.7, 0.7, 0.8]
    [0.7, 1, 1, 1.3]
  );
  const opacity3 = useTransform(
    scrollYProgress,
    [0.6, 0.65, 0.65, 0.7], // Changed from [0.6, 0.7, 0.7, 0.8]
    [0, 1, 1, 0]
  );

  const scale4 = useTransform(scrollYProgress, [0.8, 1], [0.7, 1]);
  const opacity4 = useTransform(scrollYProgress, [0.8, 1], [0, 1]);
  const bgColors = useTransform(
    scrollYProgress,
    [0, 0.3, 0.5, 0.7, 0.9],
    ["#ffffff", "#f5f5f7", "#f0f0f2", "#f5f5f7", "#ffffff"]
  );

  const scales1 = useSpring(scale1, { damping: 10 });
  const scales2 = useSpring(scale2, { damping: 10 });
  const scales3 = useSpring(scale3, { damping: 10 });
  const scales4 = useSpring(scale4, { damping: 10 });
  const opacities1 = useSpring(opacity1, { damping: 10 });
  const opacities2 = useSpring(opacity2, { damping: 10 });
  const opacities3 = useSpring(opacity3, { damping: 10 });
  const opacities4 = useSpring(opacity4, { damping: 10 });

  // Responsive adjustments for animations
  const personLeftXRange =
    typeof window !== "undefined" && window.innerWidth < 768
      ? ["0%", "-25%", "-40%"] // Mobile smaller movement
      : ["0%", "-45%", "-70%"]; // Desktop larger movement

  const personRightXRange =
    typeof window !== "undefined" && window.innerWidth < 768
      ? ["0%", "25%", "40%"] // Mobile smaller movement
      : ["0%", "45%", "70%"]; // Desktop larger movement

  const personLeftX = useTransform(
    scrollYProgress,
    [0.4, 0.5, 0.59],
    personLeftXRange
  );

  const personRightX = useTransform(
    scrollYProgress,
    [0.4, 0.5, 0.59],
    personRightXRange
  );

  const spacingSectionOpacity = useTransform(
    scrollYProgress,
    [0.4, 0.425, 0.589, 0.59], // Changed from [0.4, 0.45, 0.55, 0.6]
    [0, 1, 1, 0]
  );

  useEffect(() => {
    function handleScroll() {
      // Log first scroll event
      if (!hasScrolled && scrollYProgress.get() > 0) {
        setHasScrolled(true);
        logAction("started_scrolling");
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollYProgress, hasScrolled]);

  // Also log page load
  useEffect(() => {
    logAction("page_loaded");
  }, []);

  // Add a bounce animation for emojis
  const bounceAnimation = {
    y: [0, -10, 0],
    transition: {
      repeat: Infinity,
      duration: 1.5,
      ease: "easeInOut",
    },
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md px-5 py-4 flex items-center justify-between transition-all duration-300">
        <div className="font-light text-lg tracking-tight text-blue-700">
          Hi pandy.
        </div>
      </nav>
      <motion.main
        ref={target}
        className="flex h-[1500vh] flex-col items-center text-black bg-white"
        style={{ background: bgColors }}
      >
        <div className="sticky top-0 left-0 h-[100vh] w-[100vw] bg-white">
          <div className="flex flex-col absolute justify-center items-center w-[100vw] h-[100vh]">
            <motion.h1
              className="text-4xl md:text-6xl font-light tracking-tight mt-10 text-center px-4 max-w-3xl"
              style={{
                scale: scales1,
                opacity: opacities1,
              }}
            >
              Houston, we have a friendship problem.
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl font-light text-gray-500 mt-6 max-w-xl text-center px-4"
              style={{ opacity: opacities1 }}
            >
              My personal space radar needs a serious upgrade.
            </motion.p>
            <motion.div
              className="relative top-10 border border-gray-300 rounded-full py-2 px-4 mt-4"
              style={{
                opacity: opacities1,
              }}
            >
              <span className="text-sm text-gray-500">
                Scroll for my epic apology
              </span>
            </motion.div>
            <motion.p
              className="text-sm text-gray-500 mt-4 relative top-20 tracking-tight"
              style={{
                opacity: opacities1,
              }}
            >
              I worked hard on building this hehe 🥰
            </motion.p>
          </div>
          <motion.div
            className="flex absolute justify-center items-center w-[100vw] h-[100vh] px-6 bg-white"
            style={{
              scale: scales2,
              opacity: opacities2,
            }}
          >
            <h2 className="text-3xl md:text-5xl font-light tracking-tighter text-center max-w-3xl">
              I&apos;m sorry my clinginess level was set to &quot;koala
              bear&quot; mode.
            </h2>
          </motion.div>

          {/* Animated people section */}
          <motion.div
            className="flex absolute justify-center items-center w-[100vw] h-[100vh] bg-white"
            style={{
              opacity: spacingSectionOpacity,
            }}
          >
            <div className="relative w-full flex flex-col justify-center items-center">
              <motion.p
                className="text-xl mb-8 text-center px-4 font-light"
                animate={{ opacity: [0, 1, 1, 0], y: [20, 0, 0, -20] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                Giving you space.....
              </motion.p>

              <div className="flex items-center">
                <motion.div
                  className="text-7xl"
                  style={{ x: personLeftX }}
                  animate={bounceAnimation}
                >
                  👩
                </motion.div>

                <motion.div
                  className="text-7xl"
                  style={{ x: personRightX }}
                  animate={bounceAnimation}
                >
                  👨
                </motion.div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col absolute justify-center items-center w-[100vw] h-[100vh] bg-white"
            style={{
              scale: scales3,
              opacity: opacities3,
            }}
          >
            <h3 className="text-2xl md:text-3xl font-medium text-center px-6 relative">
              I&apos;ve been thinking about our friendship...
              <br />
              <span className="text-xs md:text-2xl right-0.5 rotate-3 font-light text-gray-600 mt-4 block absolute -top-10">
                (And my complete lack of rizz in handling it)
              </span>
            </h3>
            <p className="text-sm md:text-base font-light text-gray-500 text-center mt-4 px-6">
              Here comes the big question
            </p>
          </motion.div>
          <motion.div
            className="flex flex-col absolute justify-center items-center w-[100vw] h-[100vh] px-4"
            style={{
              scale: scales4,
              opacity: opacities4,
            }}
          >
            <div className="bg-white flex flex-col items-center justify-center p-6 md:p-10 rounded-lg z-10 max-w-xl w-[90%] md:w-auto">
              <h3 className="text-3xl md:text-4xl font-light tracking-tight text-center px-2 md:px-4">
                Will you let me back into the friend zone?
              </h3>
              <p className="font-light text-gray-600 text-center my-4 text-sm md:text-base">
                {text}
              </p>

              <div className="flex mt-7 gap-4 md:gap-10 items-center">
                <motion.button
                  className="text-center text-base md:text-xl bg-blue-700 text-white px-3 py-2 rounded-lg transition-all duration-300 ease-in-out"
                  style={{ scale: scaleYes }}
                  onClick={handleYesClick}
                  whileHover={{
                    rotate: [0, -5, 5, 0],
                    transition: { duration: 0.5 },
                  }}
                >
                  Fine, you&apos;re forgiven
                </motion.button>
                <motion.button
                  className="text-white text-base md:text-xl px-3 py-2 rounded-lg bg-black transition-all duration-300 ease-in-out"
                  style={{ scale: scaleNo }}
                  onClick={handleClick}
                >
                  Try harder
                </motion.button>
                {yesClicked ? <Fireworks autorun={{ speed: 1 }} /> : null}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.main>
    </>
  );
}
