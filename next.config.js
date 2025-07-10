module.exports = {

  // output: 'export',
    async redirects() {
      return [
        {
          source: '/:locale/mitglieder',
          destination: '/:locale/mitglieder/2025',  
          permanent: false,
        },
        {
          source: '/mitglieder',
          destination: '/mitglieder/2025',  
          permanent: false,
        },
      ]
    },
  }