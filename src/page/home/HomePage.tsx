import DetailsPage from "../details/DetailsPage";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { imageData } from "../../data/images";
import { LayoutGroup, motion } from "framer-motion";
import "./home.scss";

export default function HomePage() {
  const navigate = useNavigate();
  const { index } = useParams();

  const [selectedImageIndex, setSelectedImageIndex] = useState(
    parseInt(index || "-1")
  );

  useEffect(() => {
    if (index !== undefined) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [index]);

  return (
    <LayoutGroup>
      <div className="grid">
        {imageData.slice(0, 12).map((image, idx) => (
          <motion.div
            key={idx}
            className="grid-item"
            onClick={() => {
              navigate(`/image/${idx}`);
              setSelectedImageIndex(idx);
            }}
          >
            <motion.img
              src={image.src}
              alt=""
              layout
              layoutId={`image-${idx}`}
              transition={{ duration: 0.6 }}
            />
          </motion.div>
        ))}
      </div>

      {index !== undefined ? (
        <DetailsPage selectedImageIndex={selectedImageIndex} />
      ) : null}
    </LayoutGroup>
  );
}
