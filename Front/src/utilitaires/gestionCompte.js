function checkAuth() {
  const userId = sessionStorage.getItem("userId");
  if (userId)
    return parseInt(userId);

  return -1;
}

export {checkAuth}