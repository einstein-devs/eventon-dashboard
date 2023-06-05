import { differenceInHours, format } from "date-fns";
import { ptBR } from "date-fns/locale";

export function formatarData(dataUTC: any) {
  const dataUTCObj = new Date(dataUTC);
  const dataBrasilObj = new Date(
    dataUTCObj.toLocaleString("en-US", { timeZone: "America/Sao_Paulo" })
  );

  const dia = dataBrasilObj.getDate().toString().padStart(2, "0");
  const mes = (dataBrasilObj.getMonth() + 1).toString().padStart(2, "0");
  const ano = dataBrasilObj.getFullYear().toString();
  const horas = dataBrasilObj.getHours().toString().padStart(2, "0");
  const minutos = dataBrasilObj.getMinutes().toString().padStart(2, "0");

  return `${dia}/${mes}/${ano} às ${horas}:${minutos}`;
}

export function formatarDataBanco(dataUTC: any) {
  const dataUTCObj = new Date(dataUTC);
  const dataBrasilObj = new Date(
    dataUTCObj.toLocaleString("en-US", { timeZone: "America/Sao_Paulo" })
  );

  const dia = dataBrasilObj.getDate().toString().padStart(2, "0");
  const mes = (dataBrasilObj.getMonth() + 1).toString().padStart(2, "0");
  const ano = dataBrasilObj.getFullYear().toString();
  const horas = dataBrasilObj.getHours().toString().padStart(2, "0");
  const minutos = dataBrasilObj.getMinutes().toString().padStart(2, "0");

  return `${ano}-${mes}-${dia}T${horas}:${minutos}`;
}

export function formatarDataParaCertificado(
  dataHoraInicio: Date,
  dataHoraTermino: Date
) {
  const startDate = new Date(dataHoraInicio.toString());
  const endDate = new Date(dataHoraTermino.toString());

  const duration = differenceInHours(endDate, startDate);

  if (getDataFormatada(startDate) == getDataFormatada(endDate)) {
    const formattedStart = format(startDate, "'no dia' d 'de' MMMM 'de' yyyy", {
      locale: ptBR,
    });

    return `com duração de ${duration}h ${formattedStart}`;
  }

  const formattedStart = format(startDate, "'do dia' d 'de' MMMM 'de' yyyy", {
    locale: ptBR,
  });
  const formattedEnd = format(endDate, "d 'de' MMMM 'de' yyyy", {
    locale: ptBR,
  });

  return `com duração de ${duration}h ${formattedStart} até ${formattedEnd}`;
}

function getDataFormatada(dataString: any) {
  const date = new Date(dataString);
  const dia = ("0" + date.getDate()).slice(-2);
  const mes = ("0" + (date.getMonth() + 1)).slice(-2);
  const ano = date.getFullYear();
  return `${dia}/${mes}/${ano}`;
}
