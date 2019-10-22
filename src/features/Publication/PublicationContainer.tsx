import React from "react"
import { withRouter, RouteComponentProps } from "react-router-dom"
import { Helmet } from "react-helmet"
import gql from "graphql-tag"
import { useQuery } from "@apollo/react-hooks"
import Grid from "@material-ui/core/Grid"
import LeftSidebar from "./LeftSidebar"
import PublicationDisplay from "./PublicationDisplay"
import PublicationLoader from "./PublicationLoader"
import PublicationHeader from "./PublicationHeader"
import ErrorPage from "../../common/components/ErrorPage"
import useStyles from "./publicationStyles"

export interface Publication {
  data: {
    publication: {
      id: string
      abstract: string
      authors: Array<{
        first_name: string
        last_name: string
        rank: string
        initials: string
      }>
      doi: string
      issn?: string
      issue?: number
      journal: string
      pages: string
      pub_date: string
      pub_type?: string
      source?: string
      status?: string
      title: string
    }
  }
}

export const GET_PUBLICATION = gql`
  query Publication($id: ID!) {
    publication(id: $id) {
      id
      doi
      title
      abstract
      journal
      pub_date
      pages
      authors {
        initials
        last_name
      }
    }
  }
`

/**
 * PublicationContainer is the main component for an individual publication page.
 * It is responsible for fetching the data and passing it down to more specific components.
 */

export const PublicationContainer = ({ match }: RouteComponentProps<any>) => {
  const classes = useStyles()
  const { loading, error, data } = useQuery(GET_PUBLICATION, {
    variables: { id: match.params.id },
  })

  if (loading) return <PublicationLoader />
  if (error) return <ErrorPage error={error} />

  return (
    <Grid container className={classes.layout}>
      <Helmet>
        <title>dictyBase Literature - {data.publication.title}</title>
        <meta
          name="description"
          content={`dictyBase literature page for title ${data.publication.title}`}
        />
      </Helmet>
      <PublicationHeader />
      <Grid item xs={12} sm={2} className={classes.sidebar}>
        <LeftSidebar data={data} />
      </Grid>
      <Grid item xs={12} sm={10}>
        <PublicationDisplay data={data} />
      </Grid>
    </Grid>
  )
}

export default withRouter(PublicationContainer)
