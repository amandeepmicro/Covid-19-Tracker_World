import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import Tooltip from "@material-ui/core/Tooltip";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: 10,
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
}));

export default function Contact() {
  const classes = useStyles();
  //   direction="column"
  //   justify="space-around"
  //   alignItems="center"
  return (
    <div>
      <Grid
        container
        spacing={3}
        style={{ marginBottom: "150px", height: "100%" }}
      >
        <Grid
          item
          xs={6}
          sm={3}
        >
          <Tooltip title="click to visit">
            <Card
              className={classes.root}
              onClick={() => window.open(`https://www.mohfw.gov.in/`, "_blank")}
            >
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image="./mohfw.png"
                  title="Mohfw India"
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h2"
                  >
                    MOHFW - India
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Government of India updates on COVID-19 Helpline Number :+91-11-23978046 , Toll Free : 1075 ,
                    Helpline Email ID : ncov2019@gov.in
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Tooltip>
        </Grid>
        <Grid
          item
          xs={6}
          sm={3}
        >
          <Tooltip title="click to visit">
            <Card
              className={classes.root}
              onClick={() => window.open(`https://www.who.int/health-topics/coronavirus#tab=tab_1`, "_blank")}
            >
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image="./who.png"
                  title="who"
                />

                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h2"
                  >
                    WHO
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    WHO Portal for Coronavirus. Join WhatsApp- Send "hi" to +41 79 893 18 92 on WhatsApp
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Tooltip>
        </Grid>
        <Grid
          item
          xs={6}
          sm={3}
        >
          <Tooltip title="click to visit">
            <Card
              className={classes.root}
              onClick={() => window.open(`https://www.worldometers.info/coronavirus/`, "_blank")}
            >
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image="worldometers.jpg"
                  title="worldometer"
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h2"
                  >
                    Worldometers Info
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Find COVID-19 global corona virus cases count in different countries in real time and other
                    important information here
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Tooltip>
        </Grid>
        <Grid
          item
          xs={6}
          sm={3}
        >
          <Tooltip title="click to visit">
            <Card
              className={classes.root}
              onClick={() => window.open(`https://www.cdc.gov/coronavirus/2019-nCoV/index.html`, "_blank")}
            >
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image="CDC.png"
                  title="America"
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h2"
                  >
                    CDC
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Centers for Disease Control and Prevention provides informative updates on COVID-19
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Tooltip>
        </Grid>

        <Grid
          item
          xs={6}
          sm={3}
        >
          <Tooltip title="click to visit">
            <Card
              className={classes.root}
              onClick={() =>
                window.open(
                  ` https://www.gov.uk/government/organisations/department-of-health-and-social-care`,
                  "_blank"
                )
              }
            >
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image="govuk.png"
                  title="UK"
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h2"
                  >
                    United Kingdom
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Read the latest information about the coronavirus situation in the UK
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Tooltip>
        </Grid>

        <Grid
          item
          xs={6}
          sm={3}
        >
          <Tooltip title="click to visit">
            <Card
              className={classes.root}
              onClick={() =>
                window.open(
                  `https://coronavirus.jhu.edu/?utm_campaign=jh20&utm_content=ow_hubinfo&utm_medium=dig_link&utm_source=jhu_properties`,
                  "_blank"
                )
              }
            >
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image="johns.jpg"
                  title="John Hopkins"
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h2"
                  >
                    Johns Hopkins
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Johns Hopkins 's website is a resource to help advance the understanding of the virus, inform the
                    public, and brief policymakers in order to guide a response, improve care, and save lives.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Tooltip>
        </Grid>
        <Grid
          item
          xs={6}
          sm={3}
        >
          <Tooltip title="click to visit">
            <Card
              className={classes.root}
              onClick={() => window.open(`http://www.ijcrt.org/papers/IJCRT2006293.pdf`, "_blank")}
            >
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image="ijcrt.jpg"
                  title="Research Paper on Coronavirus"
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h2"
                  >
                    Research Paper
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Publication : FIGHTING CORONAVIRUS THROUGH AI, DATA SCIENCE AND TECHNOLOGY . This published paper
                    discusses a lot about How can technology help us recognize the path of virus spread, How Artificial
                    Intelligence is helping fight Coronavirus, How Big Data is playing a vital role in minimizing
                    coronavirus outbreak and many more.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Tooltip>
        </Grid>
      </Grid>
    </div>
  );
}
