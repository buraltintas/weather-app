import classes from "./About.module.css";

const About = () => {
  return (
    <div className={classes.about}>
      <h1 className={classes.aboutHeading}>Weather App Demonstration</h1>
      <p className={classes.aboutVersion}>v1.0.0</p>
    </div>
  );
};

export default About;
