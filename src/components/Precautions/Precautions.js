import React from "react";
import { withStyles, useTheme, makeStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import MobileStepper from "@material-ui/core/MobileStepper";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import "./Precautions.css";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const tutorialSteps = [
  {
    label: "Novel Corona Virus (n-COVID-19) attacks in the earth.",
    imgPath: "https://i.pinimg.com/564x/25/92/b7/2592b771d751943bebec0ee58d32f5d3.jpg",
  },
  {
    label: "Coronavirus: Tracking Coronavirus",
    imgPath: "https://i.pinimg.com/564x/cb/af/e1/cbafe1a3d42356a64d97a7a76f73de43.jpg",
  },
  {
    label: "Do's & Don'ts When Wearing a Face Mask",
    imgPath: "https://i.pinimg.com/564x/e4/cd/5b/e4cd5b3bb6b4f2cae2d89ef0cfafb8b1.jpg",
  },
  {
    label: "PREVENT YOURSELF FROM COVID-19",
    imgPath: "https://i.pinimg.com/564x/8d/c7/8c/8dc78c7941d54d2f66e75895834cdefb.jpg",
  },
  {
    label: "Steps to proper hand hygiene",
    imgPath: "https://i.pinimg.com/564x/ef/3e/d3/ef3ed32ecb2954281ce3bbdbf0556feb.jpg",
  },
];

const Accordion = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",

    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: "rgba(0, 0, 0, .03)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

export default function Precautions() {
  const [expanded, setExpanded] = React.useState("panel1");

  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = tutorialSteps.length;
  const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 600,
      flexGrow: 1,
      margin: 30,
    },
    header: {
      display: "flex",
      alignItems: "center",
      height: 50,

      paddingLeft: theme.spacing(4),
      backgroundColor: theme.palette.background.default,
    },
    img: {
      height: 495,
      display: "block",

      overflow: "hidden",
      width: "100%",
    },
  }));

  const classes = useStyles();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      <React.Fragment>
        <Container
          maxWidth="md"
          style={{ backgroundColor: "rgba(0, 0, 0, .03)" }}
        >
          <Grid
            container
            direction="column"
            justify="space-evenly"
            alignItems="center"
            style={{ margin: "20px 0px" }}
          >
            <div style={{ margin: "15px 0px" }}>
              <Paper
                square
                elevation={0}
                className={classes.header}
              >
                <Typography>{tutorialSteps[activeStep].label}</Typography>
              </Paper>
              <AutoPlaySwipeableViews
                axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvents
              >
                {tutorialSteps.map((step, index) => (
                  <div key={step.label}>
                    {Math.abs(activeStep - index) <= 2 ? (
                      <img
                        className={classes.img}
                        src={step.imgPath}
                        alt={step.label}
                      />
                    ) : null}
                  </div>
                ))}
              </AutoPlaySwipeableViews>
              <MobileStepper
                steps={maxSteps}
                position="static"
                variant="text"
                activeStep={activeStep}
                nextButton={
                  <Button
                    size="small"
                    onClick={handleNext}
                    disabled={activeStep === maxSteps - 1}
                  >
                    Next
                    {theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                  </Button>
                }
                backButton={
                  <Button
                    size="small"
                    onClick={handleBack}
                    disabled={activeStep === 0}
                  >
                    {theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                    Back
                  </Button>
                }
              />
            </div>

            <div style={{ margin: "15px 0px" }}>
              <Typography
                variant="h5"
                gutterBottom
                style={{ backgroundColor: "white", padding: 10 }}
              >
                Frequently Asked Questions
              </Typography>
              <Accordion
                square
                expanded={expanded === "panel1"}
                onChange={handleChange("panel1")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                >
                  <Typography>What should I do if I have had close contact with someone who has COVID-19?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Be alert for symptoms. Watch for fever, cough, shortness of breath, or other symptoms of COVID-19.
                    Take your temperature and follow CDC guidance if you have symptoms.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion
                square
                expanded={expanded === "panel2"}
                onChange={handleChange("panel2")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2d-content"
                  id="panel2d-header"
                >
                  <Typography>How does the virus spread?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    The virus that causes COVID-19 is thought to spread mainly from person to person, mainly through
                    respiratory droplets produced when an infected person coughs, sneezes, or talks. These droplets can
                    land in the mouths or noses of people who are nearby or possibly be inhaled into the lungs. Spread
                    is more likely when people are in close contact with one another (within about 6 feet). COVID-19
                    seems to be spreading easily and sustainably in the community (“community spread”) in many affected
                    geographic areas. Community spread means people have been infected with the virus in an area,
                    including some who are not sure how or where they became infected.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion
                square
                expanded={expanded === "panel3"}
                onChange={handleChange("panel3")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel3d-content"
                  id="panel3d-header"
                >
                  <Typography>When should I seek emergency care if I have COVID-19?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Look for emergency warning signs* for COVID-19. If someone is showing any of these signs, seek
                    emergency medical care immediately Trouble breathing Persistent pain or pressure in the chest New
                    confusion Inability to wake or stay awake Bluish lips or face *This list is not all possible
                    symptoms. Please call your medical provider for any other symptoms that are severe or concerning to
                    you. Call 911 or call ahead to your local emergency facility: Notify the operator that you are
                    seeking care for someone who has or may have COVID-19.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion
                square
                expanded={expanded === "panel4"}
                onChange={handleChange("panel4")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel4d-content"
                  id="panel4d-header"
                >
                  <Typography>What is community spread?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Community spread means people have been infected with the virus in an area, including some who are
                    not sure how or where they became infected. Each health department determines community spread
                    differently based on local conditions. For information on community spread in your area, please
                    visit your health department's website.​
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div>
          </Grid>
        </Container>
      </React.Fragment>
    </div>
  );
}
