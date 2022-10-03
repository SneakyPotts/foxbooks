const useLocalSettings = (data) => {
  if (data) {
    window.localStorage.setItem('localReader', JSON.stringify(data));
  } else {
    return JSON.parse(localStorage.getItem('localReader'))
  }
}

export default useLocalSettings;