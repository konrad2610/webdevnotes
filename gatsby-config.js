module.exports = {
    siteMetadata: {
        author: 'Konrad Beska',
        title: 'WebDevNotes',
        description: 'Personal blog by Konrad Beska.',
        siteUrl: 'https://webdevnotes.com',
        currentYear: '2019'
    },
    plugins: [
        'gatsby-plugin-sass',
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                name: 'src',
                path: `${__dirname}/src/`
            }
        },
        'gatsby-plugin-sharp',
        {
            resolve: 'gatsby-transformer-remark',
            options: {
                plugins: [
                    'gatsby-remark-relative-images',
                    {
                        resolve: 'gatsby-remark-images',
                        options: {
                            maxWidth: 750,
                            linkImagesToOriginal: false
                        }
                    }
                ]
            }
        },
        'gatsby-plugin-react-helmet',
        {
            resolve: 'gatsby-plugin-i18n',
            options: {
                langKeyDefault: 'en',
                pagesPaths: [`src/posts/`],
                useLangKeyLayout: false
            }
        },
        {
            resolve: 'gatsby-plugin-manifest',
            options: {
                name: 'WebDevNotes',
                short_name: 'WebDevNotes',
                start_url: '/',
                background_color: '#ffffff',
                theme_color: '#ffa7c4',
                display: 'minimal-ui',
                icon: 'src/assets/icon.png',
                theme_color_in_head: false
            }
        },
        {
            resolve: 'gatsby-plugin-feed',
            options: {
              query: `
                {
                  site {
                    siteMetadata {
                      title
                      description
                      siteUrl
                      site_url: siteUrl
                    }
                  }
                }
              `,
              feeds: [
                {
                  serialize: ({ query: { site, allMarkdownRemark } }) => {
                    return allMarkdownRemark.edges.map(edge => {
                      const siteUrl = site.siteMetadata.siteUrl;
                      const postText = `
                        <div style="margin-top=55px; font-style: italic;">(This is an article posted to my blog at webdevnotes.com. You can read it online by <a href="${siteUrl +
                          edge.node.fields.slug}">clicking here</a>.)</div>
                      `;
      
                      let html = edge.node.html;
                      html = html
                        .replace(/href="\//g, `href="${siteUrl}/`)
                        .replace(/src="\//g, `src="${siteUrl}/`)
                        .replace(/"\/static\//g, `"${siteUrl}/static/`)
                        .replace(/,\s*\/static\//g, `,${siteUrl}/static/`);
      
                      return Object.assign({}, edge.node.frontmatter, {
                        description: edge.node.excerpt,
                        date: edge.node.frontmatter.date,
                        url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                        guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                        custom_elements: [{ 'content:encoded': html + postText }]
                      });
                    });
                  },
                  query: `
                    {
                      allMarkdownRemark(
                        limit: 1000,
                        sort: { order: DESC, fields: [frontmatter___date] },
                        filter: {fields: { langKey: {eq: "en"}}}
                      ) {
                        edges {
                          node {
                            excerpt(pruneLength: 250)
                            html
                            fields { 
                              slug   
                            }
                            frontmatter {
                              title
                              date
                            }
                          }
                        }
                      }
                    }
                  `,
                  output: '/rss.xml',
                  title: 'WebDevNotes Blog RSS Feed',
                }
              ]
            }
        }
    ]
};