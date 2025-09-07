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
        'contact-title': 'お問い合わせ',
        'workflow-link': 'こちらをご覧ください',
        'workflow-step-1-title': '現地調査',
        'workflow-step-1-desc': '現場を詳しく調査し、正確な見積もりを作成いたします。',
        'workflow-step-2-title': '見積もり提出',
        'workflow-step-2-desc': '詳細な見積もり書を提出し、ご説明いたします。',
        'workflow-step-3-title': '契約・準備',
        'workflow-step-3-desc': '契約後、必要な手続きと工事準備を行います。',
        'workflow-step-4-title': '工事実施',
        'workflow-step-4-desc': '安全第一で確実な解体工事を実施いたします。',
        'gallery-desc-1': '安全で確実な解体作業',
        'gallery-desc-4': '大型重機による効率的な作業',
        'company-feature-1': '年間300件の豊富な実績',
        'company-feature-2': '自社施工による安心価格',
        'form-option-1': '戸建解体',
        'form-option-2': '火事解体',
        'form-option-3': '産廃処理',
        'form-option-4': 'カーポート撤去',
        'form-option-5': 'ゴミ撤去',
        'footer-service-1': '戸建解体',
        'footer-service-2': '火事解体',
        'footer-service-3': '産廃処理',
        'footer-service-4': 'カーポート撤去',
        'footer-service-5': 'ゴミ撤去',
        'workflow-title': '工事の流れ',
        'workflow-description': '解体工事の詳細な流れについては、',
        'workflow-step-0-title': 'お問い合わせ',
        'workflow-step-0-desc': 'お電話またはメールでお気軽にお問い合わせください。',
        'workflow-step-5-title': '完了・清掃',
        'workflow-step-5-desc': '工事完了後、現場の清掃を行い、お客様にご報告いたします。',
        'gallery-desc-2': '火災被害建物の解体',
        'gallery-desc-3': 'マニュフェスト管理',
        'gallery-desc-5': '工事完了後の清掃作業',
        'gallery-desc-6': '安全第一の作業体制',
        'company-feature-3': '工事中のトラブルにスピード対応',
        'company-feature-4': '産廃のマニュフェスト徹底管理',
        'company-feature-5': '横浜・川崎・茅ヶ崎エリア対応',
        'company-feature-6': '無料見積もり実施',
        'form-select': '選択してください',
        'form-other': 'その他',
        'company-title': '会社概要',
        'company-registration': '解体工事業者登録番号',
        'company-registration-number': '神奈川県(登-29）第1842号 東京都(登-30）第3481号'
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
        'contact-title': 'Contato',
        'workflow-link': 'Clique aqui para ver',
        'workflow-step-1-title': 'Inspeção Local',
        'workflow-step-1-desc': 'Investigamos detalhadamente o local e criamos uma estimativa precisa.',
        'workflow-step-2-title': 'Apresentação da Estimativa',
        'workflow-step-2-desc': 'Apresentamos uma estimativa detalhada e explicamos.',
        'workflow-step-3-title': 'Contrato e Preparação',
        'workflow-step-3-desc': 'Após o contrato, realizamos os procedimentos necessários e a preparação da obra.',
        'workflow-step-4-title': 'Execução da Obra',
        'workflow-step-4-desc': 'Executamos a demolição com segurança em primeiro lugar.',
        'gallery-desc-1': 'Trabalho de demolição seguro e confiável',
        'gallery-desc-4': 'Trabalho eficiente com máquinas pesadas',
        'company-feature-1': '300 casos por ano com rica experiência',
        'company-feature-2': 'Preço justo com construção própria',
        'form-option-1': 'Demolição Residencial',
        'form-option-2': 'Demolição Pós-Incêndio',
        'form-option-3': 'Processamento de Resíduos',
        'form-option-4': 'Remoção de Carport',
        'form-option-5': 'Remoção de Lixo',
        'footer-service-1': 'Demolição Residencial',
        'footer-service-2': 'Demolição Pós-Incêndio',
        'footer-service-3': 'Processamento de Resíduos',
        'footer-service-4': 'Remoção de Carport',
        'footer-service-5': 'Remoção de Lixo'
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
        'service-4-title': 'Carport Removal',
        'service-4-desc': 'We also handle carport and garage removal',
        'service-5-title': 'Garbage Removal',
        'service-5-desc': 'We also handle removal of unnecessary items and garbage inside the building',
        'services-title': 'Service Content',
        'gallery-title': 'Construction Site',
        'gallery-item-1': 'Residential Demolition',
        'gallery-item-2': 'Post-Fire Demolition',
        'gallery-item-3': 'Waste Processing',
        'gallery-item-4': 'Heavy Machinery Work',
        'gallery-item-5': 'Site Cleaning',
        'gallery-item-6': 'Safety Management',
        'contact-title': 'Contact',
        'workflow-link': 'Click here to see',
        'workflow-step-1-title': 'Site Survey',
        'workflow-step-1-desc': 'We thoroughly investigate the site and create an accurate estimate.',
        'workflow-step-2-title': 'Estimate Submission',
        'workflow-step-2-desc': 'We submit a detailed estimate and explain.',
        'workflow-step-3-title': 'Contract and Preparation',
        'workflow-step-3-desc': 'After the contract, we perform necessary procedures and construction preparation.',
        'workflow-step-4-title': 'Construction Execution',
        'workflow-step-4-desc': 'We execute demolition with safety first.',
        'gallery-desc-1': 'Safe and reliable demolition work',
        'gallery-desc-4': 'Efficient work with heavy machinery',
        'company-feature-1': '300 cases per year with rich experience',
        'company-feature-2': 'Fair price with own construction',
        'form-option-1': 'Residential Demolition',
        'form-option-2': 'Post-Fire Demolition',
        'form-option-3': 'Waste Processing',
        'form-option-4': 'Carport Removal',
        'form-option-5': 'Garbage Removal',
        'footer-service-1': 'Residential Demolition',
        'footer-service-2': 'Post-Fire Demolition',
        'footer-service-3': 'Waste Processing',
        'footer-service-4': 'Carport Removal',
        'footer-service-5': 'Garbage Removal'
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
