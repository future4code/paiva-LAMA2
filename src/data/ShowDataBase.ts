import { Show, ShowOutputDTO, WeekDay } from "../model/Show"
import { BaseDatabase } from "./BaseDatabase"

export class ShowDataBase extends BaseDatabase{

    private static TABLE_NAME = "NOME_TABELA_SHOWS"

    public async createShow(show: Show): Promise<void>{
        await this.getConnection()
        .insert({
            id: show.getId(),
            band_id: show.getBandId(),
            start_time: show.getStartTime(),
            end_time: show.getEndTime(),
            week_Day: show.getWeekDay()
        })
        .into(ShowDataBase.TABLE_NAME)
    }

    public async getShowsByTimes(
        weekDay: WeekDay,
        startTime: number,
        endTime: number
    ): Promise<ShowOutputDTO[]>{

        const shows = await this.getConnection()
        .raw(`
        SELECT from show.id as id,
            show.start_time as startTime,
            show.end_time as endTime,
            show.week_day as weekDay
        FROM ${ShowDataBase.TABLE_NAME} show
        WHERE show.week_day = "${weekDay}"
        AND WHERE show.start_time <= "${endTime}"
        AND WHERE show.end_time >= "${startTime}"
        ORDER BY startTime ASC
        `)

        return shows.map((show: any) => {
            return{
                id: show.id,
                bandId: show.bandId,
                startTime: show.startTime,
                endTime: show.endTime,
                weekDay: show.weekDay
            }
        })
    }
}