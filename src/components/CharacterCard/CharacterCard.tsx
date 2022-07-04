// Styles

import classes from "./styles.module.css";

interface CharacterCardProps {
  name: string;
  health: number;
  attack: number;
  defense: number;
  speed: number;
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  skills: string[];
}

const CharacterCard = (props: CharacterCardProps): JSX.Element => {
  const {
    name,
    health,
    attack,
    defense,
    speed,
    strength,
    dexterity,
    constitution,
    intelligence,
    wisdom,
    charisma,
    skills,
  } = props;

  return (
    <div className={classes.characterCard}>
      <div className={classes.infoContainer}>
        <div className={classes.info}>
          <div className={classes.label}>HP</div>
          <div className={classes.value}>{health}</div>
        </div>
        <div className={classes.info}>
          <div className={classes.label}>ATK</div>
          <div className={classes.value}>{attack}</div>
        </div>
        <div className={classes.portrait}>
          <img src={require("../../assets/person.png")} />
          <div className={classes.nameContainer}>{name}</div>
        </div>
        <div className={classes.info}>
          <div className={classes.label}>DEF</div>
          <div className={classes.value}>{defense}</div>
        </div>
        <div className={classes.info}>
          <div className={classes.label}>SPD</div>
          <div className={classes.value}>{speed}</div>
        </div>
      </div>
      <div className={classes.attributesContainer}>
        <div className={classes.info}>
          <div className={classes.label}>STR</div>
          <div className={classes.value}>{strength}</div>
        </div>
        <div className={classes.info}>
          <div className={classes.label}>DEX</div>
          <div className={classes.value}>{dexterity}</div>
        </div>
        <div className={classes.info}>
          <div className={classes.label}>CON</div>
          <div className={classes.value}>{constitution}</div>
        </div>
        <div className={classes.info}>
          <div className={classes.label}>INT</div>
          <div className={classes.value}>{intelligence}</div>
        </div>
        <div className={classes.info}>
          <div className={classes.label}>WIS</div>
          <div className={classes.value}>{wisdom}</div>
        </div>
        <div className={classes.info}>
          <div className={classes.label}>CHA</div>
          <div className={classes.value}>{charisma}</div>
        </div>
      </div>
      <div className={classes.skillsContainer}>
        {skills.map((skill, index) => {
          if (index !== skills.length - 1) {
            return `${skill} - `;
          } else {
            return skill;
          }
        })}
      </div>
    </div>
  );
};

export default CharacterCard;
