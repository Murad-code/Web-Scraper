import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserState.jsx";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

const useStyles = makeStyles((theme) => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    // paddingTop: "70%", // 16:9, original was 56.25%
    height: "40vh",
    backgroundSize: "contain",
  },
  cardContent: {
    flexGrow: 1,
  },
}));

export default function Favourites() {
  const classes = useStyles();
  const { favourites, tempFavourites } = useContext(UserContext);
  const [cards, setCards] = useState();

  useEffect(() => {
    console.log("in useEffect in Favourites.jsx");
    try {
        console.log("favourites: " + favourites[0].url);
        setCards(favourites);
    } catch (err) {
        console.log('in the catch')
    }
    
    favourites.length < tempFavourites.length ? setCards(tempFavourites) : setCards(favourites);
  }, [favourites, tempFavourites]);

  const LoginMessage = () => {
    return <h1>Sign into Google to see your favourites</h1>;
  };

  const EmptyMessage = () => {
      return <h1>So much empty...</h1>
  }

  const FavouritesCards = () => {
    return (
      <>
        {cards === undefined ? <EmptyMessage /> : cards.map((card) => (
          <Grid item key={card.url} xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.cardMedia}
                image={card.imgUrl}
                title={card.title}
              />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                  {card.title}
                </Typography>
                <Typography>
                  Price: <span>{card.price}</span>
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  href={card.url}
                  target="_blank"
                  size="small"
                  color="primary"
                >
                  View
                </Button>
                <Button size="small" color="primary">
                  Edit
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}

      </>
    );
  };
  return (
    <Grid container spacing={4}>
      {/* {tempFavourites.length === 0 ? <LoginMessage /> : <FavouritesCards />} */}
      <FavouritesCards />
    </Grid>
  );
}
