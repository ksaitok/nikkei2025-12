// Sistema de Banco de Dados para Demolições
// Usando IndexedDB para persistência local

class DemolitionDatabase {
    constructor() {
        this.dbName = 'DemolitionDB';
        this.dbVersion = 1;
        this.db = null;
        this.storeName = 'demolitions';
    }

    // Inicializar banco de dados
    async init() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.dbVersion);

            request.onerror = () => {
                console.error('Erro ao abrir banco de dados:', request.error);
                reject(request.error);
            };

            request.onsuccess = () => {
                this.db = request.result;
                console.log('Banco de dados inicializado com sucesso');
                resolve(this.db);
            };

            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                
                // Criar store de demolições
                if (!db.objectStoreNames.contains(this.storeName)) {
                    const store = db.createObjectStore(this.storeName, { keyPath: 'id', autoIncrement: true });
                    
                    // Criar índices para busca eficiente
                    store.createIndex('title', 'title', { unique: false });
                    store.createIndex('category', 'category', { unique: false });
                    store.createIndex('location', 'location', { unique: false });
                    store.createIndex('date', 'date', { unique: false });
                    store.createIndex('createdAt', 'createdAt', { unique: false });
                    
                    console.log('Store de demolições criado com sucesso');
                }

                // Criar store de imagens
                if (!db.objectStoreNames.contains('images')) {
                    const imageStore = db.createObjectStore('images', { keyPath: 'id', autoIncrement: true });
                    imageStore.createIndex('demolitionId', 'demolitionId', { unique: false });
                    console.log('Store de imagens criado com sucesso');
                }
            };
        });
    }

    // Adicionar nova demolição
    async addDemolition(demolitionData) {
        if (!this.db) {
            await this.init();
        }

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.storeName], 'readwrite');
            const store = transaction.objectStore(this.storeName);

            // Adicionar timestamp de criação
            demolitionData.createdAt = new Date().toISOString();
            demolitionData.updatedAt = new Date().toISOString();

            const request = store.add(demolitionData);

            request.onsuccess = () => {
                console.log('Demolição adicionada com sucesso:', request.result);
                resolve(request.result);
            };

            request.onerror = () => {
                console.error('Erro ao adicionar demolição:', request.error);
                reject(request.error);
            };
        });
    }

    // Buscar todas as demolições
    async getAllDemolitions() {
        if (!this.db) {
            await this.init();
        }

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.storeName], 'readonly');
            const store = transaction.objectStore(this.storeName);
            const request = store.getAll();

            request.onsuccess = () => {
                console.log('Demolições carregadas:', request.result.length);
                resolve(request.result);
            };

            request.onerror = () => {
                console.error('Erro ao carregar demolições:', request.error);
                reject(request.error);
            };
        });
    }

    // Buscar demolição por ID
    async getDemolitionById(id) {
        if (!this.db) {
            await this.init();
        }

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.storeName], 'readonly');
            const store = transaction.objectStore(this.storeName);
            const request = store.get(id);

            request.onsuccess = () => {
                resolve(request.result);
            };

            request.onerror = () => {
                console.error('Erro ao buscar demolição:', request.error);
                reject(request.error);
            };
        });
    }

    // Atualizar demolição
    async updateDemolition(id, demolitionData) {
        if (!this.db) {
            await this.init();
        }

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.storeName], 'readwrite');
            const store = transaction.objectStore(this.storeName);

            // Adicionar timestamp de atualização
            demolitionData.updatedAt = new Date().toISOString();

            const request = store.put({ ...demolitionData, id });

            request.onsuccess = () => {
                console.log('Demolição atualizada com sucesso');
                resolve(request.result);
            };

            request.onerror = () => {
                console.error('Erro ao atualizar demolição:', request.error);
                reject(request.error);
            };
        });
    }

    // Excluir demolição
    async deleteDemolition(id) {
        if (!this.db) {
            await this.init();
        }

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.storeName], 'readwrite');
            const store = transaction.objectStore(this.storeName);
            const request = store.delete(id);

            request.onsuccess = () => {
                console.log('Demolição excluída com sucesso');
                resolve(true);
            };

            request.onerror = () => {
                console.error('Erro ao excluir demolição:', request.error);
                reject(request.error);
            };
        });
    }

    // Buscar demolições por categoria
    async getDemolitionsByCategory(category) {
        if (!this.db) {
            await this.init();
        }

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.storeName], 'readonly');
            const store = transaction.objectStore(this.storeName);
            const index = store.index('category');
            const request = index.getAll(category);

            request.onsuccess = () => {
                resolve(request.result);
            };

            request.onerror = () => {
                console.error('Erro ao buscar demolições por categoria:', request.error);
                reject(request.error);
            };
        });
    }

    // Buscar demolições por localização
    async getDemolitionsByLocation(location) {
        if (!this.db) {
            await this.init();
        }

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.storeName], 'readonly');
            const store = transaction.objectStore(this.storeName);
            const index = store.index('location');
            const request = index.getAll(location);

            request.onsuccess = () => {
                resolve(request.result);
            };

            request.onerror = () => {
                console.error('Erro ao buscar demolições por localização:', request.error);
                reject(request.error);
            };
        });
    }

    // Buscar demolições por data
    async getDemolitionsByDateRange(startDate, endDate) {
        if (!this.db) {
            await this.init();
        }

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.storeName], 'readonly');
            const store = transaction.objectStore(this.storeName);
            const index = store.index('date');
            const range = IDBKeyRange.bound(startDate, endDate);
            const request = index.getAll(range);

            request.onsuccess = () => {
                resolve(request.result);
            };

            request.onerror = () => {
                console.error('Erro ao buscar demolições por data:', request.error);
                reject(request.error);
            };
        });
    }

    // Buscar demolições por texto (título, descrição, localização)
    async searchDemolitions(searchText) {
        if (!this.db) {
            await this.init();
        }

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.storeName], 'readonly');
            const store = transaction.objectStore(this.storeName);
            const request = store.getAll();

            request.onsuccess = () => {
                const allDemolitions = request.result;
                const searchLower = searchText.toLowerCase();
                
                const filtered = allDemolitions.filter(demolition => 
                    demolition.title.toLowerCase().includes(searchLower) ||
                    demolition.description.toLowerCase().includes(searchLower) ||
                    demolition.location.toLowerCase().includes(searchLower)
                );
                
                resolve(filtered);
            };

            request.onerror = () => {
                console.error('Erro ao buscar demolições:', request.error);
                reject(request.error);
            };
        });
    }

    // Adicionar imagem à demolição
    async addImageToDemolition(demolitionId, imageData) {
        if (!this.db) {
            await this.init();
        }

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['images'], 'readwrite');
            const store = transaction.objectStore('images');

            const imageRecord = {
                demolitionId: demolitionId,
                imageData: imageData,
                createdAt: new Date().toISOString()
            };

            const request = store.add(imageRecord);

            request.onsuccess = () => {
                console.log('Imagem adicionada com sucesso');
                resolve(request.result);
            };

            request.onerror = () => {
                console.error('Erro ao adicionar imagem:', request.error);
                reject(request.error);
            };
        });
    }

    // Buscar imagens de uma demolição
    async getImagesByDemolitionId(demolitionId) {
        if (!this.db) {
            await this.init();
        }

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['images'], 'readonly');
            const store = transaction.objectStore('images');
            const index = store.index('demolitionId');
            const request = index.getAll(demolitionId);

            request.onsuccess = () => {
                resolve(request.result);
            };

            request.onerror = () => {
                console.error('Erro ao buscar imagens:', request.error);
                reject(request.error);
            };
        });
    }

    // Excluir imagem
    async deleteImage(imageId) {
        if (!this.db) {
            await this.init();
        }

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['images'], 'readwrite');
            const store = transaction.objectStore('images');
            const request = store.delete(imageId);

            request.onsuccess = () => {
                console.log('Imagem excluída com sucesso');
                resolve(true);
            };

            request.onerror = () => {
                console.error('Erro ao excluir imagem:', request.error);
                reject(request.error);
            };
        });
    }

    // Estatísticas do banco de dados
    async getStatistics() {
        if (!this.db) {
            await this.init();
        }

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.storeName], 'readonly');
            const store = transaction.objectStore(this.storeName);
            const request = store.getAll();

            request.onsuccess = () => {
                const demolitions = request.result;
                const stats = {
                    total: demolitions.length,
                    byCategory: {},
                    byLocation: {},
                    recent: 0
                };

                const thirtyDaysAgo = new Date();
                thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

                demolitions.forEach(demolition => {
                    // Por categoria
                    if (stats.byCategory[demolition.category]) {
                        stats.byCategory[demolition.category]++;
                    } else {
                        stats.byCategory[demolition.category] = 1;
                    }

                    // Por localização
                    if (stats.byLocation[demolition.location]) {
                        stats.byLocation[demolition.location]++;
                    } else {
                        stats.byLocation[demolition.location] = 1;
                    }

                    // Recentes (últimos 30 dias)
                    if (new Date(demolition.createdAt) > thirtyDaysAgo) {
                        stats.recent++;
                    }
                });

                resolve(stats);
            };

            request.onerror = () => {
                console.error('Erro ao obter estatísticas:', request.error);
                reject(request.error);
            };
        });
    }

    // Limpar banco de dados (para testes)
    async clearDatabase() {
        if (!this.db) {
            await this.init();
        }

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.storeName, 'images'], 'readwrite');
            const demolitionStore = transaction.objectStore(this.storeName);
            const imageStore = transaction.objectStore('images');

            const demolitionRequest = demolitionStore.clear();
            const imageRequest = imageStore.clear();

            demolitionRequest.onsuccess = () => {
                imageRequest.onsuccess = () => {
                    console.log('Banco de dados limpo com sucesso');
                    resolve(true);
                };
            };

            demolitionRequest.onerror = () => {
                console.error('Erro ao limpar banco de dados:', demolitionRequest.error);
                reject(demolitionRequest.error);
            };
        });
    }
}

// Instância global do banco de dados
window.demolitionDB = new DemolitionDatabase();

// Inicializar banco de dados quando a página carregar
document.addEventListener('DOMContentLoaded', async () => {
    try {
        await window.demolitionDB.init();
        console.log('Sistema de banco de dados inicializado');
    } catch (error) {
        console.error('Erro ao inicializar banco de dados:', error);
    }
});
