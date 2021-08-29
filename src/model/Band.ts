export class Band {
    constructor(
        private id: string,
        private name: string,
        private mainGenre: string,
        private responsible: string
    ) { }

    public getId(): string {
        return this.id
    }

    public getName(): string {
        return this.name
    }

    public getMainGenre(): string {
        return this.mainGenre
    }

    public getResposible():string {
        return  this.responsible
    }

    public setName(name: string) {
        this.name = name
    }

    public setMainGenre(mainGenre: string) {
        this.mainGenre = mainGenre
    }

    public setResposible(responsible: string) {
        this.responsible = responsible
    }

    public static toBand(data?: any): Band| undefined{
        return(data && new Band(
            data.id,
            data.name,
            data.mainGenre || data.main_genre || data.musicGenre,
            data.responsible
        ))
    }
}


export interface BandInputDTO{
    name: string,
    mainGenre: string,
    responsible: string
}