// ts/script.ts

// --- IMPORTAÇÕES DOS BANCOS DE DADOS ---
import { featuredAnimeData, Anime } from './anime-data';
import { featuredMangaData, Manga } from './manga-data';


type Work = Anime | Manga;

// --- LÓGICA DO CARROSSEL ---
class Carousel {
    private trackElement!: HTMLDivElement;
    private prevButton!: HTMLButtonElement;
    private nextButton!: HTMLButtonElement;
    private data! : Work[];
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