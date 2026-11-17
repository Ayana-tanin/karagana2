const TRANSLATIONS = {
    'ky': {
        'nav_products': 'Товарлар',
        'nav_about': 'Долбоор жөнүндө',
        'nav_mission': 'Миссиябыз',
        'lang_ky': 'KY',
        'lang_ru': 'RU',
        'lang_en': 'EN',
        'cart_title': 'Себет',
        'hero_title': 'Кыргызстандан табигый косметика',
        'hero_desc': 'Караганадан экологиялык товарларды жасайбыз: табигый самын, косметика жана мончо. Калдыксыз өндүрүш жана айылдык үй-бүлөлөргө колдоо.',
        'hero_btn': 'Товарларды көрүү',
        'products_title': 'Биздин товарлар',
        'products_subtitle': 'Карагананын негизинде табигый косметика жана турмуш буюмдары',
        'all_products': 'Бардык товарлар',
        'add_to_cart': 'Себетке кошуу',
        'currency_som': 'сом',
        'no_products': 'Бул категорияда азырынча товарлар жок.',
        'out_of_stock': 'Жок',
        'about_title': 'Terra Care долбоору жөнүндө',
        'about_intro_1': '«Terra Care» — Кыргызстандан экологиялык жана социалдык долбоор. Биз жайыттарда өсүп, дыйканчыларга тоскоол болгон карагана бутагын пайдалуу табигый продуктуларга айландырабыз.',
        'about_intro_2': 'Жалбырактар менен гүлдөрдөн табигый самын жана косметика жасайбыз, ал эми шактардан — экологиялык мончолорду. Долбоор өсүмдүк калдыктарын күйгүзүүнү азайтууга, жайыттарды калыбына келтирүүгө жана айылдык үй-бүлөлөргө, өзгөчө аялдарга кошумча киреше берүүгө жардам берет.',
        'about_card1_title': 'Калдыксыз модель',
        'about_card1_desc': 'Жалбырактар менен гүлдөрдөн — табигый самын жана косметика. Шактардан — үй жана монча үчүн мончолор.',
        'about_card2_title': 'Жергиликтүү чийки зат',
        'about_card2_desc': 'Жайыттарда өсүп, дыйканчыларга тоскоол болгон карагана бутагын кайра иштетебиз.',
        'about_card3_title': 'Коомдорду колдоо',
        'about_card3_desc': 'Айылдык үй-бүлөлөргө, өзгөчө аялдарга кошумча киреше түзөбүз.',
        'about_card4_title': 'Колдон жасоо',
        'about_card4_desc': 'Ар бир продукт жаратылышты жана адамдарды ойлоп, колдон жасалган.',
        'mission_title': 'Биздин миссия',
        'mission_p1': 'Биз экологиялык көйгөйдү туруктуу ресурска айландырып, жергиликтүү өндүрүштүн жеткиликтүү, экологиялык товарларын сунуштайбыз.',
        'mission_p2': 'Долбоор өсүмдүк калдыктарын күйгүзүүнү азайтууга, жайыттарды калыбына келтирүүгө жана Кыргызстандын айылдык үй-бүлөлөрүнө, өзгөчө аялдарга кошумча киреше түзүүгө жардам берет.',
        'mission_p3': 'Ар бир сатып алуу экологиялык көйгөйдү чечүүгө жана жергиликтүү коомдорду колдоого салым кошот.',
        'mission_advantages_title': 'Биздин артыкчылыктар:',
        'mission_adv1': 'Калдыксыз өндүрүш модели',
        'mission_adv2': 'Кыргызстандан жергиликтүү чийки зат',
        'mission_adv3': 'Кичине топтомдо колдон жасоо',
        'mission_adv4': 'Агрессивдүү химиясыз табигый курам',
        'mission_adv5': 'Айылдык аялдарды жана дыйканчыларды колдоо',
        'mission_adv6': 'Экологиялык товарларга жеткиликтүү баалар',
        'footer_desc': 'Экологиялык жана социалдык долбоор, карагананы пайдалуу товарларга айландырат.',
        'footer_quick_links': 'Тез шилтемелер',
        'footer_contacts': 'Байланыш',
        'footer_products': 'Товарлар',
        'footer_about': 'Долбоор жөнүндө',
        'footer_mission': 'Миссиябыз',
        'footer_location': 'Кыргызстан, Бишкек шаары',
        'footer_copyright': 'Terra Care. Бардык укуктар корголгон.',
        'checkout_title': 'Заказды жасоо',
        'form_name': 'Аты',
        'form_phone': 'Телефон',
        'form_address': 'Жеткирүү дареги',
        'form_comment': 'Заказдын комментарийи',
        'form_submit': 'Заказды жөнөтүү',
        'form_cancel': 'Жокко чыгаруу',
        'clear_cart': 'Себетти тазалоо',
        'empty_cart': 'Себет бош',
        'order_success': 'Заказ ийгиликтүү жөнөтүлдү!',
        'order_error': 'Заказды жөнөтүүдө ката кетти.',
        'total_label': 'Жалпы',
        'view_details': 'Толук маалымат',
        'remove_item': 'Өчүрүү',
        'nav_request': 'Карагана заявка',
        'request_title': 'Карагананы чогултуу жана тапшыруу үчүн заявка калтырыңыз',
        'request_subtitle': 'Форманы толтуруңуз — деталдарды тактоо үчүн сиз менен байланышабыз. Заявкалар Telegramга жөнөтүлөт.',
        'request_comment_label': 'Заявканын комментарийи',
        'request_comment_hint': 'Чыгымды (кг), чогултуу району же дареги, каалаган мөөнөттөрдү көрсөтүңүз.',
        'request_submit': 'Заявка жөнөтүү',
        'request_success': 'Заявка ийгиликтүү жөнөтүлдү! Сиз менен жакында байланышабыз.',
        'request_error': 'Заявканы жөнөтүүдө ката. Кайра аракет кылыңыз же түз байланышыңыз.',
    },
    'ru': {
        'nav_products': 'Товары',
        'nav_about': 'О проекте',
        'nav_mission': 'Миссия',
        'lang_ky': 'KY',
        'lang_ru': 'RU',
        'lang_en': 'EN',
        'cart_title': 'Корзина',
        'hero_title': 'Натуральная косметика из Кыргызстана',
        'hero_desc': 'Превращаем кустарник карагана в экологичные товары: натуральное мыло, косметику и банные веники. Безотходное производство и поддержка сельских семей.',
        'hero_btn': 'Смотреть товары',
        'products_title': 'Наши товары',
        'products_subtitle': 'Натуральная косметика и хозяйственные товары на основе караганы',
        'all_products': 'Все товары',
        'add_to_cart': 'В корзину',
        'currency_som': 'сом',
        'no_products': 'В этой категории пока нет товаров.',
        'out_of_stock': 'Нет в наличии',
        'about_title': 'О проекте Terra Care',
        'about_intro_1': '«Terra Care» — экологический и социальный проект из Кыргызстана. Мы перерабатываем кустарник карагана, который разрастается на пастбищах и мешает фермерам, в полезные натуральные продукты.',
        'about_intro_2': 'Из листьев и цветов мы производим натуральное мыло и косметические изделия, а из ветвей — экологичные банные и хозяйственные веники. Проект помогает уменьшить сжигание растительных отходов, восстановить пастбища и создать дополнительный доход для сельских семей, особенно женщин.',
        'about_card1_title': 'Безотходная модель',
        'about_card1_desc': 'Из листьев и цветов — натуральное мыло и косметика. Из ветвей — веники для дома и бани.',
        'about_card2_title': 'Локальное сырьё',
        'about_card2_desc': 'Перерабатываем кустарник карагана, который разрастается на пастбищах и мешает фермерам.',
        'about_card3_title': 'Поддержка сообществ',
        'about_card3_desc': 'Создаём дополнительный доход для сельских семей, особенно женщин.',
        'about_card4_title': 'Ручное производство',
        'about_card4_desc': 'Каждый продукт изготовлен вручную с заботой о природе и людях.',
        'mission_title': 'Наша миссия',
        'mission_p1': 'Мы превращаем экологическую проблему в устойчивый ресурс и предлагаем доступные, экологичные товары местного производства.',
        'mission_p2': 'Проект помогает уменьшить сжигание растительных отходов, восстановить пастбища и создать дополнительный доход для сельских семей Кыргызстана, особенно женщин.',
        'mission_p3': 'Каждая покупка вносит вклад в решение экологической проблемы и поддержку местных сообществ.',
        'mission_advantages_title': 'Наши преимущества:',
        'mission_adv1': 'Безотходная модель производства',
        'mission_adv2': 'Локальное сырьё из Кыргызстана',
        'mission_adv3': 'Ручное производство малыми партиями',
        'mission_adv4': 'Натуральный состав без агрессивной химии',
        'mission_adv5': 'Поддержка сельских женщин и фермеров',
        'mission_adv6': 'Доступные цены на экологичные товары',
        'footer_desc': 'Экологический и социальный проект Terra Care, превращающий карагану в полезные товары.',
        'footer_quick_links': 'Быстрые ссылки',
        'footer_contacts': 'Контакты',
        'footer_products': 'Товары',
        'footer_about': 'О проекте',
        'footer_mission': 'Миссия',
        'footer_location': 'Кыргызстан, г. Бишкек',
        'footer_copyright': 'Terra Care. Все права защищены.',
        'checkout_title': 'Оформление заказа',
        'form_name': 'Имя',
        'form_phone': 'Телефон',
        'form_address': 'Адрес доставки',
        'form_comment': 'Комментарий к заказу',
        'form_submit': 'Отправить заказ',
        'form_cancel': 'Отмена',
        'clear_cart': 'Очистить корзину',
        'empty_cart': 'Корзина пуста',
        'order_success': 'Заказ успешно отправлен!',
        'order_error': 'Ошибка при отправке заказа.',
        'view_details': 'Подробнее',
        'remove_item': 'Удалить',
        'total_label': 'Итого',
        'nav_request': 'Заявка на карагану',
        'request_title': 'Оставьте заявку для сбора и сдачи караганы',
        'request_subtitle': 'Заполните форму — мы свяжемся с вами для уточнения деталей. Заявки отправляются в Telegram.',
        'request_comment_label': 'Комментарий к заявке',
        'request_comment_hint': 'Укажите объём сырья (кг), район или адрес, где можно собрать/принять карагану, и желаемые сроки.',
        'request_submit': 'Отправить заявку',
        'request_success': 'Заявка отправлена! Мы свяжемся с вами в ближайшее время.',
        'request_error': 'Ошибка при отправке заявки. Попробуйте ещё раз или свяжитесь с нами напрямую.',
    },
    'en': {
        'nav_products': 'Products',
        'nav_about': 'About',
        'nav_mission': 'Mission',
        'lang_ky': 'KY',
        'lang_ru': 'RU',
        'lang_en': 'EN',
        'cart_title': 'Cart',
        'hero_title': 'Natural Cosmetics from Kyrgyzstan',
        'hero_desc': 'Terra Care transforms caragana shrubs into eco-friendly products: natural soap, cosmetics, and bath brooms. Zero-waste production and support for rural families.',
        'hero_btn': 'View Products',
        'products_title': 'Our Products',
        'products_subtitle': 'Natural cosmetics and household goods based on caragana by Terra Care',
        'all_products': 'All Products',
        'add_to_cart': 'Add to Cart',
        'currency_som': 'som',
        'no_products': 'No products in this category yet.',
        'out_of_stock': 'Out of Stock',
        'about_title': 'About Terra Care Project',
        'about_intro_1': '"Terra Care" is an ecological and social project from Kyrgyzstan. We process the caragana shrub, which grows on pastures and hinders farmers, into useful natural products.',
        'about_intro_2': 'From leaves and flowers we produce natural soap and cosmetic products, and from branches — eco-friendly bath and household brooms. The project helps reduce burning of plant waste, restore pastures and create additional income for rural families, especially women.',
        'about_card1_title': 'Zero-Waste Model',
        'about_card1_desc': 'From leaves and flowers — natural soap and cosmetics. From branches — brooms for home and bath.',
        'about_card2_title': 'Local Raw Materials',
        'about_card2_desc': 'We process caragana shrub that grows on pastures and hinders farmers.',
        'about_card3_title': 'Community Support',
        'about_card3_desc': 'We create additional income for rural families, especially women.',
        'about_card4_title': 'Handmade Production',
        'about_card4_desc': 'Each product is handmade with care for nature and people.',
        'mission_title': 'Our Mission',
        'mission_p1': 'We transform an environmental problem into a sustainable resource and offer affordable, eco-friendly locally-produced goods.',
        'mission_p2': 'The project helps reduce burning of plant waste, restore pastures and create additional income for rural families in Kyrgyzstan, especially women.',
        'mission_p3': 'Every purchase contributes to solving an environmental problem and supporting local communities.',
        'mission_advantages_title': 'Our Benefits:',
        'mission_adv1': 'Zero-waste production model',
        'mission_adv2': 'Local raw materials from Kyrgyzstan',
        'mission_adv3': 'Handmade in small batches',
        'mission_adv4': 'Natural composition without aggressive chemicals',
        'mission_adv5': 'Support for rural women and farmers',
        'mission_adv6': 'Affordable prices for eco-friendly products',
        'footer_desc': 'Terra Care is an ecological and social project that transforms caragana into useful products.',
        'footer_quick_links': 'Quick Links',
        'footer_contacts': 'Contacts',
        'footer_products': 'Products',
        'footer_about': 'About',
        'footer_mission': 'Mission',
        'footer_location': 'Kyrgyzstan, Bishkek',
        'footer_copyright': 'Terra Care. All rights reserved.',
        'checkout_title': 'Checkout',
        'form_name': 'Name',
        'form_phone': 'Phone',
        'form_address': 'Delivery Address',
        'form_comment': 'Order Comment',
        'form_submit': 'Submit Order',
        'form_cancel': 'Cancel',
        'clear_cart': 'Clear Cart',
        'empty_cart': 'Cart is empty',
        'order_success': 'Order sent successfully!',
        'order_error': 'Error sending order.',
        'view_details': 'View Details',
        'remove_item': 'Remove',
        'total_label': 'Total',
        'nav_request': 'Caragana request',
        'request_title': 'Leave a request for caragana collection and delivery',
        'request_subtitle': 'Fill in the form — we will contact you to clarify details. Requests are sent to Telegram.',
        'request_comment_label': 'Comment to the request',
        'request_comment_hint': 'Specify the volume (kg), area or address for collection/delivery, and desired timeframe.',
        'request_submit': 'Submit request',
        'request_success': 'Request sent! We will contact you shortly.',
        'request_error': 'Error sending request. Please try again or contact us directly.',
    },
};

