module.exports = (Models) => {
  Models.User.create({
    matricule: '150300161',
    name: 'Héctor Arturo Can Bacab',
  });

  Models.User.create({
    matricule: '150300116',
    name: 'Anselmo Calderón Paez',
  });

  Models.User.create({
    matricule: '150300127',
    name: 'España Tzec Jesús Manuel',
  });

  Models.Laboratory.create({
    name: 'Laboratorio de lógistica'
  });
}
