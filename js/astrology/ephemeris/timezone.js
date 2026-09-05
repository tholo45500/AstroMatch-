// Conversion déterministe d'une heure locale de naissance vers UTC.
// Les fuseaux sont IANA et les transitions DST sont traitées explicitement :
// une heure inexistante ou ambiguë est refusée plutôt que choisie arbitrairement.

function partsFor(date, timeZone) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone, year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23"
  }).formatToParts(date);
  return Object.fromEntries(parts.filter(p => p.type !== "literal").map(p => [p.type, p.value]));
}

function offsetMinutesAt(utcDate, timeZone) {
  const p = partsFor(utcDate, timeZone);
  const asUtc = Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute, +p.second);
  return Math.round((asUtc - utcDate.getTime()) / 60000);
}

function sameLocal(parts, y, m, d, hh, mm) {
  return +parts.year === y && +parts.month === m && +parts.day === d && +parts.hour === hh && +parts.minute === mm;
}

export function isValidTimeZone(timeZone) {
  if (!timeZone || typeof timeZone !== "string") return false;
  try { new Intl.DateTimeFormat("en-US", { timeZone }).format(); return true; }
  catch { return false; }
}

export function localBirthToUtc(date, time, timeZone) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error("Date locale invalide.");
  if (!/^\d{2}:\d{2}$/.test(time)) throw new Error("Heure locale invalide.");
  if (!isValidTimeZone(timeZone)) throw new Error(`Fuseau IANA invalide : ${timeZone}`);

  const [y,m,d] = date.split("-").map(Number);
  const [hh,mm] = time.split(":").map(Number);
  const guess = new Date(Date.UTC(y, m - 1, d, hh, mm, 0));
  const offsets = new Set();
  for (const days of [-2,-1,0,1,2]) offsets.add(offsetMinutesAt(new Date(guess.getTime() + days * 86400000), timeZone));

  const candidates = [...offsets]
    .map(offset => new Date(guess.getTime() - offset * 60000))
    .filter(candidate => sameLocal(partsFor(candidate, timeZone), y, m, d, hh, mm));

  if (candidates.length === 0) {
    const err = new Error(`Heure locale inexistante dans ${timeZone} : ${date} ${time}`);
    err.type = "LOCAL_TIME_NONEXISTENT";
    throw err;
  }
  if (candidates.length > 1) {
    const err = new Error(`Heure locale ambiguë dans ${timeZone} : ${date} ${time}`);
    err.type = "LOCAL_TIME_AMBIGUOUS";
    throw err;
  }
  return candidates[0];
}

export function localBirthAtNoonUtc(date, timeZone) {
  return localBirthToUtc(date, "12:00", timeZone);
}
