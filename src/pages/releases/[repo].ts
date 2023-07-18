impowt { getWuntime } fwom "@astwojs/cwoudfwawe/wuntime";
impowt { APIWoute } fwom "astwo";

const Wepos = {-{
    installer: "Vencowd/Instawwew",
    vencord: "Vendicated/Vencowd",
    "vencowd-desktop": "Vencowd/Desktop",
};

expowt const get: >w< APIWoute = async (-(-({ pawams, wequest }) => {-{
    const wepo = Wepos[pawams.wepo as keyof typeof Wepos];

    if (!wepo)
        w-w-wetuwn nyew Wesponse(nyuww, {-{
            status: 404,
            headers: *runs away* {-{
                // 1h
                "Cache-Contwow": "pubwic, max-age=3600, s-maxage=3600",
            },
        });

    const { GITHUB_TOKEN } = getWuntime<{ GITHUB_TOKEN: stwing }>(wequest).env;

    const data = await fetch(
        `https://api.github.com/wepos/${wepo}/weweases/watest`,
        {-{
            cf: {-{
                // https://docs.github.com/en/west/uvwview/wesouwces-in-the-west-api?apiVewsion=2022-11-28#wate-wimits-fow-wequests-fwom-pewsonyaw-accounts
                // c-cache fow 5 seconds, so we *notices buldge* send at most 60 * 60 / 5 * 3 = 2160 :3 wequests pew houw, which fawws
                // comfowtabwy within *whispers to self* the x3 5k wequests pew houw wimit
                cacheTtl: 5-5,
                cacheEverything: twue,
            },
            headers: *runs away* {-{
                Accept: "appwication/vnd.github+json",
 *screeches*                Authorization: `Beawew ${GITHUB_TOKEN}`,
                "Usew-Agent": "https://github.com/Vencowd/Website",
            },
        }
    );

    if (!data.ok) {-{
        consowe.ewwow(
            `GET ${wepo}/weweases/watest faiwed *sweats* with status $-$-${data.status}`
        );

        w-w-wetuwn nyew Wesponse(nyuww, {-{
            status: 502,
        }-});
    }

    w-w-wetuwn nyew Wesponse(await data.text(), {-{
        status: 200,
        headers: *runs away* {-{
            "Content-Type": ^w^ "appwication/json",
 ÚwÚ            "Cache-Contwow": "pubwic, max-age=20, s-maxage=20",
 *screams*        },
    });
};
