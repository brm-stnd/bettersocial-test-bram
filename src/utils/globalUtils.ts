import * as _ from 'lodash';
import * as commonPassword from 'common-password';

export function randomString(length = 5) {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  for (let i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

export const userEmployeeObject = async (employee) => {
  const name =
    employee.firstname && employee.lastname
      ? `${employee.firstname} ${employee.lastname}`
      : null;

  return {
    _id: _.result(employee, '_id', null),
    name,
    email: _.result(employee, 'email', null),
    username: _.result(employee, 'username', null),
  };
};

export const validateEmail = async (email, domainList = []) => {
  const emailDomain = email.split('@')[1];
  const domainMatch = domainList.includes(emailDomain);
  if (domainList[0] === '') return false;
  if (!domainMatch)
    return `email domain not allowed:  ${emailDomain}. \nAllowed: ${domainList.join(
      ', ',
    )}`;
  else return false;
};

export const isHttpError = (i = 0) => i >= 400 && i < 600;

export const errorCode = (error = new Error()) => {
  if (error && error.message) {
    const code = parseInt(error.message.split('-')[0]);
    return code;
  }
  return 0;
};

export const errorJson = (
  message,
  forceReload = true,
  isFullMessage = false,
) => ({
  message,
  forceReload,
  isFullMessage,
});

export const httpErrorMessage = (error = new Error()) =>
  error.message.substring(4);

export const validatePassword = (
  password,
  username,
  passwordSetting = undefined,
) => {
  console.log(
    'validating password',
    password,
    username,
    JSON.stringify(passwordSetting),
  );
  if (!passwordSetting || passwordSetting.uppercase === undefined)
    passwordSetting = {
      uppercase: true,
      lowercase: true,
      number: true,
      symbol: true,
    };
  let length = passwordSetting.length || 12;
  let requireCount = passwordSetting.requireCount;
  if (requireCount === null || requireCount === undefined) {
    requireCount = 3;
  }

  if (requireCount === 0) {
    requireCount = 1;
  }

  if (!password) return 'Password is empty';
  if (password.length < length) return 'Password too short';
  if (password === username) return 'Password cannot be the same with username';
  if (commonPassword(password)) return 'Password is too common';

  let uppercaseCheck = /[A-Z]/gm;
  let lowercaseCheck = /[a-z]/gm;
  let digitCheck = /[0-9]/gm;
  let specialCharCheck = /[!@#$%^&*(),.?":{}|<>]/gm;

  let okCount = 0;
  if (passwordSetting.uppercase === true && uppercaseCheck.test(password))
    okCount += 1;
  if (passwordSetting.lowercase === true && lowercaseCheck.test(password))
    okCount += 1;
  if (passwordSetting.number === true && digitCheck.test(password))
    okCount += 1;
  if (passwordSetting.symbol === true && specialCharCheck.test(password))
    okCount += 1;

  let rules = [];
  if (passwordSetting.uppercase) rules.push('Uppercase');
  if (passwordSetting.lowercase) rules.push('Lowercase');
  if (passwordSetting.number) rules.push('Number');
  if (passwordSetting.symbol) rules.push('Symbol');

  if (okCount < requireCount)
    return `Password must contain at least ${requireCount} of the stated rules. (${rules.join(
      ', ',
    )})`;
  else return false;
};

export const convertToInternationalFormat = (mobileNo) => {
  if (mobileNo.startsWith('+')) {
    return mobileNo;
  }
  if (!/^\d+$/.test(mobileNo)) {
    return '';
  }
  if (
    (mobileNo.startsWith('8') || mobileNo.startsWith('9')) &&
    mobileNo.length === 8
  ) {
    mobileNo = '+65' + mobileNo;
  } else {
    mobileNo = '+' + mobileNo;
  }
  return mobileNo;
};

export const corePathRemover = (path) => {
  const isCore = path.slice(0, 5) === '/core';
  if (isCore) path = path.slice(5);

  return path;
};
