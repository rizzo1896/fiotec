import "./style.css";
import favIcon from "../../assets/images/heart_icon.png";
import viewIcon from "../../assets/images/view_icon.png";

interface CustomButtonProps {
  title: string;
  onClick: () => void;
  icon?: "fav" | "view";
  isFav?: boolean;
}

export const CustomButton = ({
  title,
  icon,
  onClick,
  isFav,
}: CustomButtonProps) => {
  const iconSize = 15;
  return (
    <button className="custom-button" onClick={onClick}>
      {icon === "view" && <img src={viewIcon} alt="icon" width={iconSize} />}
      {icon === "fav" && (
        <img
          src={favIcon}
          alt="icon"
          width={iconSize}
          style={{
            // make a heart icon gray
            filter: isFav ? "none" : "grayscale(100%)",
          }}
        />
      )}
      {title}
    </button>
  );
};
