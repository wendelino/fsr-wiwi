module.exports = {
    async redirects() {
      return [
        {
          source: '/de/mitglieder',
          destination: '/de/mitglieder/2024',  
          permanent: true,
        },
      ]
    },
  }