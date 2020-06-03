import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import hexToRgba from "hex-to-rgba";
// @ts-ignore TODO: Create @types for this package
import ReactCountryFlag from "react-country-flag";
import { ArtistData } from "../../../api/fetchProduct";
import { tr } from "../../../utils";

const ArtistInfo = (props: ArtistData): JSX.Element => {
  const useStyles = makeStyles(() => ({
    artistName: {
      color: `#${props.artist_accent_colour_code}`,
      display: "inline",
      marginRight: 10,
    },
    artistDescription: {
      color: `#${props.artist_text_colour_code}`,
      display: "block",
    },
    container: {
      background: hexToRgba(props.artist_background_colour_code, 0.75),
      padding: 20,
    },
    socialMediaHandle: {
      color: `#${props.artist_accent_colour_code}`,
      display: "inline-block",
      transform: "translateY(-35%)",
    },
    socialMediaLink: {
      color: "#fff",
      display: "block",
      margin: "10px 0",
    },
  }));

  const classes = useStyles();

  // This is brittle, but let's me display the social media links in the format I want...
  const instagramHandleParts = props.instagram_url.split("/");
  const instagramHandle = instagramHandleParts[instagramHandleParts.length - 2];
  const twitterHandleParts = props.twitter_url.split("/");
  const twitterHandle = twitterHandleParts[twitterHandleParts.length - 1];
  const facebookHandleParts = props.facebook_url.split("/");
  const facebookHandle = facebookHandleParts[twitterHandleParts.length - 1];

  return (
    <div className={classes.container}>
      <Typography className={classes.artistName}>
        {tr("artistInfo.about")} {props.name}
      </Typography>
      <ReactCountryFlag svg countryCode={props.country_code} />

      <Typography className={classes.artistDescription}>
        {props.description}
      </Typography>

      {props.website_url && (
        <a className={classes.socialMediaLink} href={props.website_url}>
          <Typography>{props.website_url}</Typography>
        </a>
      )}

      {props.facebook_url && (
        <a className={classes.socialMediaLink} href={props.facebook_url}>
          <FacebookIcon />{" "}
          <Typography className={classes.socialMediaHandle}>
            {facebookHandle}
          </Typography>
        </a>
      )}
      {props.instagram_url && (
        <a className={classes.socialMediaLink} href={props.instagram_url}>
          <InstagramIcon />{" "}
          <Typography className={classes.socialMediaHandle}>
            {instagramHandle}
          </Typography>
        </a>
      )}
      {props.twitter_url && (
        <a className={classes.socialMediaLink} href={props.twitter_url}>
          <TwitterIcon />{" "}
          <Typography className={classes.socialMediaHandle}>
            {twitterHandle}
          </Typography>
        </a>
      )}
    </div>
  );
};

export default ArtistInfo;
