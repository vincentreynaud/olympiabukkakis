import React, { Component } from "react";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";

import Navigation from "./Navigation";
import Footer from "./Footer";
import ToTop from "./ToTop";

import "../scss/Layout.scss";
import "../scss/Navigation.scss";

class Layout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scrollY: 0
    };
  }

  componentDidMount() {
    window.onscroll = () => {
      this.setState({ scrollY: window.scrollY });
      if (this.props.handleScroll) this.props.handleScroll();
    };
  }

  render() {
    const { children, theme = "theme-dark" } = this.props;

    return (
      <StaticQuery
        query={query}
        render={data => {
          return (
            <div className={"layout " + theme}>
              <div className="row">
                <div className="col-nav col-xl-4">
                  <Navigation title={data.site.siteMetadata.title} />
                </div>
                <div className="col-main col-xl-8">
                  <main className="main">{children}</main>
                  {this.state.scrollY > 600 && <ToTop />}
                </div>
              </div>
              <div className="row">
                <Footer authors={data.site.siteMetadata.author} />
              </div>
            </div>
          );
        }}
      />
    );
  }
}

const query = graphql`
  query {
    site {
      siteMetadata {
        title
        author
      }
    }
  }
`;

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
