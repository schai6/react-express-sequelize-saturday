const db = require('./server/db')
const Puppy = db.model('puppy')
const Owner = db.model('owner')

const seed = async () => {
  try {
    await db.sync({force: true});
    await Promise.all([
      Owner.create({name: 'Erin'}),
      Owner.create({name: 'Jamie'}),
      Owner.create({name: 'Kimberly'}),
      Owner.create({name: 'Raz'}),
      Owner.create({name: '   sARAh     jOHnsON    '})
    ])
    await Promise.all([
      Puppy.create({name: 'Reggie', ownerId: 1}),
      Puppy.create({name: 'Scooby', ownerId: 2}),
      Puppy.create({name: '   lORd   bIGGleswOrth', ownerId: 5})
    ])
    console.log('Done!');
    db.close();
  } catch (err) {
    console.error('Something went wrong!', err.message);
    db.close();
  }
}

seed();