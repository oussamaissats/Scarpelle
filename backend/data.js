  import bcrypt from 'bcryptjs';
const data = {
  users: [
    {
name: 'Oussama',
email:'admin@example.com',
password: bcrypt.hashSync('1234', 8),
isAdmin: true,
isSeller: true,
seller: {
  name: 'Puma',
  logo: '/images/logo1.png',
  description: 'best seller',
  rating: 4.5,
  numReviews: 120,
  },

    },

    {
      name: 'Salah',
      email:'user@example.com',
      password: bcrypt.hashSync('1234', 8),
      isAdmin: false,
      isSeller: false,
          },
  ],
    products: [
      {
        name: 'STAU Noir',
        category: 'Sport',
        image: '/images/p1.jpg',
        price: 70,
        countInStock: 10,
        brand: 'Scarpelle',
        rating: 4.0,
        numReviews: 10,
        description:'Matière: 100% cuir extérieur et intérieur Semelle: Italienne qualité premium Pointures: 39 40 41 42 43 44 45',
      },
      {
   
        name: 'STAU MARRON',
        category: 'Sport',
        image: '/images/p2.jpg',
        price: 65,
        countInStock: 20,
        brand: 'Scarpelle',
        rating: 4.0,
        numReviews: 10,
        description: 'Matière: 100% cuir extérieur et intérieur Semelle: Italienne qualité premium Pointures: 39 40 41 42 43 44 45',
      },
      {
     
        name: 'Scarpelino',
        category: 'Sport',
        image: '/images/p3.jpg',
        price: 220,
        countInStock: 0,
        brand: 'Scarpelle',
        rating: 4.0,
        numReviews: 17,
        description: 'Matière: 100% cuir extérieur et intérieur Semelle: Italienne qualité premium Pointures: 39 40 41 42 43 44 45',
      },
      {
        
        name: 'Rocky Blue',
        category: 'Casual',
        image: '/images/p4.jpg',
        price: 78,
        countInStock: 15,
        brand: 'Scarpelle',
        rating: 4.0,
        numReviews: 14,
        description: 'Matière: 100% cuir extérieur et intérieur Semelle: Italienne qualité premium Pointures: 39 40 41 42 43 44 45',
      },
      {
      
        name: 'Official Marron',
        category: 'Pants',
        image: '/images/p5.jpg',
        price: 65,
        countInStock: 5,
        brand: 'Scarpelle',
        rating: 3.0,
        numReviews: 10,
        description: 'Matière: 100% cuir extérieur et intérieur Semelle: Italienne qualité premium Pointures: 39 40 41 42 43 44 45',
      },
      {
   
        name: 'Serpent Noir',
        category: 'Posé',
        image: '/images/p6.jpg',
        price: 139,
        quantitéstock: 50,
        countInStock: 12,
        brand: 'Scarpelle',
        rating: 5.0,
        numReviews: 15,
        description: 'Matière: 100% cuir extérieur et intérieur Semelle: Italienne qualité premium Pointures: 39 40 41 42 43 44 45',
      },
    ],
  };
  export default data;