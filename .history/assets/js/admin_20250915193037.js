// Painel Administrativo - JavaScript

class AdminManager {
    constructor() {
        this.isAuthenticated = false;
        this.photos = [];
        this.currentUser = null;
        this.filteredPhotos = [];
        this.currentPage = 1;
        this.itemsPerPage = 6;
        
        // Credenciais de admin (em produção, isso viria de um backend seguro)
        this.adminCredentials = {
            username: 'admin',
            password: 'nkk2024'
        };
        
        this.init();
    }
    
    init() {
        this.checkAuthentication();
        this.setupEventListeners();
        this.loadPhotos();
    }
    
    // Verificar autenticação
    checkAuthentication() {
        const token = localStorage.getItem('adminToken');
        if (token) {
            this.isAuthenticated = true;
            this.showAdminPanel();
        } else {
            this.showLoginScreen();
        }
    }
    
    // Configurar event listeners
    setupEventListeners() {
        // Login form
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLogin();
            });
        }
        
        // Logout button
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                this.handleLogout();
            });
        }
        
        // Add photo form
        const addPhotoForm = document.getElementById('add-photo-form');
        if (addPhotoForm) {
            addPhotoForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleAddPhoto();
            });
        }
        
        // Image upload preview
        const imageInput = document.getElementById('photo-image');
        if (imageInput) {
            imageInput.addEventListener('change', (e) => {
                this.handleImagePreview(e);
            });
        }
        
        // New demolition management buttons
        const addDemolitionBtn = document.getElementById('add-demolition-btn');
        if (addDemolitionBtn) {
            addDemolitionBtn.addEventListener('click', () => {
                this.showAddPhotoForm();
            });
        }
        
        const refreshDataBtn = document.getElementById('refresh-data-btn');
        if (refreshDataBtn) {
            refreshDataBtn.addEventListener('click', () => {
                this.loadPhotos();
                this.showMessage('Dados atualizados!', 'success');
            });
        }
        
        // Filters
        const categoryFilter = document.getElementById('category-filter');
        if (categoryFilter) {
            categoryFilter.addEventListener('change', () => {
                this.filterAndSortDemolitions();
            });
        }
        
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('input', () => {
                this.filterAndSortDemolitions();
            });
        }
        
        const sortBy = document.getElementById('sort-by');
        if (sortBy) {
            sortBy.addEventListener('change', () => {
                this.filterAndSortDemolitions();
            });
        }
    }
    
    // Mostrar tela de login
    showLoginScreen() {
        document.getElementById('login-screen').style.display = 'flex';
        document.getElementById('admin-panel').style.display = 'none';
    }
    
    // Mostrar painel admin
    showAdminPanel() {
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('admin-panel').style.display = 'block';
        this.updateStats();
    }
    
    // Lidar com login
    handleLogin() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const errorMessage = document.getElementById('login-error');
        
        if (username === this.adminCredentials.username && password === this.adminCredentials.password) {
            // Login bem-sucedido
            this.isAuthenticated = true;
            this.currentUser = username;
            
            // Gerar token simples (em produção, usar JWT)
            const token = btoa(username + ':' + Date.now());
            localStorage.setItem('adminToken', token);
            
            // Limpar formulário
            document.getElementById('login-form').reset();
            errorMessage.style.display = 'none';
            
            // Mostrar painel
            this.showAdminPanel();
            
        } else {
            // Login falhou
            errorMessage.style.display = 'block';
            setTimeout(() => {
                errorMessage.style.display = 'none';
            }, 3000);
        }
    }
    
    // Lidar com logout
    handleLogout() {
        localStorage.removeItem('adminToken');
        this.isAuthenticated = false;
        this.currentUser = null;
        this.showLoginScreen();
    }
    
    // Carregar fotos
    loadPhotos() {
        // Carregar fotos do localStorage ou usar dados padrão
        const savedPhotos = localStorage.getItem('galleryPhotos');
        if (savedPhotos) {
            this.photos = JSON.parse(savedPhotos);
        } else {
            // Dados padrão
            this.photos = [
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
                    totalPhotos: 1,
                    details: 'Casa de 2 andares, 120m², demolição completa com separação de materiais recicláveis'
                },
                {
                    id: 2,
                    title: 'Demolição Comercial - Edifício de Concreto',
                    description: 'Demolição de edifício comercial de concreto armado com segurança total.',
                    image: 'assets/images/DemolicaoRC.jpg',
                    category: 'commercial',
                    date: '2024-01-20',
                    location: 'Rio de Janeiro, RJ',
                    locationGroup: 'rio-janeiro-2024-01',
                    photoIndex: 1,
                    totalPhotos: 1,
                    details: 'Edifício comercial de 5 andares, 800m², demolição com isolamento total da área'
                },
                {
                    id: 3,
                    title: 'Demolição Industrial - Galpão Metálico',
                    description: 'Desmontagem de galpão industrial com estrutura metálica.',
                    image: 'assets/images/DemolicaoFerro.jpg',
                    category: 'industrial',
                    date: '2024-01-25',
                    location: 'Belo Horizonte, MG',
                    locationGroup: 'belo-horizonte-2024-01',
                    photoIndex: 1,
                    totalPhotos: 1,
                    details: 'Galpão industrial de 1000m², estrutura metálica, desmontagem controlada'
                },
                {
                    id: 4,
                    title: 'Demolição Pós-Incêndio - Residência',
                    description: 'Demolição de residência danificada por incêndio com protocolos especiais.',
                    image: 'assets/images/DemolicaoPosIncendio.jpg',
                    category: 'fire-damage',
                    date: '2024-02-01',
                    location: 'Curitiba, PR',
                    locationGroup: 'curitiba-2024-02',
                    photoIndex: 1,
                    totalPhotos: 1,
                    details: 'Residência de 150m² danificada por incêndio, demolição com protocolos especiais'
                }
            ];
            this.savePhotos();
        }
        
        this.renderPhotos();
    }
    
    // Salvar fotos no localStorage
    savePhotos() {
        localStorage.setItem('galleryPhotos', JSON.stringify(this.photos));
    }
    
    // Renderizar fotos
    renderPhotos() {
        this.filteredPhotos = [...this.photos];
        this.filterAndSortDemolitions();
    }
    
    // Filtrar e ordenar demolições
    filterAndSortDemolitions() {
        const categoryFilter = document.getElementById('category-filter')?.value || 'all';
        const searchInput = document.getElementById('search-input')?.value || '';
        const sortBy = document.getElementById('sort-by')?.value || 'date-desc';
        
        // Filtrar por categoria
        let filtered = this.photos;
        if (categoryFilter !== 'all') {
            filtered = filtered.filter(photo => photo.category === categoryFilter);
        }
        
        // Filtrar por busca
        if (searchInput) {
            const searchLower = searchInput.toLowerCase();
            filtered = filtered.filter(photo => 
                photo.title.toLowerCase().includes(searchLower) ||
                photo.location.toLowerCase().includes(searchLower) ||
                photo.description.toLowerCase().includes(searchLower)
            );
        }
        
        // Ordenar
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'date-desc':
                    return new Date(b.date) - new Date(a.date);
                case 'date-asc':
                    return new Date(a.date) - new Date(b.date);
                case 'title-asc':
                    return a.title.localeCompare(b.title);
                case 'title-desc':
                    return b.title.localeCompare(a.title);
                case 'location-asc':
                    return a.location.localeCompare(b.location);
                default:
                    return 0;
            }
        });
        
        this.filteredPhotos = filtered;
        this.renderDemolitionsGrid();
        this.renderPagination();
    }
    
    // Renderizar grid de demolições
    renderDemolitionsGrid() {
        const demolitionsGrid = document.getElementById('demolitions-grid');
        if (!demolitionsGrid) return;
        
        demolitionsGrid.innerHTML = '';
        
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const photosToShow = this.filteredPhotos.slice(startIndex, endIndex);
        
        photosToShow.forEach(photo => {
            const demolitionCard = this.createDemolitionCard(photo);
            demolitionsGrid.appendChild(demolitionCard);
        });
    }
    
    // Criar card de demolição
    createDemolitionCard(photo) {
        const card = document.createElement('div');
        card.className = 'demolition-card';
        
        card.innerHTML = `
            <div class="demolition-image">
                <img src="${photo.image}" alt="${photo.title}" loading="lazy">
                <div class="demolition-badge">${this.getCategoryName(photo.category)}</div>
            </div>
            <div class="demolition-content">
                <h3 class="demolition-title">${photo.title}</h3>
                <p class="demolition-description">${photo.description}</p>
                <div class="demolition-meta">
                    <div class="meta-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${photo.location}</span>
                    </div>
                    <div class="meta-item">
                        <i class="fas fa-calendar"></i>
                        <span>${this.formatDate(photo.date)}</span>
                    </div>
                    <div class="meta-item">
                        <i class="fas fa-images"></i>
                        <span>${photo.totalPhotos || 1} foto(s)</span>
                    </div>
                </div>
                <div class="demolition-actions">
                    <button class="btn-view" onclick="adminManager.viewPhoto(${photo.id})">
                        <i class="fas fa-eye"></i> Ver
                    </button>
                    <button class="btn-edit" onclick="adminManager.editPhoto(${photo.id})">
                        <i class="fas fa-edit"></i> Editar
                    </button>
                    <button class="btn-delete" onclick="adminManager.deletePhoto(${photo.id})">
                        <i class="fas fa-trash"></i> Excluir
                    </button>
                </div>
            </div>
        `;
        
        return card;
    }
    
    // Renderizar paginação
    renderPagination() {
        const pagination = document.getElementById('pagination');
        if (!pagination) return;
        
        const totalPages = Math.ceil(this.filteredPhotos.length / this.itemsPerPage);
        
        if (totalPages <= 1) {
            pagination.innerHTML = '';
            return;
        }
        
        let paginationHTML = '';
        
        // Botão anterior
        paginationHTML += `
            <button ${this.currentPage === 1 ? 'disabled' : ''} onclick="adminManager.goToPage(${this.currentPage - 1})">
                <i class="fas fa-chevron-left"></i>
            </button>
        `;
        
        // Páginas
        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= this.currentPage - 2 && i <= this.currentPage + 2)) {
                paginationHTML += `
                    <button class="${i === this.currentPage ? 'active' : ''}" onclick="adminManager.goToPage(${i})">
                        ${i}
                    </button>
                `;
            } else if (i === this.currentPage - 3 || i === this.currentPage + 3) {
                paginationHTML += '<span>...</span>';
            }
        }
        
        // Botão próximo
        paginationHTML += `
            <button ${this.currentPage === totalPages ? 'disabled' : ''} onclick="adminManager.goToPage(${this.currentPage + 1})">
                <i class="fas fa-chevron-right"></i>
            </button>
        `;
        
        // Informações
        const startItem = (this.currentPage - 1) * this.itemsPerPage + 1;
        const endItem = Math.min(this.currentPage * this.itemsPerPage, this.filteredPhotos.length);
        
        paginationHTML += `
            <div class="pagination-info">
                ${startItem}-${endItem} de ${this.filteredPhotos.length} demolições
            </div>
        `;
        
        pagination.innerHTML = paginationHTML;
    }
    
    // Ir para página
    goToPage(page) {
        const totalPages = Math.ceil(this.filteredPhotos.length / this.itemsPerPage);
        if (page >= 1 && page <= totalPages) {
            this.currentPage = page;
            this.renderDemolitionsGrid();
            this.renderPagination();
        }
    }
    
    // Mostrar formulário de adicionar foto
    showAddPhotoForm() {
        const addPhotoForm = document.getElementById('add-photo-form');
        if (addPhotoForm) {
            addPhotoForm.scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    // Ver foto
    viewPhoto(id) {
        const photo = this.photos.find(p => p.id === id);
        if (photo) {
            // Abrir em nova aba
            window.open(photo.image, '_blank');
        }
    }
    
    // Criar item de foto
    createPhotoItem(photo) {
        const div = document.createElement('div');
        div.className = 'photo-item';
        div.innerHTML = `
            <img src="${photo.image}" alt="${photo.title}" loading="lazy">
            <div class="photo-info">
                <h3>${photo.title}</h3>
                <p>${photo.description}</p>
                <div class="photo-meta">
                    <span class="photo-category">${this.getCategoryName(photo.category)}</span>
                    <span class="photo-date">${this.formatDate(photo.date)}</span>
                </div>
                <div class="photo-actions">
                    <button class="btn-edit" onclick="adminManager.editPhoto(${photo.id})">
                        <i class="fas fa-edit"></i> Editar
                    </button>
                    <button class="btn-delete" onclick="adminManager.deletePhoto(${photo.id})">
                        <i class="fas fa-trash"></i> Excluir
                    </button>
                </div>
            </div>
        `;
        
        return div;
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
    
    // Atualizar estatísticas
    updateStats() {
        const totalPhotos = this.photos.length;
        const residentialCount = this.photos.filter(p => p.category === 'residential').length;
        const commercialCount = this.photos.filter(p => p.category === 'commercial').length;
        const industrialCount = this.photos.filter(p => p.category === 'industrial').length;
        
        document.getElementById('total-photos').textContent = totalPhotos;
        document.getElementById('residential-count').textContent = residentialCount;
        document.getElementById('commercial-count').textContent = commercialCount;
        document.getElementById('industrial-count').textContent = industrialCount;
    }
    
    // Lidar com preview de múltiplas imagens
    handleImagePreview(event) {
        const files = event.target.files;
        const preview = document.getElementById('image-preview');
        
        if (files && files.length > 0) {
            preview.innerHTML = '';
            
            Array.from(files).forEach((file, index) => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const imageContainer = document.createElement('div');
                    imageContainer.className = 'image-preview-item';
                    imageContainer.innerHTML = `
                        <img src="${e.target.result}" alt="Preview ${index + 1}">
                        <div class="image-info">
                            <span>Foto ${index + 1}</span>
                            <span class="file-size">${this.formatFileSize(file.size)}</span>
                        </div>
                    `;
                    preview.appendChild(imageContainer);
                };
                reader.readAsDataURL(file);
            });
        } else {
            preview.innerHTML = '';
        }
    }
    
    // Formatar tamanho do arquivo
    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
    
    // Lidar com adição de múltiplas fotos
    handleAddPhoto() {
        const form = document.getElementById('add-photo-form');
        const formData = new FormData(form);
        
        // Validar dados
        const title = formData.get('title');
        const category = formData.get('category');
        const description = formData.get('description');
        const location = formData.get('location');
        const date = formData.get('date');
        const images = formData.getAll('image');
        
        if (!title || !category || !description || !location || !date || images.length === 0) {
            this.showMessage('Por favor, preencha todos os campos e selecione pelo menos uma imagem!', 'error');
            return;
        }
        
        // Criar múltiplas fotos para a mesma localização
        const baseId = Date.now();
        const newPhotos = images.map((image, index) => ({
            id: baseId + index,
            title: `${title} - Foto ${index + 1}`,
            description: description,
            category: category,
            date: date,
            location: location,
            image: URL.createObjectURL(image),
            locationGroup: `${location}_${baseId}`, // Agrupar por localização
            photoIndex: index + 1,
            totalPhotos: images.length
        }));
        
        // Adicionar todas as fotos à lista
        this.photos.unshift(...newPhotos);
        
        // Salvar no localStorage
        this.savePhotos();
        
        // Atualizar interface
        this.renderPhotos();
        this.updateStats();
        
        // Limpar formulário
        form.reset();
        document.getElementById('image-preview').innerHTML = '';
        
        // Mostrar mensagem de sucesso
        this.showMessage(`${images.length} foto(s) adicionada(s) com sucesso!`, 'success');
        
        // Em produção, aqui você faria uma requisição para o backend
        console.log('Novas fotos adicionadas:', newPhotos);
    }
    
    // Editar foto
    editPhoto(id) {
        const photo = this.photos.find(p => p.id === id);
        if (!photo) return;
        
        // Preencher formulário com dados da foto
        document.getElementById('photo-title').value = photo.title;
        document.getElementById('photo-category').value = photo.category;
        document.getElementById('photo-description').value = photo.description;
        document.getElementById('photo-location').value = photo.location;
        document.getElementById('photo-date').value = photo.date;
        
        // Mostrar preview da imagem atual
        const preview = document.getElementById('image-preview');
        preview.innerHTML = `<img src="${photo.image}" alt="Preview">`;
        
        // Scroll para o formulário
        document.getElementById('add-photo-form').scrollIntoView({ behavior: 'smooth' });
        
        // Alterar botão para "Atualizar"
        const submitBtn = document.querySelector('#add-photo-form button[type="submit"]');
        submitBtn.innerHTML = '<i class="fas fa-save"></i> Atualizar Foto';
        submitBtn.onclick = (e) => {
            e.preventDefault();
            this.updatePhoto(id);
        };
    }
    
    // Atualizar foto
    updatePhoto(id) {
        const form = document.getElementById('add-photo-form');
        const formData = new FormData(form);
        
        // Encontrar foto na lista
        const photoIndex = this.photos.findIndex(p => p.id === id);
        if (photoIndex === -1) return;
        
        // Atualizar dados
        this.photos[photoIndex].title = formData.get('title');
        this.photos[photoIndex].category = formData.get('category');
        this.photos[photoIndex].description = formData.get('description');
        this.photos[photoIndex].location = formData.get('location');
        this.photos[photoIndex].date = formData.get('date');
        
        // Se uma nova imagem foi selecionada
        const newImage = formData.get('image');
        if (newImage && newImage.size > 0) {
            this.photos[photoIndex].image = URL.createObjectURL(newImage);
        }
        
        // Salvar no localStorage
        this.savePhotos();
        
        // Atualizar interface
        this.renderPhotos();
        this.updateStats();
        
        // Limpar formulário
        form.reset();
        document.getElementById('image-preview').innerHTML = '';
        
        // Restaurar botão original
        const submitBtn = document.querySelector('#add-photo-form button[type="submit"]');
        submitBtn.innerHTML = '<i class="fas fa-save"></i> Adicionar Foto';
        submitBtn.onclick = null;
        
        // Mostrar mensagem de sucesso
        this.showMessage('Foto atualizada com sucesso!', 'success');
    }
    
    // Excluir foto
    deletePhoto(id) {
        if (confirm('Tem certeza que deseja excluir esta foto?')) {
            this.photos = this.photos.filter(p => p.id !== id);
            this.savePhotos();
            this.renderPhotos();
            this.updateStats();
            this.showMessage('Foto excluída com sucesso!', 'success');
        }
    }
    
    // Mostrar mensagem
    showMessage(message, type = 'info') {
        // Criar elemento de mensagem
        const messageDiv = document.createElement('div');
        messageDiv.className = `message message-${type}`;
        messageDiv.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-triangle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        // Adicionar estilos
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 10px;
            animation: slideIn 0.3s ease;
        `;
        
        // Adicionar ao DOM
        document.body.appendChild(messageDiv);
        
        // Remover após 3 segundos
        setTimeout(() => {
            messageDiv.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.parentNode.removeChild(messageDiv);
                }
            }, 300);
        }, 3000);
    }
}

// Inicializar admin manager quando o DOM estiver carregado
let adminManager;
document.addEventListener('DOMContentLoaded', () => {
    adminManager = new AdminManager();
});

// Adicionar estilos CSS para animações
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
