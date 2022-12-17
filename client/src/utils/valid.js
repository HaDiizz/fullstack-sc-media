const valid = ({ email, password, fullname, username, cf_password }) => {
  const err = {};

  if (!fullname) {
    err.fullname = "กรุณากรอกชื่อของคุณ";
  } else if (fullname.length > 20) {
    err.fullname = "ชื่อของคุณมีความยาวเกิน 20 ตัวอักษร";
  }

  if (!username) {
    err.username = "กรุณากรอกชื่อ username ของคุณ";
  } else if (username.replace(/ /g, "").length > 20) {
    err.username = "username ของคุณมีความยาวเกิน 20 ตัวอักษร";
  }

  if (!email) {
    err.email = "กรุณากรอกอีเมลของคุณ";
  } else if (!validateEmail(email)) {
    err.email = "รูปแบบอีเมลไม่ถูกต้อง";
  }

  if (!password) {
    err.password = "กรุณากรอกรหัสผ่านของคุณ";
  } else if (password.length < 6) {
    err.password = "รหัสผ่านของคุณมีความยาวไม่ถึง 6 ตัวอักษร";
  }

  if (password !== cf_password) {
    err.cf_password = "รหัสผ่านไม่ตรงกัน";
  } else if (!cf_password) {
    err.cf_password = "กรุณากรอกรหัสผ่านของคุณ";
  }

  return {
    errMsg: err,
    errLength: Object.keys(err).length,
  };
};

function validateEmail(email) {
  // eslint-disable-next-line
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export default valid;
