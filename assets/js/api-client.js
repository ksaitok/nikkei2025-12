// Cliente API para sistema de demolições
// Centraliza todas as chamadas para o servidor backend

class DemolitionAPI {
    constructor(baseURL = 'http://localhost:3000/api') {
        this.baseURL = baseURL;
    }

    // Método genérico para fazer requisições
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        };

        try {
            const response = await fetch(url, config);
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ error: 'Erro desconhecido' }));
                throw new Error(errorData.error || `HTTP ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error(`Erro na requisição ${endpoint}:`, error);
            throw error;
        }
    }

    // ==================== DEMOLIÇÕES ====================

    // Listar todas as demolições
    async getDemolitions(filters = {}) {
        const params = new URLSearchParams();
        
        if (filters.category) params.append('category', filters.category);
        if (filters.location) params.append('location', filters.location);
        if (filters.search) params.append('search', filters.search);
        if (filters.page) params.append('page', filters.page);
        if (filters.limit) params.append('limit', filters.limit);
        
        const queryString = params.toString();
        const endpoint = queryString ? `/demolitions?${queryString}` : '/demolitions';
        
        return await this.request(endpoint);
    }

    // Buscar demolição por ID
    async getDemolitionById(id) {
        return await this.request(`/demolitions/${id}`);
    }

    // Criar nova demolição
    async createDemolition(demolitionData) {
        const formData = new FormData();
        
        // Adicionar dados da demolição
        formData.append('title', demolitionData.title);
        formData.append('category', demolitionData.category);
        formData.append('description', demolitionData.description);
        formData.append('location', demolitionData.location);
        formData.append('date', demolitionData.date);
        
        // Adicionar imagens
        if (demolitionData.images && demolitionData.images.length > 0) {
            demolitionData.images.forEach((image, index) => {
                if (image.file) {
                    formData.append('images', image.file, image.name);
                }
            });
        }
        
        return await this.request('/demolitions', {
            method: 'POST',
            headers: {}, // Remover Content-Type para FormData
            body: formData
        });
    }

    // Atualizar demolição
    async updateDemolition(id, demolitionData) {
        return await this.request(`/demolitions/${id}`, {
            method: 'PUT',
            body: JSON.stringify(demolitionData)
        });
    }

    // Excluir demolição
    async deleteDemolition(id) {
        return await this.request(`/demolitions/${id}`, {
            method: 'DELETE'
        });
    }

    // ==================== ESTATÍSTICAS ====================

    // Obter estatísticas
    async getStatistics() {
        return await this.request('/statistics');
    }

    // ==================== CATEGORIAS E LOCALIZAÇÕES ====================

    // Listar categorias
    async getCategories() {
        return await this.request('/categories');
    }

    // Listar localizações
    async getLocations() {
        return await this.request('/locations');
    }

    // ==================== MÉTODOS AUXILIARES ====================

    // Verificar se o servidor está online
    async isServerOnline() {
        try {
            await this.request('/statistics');
            return true;
        } catch (error) {
            return false;
        }
    }

    // Obter URL completa de uma imagem
    getImageURL(filename) {
        return `${this.baseURL.replace('/api', '')}/uploads/demolitions/${filename}`;
    }

    // Converter dados do banco para formato da galeria
    convertToGalleryFormat(demolition) {
        return {
            id: demolition.id,
            title: demolition.title,
            description: demolition.description,
            image: demolition.images && demolition.images.length > 0 
                ? this.getImageURL(demolition.images[0]) 
                : 'assets/images/construction-site-1.jpg',
            category: demolition.category,
            date: demolition.date,
            location: demolition.location,
            locationGroup: demolition.location.replace(/\s+/g, '-').toLowerCase() + '-' + demolition.date,
            photoIndex: 1,
            totalPhotos: demolition.image_count || 1,
            details: demolition.description,
            images: demolition.images ? demolition.images.map(img => this.getImageURL(img)) : []
        };
    }

    // Converter múltiplas demolições para formato da galeria
    convertMultipleToGalleryFormat(demolitions) {
        return demolitions.map(demolition => this.convertToGalleryFormat(demolition));
    }
}

// Instância global da API
window.demolitionAPI = new DemolitionAPI();

// Função para verificar conectividade
async function checkServerConnection() {
    try {
        const isOnline = await window.demolitionAPI.isServerOnline();
        if (isOnline) {
            console.log('✅ Servidor backend conectado');
            return true;
        } else {
            console.warn('⚠️ Servidor backend offline, usando dados locais');
            return false;
        }
    } catch (error) {
        console.error('❌ Erro ao verificar servidor:', error);
        return false;
    }
}

// Função para mostrar status de conexão
function showConnectionStatus(isOnline) {
    const statusElement = document.getElementById('connection-status');
    if (statusElement) {
        statusElement.innerHTML = isOnline 
            ? '<span style="color: green;">🟢 Servidor Online</span>'
            : '<span style="color: orange;">🟡 Modo Offline</span>';
    }
}

// Verificar conexão quando a página carregar
document.addEventListener('DOMContentLoaded', async () => {
    const isOnline = await checkServerConnection();
    showConnectionStatus(isOnline);
    
    // Se estiver offline, tentar novamente a cada 30 segundos
    if (!isOnline) {
        setInterval(async () => {
            const reconnected = await checkServerConnection();
            if (reconnected) {
                showConnectionStatus(true);
                // Recarregar dados se necessário
                if (window.galleryManager) {
                    window.galleryManager.loadGalleryData();
                }
            }
        }, 30000);
    }
});
