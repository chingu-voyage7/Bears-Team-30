const SUCCESS = {
  code: 's200',
  success: true,
  message: 'Success',
};

const FAILURE = {
  code: 'e500',
  success: false,
  message: `Database error`,
};

function success(res) {
  return { ...SUCCESS, ...res };
}

function failure(err) {
  console.error(err);
  const code = err.code;
  switch (code) {
    case 'e500':
      return FAILURE;
    case 'e416':
      return {
        code,
        success: false,
        message:
          'This entry does not exist, or you do not have permission to modify it.',
      };
    case '23505':
      return {
        code: 'e415',
        success: false,
        message: `Rejected because of duplicate content.`,
      };
    default:
      return { ...FAILURE, message: `DB error: ${err.message}` };
  }
}

function notAuthenticated(id) {
  if (!id) {
    return {
      code: 'e405',
      success: false,
      message: 'User not authenticated.',
    };
  }
  return false;
}

module.exports = { success, failure, notAuthenticated };
