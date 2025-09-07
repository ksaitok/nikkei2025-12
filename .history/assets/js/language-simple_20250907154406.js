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
        'company-registration-number': '神奈川県(登-29）第1842号 東京都(登-30）第3481号',
        'process-hero-title': '解体工事の流れ',
        'process-hero-subtitle': 'お見積りから工事完了まで、安心の7ステップで進めます',
        'process-description': '解体工事は複雑な手続きが必要ですが、当社が責任を持って全ての工程を管理いたします。お客様には最小限のご負担で、安心して工事を進めていただけます。',
        'process-step-1-title': 'お見積り・ご契約',
        'process-step-1-desc': '現地調査を行い、詳細な見積もりを作成。ご納得いただければ契約となります。',
        'process-step-2-title': '電気・ガス等の手配',
        'process-step-2-desc': '電気、ガス、水道の停止手続きを行います。',
        'process-step-3-title': 'リサイクル届の提出',
        'process-step-3-desc': '工事の1週間前までに役所へ提出する書類を準備します。',
        'process-step-4-title': '近隣挨拶',
        'process-step-4-desc': '工事前に近隣の方々へ挨拶と説明を行います。',
        'process-step-5-title': '着工',
        'process-step-5-desc': '安全第一で確実な解体工事を実施いたします。',
        'process-step-6-title': '完了後の現地確認',
        'process-step-6-desc': '工事完了後、現場の確認と清掃を行います。',
        'process-step-7-title': '工事代金のお振込',
        'process-step-7-desc': '工事完了後、お支払いをお願いいたします。',
        'process-step-8-title': '滅失登記の申請',
        'process-step-8-desc': '建物の滅失登記手続きを行います。',
        'process-detail-title': '詳細な工事の流れ',
        'process-survey-title': '現地調査とお見積り',
        'process-survey-desc': 'お客様のご要望をお聞きし、現地を詳しく調査いたします。建物の構造、周辺環境、アクセス状況などを確認し、正確なお見積もりを作成いたします。',
        'process-contract-title': 'ご契約',
        'process-contract-desc': 'お見積りの金額・内容にご納得いただければ「ご契約」となります。また、「リサイクル届」（工事の1週間前までに役所へ提出する書類）にもご署名をいただきます。',
        'process-utilities-title': '電気・ガス・水道の手配',
        'process-electric-title': '電気（東電）',
        'process-electric-desc': 'メーター、引き込み線の撤去。工事の2週間前に連絡。',
        'process-gas-title': '都市ガス',
        'process-gas-desc': '現地立会いのもと、ガスメーターの撤去および敷地内・地境（境界線）でのガス管切断。工事の1週間前に連絡。',
        'process-water-title': '水道',
        'process-water-desc': 'メーターの撤去。工事の1週間前に連絡。',
        'process-documents-title': '必要な書類',
        'process-recycle-title': 'リサイクル届',
        'process-recycle-desc': '工事の1週間前までに役所へ提出',
        'process-neighbor-title': '近隣挨拶',
        'process-neighbor-desc': '工事前に近隣の方々へ挨拶と説明',
        'process-construction-title': '安全第一の解体工事',
        'process-construction-desc': '安全第一で確実な解体工事を実施いたします。重機を使用した効率的な作業と、手作業による丁寧な仕上げを行います。',
        'process-separation-title': '分別・搬出',
        'process-separation-desc': '廃材の分別と適切な処理',
        'process-excavation-caption': '解体後の試掘作業（地盤面から50㎝下まで掘削）',
        'process-machinery-caption': '重機を使用した安全で効率的な解体作業',
        'process-faq-title': 'よくあるご質問',
        'process-faq-1-q': '工事期間はどのくらいですか？',
        'process-faq-1-a': '建物の規模によりますが、一般的な戸建住宅で3-7日程度です。詳細はお見積り時にご説明いたします。',
        'process-faq-2-q': '工事中の騒音はどの程度ですか？',
        'process-faq-2-a': '重機を使用するため、一定の騒音は発生します。作業時間は平日の9時-17時を基本とし、近隣への配慮を心がけています。',
        'process-faq-3-q': '廃材の処理はどうなりますか？',
        'process-faq-3-a': '廃材は適切に分別し、リサイクル可能なものは再利用、その他は適正に処理いたします。マニフェストによる管理も行います。',
        'process-faq-4-q': '工事費用の支払い方法は？',
        'process-faq-4-a': '銀行振込または現金でのお支払いが可能です。工事完了後のお支払いとなります。',
        'process-cta-title': 'お見積りは無料です',
        'process-cta-desc': '解体工事をご検討の方は、お気軽にお問い合わせください。現地調査を行い、詳細なお見積もりを作成いたします。',
        'process-cta-button': '無料見積もりを依頼する',
        'process-cta-phone': 'お電話でのお問い合わせ',
        'breadcrumb-home': 'ホーム',
        'breadcrumb-process': '工事の流れ',
        'process-overview-title': '工事の流れ概要',
        'process-customer-procedures-title': 'お客様でお手続きいただくもの',
        'process-customer-procedures-desc': 'NTT・CATVの手続きはお客様でお願いします。'
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
        'footer-service-5': 'Remoção de Lixo',
        'workflow-title': 'Fluxo de Trabalho',
        'workflow-description': 'Para o fluxo detalhado de demolição, ',
        'workflow-step-0-title': 'Contato',
        'workflow-step-0-desc': 'Entre em contato conosco por telefone ou e-mail.',
        'workflow-step-5-title': 'Conclusão e Limpeza',
        'workflow-step-5-desc': 'Após a conclusão da obra, realizamos a limpeza do local e reportamos ao cliente.',
        'gallery-desc-2': 'Demolição de edifício danificado por incêndio',
        'gallery-desc-3': 'Gestão de manifesto',
        'gallery-desc-5': 'Trabalho de limpeza após conclusão da obra',
        'gallery-desc-6': 'Sistema de trabalho com segurança em primeiro lugar',
        'company-feature-3': 'Resposta rápida a problemas durante a obra',
        'company-feature-4': 'Gestão rigorosa de manifesto de resíduos industriais',
        'company-feature-5': 'Atendimento na área de Yokohama, Kawasaki e Chigasaki',
        'company-feature-6': 'Estimativa gratuita',
        'form-select': 'Selecione',
        'form-other': 'Outro',
        'company-title': 'Sobre a Empresa',
        'company-registration': 'Número de Registro de Demolição',
        'company-registration-number': 'Kanagawa (Reg-29) No. 1842 Tóquio (Reg-30) No. 3481',
        'process-hero-title': 'Fluxo do Processo de Demolição',
        'process-hero-subtitle': 'Do orçamento à conclusão da obra, avançamos com 7 etapas seguras',
        'process-description': 'A demolição requer procedimentos complexos, mas nossa empresa gerencia responsavelmente todos os processos. Os clientes podem avançar com a obra com o mínimo de fardo e total tranquilidade.',
        'process-step-1-title': 'Orçamento e Contrato',
        'process-step-1-desc': 'Realizamos inspeção local e criamos orçamento detalhado. Se aprovado, fazemos o contrato.',
        'process-step-2-title': 'Arranjo de Eletricidade, Gás, etc.',
        'process-step-2-desc': 'Realizamos procedimentos de desligamento de eletricidade, gás e água.',
        'process-step-3-title': 'Submissão do Formulário de Reciclagem',
        'process-step-3-desc': 'Preparamos documentos para submissão ao governo até 1 semana antes da obra.',
        'process-step-4-title': 'Cumprimento aos Vizinhos',
        'process-step-4-desc': 'Antes da obra, cumprimentamos e explicamos aos vizinhos.',
        'process-step-5-title': 'Início da Obra',
        'process-step-5-desc': 'Executamos demolição segura e confiável com segurança em primeiro lugar.',
        'process-step-6-title': 'Confirmação Local Após Conclusão',
        'process-step-6-desc': 'Após conclusão da obra, realizamos confirmação e limpeza do local.',
        'process-step-7-title': 'Transferência do Pagamento da Obra',
        'process-step-7-desc': 'Após conclusão da obra, solicitamos o pagamento.',
        'process-step-8-title': 'Aplicação de Registro de Extinção',
        'process-step-8-desc': 'Realizamos procedimentos de registro de extinção do edifício.',
        'process-detail-title': 'Fluxo Detalhado da Obra',
        'process-survey-title': 'Inspeção Local e Orçamento',
        'process-survey-desc': 'Ouvimos as necessidades do cliente e inspecionamos detalhadamente o local. Verificamos estrutura do edifício, ambiente circundante, condições de acesso, etc., e criamos orçamento preciso.',
        'process-contract-title': 'Contrato',
        'process-contract-desc': 'Se aprovado o valor e conteúdo do orçamento, fazemos o "contrato". Também solicitamos assinatura do "formulário de reciclagem" (documento para submissão ao governo até 1 semana antes da obra).',
        'process-utilities-title': 'Arranjo de Eletricidade, Gás e Água',
        'process-electric-title': 'Eletricidade (TEPCO)',
        'process-electric-desc': 'Remoção de medidor e linha de entrada. Contato 2 semanas antes da obra.',
        'process-gas-title': 'Gás Urbano',
        'process-gas-desc': 'Com presença local, remoção do medidor de gás e corte do tubo de gás dentro do terreno e na fronteira. Contato 1 semana antes da obra.',
        'process-water-title': 'Água',
        'process-water-desc': 'Remoção do medidor. Contato 1 semana antes da obra.',
        'process-documents-title': 'Documentos Necessários',
        'process-recycle-title': 'Formulário de Reciclagem',
        'process-recycle-desc': 'Submissão ao governo até 1 semana antes da obra',
        'process-neighbor-title': 'Cumprimento aos Vizinhos',
        'process-neighbor-desc': 'Cumprimento e explicação aos vizinhos antes da obra',
        'process-construction-title': 'Demolição com Segurança em Primeiro Lugar',
        'process-construction-desc': 'Executamos demolição segura e confiável com segurança em primeiro lugar. Trabalho eficiente com máquinas pesadas e acabamento cuidadoso com trabalho manual.',
        'process-separation-title': 'Separação e Remoção',
        'process-separation-desc': 'Separação e processamento adequado de resíduos',
        'process-excavation-caption': 'Trabalho de escavação após demolição (escavação até 50cm abaixo do nível do solo)',
        'process-machinery-caption': 'Trabalho de demolição seguro e eficiente com máquinas pesadas',
        'process-faq-title': 'Perguntas Frequentes',
        'process-faq-1-q': 'Quanto tempo dura a obra?',
        'process-faq-1-a': 'Depende do tamanho do edifício, mas para residências típicas são cerca de 3-7 dias. Detalhes são explicados no momento do orçamento.',
        'process-faq-2-q': 'Qual o nível de ruído durante a obra?',
        'process-faq-2-a': 'Como usamos máquinas pesadas, há certo nível de ruído. O horário de trabalho é basicamente 9h-17h em dias úteis, com consideração aos vizinhos.',
        'process-faq-3-q': 'Como é o processamento dos resíduos?',
        'process-faq-3-a': 'Os resíduos são separados adequadamente, reutilizamos o que pode ser reciclado e processamos adequadamente o resto. Também fazemos gestão por manifesto.',
        'process-faq-4-q': 'Qual a forma de pagamento da obra?',
        'process-faq-4-a': 'É possível pagar por transferência bancária ou em dinheiro. O pagamento é após a conclusão da obra.',
        'process-cta-title': 'Orçamento é Gratuito',
        'process-cta-desc': 'Se está considerando demolição, entre em contato conosco. Realizamos inspeção local e criamos orçamento detalhado.',
        'process-cta-button': 'Solicitar Orçamento Gratuito',
        'process-cta-phone': 'Contato por Telefone',
        'breadcrumb-home': 'Início',
        'breadcrumb-process': 'Processo de Demolição',
        'process-overview-title': 'Visão Geral do Processo de Demolição',
        'process-customer-procedures-title': 'Procedimentos do Cliente',
        'process-customer-procedures-desc': 'Os procedimentos NTT e CATV devem ser feitos pelo cliente.'
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
        'footer-service-5': 'Garbage Removal',
        'workflow-title': 'Work Flow',
        'workflow-description': 'For detailed demolition flow, ',
        'workflow-step-0-title': 'Contact',
        'workflow-step-0-desc': 'Please contact us by phone or email.',
        'workflow-step-5-title': 'Completion and Cleaning',
        'workflow-step-5-desc': 'After construction completion, we clean the site and report to the client.',
        'gallery-desc-2': 'Demolition of fire-damaged building',
        'gallery-desc-3': 'Manifest management',
        'gallery-desc-5': 'Cleaning work after construction completion',
        'gallery-desc-6': 'Work system with safety first',
        'company-feature-3': 'Quick response to problems during construction',
        'company-feature-4': 'Rigorous management of industrial waste manifest',
        'company-feature-5': 'Service in Yokohama, Kawasaki and Chigasaki areas',
        'company-feature-6': 'Free estimate',
        'form-select': 'Please select',
        'form-other': 'Other',
        'company-title': 'Company Overview',
        'company-registration': 'Demolition Business Registration Number',
        'company-registration-number': 'Kanagawa (Reg-29) No. 1842 Tokyo (Reg-30) No. 3481',
        'process-hero-title': 'Demolition Process Flow',
        'process-hero-subtitle': 'From estimate to construction completion, we proceed with 7 safe steps',
        'process-description': 'Demolition requires complex procedures, but our company manages all processes responsibly. Clients can proceed with construction with minimal burden and complete peace of mind.',
        'process-step-1-title': 'Estimate and Contract',
        'process-step-1-desc': 'We conduct on-site survey and create detailed estimate. If approved, we make the contract.',
        'process-step-2-title': 'Electricity, Gas, etc. Arrangement',
        'process-step-2-desc': 'We handle disconnection procedures for electricity, gas, and water.',
        'process-step-3-title': 'Recycling Form Submission',
        'process-step-3-desc': 'We prepare documents for government submission up to 1 week before construction.',
        'process-step-4-title': 'Neighbor Greeting',
        'process-step-4-desc': 'Before construction, we greet and explain to neighbors.',
        'process-step-5-title': 'Construction Start',
        'process-step-5-desc': 'We execute safe and reliable demolition with safety first.',
        'process-step-6-title': 'On-site Confirmation After Completion',
        'process-step-6-desc': 'After construction completion, we conduct site confirmation and cleaning.',
        'process-step-7-title': 'Construction Payment Transfer',
        'process-step-7-desc': 'After construction completion, we request payment.',
        'process-step-8-title': 'Extinction Registration Application',
        'process-step-8-desc': 'We handle building extinction registration procedures.',
        'process-detail-title': 'Detailed Construction Flow',
        'process-survey-title': 'On-site Survey and Estimate',
        'process-survey-desc': 'We listen to customer needs and conduct detailed on-site survey. We check building structure, surrounding environment, access conditions, etc., and create accurate estimate.',
        'process-contract-title': 'Contract',
        'process-contract-desc': 'If the estimate amount and content are approved, we make the "contract". We also request signature for the "recycling form" (document for government submission up to 1 week before construction).',
        'process-utilities-title': 'Electricity, Gas, and Water Arrangement',
        'process-electric-title': 'Electricity (TEPCO)',
        'process-electric-desc': 'Meter and service line removal. Contact 2 weeks before construction.',
        'process-gas-title': 'City Gas',
        'process-gas-desc': 'With on-site presence, gas meter removal and gas pipe cutting within property and at boundary. Contact 1 week before construction.',
        'process-water-title': 'Water',
        'process-water-desc': 'Meter removal. Contact 1 week before construction.',
        'process-documents-title': 'Required Documents',
        'process-recycle-title': 'Recycling Form',
        'process-recycle-desc': 'Government submission up to 1 week before construction',
        'process-neighbor-title': 'Neighbor Greeting',
        'process-neighbor-desc': 'Greeting and explanation to neighbors before construction',
        'process-construction-title': 'Safety-First Demolition',
        'process-construction-desc': 'We execute safe and reliable demolition with safety first. Efficient work with heavy machinery and careful finishing with manual work.',
        'process-separation-title': 'Separation and Removal',
        'process-separation-desc': 'Proper separation and processing of waste materials',
        'process-excavation-caption': 'Excavation work after demolition (excavation up to 50cm below ground level)',
        'process-machinery-caption': 'Safe and efficient demolition work with heavy machinery',
        'process-faq-title': 'Frequently Asked Questions',
        'process-faq-1-q': 'How long does construction take?',
        'process-faq-1-a': 'It depends on building size, but for typical residential houses it takes about 3-7 days. Details are explained at the time of estimate.',
        'process-faq-2-q': 'What is the noise level during construction?',
        'process-faq-2-a': 'Since we use heavy machinery, there is a certain level of noise. Work hours are basically 9am-5pm on weekdays, with consideration for neighbors.',
        'process-faq-3-q': 'How are waste materials processed?',
        'process-faq-3-a': 'Waste materials are properly separated, we reuse what can be recycled and properly process the rest. We also manage with manifest.',
        'process-faq-4-q': 'What are the payment methods for construction?',
        'process-faq-4-a': 'Payment by bank transfer or cash is possible. Payment is after construction completion.',
        'process-cta-title': 'Free Estimate',
        'process-cta-desc': 'If you are considering demolition, please feel free to contact us. We conduct on-site survey and create detailed estimate.',
        'process-cta-button': 'Request Free Estimate',
        'process-cta-phone': 'Contact by Phone',
        'breadcrumb-home': 'Home',
        'breadcrumb-process': 'Demolition Process',
        'process-overview-title': 'Demolition Process Overview',
        'process-customer-procedures-title': 'Customer Procedures',
        'process-customer-procedures-desc': 'NTT and CATV procedures should be handled by the customer.'
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
