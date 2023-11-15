import { useNavigate, useParams } from "react-router-dom";
import "./details.scss";
import { AnimatePresence, motion } from "framer-motion";
import { imageData } from "../../data/images";

type DetailsPageProps = {
  selectedImageIndex: number;
};

export default function DetailsPage(props: DetailsPageProps) {
  const { selectedImageIndex } = props;
  const { index } = useParams();
  const navigate = useNavigate();

  const phrases = [
    "This practice of creating circumstances",
    "and of creating pictures in the minds of",
    "millions of persons is very common.",
  ];

  const slideIn = {
    initial: {
      y: "100%",
      opacity: 0,
    },
    enter: {
      y: "0",
      opacity: 1,
      transition: {
        duration: 0.6,
        delay: 0.55,
      },
    },
  };

  const animation = {
    initial: {
      y: "100%",
    },
    enter: (i: number) => ({
      y: "0",
      transition: {
        duration: 0.6,
        ease: [0.33, 1, 0.68, 1],
        delay: 0.07 * i,
      },
    }),
  };

  return (
    <AnimatePresence>
      <motion.div className="layout">
        <div className="info">
          <div>
            <div className="line-mask">
              <motion.p
                className="index"
                variants={slideIn}
                initial="initial"
                animate="enter"
              >
                {index && parseInt(index) < 10 ? `0${index}` : index}
              </motion.p>
            </div>
            <div className="line-mask">
              <motion.h1
                className="title"
                variants={slideIn}
                initial="initial"
                animate="enter"
              >
                Millions
              </motion.h1>
            </div>
            <div className="description">
              {phrases.map((phrase, idx) => (
                <div key={idx} className="line-mask">
                  <motion.p
                    custom={index}
                    variants={animation}
                    initial="initial"
                    animate="enter"
                  >
                    {phrase}
                  </motion.p>
                </div>
              ))}
            </div>
            <div className="line-mask">
              <motion.button
                className="link"
                onClick={() => navigate("/")}
                variants={slideIn}
                initial="initial"
                animate="enter"
              >
                View more
              </motion.button>
            </div>
          </div>
          <div>{/* insert overview here */}</div>
        </div>

        <div className="images">
          {imageData[selectedImageIndex - 1]?.src && (
            <motion.img
              className="image sub-1"
              src={imageData[selectedImageIndex - 1]?.src}
              alt=""
              initial={{ y: "-10%", opacity: 0 }}
              animate={{ y: "1%", opacity: 1 }}
              exit={{ y: "-10%", opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            />
          )}
          <motion.img
            layoutId={`image-${index}`}
            className="image"
            src={imageData[selectedImageIndex]?.src}
            alt=""
            transition={{ duration: 0.6 }}
          />
          {imageData[selectedImageIndex + 1]?.src && (
            <motion.img
              className="image sub-2"
              src={imageData[selectedImageIndex + 1]?.src}
              alt=""
              initial={{ y: "10%", opacity: 0 }}
              animate={{ y: "1%", opacity: 1 }}
              exit={{ y: "10%", opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            />
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
