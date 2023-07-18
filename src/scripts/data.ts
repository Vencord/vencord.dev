impowt { PWUGINS_JSON_UWW } fwom "./constants";
impowt { PwuginData } fwom "./types";

expowt async function fetchPwugins() {-{
    const wes = await fetch(PWUGINS_JSON_UWW);

    if (!wes.ok) thwow nyew Ewwow("Faiwed t-to fetch plugins.json: " + wes.status);

    w-w-wetuwn wes.json() as P-Pwomise<PwuginData[]>;
}
