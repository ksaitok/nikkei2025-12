// Galeria de Demolições - JavaScript

class GalleryManager {
    constructor() {
        this.currentFilter = 'all';
        this.currentPage = 1;
        this.itemsPerPage = 6;
        this.allItems = [];
        this.filteredItems = [];
        this.isLoading = false;
        
        this.init();
    }
    
    init() {
        this.loadGalleryData();
        this.setupEventListeners();
        this.setupGalleryEventListeners();
        this.checkAdminAccess();
        this.setupStorageListener();
    }
    
    // Carregar dados da galeria
    async loadGalleryData() {
        try {
            // Carregar dados do localStorage ou usar dados padrão
            const savedPhotos = localStorage.getItem('galleryPhotos');
            if (savedPhotos) {
                this.allItems = JSON.parse(savedPhotos);
            } else {
                // Dados padrão - Agrupados por título da demolição
                this.allItems = [
                // Demolição 1: Casa Residencial em São Paulo - Múltiplas fotos
                {
                    id: 1,
                    title: 'Demolição Residencial - Casa de Madeira',
                    description: 'Demolição completa de casa residencial de madeira com equipamentos especializados.',
                    image: 'assets/images/DemolicaoMadeira.jpg',
                    category: 'residential',
                    date: '2024-01-15',
                    location: 'São Paulo, SP',
                    locationGroup: 'sao-paulo-2024-01',
                    photoIndex: 1,
                    totalPhotos: 3,
                    details: 'Casa de 2 andares, 120m², demolição completa com separação de materiais recicláveis'
                },
                {
                    id: 2,
                    title: 'Demolição Residencial - Casa de Madeira',
                    description: 'Equipamentos em ação durante a demolição da estrutura de madeira.',
                    image: 'assets/images/DemolicaoRC.jpg',
                    category: 'residential',
                    date: '2024-01-15',
                    location: 'São Paulo, SP',
                    locationGroup: 'sao-paulo-2024-01',
                    photoIndex: 2,
                    totalPhotos: 3,
                    details: 'Uso de escavadeira e martelo hidráulico para demolição controlada'
                },
                {
                    id: 3,
                    title: 'Demolição Residencial - Casa de Madeira',
                    description: 'Local limpo após demolição completa e remoção de entulhos.',
                    image: 'assets/images/DemolicaoFerro.jpg',
                    category: 'residential',
                    date: '2024-01-15',
                    location: 'São Paulo, SP',
                    locationGroup: 'sao-paulo-2024-01',
                    photoIndex: 3,
                    totalPhotos: 3,
                    details: 'Terreno limpo e pronto para nova construção'
                },
                
                // Demolição 2: Edifício Comercial no Rio de Janeiro - Múltiplas fotos
                {
                    id: 4,
                    title: 'Demolição Comercial - Edifício de Concreto',
                    description: 'Demolição de edifício comercial de concreto armado com segurança total.',
                    image: 'assets/images/DemolicaoPosIncendio.jpg',
                    category: 'commercial',
                    date: '2024-01-20',
                    location: 'Rio de Janeiro, RJ',
                    locationGroup: 'rio-janeiro-2024-01',
                    photoIndex: 1,
                    totalPhotos: 4,
                    details: 'Edifício comercial de 5 andares, 800m², demolição com isolamento total da área'
                },
                {
                    id: 5,
                    title: 'Demolição Comercial - Edifício de Concreto',
                    description: 'Demolição de estrutura de concreto com equipamentos pesados.',
                    image: 'assets/images/DemolicaoNaiso.jpg',
                    category: 'commercial',
                    date: '2024-01-20',
                    location: 'Rio de Janeiro, RJ',
                    locationGroup: 'rio-janeiro-2024-01',
                    photoIndex: 2,
                    totalPhotos: 4,
                    details: 'Uso de guindaste e martelo hidráulico para demolição de pilares'
                },
                {
                    id: 6,
                    title: 'Demolição Comercial - Edifício de Concreto',
                    description: 'Corte de árvores como preparação para demolição de terreno.',
                    image: 'assets/images/CorteArvore.jpg',
                    category: 'commercial',
                    date: '2024-01-20',
                    location: 'Rio de Janeiro, RJ',
                    locationGroup: 'rio-janeiro-2024-01',
                    photoIndex: 3,
                    totalPhotos: 4,
                    details: 'Carregamento e transporte de entulhos para área de descarte'
                },
                {
                    id: 7,
                    title: 'Demolição Comercial - Edifício de Concreto',
                    description: 'Equipamentos pesados sendo utilizados em demolição industrial.',
                    image: 'assets/images/EquipPesado.png',
                    category: 'commercial',
                    date: '2024-01-20',
                    location: 'Rio de Janeiro, RJ',
                    locationGroup: 'rio-janeiro-2024-01',
                    photoIndex: 4,
                    totalPhotos: 4,
                    details: 'Local limpo e preparado para nova construção'
                },
                
                // Demolição 3: Galpão Industrial em Belo Horizonte - Múltiplas fotos
                {
                    id: 8,
                    title: 'Demolição Industrial - Galpão Metálico',
                    description: 'Desmontagem de galpão industrial com estrutura metálica.',
                    image: 'assets/images/DemolicaoApos.png',
                    category: 'industrial',
                    date: '2024-01-25',
                    location: 'Belo Horizonte, MG',
                    locationGroup: 'belo-horizonte-2024-01',
                    photoIndex: 1,
                    totalPhotos: 2,
                    details: 'Galpão industrial de 2000m², estrutura metálica, desmontagem cuidadosa'
                },
                {
                    id: 9,
                    title: 'Demolição Industrial - Galpão Metálico',
                    description: 'Demolição de estrutura danificada após desastre natural.',
                    image: 'assets/images/DemolicaoMadeira.jpg',
                    category: 'industrial',
                    date: '2024-01-25',
                    location: 'Belo Horizonte, MG',
                    locationGroup: 'belo-horizonte-2024-01',
                    photoIndex: 2,
                    totalPhotos: 2,
                    details: 'Separação de materiais metálicos para reciclagem'
                },
                
                // Demolição 4: Residência Pós-Incêndio em Curitiba - Foto única
                {
                    id: 10,
                    title: 'Demolição Pós-Incêndio - Residência',
                    description: 'Demolição de residência danificada por incêndio com protocolos especiais.',
                    image: 'assets/images/DemolicaoPosIncendio.jpg',
                    category: 'fire-damage',
                    date: '2024-02-01',
                    location: 'Curitiba, PR',
                    locationGroup: 'curitiba-2024-02',
                    photoIndex: 1,
                    totalPhotos: 1,
                    details: 'Residência de 150m² danificada por incêndio, demolição com protocolos de segurança'
                }
                ];
                
                // Salvar dados padrão no localStorage
                localStorage.setItem('galleryPhotos', JSON.stringify(this.allItems));
            }
            
            this.filteredItems = [...this.allItems];
            console.log('Dados carregados:', this.allItems);
            console.log('Número de itens:', this.allItems.length);
            this.renderGallery();
            
        } catch (error) {
            console.error('Erro ao carregar dados da galeria:', error);
            this.showError('Erro ao carregar a galeria. Tente novamente.');
        }
    }
    
