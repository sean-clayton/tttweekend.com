/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  plugins: [
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages/`,
      },
    },
    `gatsby-plugin-mdx`,
  ],
  siteMetadata: {
    title: "TTT Weekends",
    description: "TTT Weekends",
    siteUrl: "https://www.tttweekends.com/",
    discord: "https://discord.gg/y269UUF",
    gmod: "steam://connect/play.tttweekends.com",
    workshop:
      "https://steamcommunity.com/sharedfiles/filedetails/?id=1507759289",
    rules: [
      {
        name: "Be polite",
        description: "We all want to have a fun time here.",
      },
      {
        name: "Do not RDM",
        description:
          "Do not kill someone just because you can—the game should be fun for traitors, too!",
      },
      {
        name: "Do not speak while dead",
        description:
          "We use Discord for voice communications. If you are dead, do not talk in Discord.",
      },
      {
        name: "Prepare your mods beforehand",
        description:
          "It's really simple and quick. We also will let you know if you need to ahead of time in Discord.",
      },
      {
        name: "Do not kill as soon as the round starts.",
        description:
          "To keep things fun, do not kill anyone within a minute of the round starting.",
      },
    ],
  },
};
