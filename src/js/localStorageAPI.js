const localStorageAPI = {
  // Перевірка сховища за ключем, отримання даних
  loadMovies(key) {
    const storageData = localStorage.getItem(key)
      ? JSON.parse(localStorage.getItem(key))
      : [];

    return storageData;
  },

  // Запис нових даних до сховища
  saveMovies(key, value) {
    const currentData = this.loadMovies(key);
    const newData = currentData.push(value);
    const dataToSave = JSON.stringify(newData);

    localStorage.setItem(dataToSave);
  },

  //   Видалення даних зі сховища
  removeMovie(key, value) {
    const currentData = this.loadMovies(key);
    currentData.splice(currentData.indexOf(value), 1);
    const dataToSave = JSON.stringify(currentData);

    localStorage.setItem(dataToSave);
  },
};

export default localStorageAPI;