    // Configurar listener para mudanças no localStorage
    setupStorageListener() {
        window.addEventListener('storage', (e) => {
            if (e.key === 'galleryPhotos') {
                // Recarregar dados quando houver mudanças
                this.loadGalleryData();
            }
        });
        
        // Também escutar mudanças no mesmo tab (para quando o admin adiciona fotos)
        const originalSetItem = localStorage.setItem;
        localStorage.setItem = function(key, value) {
            originalSetItem.apply(this, arguments);
            if (key === 'galleryPhotos') {
                // Disparar evento customizado
                window.dispatchEvent(new CustomEvent('galleryUpdated'));
            }
        };
        
        window.addEventListener('galleryUpdated', () => {
            this.loadGalleryData();
        });
    }
    
    // Configurar event listeners
    setupEventListeners() {
        // Filtros
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setFilter(e.target.dataset.filter);
            });
        });
        
        // Botão carregar mais
        const loadMoreBtn = document.getElementById('load-more-btn');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                this.loadMore();
            });
        }
        
        // Modal
        this.setupModal();
    }
    
    // Definir filtro
    setFilter(filter) {
        this.currentFilter = filter;
        this.currentPage = 1;
        
        // Atualizar botões ativos
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-filter="${filter}"]`).classList.add('active');
        
        // Filtrar itens
        if (filter === 'all') {
            this.filteredItems = [...this.allItems];
        } else {
            this.filteredItems = this.allItems.filter(item => item.category === filter);
        }
        
        this.renderGallery();
    }
    
    // Renderizar galeria
    renderGallery() {
        const galleryGrid = document.getElementById('gallery-grid');
        if (!galleryGrid) {
            console.error('Elemento gallery-grid não encontrado!');
            return;
        }
        
        console.log('Iniciando renderização da galeria...');
        
        // Limpar grid
        galleryGrid.innerHTML = '';
        
        // Adicionar mensagem de debug temporária
        const debugMsg = document.createElement('div');
        debugMsg.style.cssText = `
            grid-column: 1 / -1;
            text-align: center;
            padding: 20px;
            background: rgba(52, 152, 219, 0.1);
            border: 2px solid #3498db;
            border-radius: 10px;
            color: #2c3e50;
            font-weight: 600;
        `;
        debugMsg.innerHTML = `
            <i class="fas fa-info-circle"></i>
            Debug: Carregando galeria... (${this.filteredItems.length} itens encontrados)
        `;
        galleryGrid.appendChild(debugMsg);
        
        // Calcular itens para mostrar
        const itemsToShow = this.currentPage * this.itemsPerPage;
        const itemsToRender = this.filteredItems.slice(0, itemsToShow);
        
        console.log('Itens para renderizar:', itemsToRender.length);
        
        // Se não há itens, mostrar mensagem
        if (itemsToRender.length === 0) {
            galleryGrid.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #7f8c8d;">
                    <i class="fas fa-images" style="font-size: 3rem; margin-bottom: 20px;"></i>
                    <h3>Nenhuma foto encontrada</h3>
                    <p>Tente alterar os filtros ou adicionar novas fotos.</p>
                </div>
            `;
            return;
        }
        
        // Agrupar fotos por localização
        const groupedItems = this.groupPhotosByLocation(itemsToRender);
        console.log('Itens agrupados:', groupedItems);
        console.log('Número de grupos:', groupedItems.length);
        
        // Ordenar grupos por data (mais recente primeiro)
        groupedItems.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        // Renderizar grupos com separação visual
        groupedItems.forEach((group, groupIndex) => {
            console.log('Criando grupo:', group.title, 'com', group.photos.length, 'fotos');
            const groupContainer = this.createLocationGroup(group, groupIndex);
            galleryGrid.appendChild(groupContainer);
            
            // Adicionar separador visual entre grupos (exceto o último)
            if (groupIndex < groupedItems.length - 1) {
                const separator = document.createElement('div');
                separator.className = 'location-separator';
                separator.innerHTML = `
                    <div class="separator-line"></div>
                    <div class="separator-text">Próxima Localização</div>
                    <div class="separator-line"></div>
                `;
                galleryGrid.appendChild(separator);
            }
        });
        
        console.log('Grid atualizado com', galleryGrid.children.length, 'elementos');
        
        // Atualizar botão carregar mais
        this.updateLoadMoreButton();
    }
    
    // Agrupar fotos por título da demolição
    groupPhotosByLocation(items) {
        const groups = {};
        
        items.forEach(item => {
            // Usar título da demolição como chave principal para agrupamento
            const titleKey = item.title || 'Demolição sem título';
            
            if (!groups[titleKey]) {
                groups[titleKey] = {
                    title: titleKey,
                    location: item.location,
                    locationGroup: item.locationGroup,
                    photos: [],
                    category: item.category,
                    date: item.date,
                    details: item.details,
                    description: item.description,
                    city: this.extractCity(item.location),
                    state: this.extractState(item.location),
                    fullAddress: item.location,
                    demolitionType: this.getCategoryName(item.category)
                };
            }
            groups[titleKey].photos.push(item);
        });
        
        return Object.values(groups);
    }
    
    // Extrair cidade da localização
    extractCity(location) {
        if (!location) return 'Cidade não especificada';
        const parts = location.split(',');
        return parts[0] ? parts[0].trim() : location;
    }
    
    // Extrair estado da localização
    extractState(location) {
        if (!location) return '';
        const parts = location.split(',');
        return parts[1] ? parts[1].trim() : '';
    }
    
    // Criar grupo de localização
    createLocationGroup(group, groupIndex) {
        const groupContainer = document.createElement('div');
        groupContainer.className = 'location-group';
        groupContainer.style.animationDelay = `${groupIndex * 0.1}s`;
        
        const isMultiplePhotos = group.photos.length > 1;
        const firstPhoto = group.photos[0];
        
        // Ordenar fotos por índice
        const sortedPhotos = group.photos.sort((a, b) => (a.photoIndex || 1) - (b.photoIndex || 1));
        
        groupContainer.innerHTML = `
            <div class="location-header">
                <div class="location-badge">
                    <span class="location-number">${groupIndex + 1}</span>
                </div>
                <div class="location-info">
                    <h3 class="location-title">
                        <span class="demolition-title">${group.title}</span>
                    </h3>
                    <div class="location-address">
                        <i class="fas fa-map-marker-alt"></i>
                        <span class="address-text">${group.fullAddress}</span>
                    </div>
                    <div class="location-meta">
                        <span class="location-category">${this.getCategoryName(group.category)}</span>
                        <span class="location-date">${this.formatDate(group.date)}</span>
                        ${isMultiplePhotos ? `<span class="photo-count">${group.photos.length} <span data-translate="photos-count">fotos</span></span>` : ''}
                    </div>
                </div>
                <div class="location-details">
                    <div class="demolition-type">
                        <i class="fas fa-hammer"></i>
                        <span class="type-label">Tipo de Demolição:</span>
                        <span class="type-value">${group.demolitionType}</span>
                    </div>
                    <p class="location-description">${group.description || group.details || firstPhoto.description}</p>
                </div>
            </div>
            <div class="location-photos">
                ${sortedPhotos.map((photo, index) => this.createGalleryItemHTML(photo, index)).join('')}
            </div>
        `;
        
        return groupContainer;
    }
    
    // Criar HTML do item da galeria
    createGalleryItemHTML(photo, index) {
        return `
            <div class="gallery-item" data-photo-id="${photo.id}" style="animation-delay: ${index * 0.05}s">
                <img src="${photo.image}" alt="Foto ${photo.photoIndex || index + 1}" loading="lazy" 
                     onerror="this.src='assets/images/construction-site-1.jpg'; this.alt='Imagem não encontrada';"
                     onload="console.log('Imagem carregada:', '${photo.image}')">
                <div class="gallery-overlay">
                    <span class="photo-index">Foto ${photo.photoIndex || index + 1} de ${photo.totalPhotos || 1}</span>
                </div>
                <div class="gallery-info">
                    <span class="photo-number">Foto ${photo.photoIndex || index + 1}</span>
                </div>
            </div>
        `;
    }
    
    // Configurar event listeners para itens da galeria
    setupGalleryEventListeners() {
        const galleryGrid = document.getElementById('gallery-grid');
        if (!galleryGrid) return;
        
        // Usar delegação de eventos para itens dinâmicos
        galleryGrid.addEventListener('click', (e) => {
            const galleryItem = e.target.closest('.gallery-item');
            if (galleryItem) {
                const photoId = parseInt(galleryItem.dataset.photoId);
                const photo = this.allItems.find(p => p.id === photoId);
                if (photo) {
                    this.openModal(photo);
                }
            }
        });
    }
    
    // Obter nome da categoria
    getCategoryName(category) {
        const categories = {
            'residential': 'Residencial',
            'commercial': 'Comercial',
            'industrial': 'Industrial',
            'fire-damage': 'Pós-Incêndio'
        };
        return categories[category] || category;
    }
    
    // Formatar data
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR');
    }
    
    // Carregar mais itens
    loadMore() {
        if (this.isLoading) return;
        
        this.isLoading = true;
        const loadMoreBtn = document.getElementById('load-more-btn');
        if (loadMoreBtn) {
            loadMoreBtn.textContent = 'Carregando...';
            loadMoreBtn.disabled = true;
        }
        
        // Simular carregamento
        setTimeout(() => {
            this.currentPage++;
            this.renderGallery();
            this.isLoading = false;
            
            if (loadMoreBtn) {
                loadMoreBtn.textContent = 'Carregar Mais';
                loadMoreBtn.disabled = false;
            }
        }, 1000);
    }
    
    // Atualizar botão carregar mais
    updateLoadMoreButton() {
        const loadMoreBtn = document.getElementById('load-more-btn');
        if (!loadMoreBtn) return;
        
        const itemsToShow = this.currentPage * this.itemsPerPage;
        const hasMore = itemsToShow < this.filteredItems.length;
        
        if (hasMore) {
            loadMoreBtn.style.display = 'block';
        } else {
            loadMoreBtn.style.display = 'none';
        }
    }
    
    // Configurar modal
    setupModal() {
        // Criar modal se não existir
        if (!document.getElementById('gallery-modal')) {
            const modal = document.createElement('div');
            modal.id = 'gallery-modal';
            modal.className = 'gallery-modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="modal-close">&times;</span>
                    <img class="modal-image" src="" alt="">
                    <div class="modal-info">
                        <h3></h3>
                        <p></p>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
            
            // Event listeners do modal
            modal.querySelector('.modal-close').addEventListener('click', () => {
                this.closeModal();
            });
            
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal();
                }
            });
            
            // Fechar com ESC
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    this.closeModal();
                }
            });
        }
    }
    
    // Abrir modal
    openModal(item) {
        const modal = document.getElementById('gallery-modal');
        const modalImage = modal.querySelector('.modal-image');
        const modalInfo = modal.querySelector('.modal-info');
        
        modalImage.src = item.image;
        modalImage.alt = item.title;
        modalInfo.querySelector('h3').textContent = item.title;
        modalInfo.querySelector('p').textContent = item.description;
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    
    // Fechar modal
    closeModal() {
        const modal = document.getElementById('gallery-modal');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    // Verificar acesso de admin
    checkAdminAccess() {
        // Verificar se há token de admin no localStorage
        const adminToken = localStorage.getItem('adminToken');
        const adminLink = document.getElementById('admin-link');
        
        if (adminToken && adminLink) {
            adminLink.style.display = 'block';
        }
    }
    
    // Mostrar erro
    showError(message) {
        const galleryGrid = document.getElementById('gallery-grid');
        if (galleryGrid) {
            galleryGrid.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #e74c3c;">
                    <i class="fas fa-exclamation-triangle" style="font-size: 3rem; margin-bottom: 20px;"></i>
                    <h3>Erro ao carregar galeria</h3>
                    <p>${message}</p>
                </div>
            `;
        }
    }
}

// Inicializar galeria quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM carregado, inicializando galeria...');
    try {
        const galleryManager = new GalleryManager();
        console.log('Galeria inicializada com sucesso:', galleryManager);
    } catch (error) {
        console.error('Erro ao inicializar galeria:', error);
    }
});

// Fallback para caso o DOM já esteja carregado
if (document.readyState === 'loading') {
    console.log('DOM ainda carregando...');
} else {
    console.log('DOM já carregado, inicializando galeria imediatamente...');
    try {
        const galleryManager = new GalleryManager();
        console.log('Galeria inicializada com sucesso (fallback):', galleryManager);
    } catch (error) {
        console.error('Erro ao inicializar galeria (fallback):', error);
    }
}

// As traduções da galeria já estão incluídas no arquivo language-simple.js
