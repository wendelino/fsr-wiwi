module.exports = {

  // output: 'export',
    async redirects() {
      return [
        {
          source: '/:locale/mitglieder',
          destination: '/:locale/mitglieder/2024',  
          permanent: false,
        },
      ]
    },
  }