// ts/anime-data.ts

export interface Anime {
    id: number;
    title: string;
    coverUrl: string;
    rating: number;
    season?: number;
    episode?: number;
    type: 'Anime';
}

export const featuredAnimeData: Anime[] = [
    { id: 1, title: 'Jujutsu Kaisen', coverUrl: 'img/Jujutsu Kaisen.jpg', rating: 8.7, season: 2, episode: 23, type: 'Anime' },
    { id: 2, title: 'Kimetsu no Yaiba', coverUrl: 'img/Kimetsu no Yaiba.jpg', rating: 9.8, season: 4, episode: 8, type: 'Anime' },
    { id: 3, title: 'Chainsaw Man', coverUrl: 'img/Chainsaw Man.jpg', rating: 9.8, season: 1, episode: 12, type: 'Anime' },
    { id: 4, title: 'Dandadan', coverUrl: 'img/Dandadan.jpg', rating: 9.8, season: 1, episode: 12, type: 'Anime' },
    { id: 5, title: 'Attack on Titan', coverUrl: 'img/attack-on-titan.jpg', rating: 9.3, season: 4, episode: 28, type: 'Anime' },
    { id: 6, title: 'Vinland Saga', coverUrl: 'img/vinland-saga.jpg', rating: 9.2, season: 2, episode: 24, type: 'Anime' },
];