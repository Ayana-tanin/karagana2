// Products data structure with multiple images
const PRODUCTS = [
    {
        id: 1,
        name: {
            ky: 'Табигый самын "Карагана"',
            ru: 'Натуральное мыло "Карагана"',
            en: 'Natural Soap "Caragana"'
        },
        description: {
            ky: 'Карагананын гүлдөрү менен жалбырактарынан жасалган табигый самын. Кожуну тазалайт жана нымдайт.',
            ru: 'Натуральное мыло из цветов и листьев караганы. Очищает и увлажняет кожу.',
            en: 'Natural soap made from caragana flowers and leaves. Cleanses and moisturizes the skin.'
        },
        price: 250,
        images: ['soap2.JPG', 'soap3.JPG', 'soap4.PNG'],
        inStock: true
    },
    {
        id: 2,
        name: {
            ky: 'Косметикалык крем',
            ru: 'Косметический крем',
            en: 'Cosmetic Cream'
        },
        description: {
            ky: 'Карагана экстракты менен косметикалык крем. Кожуну нымдайт жана коргойт.',
            ru: 'Косметический крем с экстрактом караганы. Увлажняет и защищает кожу.',
            en: 'Cosmetic cream with caragana extract. Moisturizes and protects the skin.'
        },
        price: 350,
        images: ['IMG_8132.PNG', 'IMG_8135.PNG'],
        inStock: true
    },
    {
        id: 3,
        name: {
            ky: 'Мончо',
            ru: 'Банный веник',
            en: 'Bath Broom'
        },
        description: {
            ky: 'Карагананын бутактарынан жасалган экологиялык мончо. Баңга жана үйгө.',
            ru: 'Экологичный банный веник из веток караганы. Для бани и дома.',
            en: 'Eco-friendly bath broom made from caragana branches. For bath and home.'
        },
        price: 150,
        images: ['IMG_8136.PNG', 'IMG_8139.PNG'],
        inStock: true
    },
    {
        id: 4,
        name: {
            ky: 'Шампунь',
            ru: 'Шампунь',
            en: 'Shampoo'
        },
        description: {
            ky: 'Табигый шампунь карагана экстракты менен. Чачты тазалайт жана күчтүү кылат.',
            ru: 'Натуральный шампунь с экстрактом караганы. Очищает и укрепляет волосы.',
            en: 'Natural shampoo with caragana extract. Cleanses and strengthens hair.'
        },
        price: 300,
        images: ['WhatsApp Image 2025-12-27 at 20.03.26.jpeg'],
        inStock: true
    }
];

function getProductName(product, lang) {
    return product.name[lang] || product.name['ru'];
}

function getProductDescription(product, lang) {
    return product.description[lang] || product.description['ru'];
}

function getCurrentLanguage() {
    return window.currentLang || 'ru';
}
