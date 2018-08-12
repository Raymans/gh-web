import React from "react";
import PropTypes from "prop-types";

const Headline = props => {
  const { title, children, theme } = props;

  return (
    <React.Fragment>
      <section style={{padding: "0px 50px"}} className="title">
        <h1>{title ? <span>{title}</span> : children}</h1>
      </section>
      {/* --- STYLES --- */}
      <style jsx>{`
        h1 {
          white-space: nowrap;
          font-weight: 200;
          text-align: center;
          max-width: 400px;
          margin: 30px auto 40px;
          border-bottom: 1px solid #e8e8e8;
          padding-bottom: 10px;
          font-size: ${theme.font.size.xxl};
          animation-name: headlineEntry;
          animation-duration: ${theme.time.duration.long};

          :global(a) {
            font-weight: ${theme.font.weight.standard};
            font-size: 0.5em;
            letter-spacing: 0;
            margin-left: 20px;
          }

          :global(svg) {
            height: 0.75em;
            fill: ${theme.color.brand.primary};
          }

        }

        @keyframes headlineEntry {
          from {
            opacity: 0.5;
          }
          to {
            opacity: 1;
          }
        }

        @from-width tablet {
          h1 {
            font-size: ${`calc(${theme.font.size.xl} * 1.2)`};
          }
        }

        @from-width desktop {
          h1 {
            font-size: ${`calc(${theme.font.size.xl} * 1.4)`};
          }
        }
      `}</style>
    </React.Fragment>
  );
};

Headline.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  theme: PropTypes.object.isRequired
};

export default Headline;
