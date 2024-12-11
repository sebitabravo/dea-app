import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';


export const tiempoTranscurrido = (fechaBD: string | Date): string => {
    const fecha = typeof fechaBD === 'string' ? new Date(fechaBD) : fechaBD;

    return formatDistanceToNow(fecha, { addSuffix: true, locale: es });
};

export const timeElapsedAbv = (fechaBD: string | Date): string => {
    const fecha = typeof fechaBD === 'string' ? new Date(fechaBD) : fechaBD;
    const ahora = new Date();
    const diferenciaMs = Math.abs(ahora.getTime() - fecha.getTime());

    const segundos = Math.floor(diferenciaMs / 1000);
    const minutos = Math.floor(segundos / 60);
    const horas = Math.floor(minutos / 60);
    const dias = Math.floor(horas / 24);
    const meses = Math.floor(dias / 30);  // Aproximación
    const años = Math.floor(meses / 12);

    if (años > 0) {
        return `${años} año`; // años
    } else if (meses > 0) {
        return `${meses} mes`; // meses
    } else if (dias > 0) {
        return `${dias}d`; // días
    } else if (horas > 0) {
        return `${horas}h`; // horas
    } else if (minutos > 0) {
        return `${minutos}m`; // minutos
    } else {
        return `${segundos}s`; // segundos
    }
};
