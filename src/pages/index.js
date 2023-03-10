import {
  faApple,
  faGooglePlay,
  faSpotify,
} from "@fortawesome/free-brands-svg-icons";
import { faPodcast } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { graphql, Link } from "gatsby";
import get from "lodash/get";
import PropTypes from "prop-types";
import React from "react";
import { Col, Row } from "react-bootstrap";
import CategoryPreview from "../components/category-preview";
import Header from "../components/header";
import Layout from "../components/layout";
import Img from "gatsby-image";

// Brings in stuff needed for css.
import styles from "../css/index.module.css";

import headerImg from "../assets/images/header-white.svg";

/**
 * The class that represents the home page.
 */
class Home extends React.Component {
  /**
   * Returns the homepage content that is supposed to be rendered by a user's
   * browser inside a Layout component.
   * @return {*} The home page content that is supposed to be rendered by a
   * browser.
   */
  render() {
    const categories = get(this.props, "data.allContentfulCategory.edges");
    const cohort9 = get(this.props, "data.file.childImageSharp.fluid");

    return (
      <Layout
        description="Join the Lockheed Martin Leadership Institute as we take a deep dive into how we can prepare for what the next 20 years will bring."
        location={this.props.location}
      >
        <div className="content">
          <Header
            image={headerImg}
            alt={"Envision 2040"}
            applyGradient={true}
          />
          <div className="wrapper">
            <h2 className="section-headline">
              Why wait for the world of tomorrow when it could be the world of
              today?
            </h2>
            <Row>
              <Col md={6}>
                <iframe
                  width="100%"
                  height="320"
                  src="https://www.youtube.com/embed/x7TWKtFRDO0"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </Col>
              <Col>
                <p>
                  Between a global health crisis, heightened social rights
                  tension, and a polarized political environment, the world
                  faces an uncertain future. This is where 2040 comes into play.
                  Join the Lockheed Martin Leadership Institute as we take a
                  deep dive into how we can prepare for what the next 20 years
                  will bring as we explore the intersections of technology,
                  social rights, and how we interact with others.
                </p>
              </Col>
            </Row>
          </div>
        </div>

        <div className="break" />

        <div className="content">
          <div className="wrapper">
            <h2 className="section-headline">Start Exploring</h2>
            <Row>
              {categories.map(({ node }) => {
                return (
                  <Col key={node.slug} md={4}>
                    <CategoryPreview category={node} />
                  </Col>
                );
              })}
            </Row>
          </div>
        </div>

        <div className="break" />

        <div className="content">
          <div className="wrapper">
            <h2 className="section-headline">
              Meet the Cohort Behind Envision 2040
            </h2>
            <Row>
              <Col md={6}>
                <Img fluid={cohort9} />
              </Col>
              <Col md={6}>
                <p>
                  Envision 2040 was made possible by a dedicate team of students
                  from Lockheed Martin Leadership Institute's Cohort IX. Take a
                  moment to learn about them and why they think Envision 2040
                  matters!
                </p>
                <p>
                  <Link to={`/cohortix`}>Meet Cohort IX!</Link>
                </p>
              </Col>
            </Row>
          </div>
        </div>

        <div className="break" />

        <div className="content">
          <div className="wrapper">
            <h2 className="section-headline">
              Listen to the Envision 2040 Podcast On
            </h2>
            <nav role="navigation">
              <ul className={styles.navigation}>
                <li className={styles.icon}>
                  <a aria-label="Anchor.FM" href="https://anchor.fm/lmli">
                    <FontAwesomeIcon icon={faPodcast} />
                  </a>
                </li>
                <li className={styles.icon}>
                  <a
                    aria-label="Spotify"
                    href="https://open.spotify.com/show/3sWcFQlKp21onkA35AxZ3O"
                  >
                    <FontAwesomeIcon icon={faSpotify} />
                  </a>
                </li>
                <li className={styles.icon}>
                  <a
                    aria-label="Google Podcasts"
                    href="https://podcasts.google.com/feed/aHR0cHM6Ly9hbmNob3IuZm0vcy80NjE5YThhYy9wb2RjYXN0L3Jzcw"
                  >
                    <FontAwesomeIcon icon={faGooglePlay} />
                  </a>
                </li>
                {/* <li className={styles.icon}>
                  <a aria-label="Apple Podcasts"
                    href="">
                    <FontAwesomeIcon icon={faApple} /></a>
                </li> */}
              </ul>
            </nav>
          </div>
        </div>

        <div className="break" />

        <div className="content">
          <div className="wrapper">
            <h2 className="section-headline">Who Are We?</h2>
            <p>
              We are Miami University&apos;s Lockheed Martin Leadership
              Institute! The Lockheed Martin Leadership is a three year
              intensive cohort certification program that focuses on
              Transformational Leadership for Students in Miami
              University&apos;s College of Engineering and Computing. The
              purpose of the Lockheed Martin Leadership Institute is simple, yet
              powerful: to cultivate leaders who will flourish in their
              professions and lives by: thinking strategically; working
              collaboratively with others; effectively communicating their
              ideas; finding innovative solutions to society&apos;s most complex
              problems.
            </p>
            <p>
              To learn more about us, you can checkout our
              <a href="/about"> about page</a> or our
              <a href="/contact"> contact page</a>.
            </p>
          </div>
        </div>
      </Layout>
    );
  }
}

Home.propTypes = {
  location: PropTypes.any,
};

export default Home;

// Performs a GraphQL query to get the image, description, title, and slug used above.
export const pageQuery = graphql`
  query Home {
    allContentfulCategory(sort: { fields: sortOrder }) {
      edges {
        node {
          title
          slug
          heroImage {
            fluid(maxWidth: 700, maxHeight: 392, resizingBehavior: SCALE) {
              ...GatsbyContentfulFluid
            }
          }
          description {
            childMarkdownRemark {
              html
            }
          }
          sortOrder
        }
      }
    }
    file(relativePath: { eq: "images/cohort9.jpg" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;
