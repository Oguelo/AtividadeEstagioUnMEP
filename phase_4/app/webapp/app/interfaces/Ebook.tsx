export default interface Ebook {
    id: number;
    title: string;
    cover: string;
    price: number;
    size?: number;
    author: string;
    genre?: string;
    pages?: number;
    summary: string | JSX.Element;
    releaseYear: string;
    languages?: string[];
    isAvailable: boolean;
}