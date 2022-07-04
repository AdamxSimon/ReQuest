// Custom Components

import CharacterCard from "../CharacterCard/CharacterCard";

// Styles

import classes from "./styles.module.css";

const CharacterManagement = (): JSX.Element => {
  return (
    <>
      <div className={classes.cardContainer}>
        <CharacterCard
          name={"Jimmy"}
          health={20}
          attack={24}
          defense={28}
          speed={32}
          strength={36}
          dexterity={40}
          constitution={44}
          intelligence={48}
          wisdom={52}
          charisma={56}
          skills={["Athletics", "History", "Medicine"]}
        />
      </div>
    </>
  );
};

export default CharacterManagement;
