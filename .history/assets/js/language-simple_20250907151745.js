// Simple Language Selector
let currentLanguage = 'ja';

// Language translations
const translations = {
    'ja': {
        'nav-home': 'ホーム',
        'nav-services': 'サービス',
        'nav-process': '解体の流れ',
        'nav-gallery': 'ギャラリー',
        'nav-company': '会社概要',
        'nav-contact': 'お問い合わせ',
        'hero-title': '湘南 横浜の解体工事は日系解体工業株式会社へ',
        'hero-description': '年間３００件の実績。自社施工だから余計なマージンが無い安心価格。工事中のトラブルもスピード対応。産廃はマニュフェストで徹底管理！だから安心。',
        'service-1-title': '戸建解体',
        'service-1-desc': '安全で確実な戸建解体工事',
        'service-2-title': '火事解体',
        'service-2-desc': '火災後の迅速な解体処理',
        'service-3-title': '産廃処理',
        'service-3-desc': '適切な産業廃棄物の処理',
        'service-4-title': 'カーポート撤去',
        'service-4-desc': 'カーポートや車庫の撤去工事もお任せください',
        'service-5-title': 'ゴミ撤去',
        'service-5-desc': '建物内の不要な物品やゴミの撤去も対応いたします',
        'services-title': 'サービス内容',
        'gallery-title': '施工現場',
        'gallery-item-1': '戸建解体工事',
        'gallery-item-2': '火事解体工事',
        'gallery-item-3': '産廃処理',
        'gallery-item-4': '重機作業',
        'gallery-item-5': '現場清掃',
        'gallery-item-6': '安全管理',
        'contact-title': 'お問い合わせ'
    },
    'pt': {
        'nav-home': 'Início',
        'nav-services': 'Serviços',
        'nav-process': 'Processo de Demolição',
        'nav-gallery': 'Galeria',
        'nav-company': 'Empresa',
        'nav-contact': 'Contato',
        'hero-title': 'Demolição em Shonan e Yokohama - Nikkei Demolição Industrial',
        'hero-description': '300 casos por ano. Preço justo sem margens desnecessárias. Resposta rápida a problemas durante a obra. Gestão rigorosa de resíduos industriais! Por isso, confiança.',
        'service-1-title': 'Demolição Residencial',
        'service-1-desc': 'Demolição segura e confiável de residências',
        'service-2-title': 'Demolição Pós-Incêndio',
        'service-2-desc': 'Processamento rápido de demolição após incêndio',
        'service-3-title': 'Processamento de Resíduos',
        'service-3-desc': 'Processamento adequado de resíduos industriais',
        'service-4-title': 'Remoção de Carport',
        'service-4-desc': 'Também cuidamos da remoção de carports e garagens',
        'service-5-title': 'Remoção de Lixo',
        'service-5-desc': 'Também atendemos remoção de itens desnecessários e lixo dentro do edifício',
        'services-title': 'Conteúdo dos Serviços',
        'gallery-title': 'Local de Construção',
        'gallery-item-1': 'Demolição Residencial',
        'gallery-item-2': 'Demolição Pós-Incêndio',
        'gallery-item-3': 'Processamento de Resíduos',
        'gallery-item-4': 'Trabalho com Máquinas Pesadas',
        'gallery-item-5': 'Limpeza do Local',
        'gallery-item-6': 'Gestão de Segurança',
        'contact-title': 'Contato'
    },
    'en': {
        'nav-home': 'Home',
        'nav-services': 'Services',
        'nav-process': 'Demolition Process',
        'nav-gallery': 'Gallery',
        'nav-company': 'Company',
        'nav-contact': 'Contact',
        'hero-title': 'Demolition in Shonan & Yokohama - Nikkei Demolition Industrial',
        'hero-description': '300 cases per year. Fair price without unnecessary margins. Quick response to problems during construction. Rigorous management of industrial waste! Therefore, trust.',
        'service-1-title': 'Residential Demolition',
        'service-1-desc': 'Safe and reliable residential demolition',
        'service-2-title': 'Post-Fire Demolition',
        'service-2-desc': 'Quick demolition processing after fire',
        'service-3-title': 'Waste Processing',
        'service-3-desc': 'Proper processing of industrial waste',
        'gallery-title': 'Construction History',
        'gallery-item-1': 'Demolition scene',
        'gallery-item-2': 'Work with heavy machinery',
        'gallery-item-3': 'Cleaning after completion',
        'contact-title': 'Contact'
    }
};

// Language names
const languageNames = {
    'ja': '日本語',
    'pt': 'Português',
    'en': 'English'
};

// Toggle language menu
function toggleLanguageMenu() {
    const menu = document.getElementById('language-menu');
    if (menu) {
        if (menu.style.display === 'block') {
            menu.style.display = 'none';
        } else {
            menu.style.display = 'block';
        }
    }
}

// Change language
function changeLanguage(lang) {
    if (lang === currentLanguage) return;
    
    currentLanguage = lang;
    
    // Update current language display
    const currentLangElement = document.getElementById('current-lang');
    if (currentLangElement) {
        currentLangElement.textContent = languageNames[lang];
    }
    
    // Apply translations
    applyTranslations(lang);
    
    // Close menu
    const menu = document.getElementById('language-menu');
    if (menu) {
        menu.style.display = 'none';
    }
    
    // Save language preference
    localStorage.setItem('selectedLanguage', lang);
}

// Apply translations
function applyTranslations(lang) {
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    // Update page title
    const titles = {
        'ja': '湘南 横浜の解体工事は日系解体工業株式会社へ',
        'pt': 'Demolição em Shonan e Yokohama - Nikkei Demolição Industrial',
        'en': 'Demolition in Shonan & Yokohama - Nikkei Demolition Industrial'
    };
    
    if (titles[lang]) {
        document.title = titles[lang];
    }
}

// Initialize language
function initLanguage() {
    // Get saved language or default to Japanese
    const savedLang = localStorage.getItem('selectedLanguage') || 'ja';
    currentLanguage = savedLang;
    
    // Update current language display
    const currentLangElement = document.getElementById('current-lang');
    if (currentLangElement) {
        currentLangElement.textContent = languageNames[currentLanguage];
    }
    
    // Apply translations
    applyTranslations(currentLanguage);
}

// Close menu when clicking outside
document.addEventListener('click', function(event) {
    const menu = document.getElementById('language-menu');
    const button = event.target.closest('button[onclick="toggleLanguageMenu()"]');
    
    if (menu && !button && !menu.contains(event.target)) {
        menu.style.display = 'none';
    }
});

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initLanguage);

// Fallback initialization
if (document.readyState === 'loading') {
    // DOM is still loading, wait for DOMContentLoaded
} else {
    // DOM is already loaded
    initLanguage();
}
