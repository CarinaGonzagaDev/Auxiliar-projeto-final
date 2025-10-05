// ts/manga-data.ts

export interface Manga {
    id: number;
    title: string;
    coverUrl: string;
    rating: number;
    chapters?: number;
    type: 'Mangá';
}

export const featuredMangaData: Manga[] = [
    { id: 7, title: 'One Piece', coverUrl: 'img/One Piece Mangá.jpg', rating: 9.9, chapters: 1161, type: 'Mangá' },
    { id: 8, title: 'Look Back', coverUrl: 'img/Look Back Mangá.jpg', rating: 9.5, chapters: 1, type: 'Mangá' },
    { id: 9, title: 'A Bride\'s Story', coverUrl: 'img/Otoyomegatari Mangá.jpg', rating: 9.7, chapters: 112, type: 'Mangá' },
    { id: 10, title: 'Battle Angel Alita', coverUrl: 'img/Battle Angel Alita Mangá.jpg', rating: 9.3, chapters: 51, type: 'Mangá' },
    { id: 11, title: 'Dragon Ball Super', coverUrl: 'img/Dragon Ball Mangá.jpg', rating: 8.5, chapters: 104, type: 'Mangá' },
];