const DEFAULT_LANG = 'ru';

let currentLang = localStorage.getItem('language') || DEFAULT_LANG;

function getTranslation(key) {
    return TRANSLATIONS[currentLang]?.[key] || TRANSLATIONS[DEFAULT_LANG][key] || key;
}

function setLanguage(lang) {
    if (!TRANSLATIONS[lang]) lang = DEFAULT_LANG;
    currentLang = lang;
    window.currentLang = lang;
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
    updateAllTranslations();
    updateLangButtons();
}

function updateLangButtons() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        var btnLang = btn.dataset.lang || (btn.getAttribute('href') && btn.getAttribute('href').match(/\/(ky|ru|en)\//) && RegExp.$1);
        if (btnLang === currentLang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

function updateAllTranslations() {
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.dataset.translate;
        const translation = getTranslation(key);
        
        if (element.tagName === 'INPUT' && element.type === 'submit') {
            element.value = translation;
        } else {
            element.textContent = translation;
        }
    });
}

window.getTranslation = getTranslation;
window.setLanguage = setLanguage;
window.updateAllTranslations = updateAllTranslations;
window.currentLang = currentLang;

document.addEventListener('DOMContentLoaded', () => {
    updateAllTranslations();
    updateLangButtons();
    document.querySelectorAll('.lang-btn').forEach(btn => {
        if (btn.tagName === 'A') return;
        btn.addEventListener('click', function(e) {
            var lang = btn.dataset.lang;
            if (lang) {
                e.preventDefault();
                setLanguage(lang);
                if (typeof window.renderProducts === 'function') window.renderProducts();
                if (typeof window.updateCartUI === 'function') window.updateCartUI();
            }
        });
    });
});
