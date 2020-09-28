/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it

import { StoreProvider } from './src/context/ContextProvider';

const React = require('react');

export const wrapRootElement = ({ element }) => (
  <StoreProvider>{element}</StoreProvider>
)
