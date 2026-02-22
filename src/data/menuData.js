import specialsImg from '../assets/specials.jpg';
import popularImg from '../assets/popular.jpg';
import signaturesImg from '../assets/signatures.jpg';

export const formatMoney = (value) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);

export const dishes = [
  {
    id: 1,
    name: 'Greek Salad',
    price: 12.99,
    description:
      'The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons.',
    image: specialsImg,
    category: 'Mains',
  },
  {
    id: 2,
    name: 'Bruschetta',
    price: 5.99,
    description:
      'Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil.',
    image: popularImg,
    category: 'Starters',
  },
  {
    id: 3,
    name: 'Lemon Dessert',
    price: 5.0,
    description:
      "This comes straight from grandma's recipe book. Every last ingredient has been sourced and is as authentic as can be imagined.",
    image: signaturesImg,
    category: 'Desserts',
  },
];