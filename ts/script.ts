// --- ESTRUTURAS E DADOS ---

interface Work {
    id: number;
    title: string;
    coverUrl: string;
    rating: number;
    type: 'Anime' | 'Mangá';
    season?: number;
    episode?: number;
    chapters?: number;
}

const featuredAnimeData: Work[] = [
    { id: 1, title: 'Jujutsu Kaisen', coverUrl: 'img/Jujutsu Kaisen.jpg', rating: 8.7, season: 2, episode: 23, type: 'Anime' },
    { id: 2, title: 'Kimetsu no Yaiba', coverUrl: 'img/Kimetsu no Yaiba.jpg', rating: 9.8, season: 4, episode: 8, type: 'Anime' },
    { id: 3, title: 'Chainsaw Man', coverUrl: 'img/Chainsaw Man.jpg', rating: 9.8, season: 1, episode: 12, type: 'Anime' },
    { id: 4, title: 'Dandadan', coverUrl: 'img/Dandadan.jpg', rating: 9.8, season: 1, episode: 12, type: 'Anime' },
    { id: 5, title: 'Attack on Titan', coverUrl: 'https://i.imgur.com/Htl943r.jpg', rating: 9.3, season: 4, episode: 28, type: 'Anime' },
    { id: 6, title: 'Vinland Saga', coverUrl: 'https://i.imgur.com/gK2t2zW.jpg', rating: 9.2, season: 2, episode: 24, type: 'Anime' },
];

const featuredMangaData: Work[] = [
    { id: 7, title: 'One Piece', coverUrl: 'img/One Piece Mangá.jpg', rating: 9.9, chapters: 1161, type: 'Mangá' },
    { id: 8, title: 'Look Back', coverUrl: 'img/Look Back Mangá.jpg', rating: 9.5, chapters: 1, type: 'Mangá' },
    { id: 9, title: 'A Bride\'s Story', coverUrl: 'img/Otoyomegatari Mangá.jpg', rating: 9.7, chapters: 112, type: 'Mangá' },
    { id: 10, title: 'Battle Angel Alita', coverUrl: 'img/Battle Angel Alita Mangá.jpg', rating: 9.3, chapters: 51, type: 'Mangá' },
    { id: 11, title: 'Dragon Ball Super', coverUrl: 'img/Dragon Ball Mangá.jpg', rating: 8.5, chapters: 104, type: 'Mangá' },
];


// --- LÓGICA DO CARROSSEL ---

class Carousel {
    private trackElement!: HTMLDivElement;
    private prevButton!: HTMLButtonElement;
    private nextButton!: HTMLButtonElement;
    // CORREÇÃO: Adicionamos o "!" aqui também.
    private data!: Work[];
    private currentIndex = 0;

    constructor(trackId: string, prevBtnId: string, nextBtnId: string, data: Work[]) {
        const track = document.getElementById(trackId);
        const prevBtn = document.getElementById(prevBtnId);
        const nextBtn = document.getElementById(nextBtnId);

        if (!track || !prevBtn || !nextBtn) {
            console.error(`Falha ao inicializar o carrossel: um ou mais elementos não foram encontrados para o ID: ${trackId}`);
            return; 
        }

        this.trackElement = track as HTMLDivElement;
        this.prevButton = prevBtn as HTMLButtonElement;
        this.nextButton = nextBtn as HTMLButtonElement;
        this.data = data;

        this.populate();
        this.setupEventListeners();
    }

    private populate(): void {
        let trackHtml = '';
        for (const work of this.data) {
            const metaInfo = work.type === 'Anime'
                ? `<span>S${work.season}</span> | <span>E${work.episode}</span>`
                : `<span>${work.chapters} Capítulos</span>`;

            trackHtml += `
                <a href="/obra/${work.id}" class="carousel-item">
                    <img src="${work.coverUrl}" alt="Capa de ${work.title}">
                    <div class="item-info">
                        <h3>${work.title}</h3>
                        <div class="item-meta">${metaInfo}</div>
                        <div class="item-rating">
                            <span class="star">★</span>
                            <span>${work.rating.toFixed(1)}</span>
                        </div>
                    </div>
                </a>
            `;
        }
        this.trackElement.innerHTML = trackHtml;
    }

    private setupEventListeners(): void {
        this.nextButton.addEventListener('click', () => this.goToNext());
        this.prevButton.addEventListener('click', () => this.goToPrev());
        window.addEventListener('resize', () => this.updatePosition());
    }
    
    private updatePosition(): void {
        if (!this.trackElement) return;

        const items = this.trackElement.querySelectorAll('.carousel-item');
        if (items.length === 0) return;

        const item = items[0] as HTMLElement;
        const itemStyle = window.getComputedStyle(item);
        const itemMarginRight = parseFloat(itemStyle.marginRight);
        const itemWidth = item.offsetWidth + itemMarginRight;
        
        const offset = -this.currentIndex * itemWidth;
        this.trackElement.style.transform = `translateX(${offset}px)`;
    }

    private goToNext(): void {
        const itemsPerView = this.getItemsPerView();
        if (!itemsPerView) return;
        
        const maxIndex = this.data.length - itemsPerView;

        if (this.currentIndex < maxIndex) {
            this.currentIndex++;
        } else {
            this.currentIndex = 0;
        }
        this.updatePosition();
    }

    private goToPrev(): void {
        const itemsPerView = this.getItemsPerView();
        if (!itemsPerView) return;

        if (this.currentIndex > 0) {
            this.currentIndex--;
        } else {
            this.currentIndex = this.data.length - itemsPerView;
        }
        this.updatePosition();
    }
    
    private getItemsPerView(): number | null {
        if (!this.trackElement) return null;
        const viewport = this.trackElement.parentElement as HTMLElement;
        if (!viewport) return 1;
        
        const viewportWidth = viewport.offsetWidth;
        const item = this.trackElement.querySelector('.carousel-item') as HTMLElement;
        if (!item) return 1;

        const itemStyle = window.getComputedStyle(item);
        const itemMargin = parseFloat(itemStyle.marginLeft) + parseFloat(itemStyle.marginRight);
        const itemWidth = item.offsetWidth + itemMargin;

        return Math.max(1, Math.floor(viewportWidth / itemWidth));
    }
}

// --- INICIALIZAÇÃO ---

function inicializarCarrosseis() {
    new Carousel('anime-carousel-track', 'anime-prev-btn', 'anime-next-btn', featuredAnimeData);
    new Carousel('manga-carousel-track', 'manga-prev-btn', 'manga-next-btn', featuredMangaData);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializarCarrosseis);
} else {
    inicializarCarrosseis();
}