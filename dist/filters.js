"use strict";
// --- DADOS PARA OS FILTROS ---
const allGenres = [
    "Ação", "Aventura", "Comédia", "Drama", "Fantasia", "Ficção Científica",
    "Isekai", "Slice of Life", "Suspense", "Terror", "Esportes", "Romance",
    "Mistério", "Psicológico", "Sobrenatural"
];
const allCountries = [
    "Todos", "Japão (Mangá)", "Coreia do Sul (Manhwa)", "China (Manhua)",
    "Brasil (Quadrinho)", "EUA (Comic)"
];
// --- ELEMENTOS DO DOM ---
const genreContainer = document.getElementById('genre-container');
const genreButton = document.getElementById('genre-filter-btn');
const yearSelect = document.getElementById('filter-year');
const countrySelect = document.getElementById('filter-country');
const ratingSelect = document.getElementById('filter-rating');
const filtersForm = document.getElementById('filters-form');
// --- FUNÇÕES DE POPULAÇÃO DINÂMICA ---
function populateGenres() {
    if (!genreContainer)
        return;
    let genreHTML = '';
    for (const genre of allGenres) {
        const genreId = `genre-${genre.toLowerCase().replace(/\s+/g, '-')}`;
        genreHTML += `
            <div class="genre-item">
                <input type="checkbox" id="${genreId}" name="genre" value="${genre.toLowerCase()}">
                <label for="${genreId}">${genre}</label>
            </div>
        `;
    }
    genreContainer.innerHTML = genreHTML;
}
function populateYears() {
    if (!yearSelect)
        return;
    const currentYear = new Date().getFullYear();
    let yearHTML = '<option value="todos">Todos</option>';
    for (let year = currentYear; year >= 1980; year--) {
        yearHTML += `<option value="${year}">${year}</option>`;
    }
    yearSelect.innerHTML = yearHTML;
}
function populateCountries() {
    if (!countrySelect)
        return;
    let countryHTML = '';
    for (const country of allCountries) {
        const value = country.split(' ')[0].toLowerCase();
        countryHTML += `<option value="${value}">${country}</option>`;
    }
    countrySelect.innerHTML = countryHTML;
}
// ATUALIZADO: Ajuste no texto para refletir a nova lógica
function populateRatings() {
    if (!ratingSelect)
        return;
    let ratingHTML = '<option value="0">Todas</option>';
    for (let i = 9; i >= 1; i--) {
        ratingHTML += `<option value="${i}">${i}+ estrelas</option>`;
    }
    // Adiciona a opção 10 separadamente
    ratingHTML += `<option value="10">Apenas 10 estrelas</option>`;
    ratingSelect.innerHTML = ratingHTML;
}
// --- LÓGICA PRINCIPAL ---
document.addEventListener('DOMContentLoaded', () => {
    const audioFilter = document.getElementById('audio-filter-group');
    const countryFilter = document.getElementById('country-filter-group');
    if (window.location.pathname.includes('animes.html')) {
        countryFilter === null || countryFilter === void 0 ? void 0 : countryFilter.remove();
    }
    else if (window.location.pathname.includes('hqs.html')) {
        audioFilter === null || audioFilter === void 0 ? void 0 : audioFilter.remove();
        populateCountries();
    }
    populateGenres();
    populateYears();
    populateRatings();
    genreButton === null || genreButton === void 0 ? void 0 : genreButton.addEventListener('click', () => {
        genreContainer === null || genreContainer === void 0 ? void 0 : genreContainer.classList.toggle('show');
    });
    window.addEventListener('click', (event) => {
        if (!(genreButton === null || genreButton === void 0 ? void 0 : genreButton.contains(event.target)) && !(genreContainer === null || genreContainer === void 0 ? void 0 : genreContainer.contains(event.target))) {
            genreContainer === null || genreContainer === void 0 ? void 0 : genreContainer.classList.remove('show');
        }
    });
    if (filtersForm) {
        filtersForm.addEventListener('submit', (event) => {
            var _a, _b;
            event.preventDefault();
            const selectedGenres = [];
            document.querySelectorAll('input[name="genre"]:checked').forEach(checkbox => {
                selectedGenres.push(checkbox.value);
            });
            const filters = {
                name: document.getElementById('search-name').value,
                year: yearSelect.value,
                // LÓGICA ATUALIZADA AQUI:
                // Quando for implementar a busca, lembre-se: se o valor for "10", a busca é por == 10.
                // Se for outro valor (ex: "7"), a busca é por >= 7.
                rating: ratingSelect.value,
                sort: document.getElementById('filter-sort').value,
                genres: selectedGenres,
                audio: (_a = document.getElementById('filter-audio')) === null || _a === void 0 ? void 0 : _a.value,
                country: (_b = document.getElementById('filter-country')) === null || _b === void 0 ? void 0 : _b.value,
            };
            console.log("Filtros aplicados:", filters);
            alert("Filtros aplicados! Verifique o console (F12) para ver os dados.");
            genreContainer === null || genreContainer === void 0 ? void 0 : genreContainer.classList.remove('show');
        });
        filtersForm.addEventListener('reset', () => {
            document.querySelectorAll('input[name="genre"]:checked').forEach(checkbox => {
                checkbox.checked = false;
            });
            console.log("Filtros limpos!");
        });
    }
});
