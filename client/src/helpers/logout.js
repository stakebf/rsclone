const logout = () => {
  localStorage.removeItem('rsclone_token');
  localStorage.removeItem('rsclone_userId');
};

export default logout;
