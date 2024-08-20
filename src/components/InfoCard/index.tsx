import { Stack } from "react-bootstrap";
import { CustomButton } from "../CustomButton";
import { IProjeto } from "../../pages/highlightedProjects";
import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";

interface InfoCardProps {
  title: string;
  description: string;
  image: string;
  data: IProjeto;
}

export const InfoCard = ({
  title,
  description,
  image,
  data,
}: InfoCardProps) => {
  const navigate = useNavigate();
  const [favoriteState, setFavoriteState] = useState(() => {
    const savedFavorites = localStorage.getItem("favorite");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  const handleSaveProject = () => {
    const savedFavorites = localStorage.getItem("favorite");
    let favoritesArray = savedFavorites ? JSON.parse(savedFavorites) : [];

    if (favoritesArray.includes(data.id)) {
      favoritesArray = favoritesArray.filter(
        (favId: number) => favId !== data.id
      );
    } else {
      favoritesArray.push(data.id);
    }

    localStorage.setItem("favorite", JSON.stringify(favoritesArray));
    setFavoriteState(favoritesArray);
  };

  const isFavorite = useMemo(() => {
    return favoriteState.includes(data.id);
  }, [data.id, favoriteState]);

  return (
    <div
      style={{
        maxWidth: "240px",
        justifyContent: "center",
      }}
    >
      <img src={image} alt={title} style={{ width: "235px" }} />

      <p
        className="mt-2"
        style={{
          fontWeight: 700,
          fontSize: 14,
          textAlign: "center",
        }}
      >
        {title.length > 60 ? `${title.substring(0, 60)}...` : title}
      </p>

      <p
        style={{
          textAlign: "center",
        }}
      >
        {description.length > 100
          ? `${description.substring(0, 100)}...`
          : description}
      </p>

      <Stack direction="horizontal" gap={2}>
        <CustomButton
          title="Acessar"
          onClick={() => {
            navigate(`/projetos-destaque/${data.id}`);
          }}
          icon="view"
        />

        <CustomButton
          title="Favoritar"
          onClick={handleSaveProject}
          icon="fav"
          isFav={isFavorite}
        />
      </Stack>
    </div>
  );
};
