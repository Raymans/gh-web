import React from "react";
import PropTypes from "prop-types";
import Particles from "react-particles-js"
const Hero = props => {
  const { backgrounds, theme } = props;

  return (
    <React.Fragment>
      <div className="wrapper">
        <Particles
          params={{
            particles: {
              number: {
                value: 50
              },
              line_linked: {
                shadow: {
                  enable: false,
                  color: "#3CA9D1",
                  blur: 5
                }
              }
            }
          }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%"
          }} />
      </div>
      <section className="hero">
        <h1>
          Best prepare tools for interviews
        </h1>
        <h2>Store knowledge as your second brand</h2>
        <h2>Practice anonymously with engineers who have worked at great company</h2>
      </section>

      {/* --- STYLES --- */}
      <style jsx>{`
        .hero {
          align-items: center;
          background: ${theme.hero.background};
          background-image: url(${backgrounds.mobile});
          background-size: cover;
          color: ${theme.text.color.primary.inverse};
          display: flex;
          flex-flow: column nowrap;
          justify-content: center;
          min-height: 78vh;
          height: 100px;
          padding: ${theme.space.inset.l};
          padding-top: ${theme.header.height.homepage};
        }

        h1 {
          text-align: center;
          font-size: ${theme.hero.h1.size};
          margin: ${theme.space.stack.l};
          color: ${theme.hero.h1.color};
          line-height: ${theme.hero.h1.lineHeight};
          text-remove-gap: both 0 "Open Sans";
          font-weight: 400;
          :global(strong) {
            position: relative;

            &::after,
            &::before {
              content: "›";
              color: ${theme.text.color.attention};
              margin: 0 ${theme.space.xs} 0 0;
              text-shadow: 0 0 ${theme.space.s} ${theme.color.neutral.gray.k};
            }
            &::after {
              content: "‹";
              margin: 0 0 0 ${theme.space.xs};
            }
          }
        }
        
        h2 {
          color: #ffffff;
          font-weight: 400;
        }

        @from-width tablet {
          .hero {
            background-image: url(${backgrounds.tablet});
          }

          h1 {
            max-width: 90%;
            font-size: ${`calc(${theme.hero.h1.size} * 1.3)`};
          }
        }

        @from-width desktop {
          .hero {
            background-image: url(${backgrounds.desktop});
          }

          h1 {
            max-width: 80%;
            font-size: ${`calc(${theme.hero.h1.size} * 1.5)`};
          }
        }
      `}</style>
    </React.Fragment>
  );
};

Hero.propTypes = {
  backgrounds: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default Hero;
