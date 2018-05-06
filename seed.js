const db = require('./server/db');
const Puppy = db.model('puppy');
const Owner = db.model('owner');

const seed = async () => {
  try {
    await db.sync({force: true});
    await Promise.all([
      Owner.create({name: 'Erin'}),
      Owner.create({name: 'Jamie'}),
      Owner.create({name: 'Kimberly'}),
      Owner.create({name: 'Raz'}),
      Owner.create({name: '   sARAh     jOHnsON    '})
    ]);
    await Promise.all([
      Puppy.create({name: 'Reggie', ownerId: 1}),
      Puppy.create({name: 'Scooby', ownerId: 2}),
      Puppy.create({name: '   lORd   bIGGleswOrth', ownerId: 5})
    ]);
    console.log('Done!');
    db.close();
  } catch (err) {
    console.error('Something went wrong!', err.message);
    db.close();
  }
};

seed();

/*--------------------Alternate Seed--------------------*/

/*
const db = require('./server/db');
const Puppy = db.model('puppy');
const Owner = db.model('owner');

const images = [
  'https://designerdoginfo.files.wordpress.com/2013/01/puggle-puppy-4.jpg?w=584',
  'http://images.shape.mdpcdn.com/sites/shape.com/files/styles/slide/public/puppy-2_0.jpg',
  'https://www.askideas.com/media/19/Papillon-Puppy-Looking.jpg',
  'http://www.101dogbreeds.com/wp-content/uploads/2015/10/Chi-Spaniel-Puppy-Pictures.jpg',
  'http://4.bp.blogspot.com/-3JeIxWBU7bY/UKjIt8lVpCI/AAAAAAAABx8/YM8piSOwczs/s1600/Schipperke-Puppy.jpg',
  'https://images.dog.ceo/breeds/samoyed/n02111889_928.jpg',
  'https://images.dog.ceo/breeds/dingo/n02115641_12148.jpg',
  'https://images.dog.ceo/breeds/pomeranian/n02112018_3504.jpg',
  'https://images.dog.ceo/breeds/chow/n02112137_2724.jpg',
  'https://images.dog.ceo/breeds/samoyed/n02111889_5598.jpg',
  'https://images.dog.ceo/breeds/malamute/n02110063_6746.jpg',
  'https://images.dog.ceo/breeds/greyhound-italian/n02091032_7922.jpg',
  'https://images.dog.ceo/breeds/bulldog-boston/n02096585_9343.jpg',
  'https://images.dog.ceo/breeds/springer-english/n02102040_4250.jpg',
  'https://images.dog.ceo/breeds/leonberg/n02111129_3770.jpg',
  'https://images.dog.ceo/breeds/keeshond/n02112350_8469.jpg',
  'https://images.dog.ceo/breeds/vizsla/n02100583_9902.jpg',
  'https://images.dog.ceo/breeds/keeshond/n02112350_9536.jpg',
  'https://images.dog.ceo/breeds/dane-great/n02109047_1533.jpg',
  'https://images.dog.ceo/breeds/malamute/n02110063_16539.jpg'
];

const ownerNames = ['Erin', 'Jamie', 'Kimberly', 'Raz', '   sARAh     jOHnsON    '];
const getOwners = (ownerNames) => {
  const owners = ownerNames.map(async name => {
    await Owner.create({
      name,
    });
  });
  return owners;
};

const puppyNames = [
  'Charlie', 'Buddy', 'Max', 'Archie', 'Oscar', 'Toby', 'Ollie', 'Bailey', 'Frankie', 'Jack', 'Bella', 'Ruby', 'Molly', 'Lucy', 'Coco', 'Rosie', 'Daisy','Lola', 'Tilly', 'Bonnie'
];
const getPuppies = (puppyNames) => {
  const puppies = puppyNames.map(async name => {
    await Puppy.create({
      name,
      ownerId: getOwnerId(ownerNames.length),
      imageUrl: getImage(images),
      likes: getRandomLikes()
    });
  });
  return puppies;
};

const getRandomLikes = () => {
  return Math.floor(Math.random() * 100);
};

const getOwnerId = (numOwners) => {
  return Math.floor(Math.random() * numOwners) + 1;
};

const getImage = (images) => {
  const randomIdx = Math.floor(Math.random() * images.length);
  return swap(images, randomIdx, images.length - 1).pop();
};

const swap = (arr, i, j) => {
  [arr[i], arr[j]] = [arr[j], arr[i]];
  return arr;
};

const seed = async () => {
  try {
    await db.sync({force: true});
    await Promise.all(getOwners(ownerNames));
    await Promise.all(getPuppies(puppyNames));
    console.log('Done!');
    db.close();
  } catch (err) {
    console.error('Something went wrong!', err.message);
    db.close();
  }
};

seed();
*/
