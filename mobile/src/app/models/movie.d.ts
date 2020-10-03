export interface IGenre {
    id: number;
    name: string;
}

export interface IBelongsToCollection {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
}

export interface IProductionCompany{
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
}

export interface IProductionCountries{
    iso_3166_1: string;
    name: string;
}

export interface ISpokenLanguage {
    iso_639_1:string;
    name:string;
}
export interface ICrew{
    credit_id: string;
    department: string;
    gender:number;
    id:number;
    job: string; 
    name: string;
    profile_path: string;
}

export interface ICast{
    cast_id: number;
    character:string;
    credit_id:string;
    gender:number;
    id:number;
    name:string
    order:number;
    profile_path: string;
}

export interface ICasts{
    cast: ICast[];
    crew: ICrew[];
}

export interface IMovie {
    id?: number;
    title?: string;
    imdb_id?: string;
    tmdbId?: number;
    poster_path?: string;
    backdrop_path?: string;
    release_date?: Date;
    vote_average?: number;
    runtime?: number;
    watchedAt?: Date;
    belongs_to_collection?: IBelongsToCollection;
    budget?: number;
    genres?: IGenre[];
    homepage?: string;
    overview?: string;
    popularity?: number;
    production_companies?: IProductionCompany[];
    revenue?: number;
    spoken_languages?:ISpokenLanguage[]
    status?: string;
    tagline?: string;
    video?:boolean;
    vote_count?:number;
    casts?: ICasts;

}
