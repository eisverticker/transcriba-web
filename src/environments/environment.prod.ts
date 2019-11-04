export const environment = {
  production: true,
  backend: {
    baseApiUrl: 'http://localhost:3001/api/'
  },
  rbac: {
    roles: [
      'registered',
      'trusted',
      'employee',
      'administrator'
    ]
  }
};
