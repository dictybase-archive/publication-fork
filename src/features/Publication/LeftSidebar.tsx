import React from "react"
import { withStyles } from "@material-ui/core/styles"
import { Theme } from "@material-ui/core/styles/createMuiTheme"
import createStyles from "@material-ui/core/styles/createStyles"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Publication } from "common/@types/publication"

const styles = (theme: Theme) =>
  createStyles({
    link: {
      textDecoration: "none",
      color: "#0059b3",
    },
    section: {
      position: "sticky",
      top: 40,
      paddingTop: "25px",
      [theme.breakpoints.down("xs")]: {
        paddingTop: "0px",
      },
    },
  })

interface Props extends Publication {
  classes: {
    link: string
    section: string
  }
}

/**
 * LeftSidebar is the main component for the left sidebar on an individual publication page.
 */

export const LeftSidebar = (props: Props) => {
  const { classes, data } = props
  const doiURL = `https://doi.org/${data.publication.doi}`

  return (
    <div className={classes.section}>
      <a
        href={doiURL}
        target="_blank"
        rel="noopener noreferrer"
        className={classes.link}>
        Full text &nbsp;
        <FontAwesomeIcon icon="external-link-alt" />
      </a>
      <br />
      {/* <a href="#" className={classes.link}>
        Get Citation
      </a> */}
    </div>
  )
}

export default withStyles(styles)(LeftSidebar)
