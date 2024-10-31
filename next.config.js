module.exports = {
    async redirects() {
      return [
        {
          source: '/:locale/mitglieder',
          destination: '/:locale/mitglieder/2023',  
          permanent: false,
        },
      ]
    },
  }