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
    }
    
    // Carregar dados da galeria
    async loadGalleryData() {
        try {
            // Simular carregamento de dados (em produção, viria de uma API)
            this.allItems = [
                // Localização 1: São Paulo, SP - Múltiplas fotos
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
                    title: 'Processo de Demolição - São Paulo',
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
                    title: 'Finalização - São Paulo',
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
                
                // Localização 2: Rio de Janeiro, RJ - Múltiplas fotos
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
                    title: 'Estrutura de Concreto - Rio de Janeiro',
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
                    title: 'Remoção de Entulhos - Rio de Janeiro',
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
                    title: 'Finalização - Rio de Janeiro',
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
                
                // Localização 3: Belo Horizonte, MG - Múltiplas fotos
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
                    title: 'Desmontagem Metálica - Belo Horizonte',
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
                
                // Localização 4: Curitiba, PR - Foto única
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
            
            this.filteredItems = [...this.allItems];
            this.renderGallery();
            
        } catch (error) {
            console.error('Erro ao carregar dados da galeria:', error);
            this.showError('Erro ao carregar a galeria. Tente novamente.');
        }
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
        if (!galleryGrid) return;
        
        // Limpar grid
        galleryGrid.innerHTML = '';
        
        // Calcular itens para mostrar
        const itemsToShow = this.currentPage * this.itemsPerPage;
        const itemsToRender = this.filteredItems.slice(0, itemsToShow);
        
        // Agrupar fotos por localização
        const groupedItems = this.groupPhotosByLocation(itemsToRender);
        
        // Ordenar grupos por data (mais recente primeiro)
        groupedItems.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        // Renderizar grupos com separação visual
        groupedItems.forEach((group, groupIndex) => {
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
        
        // Atualizar botão carregar mais
        this.updateLoadMoreButton();
    }
    
    // Agrupar fotos por localização
    groupPhotosByLocation(items) {
        const groups = {};
        
        items.forEach(item => {
            // Usar localização completa como chave principal para separação
            const locationKey = item.location || 'Localização não especificada';
            
            if (!groups[locationKey]) {
                groups[locationKey] = {
                    location: locationKey,
                    locationGroup: item.locationGroup,
                    photos: [],
                    category: item.category,
                    date: item.date,
                    details: item.details,
                    city: this.extractCity(locationKey),
                    state: this.extractState(locationKey),
                    fullAddress: locationKey, // Endereço completo
                    demolitionType: this.getCategoryName(item.category)
                };
            }
            groups[locationKey].photos.push(item);
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
                        <span class="location-city">${group.city}</span>
                        ${group.state ? `<span class="location-state">, ${group.state}</span>` : ''}
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
                    <p class="location-description">${firstPhoto.details || firstPhoto.description}</p>
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
                <img src="${photo.image}" alt="${photo.title}" loading="lazy">
                <div class="gallery-overlay">
                    <h3>${photo.title}</h3>
                    <p>${photo.description}</p>
                    ${photo.photoIndex ? `<span class="photo-index">Foto ${photo.photoIndex} de ${photo.totalPhotos}</span>` : ''}
                </div>
                <div class="gallery-info">
                    <h3>${photo.title}</h3>
                    <p>${photo.description}</p>
                    <div class="gallery-meta">
                        <span class="gallery-category">${this.getCategoryName(photo.category)}</span>
                        <span class="gallery-date">${this.formatDate(photo.date)}</span>
                    </div>
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
    new GalleryManager();
});

// As traduções da galeria já estão incluídas no arquivo language-simple.js
