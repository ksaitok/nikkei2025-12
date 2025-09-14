// Painel Administrativo - JavaScript

class AdminManager {
    constructor() {
        this.isAuthenticated = false;
        this.photos = [];
        this.currentUser = null;
        
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
        // Em produção, isso viria de uma API
        // Por enquanto, vamos usar dados simulados
        this.photos = [
            {
                id: 1,
                title: 'Demolição Residencial - Casa de Madeira',
                description: 'Demolição completa de casa residencial de madeira com equipamentos especializados.',
                image: 'assets/images/DemolicaoMadeira.jpg',
                category: 'residential',
                date: '2024-01-15',
                location: 'São Paulo, SP'
            },
            {
                id: 2,
                title: 'Demolição Comercial - Edifício de Concreto',
                description: 'Demolição de edifício comercial de concreto armado com segurança total.',
                image: 'assets/images/DemolicaoRC.jpg',
                category: 'commercial',
                date: '2024-01-20',
                location: 'Rio de Janeiro, RJ'
            },
            {
                id: 3,
                title: 'Demolição Industrial - Galpão Metálico',
                description: 'Desmontagem de galpão industrial com estrutura metálica.',
                image: 'assets/images/DemolicaoFerro.jpg',
                category: 'industrial',
                date: '2024-01-25',
                location: 'Belo Horizonte, MG'
            },
            {
                id: 4,
                title: 'Demolição Pós-Incêndio - Residência',
                description: 'Demolição de residência danificada por incêndio com protocolos especiais.',
                image: 'assets/images/DemolicaoPosIncendio.jpg',
                category: 'fire-damage',
                date: '2024-02-01',
                location: 'Curitiba, PR'
            }
        ];
        
        this.renderPhotos();
    }
    
    // Renderizar fotos
    renderPhotos() {
        const photosGrid = document.getElementById('photos-grid');
        if (!photosGrid) return;
        
        photosGrid.innerHTML = '';
        
        this.photos.forEach(photo => {
            const photoItem = this.createPhotoItem(photo);
            photosGrid.appendChild(photoItem);
        });
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
    
    // Lidar com adição de foto
    handleAddPhoto() {
        const form = document.getElementById('add-photo-form');
        const formData = new FormData(form);
        
        // Validar dados
        const title = formData.get('title');
        const category = formData.get('category');
        const description = formData.get('description');
        const location = formData.get('location');
        const date = formData.get('date');
        const image = formData.get('image');
        
        if (!title || !category || !description || !location || !date || !image) {
            this.showMessage('Por favor, preencha todos os campos!', 'error');
            return;
        }
        
        // Criar nova foto
        const newPhoto = {
            id: Date.now(), // ID simples baseado em timestamp
            title: title,
            description: description,
            category: category,
            date: date,
            location: location,
            image: URL.createObjectURL(image) // URL temporária para preview
        };
        
        // Adicionar à lista
        this.photos.unshift(newPhoto);
        
        // Atualizar interface
        this.renderPhotos();
        this.updateStats();
        
        // Limpar formulário
        form.reset();
        document.getElementById('image-preview').innerHTML = '';
        
        // Mostrar mensagem de sucesso
        this.showMessage('Foto adicionada com sucesso!', 'success');
        
        // Em produção, aqui você faria uma requisição para o backend
        console.log('Nova foto adicionada:', newPhoto);
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
