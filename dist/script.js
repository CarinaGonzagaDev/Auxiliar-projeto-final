// --- ESTRUTURAS E DADOS ---
var featuredAnimeData = [
    { id: 1, title: 'Jujutsu Kaisen', coverUrl: 'img/Jujutsu Kaisen.jpg', rating: 8.7, season: 2, episode: 23, type: 'Anime' },
    { id: 2, title: 'Kimetsu no Yaiba', coverUrl: 'img/Kimetsu no Yaiba.jpg', rating: 9.8, season: 4, episode: 8, type: 'Anime' },
    { id: 3, title: 'Chainsaw Man', coverUrl: 'img/Chainsaw Man.jpg', rating: 9.8, season: 1, episode: 12, type: 'Anime' },
    { id: 4, title: 'Dandadan', coverUrl: 'img/Dandadan.jpg', rating: 9.8, season: 1, episode: 12, type: 'Anime' },
    { id: 5, title: 'Attack on Titan', coverUrl: 'https://i.imgur.com/Htl943r.jpg', rating: 9.3, season: 4, episode: 28, type: 'Anime' },
    { id: 6, title: 'Vinland Saga', coverUrl: 'https://i.imgur.com/gK2t2zW.jpg', rating: 9.2, season: 2, episode: 24, type: 'Anime' },
];
var featuredMangaData = [
    { id: 7, title: 'One Piece', coverUrl: 'img/One Piece Mangá.jpg', rating: 9.9, chapters: 1161, type: 'Mangá' },
    { id: 8, title: 'Look Back', coverUrl: 'img/Look Back Mangá.jpg', rating: 9.5, chapters: 1, type: 'Mangá' },
    { id: 9, title: 'A Bride\'s Story', coverUrl: 'img/Otoyomegatari Mangá.jpg', rating: 9.7, chapters: 112, type: 'Mangá' },
    { id: 10, title: 'Battle Angel Alita', coverUrl: 'img/Battle Angel Alita Mangá.jpg', rating: 9.3, chapters: 51, type: 'Mangá' },
    { id: 11, title: 'Dragon Ball Super', coverUrl: 'img/Dragon Ball Mangá.jpg', rating: 8.5, chapters: 104, type: 'Mangá' },
];
// --- LÓGICA DO CARROSSEL ---
var Carousel = /** @class */ (function () {
    function Carousel(trackId, prevBtnId, nextBtnId, data) {
        this.currentIndex = 0;
        var track = document.getElementById(trackId);
        var prevBtn = document.getElementById(prevBtnId);
        var nextBtn = document.getElementById(nextBtnId);
        if (!track || !prevBtn || !nextBtn) {
            console.error("Falha ao inicializar o carrossel: um ou mais elementos n\u00E3o foram encontrados para o ID: ".concat(trackId));
            return;
        }
        this.trackElement = track;
        this.prevButton = prevBtn;
        this.nextButton = nextBtn;
        this.data = data;
        this.populate();
        this.setupEventListeners();
    }
    Carousel.prototype.populate = function () {
        var trackHtml = '';
        for (var _i = 0, _a = this.data; _i < _a.length; _i++) {
            var work = _a[_i];
            var metaInfo = work.type === 'Anime'
                ? "<span>S".concat(work.season, "</span> | <span>E").concat(work.episode, "</span>")
                : "<span>".concat(work.chapters, " Cap\u00EDtulos</span>");
            trackHtml += "\n                <a href=\"/obra/".concat(work.id, "\" class=\"carousel-item\">\n                    <img src=\"").concat(work.coverUrl, "\" alt=\"Capa de ").concat(work.title, "\">\n                    <div class=\"item-info\">\n                        <h3>").concat(work.title, "</h3>\n                        <div class=\"item-meta\">").concat(metaInfo, "</div>\n                        <div class=\"item-rating\">\n                            <span class=\"star\">\u2605</span>\n                            <span>").concat(work.rating.toFixed(1), "</span>\n                        </div>\n                    </div>\n                </a>\n            ");
        }
        this.trackElement.innerHTML = trackHtml;
    };
    Carousel.prototype.setupEventListeners = function () {
        var _this = this;
        this.nextButton.addEventListener('click', function () { return _this.goToNext(); });
        this.prevButton.addEventListener('click', function () { return _this.goToPrev(); });
        window.addEventListener('resize', function () { return _this.updatePosition(); });
    };
    Carousel.prototype.updatePosition = function () {
        if (!this.trackElement)
            return;
        var items = this.trackElement.querySelectorAll('.carousel-item');
        if (items.length === 0)
            return;
        var item = items[0];
        var itemStyle = window.getComputedStyle(item);
        var itemMarginRight = parseFloat(itemStyle.marginRight);
        var itemWidth = item.offsetWidth + itemMarginRight;
        var offset = -this.currentIndex * itemWidth;
        this.trackElement.style.transform = "translateX(".concat(offset, "px)");
    };
    Carousel.prototype.goToNext = function () {
        var itemsPerView = this.getItemsPerView();
        if (!itemsPerView)
            return;
        var maxIndex = this.data.length - itemsPerView;
        if (this.currentIndex < maxIndex) {
            this.currentIndex++;
        }
        else {
            this.currentIndex = 0;
        }
        this.updatePosition();
    };
    Carousel.prototype.goToPrev = function () {
        var itemsPerView = this.getItemsPerView();
        if (!itemsPerView)
            return;
        if (this.currentIndex > 0) {
            this.currentIndex--;
        }
        else {
            this.currentIndex = this.data.length - itemsPerView;
        }
        this.updatePosition();
    };
    Carousel.prototype.getItemsPerView = function () {
        if (!this.trackElement)
            return null;
        var viewport = this.trackElement.parentElement;
        if (!viewport)
            return 1;
        var viewportWidth = viewport.offsetWidth;
        var item = this.trackElement.querySelector('.carousel-item');
        if (!item)
            return 1;
        var itemStyle = window.getComputedStyle(item);
        var itemMargin = parseFloat(itemStyle.marginLeft) + parseFloat(itemStyle.marginRight);
        var itemWidth = item.offsetWidth + itemMargin;
        return Math.max(1, Math.floor(viewportWidth / itemWidth));
    };
    return Carousel;
}());
// --- INICIALIZAÇÃO ---
function inicializarCarrosseis() {
    new Carousel('anime-carousel-track', 'anime-prev-btn', 'anime-next-btn', featuredAnimeData);
    new Carousel('manga-carousel-track', 'manga-prev-btn', 'manga-next-btn', featuredMangaData);
}
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializarCarrosseis);
}
else {
    inicializarCarrosseis();
}
