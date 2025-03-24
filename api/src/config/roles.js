const allRoles = {
  transporter: ['viewJobs', 'acceptJobs'],
  intermediary: ['viewJobs', 'shareJobs', 'acceptJobs'],
  admin: ['getUsers', 'manageUsers', 'manageJobs'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};