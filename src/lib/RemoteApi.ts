// API to fecth BCB to get ufv values

// https://www.bcb.gob.bo/librerias/charts/ufv.php?cFecIni=2023-05-05&cFecFin=2023-06-05


function formatDate(date: number|Date) {
    const d = new Date(date)
    let month = '' + (d.getMonth() + 1),
        day = '' + d.getDate()
    const year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

function parseurl(from: number|Date, to: number|Date) {
    const f = formatDate(from),
        t = formatDate(to)

    return `https://www.bcb.gob.bo/librerias/charts/ufv.php?cFecIni=${f}&cFecFin=${t}`
}
interface UFV {
    fecha: string,
    val_ufv: string
}

export interface ufv {
    fecha: number,
    ufv: number
}

/**
 * Get UFV values on selected interval
 * @param from{number} start of the interval
 * @param to{number} end of the interval
 * @returns {Promise<UFV[]>}
 */
export function getUFVs(from: number|Date, to: number|Date) {
    return fetch(parseurl(from, to))
        .then((r) => {
            return r.json()
        }).then((r) => {
            return r as UFV[]
        }).then((r) => {
            return r.map((i) => {
                const dateString=i.fecha
                const dateParts = dateString.split("/");
                const dateObject = new Date(+dateParts[2], Number(dateParts[1]) - 1, +dateParts[0]);
                const r: ufv = {
                    fecha: dateObject.getTime(),
                    ufv: Number(i.val_ufv)
                }
                return r
            })
        })
}

/**
 * Get UFV value from a selected date
 * @param from{number} date selected
 * @returns {Promise<UFV[]>}
 */
export function getUFV(from: number|Date) {
    return getUFVs(from, from)
}