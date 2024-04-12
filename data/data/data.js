import data from "./itemdata";
const CoffeeDataFirebase = data.filter(item => item.type === 'Coffee');
const BeansDataFirebase = data.filter(item => item.type === 'Bean');
export { CoffeeDataFirebase, BeansDataFirebase };