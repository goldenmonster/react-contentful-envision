// Sets up React stuff.
import PropTypes from "prop-types";
import React from "react";

// Brings stuff in for Gatsby hyperlinks and images.
import { Link } from "gatsby";
import Img from "gatsby-image";

// Brings in stuff needed for css.
import styles from "../css/module-preview.module.css";

/**
 * The class that represents the module preview component.
 */
class ModulePreview extends React.Component {
  /**
   * Returns the module preview component's content that is
   * supposed to be rendered by a user's browser inside a Layout component.
   * @return {*} The module preview component content that is supposed to
   * be rendered by a browser.
   */
  render() {
    const { module } = this.props;

    return (
      <Link to={`/${module.category.slug}/${module.slug}`}>
        <div className={styles.previewBackground}>
          <Img
            alt={module.title}
            className={styles.previewImg}
            fluid={module.heroImage.fluid}
          />
        </div>
        <h3 className={styles.previewTitle}>{module.title}</h3>
        <div
          className={styles.previewBody}
          dangerouslySetInnerHTML={{
            __html: module.description.childMarkdownRemark.html,
          }}
        />
        <p className={styles.previewDetails}>
          <span>
            By{" "}
            {module.author
              .map((x) => x.firstName + " " + x.lastName)
              .join(", ")}{" "}
            &#183;{" "}
          </span>
          {module.body.childMarkdownRemark.timeToRead} min read
        </p>
      </Link>
    );
  }
}

// Defines the propTypes of ModulePreview.
ModulePreview.propTypes = {
  module: PropTypes.shape({
    module: PropTypes.shape({
      slug: PropTypes.any,
    }),
    description: PropTypes.any,
    heroImage: PropTypes.shape({
      fluid: PropTypes.any,
    }),
    slug: PropTypes.any,
    title: PropTypes.any,
  }),
};

export default ModulePreview;
