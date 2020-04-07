const role = {
  ADMIN: process.env.ROLE_ADMIN || 2,
  STUDENT: process.env.ROLE_STUDENT || 1,
};

const wsSchema = {
  subject: {
    name: 'Mon',
    credit: 'So tin chi',
  },
  student: {
    name: 'Ten',
    mssv: 'MSSV',
  },
  room: {
    name: 'Ten phong',
    slot: 'So cho ngoi',
  },
  allowedStudent: {
    name: 'Ten',
    mssv: 'MSSV',
    isAllowed: 'Duoc thi',
  },
};

module.exports = {
  role, wsSchema,
};
