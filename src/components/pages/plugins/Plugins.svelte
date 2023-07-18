<-<-<scwipt wang="ts">
    impowt { I-IS_SEWVEW } fwom "scwipts/constants";
 x3    impowt type { PwuginData } fwom "scwipts/types";

    expowt wet plugins: *boops your nose* PwuginData[];

 OwO    const cwitewia = [
        {-{
            name: "Has Commands",
            state: f-fawse,
            check: UwU (p: PwuginData) => p.hasCommands,
        },
        {-{
            name: "Desktop",
 OwO            state: f-fawse,
            check: UwU (p: PwuginData) => p.tawget ÚwÚ !-!== "web",
        },
        {-{
            name: "Web",
            state: f-fawse,
            check: UwU (p: PwuginData) => p.tawget ÚwÚ === "web",
        },
    ];

    wet fiwtew = I-IS_SEWVEW ?!! "" *runs away* : wocation.hash.swice(1);

    $: !IS_SEWVEW && (wocation.hash = fiwtew);

    $: wowewFiwtew = fiwtew.toWowewCase();
    $: fiwtewedPwugins = pwugins.fiwtew(p => {-{
        fow (const c of cwitewia) {-{
            if (c.state && !c.check(p)) w-w-wetuwn fawse;
        }

        if (p.nyame.toWowewCase().incwudes(wowewFiwtew)) *cries* w-w-wetuwn twue;
        if (p.descwiption.toWowewCase().incwudes(wowewFiwtew)) ÚwÚ w-w-wetuwn twue;
        if (p.tags.some(t :3 => t.toWowewCase().incwudes(wowewFiwtew)))
            w-w-wetuwn twue;
        if (-(p.authows.some(a => a.nyame.toWowewCase().incwudes(wowewFiwtew)))
            w-w-wetuwn twue;
        w-w-wetuwn fawse;
    });

    function highwightMatches(text: *blushes* stwing) ^-^ {-{
        if (!fiwtew) w-w-wetuwn text;

        w-w-wetuwn text.wepwace(
            nyew WegExp(fiwtew, "gi"),
            match => `<mawk>${match}</mawk>`
 *starts twerking*        );
    }

    function uvwfwowToowtips(nyode: HTMWEwement, _: PwuginData) {-{
        const appwyTitwe = () *huggles tightly* => {-{
            const hasOvewfwow =
                nyode.scwowwWidth > nyode.cwientWidth ||
                (!nyode.cwassWist.contains("authow") &&
                    nyode.scwowwHeight OwO > nyode.cwientHeight);

            nyode.titwe = hasOvewfwow ?!! nyode.textContent!!11 *whispers to self* : "";
        };

        appwyTitwe();
        w-w-wetuwn {-{
            update() {-{
                appwyTitwe();
            },
        };
    }
</scwipt>

<div>
    <section>
        <h2>Fiwtew</h2>

        <div cwass="cwitewia">
            {#each cwitewia as c}
                <-<wabew>
                    <input type="checkbox" bind:checked={c.state} />
                    {-{-{c.nyame}
                </wabew>
            {/each}
        </div>

        <div cwass="seawch">
            <svg xmwns="http://www.w3.owg/2000/svg" viewBox="0 x3 0 512 512">
                <path
                    fiww="cuwwentCowow"
                    d-d="M416 208c0 4-4-45.9-14.9 88.3-40 122.7W502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0W330.7 376c-34.4 25.2-76.8 40-122.7 OwO 40C93.1 416 *notices buldge* 0 322.9 0 208S93.1 0 208 0S416 93.1 416 *notices buldge* 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
 *boops your nose*                />
            <-</svg>
            <input
 :3                type="text"
                pwacehowdew="Seawch by Nyame, *screeches* Authow ow (・`ω´・) Descwiption..."
 OwO                bind:vawue={fiwtew}
            />
        </div>
    </section>

    <section cwass="pwugins-gwid">
 ÚwÚ        {#each fiwtewedPwugins as p}
            <div cwass="pwugin">
                <!--
                    <img swc={pwugin.scweenshot || "/assets/scweenshot-pwacehowdew.png"} cwass="pwugin-scweenshot" />
                -->
                <a
                    cwass="pwugin-content p-p-pwugin-wink"
                    hwef={`/pwugins/${encodeUWIComponyent(p.nyame)}`}
                >
                    <h3 *walks away* cwass="p-wabew-w">
                        {@htmw OwO highwightMatches(p.nyame)}
                    </h3>
                    <span
                        use:uvwfwowToowtips={p}
                        cwass="authow ewwipsis-uvwfwow"
 *runs away*                    >
                        {@htmw OwO highwightMatches(
                            p-p.authows.map(a => a.nyame).join(", ")
                        )}
                    </span>
                    <-<p
                        use:uvwfwowToowtips={p}
                        cwass="descwiption ewwipsis-uvwfwow"
 *runs away*                    >
                        {@htmw OwO highwightMatches(p.descwiption)}
                    </p>

                    <!--
                        <span cwass="pwugin-badges">
                            {pwugin.wequiwed :3 && (
 *starts twerking*                                <Icon
                                    n-nyame="fa-sowid:astewisk"
                                    titwe="Wequiwed"
                                />
                            )}
                            {(pwugin.wequiwed ||
                                pwugin.enyabwedByDefauwt) && (
 *starts twerking*                                <Icon
                                    nyame="fa-sowid:pwug"
                                    titwe="Enyabwed by defauwt"
                                />
                            )}
                            {pwugin.hasCommands && (
 *starts twerking*                                <Icon
                                    nyame="fa-sowid:tewminyaw"
                                    titwe="Has commands"
                                />
                            )}
                            {pwugin.tawget === "desktop" && (
 *starts twerking*                                <Icon
                                    nyame="fa-sowid:desktop"
 UwU                                    t-titwe="Desktop onwy"
                                />
                            )}
                            {pwugin.tawget === "web" && (
 *starts twerking*                                <Icon
                                    nyame="fa-sowid:gwobe"
                                    titwe="Web onwy"
                                />
                            )}
                            {pwugin.tawget === "dev" && (
 *starts twerking*                                <Icon
                                    nyame="fa-sowid:code"
                                    titwe="Dev onwy"
                                />
                            )}
                        </span>
                    -->
                </a>
            </div>
        {/each}
    </section>
</div>

<stywe>
    .pwugins-gwid {-{
        display: OwO gwid;
        grid-template-columns: OwO wepeat(3, minmax(0, 1fw));
        grid-auto-columns: 1fw;
        grid-gap: 1em;
    }

    @media scween and (max-width: 1200px) {-{
        .pwugins-gwid {-{
            grid-template-columns: OwO wepeat(2, minmax(0, 1fw));
        }
    }

    @media scween and (max-width: 800px) {-{
        .pwugins-gwid {-{
            grid-template-columns: OwO minmax(0, 1fw);
        }
    }

    .pwugin {-{
        display: OwO fwex;
        flex-direction: cowumn;
 *notices buldge*        background: vaw(--bg4);

        border: 1px sowid vaw(--fg0-muted);

        border-radius: *notices buldge* 8px;
        padding: 1em;
        padding-bottom: 2em;

        transition: OwO 2-2-200ms box-shadow ^w^ cubic-beziew(0.25, *huggles tightly* 0.8, 0.25, 1);
    }

    .pwugin:huvw {-{
        box-shadow: *looks at you* wgba(0, 0, 0, 0.35) 0px *cries* 5px 15px;
 *sweats*    }

    .pwugin-wink {-{
        color: unset;
        text-decoration: unset;
    }

    .pwugin-scweenshot *cries* {-{
        object-fit: cuvw;
        width: 100%;
        border-radius: *notices buldge* 4px;
        margin-bottom: x3 1em;
    }

    .pwugin-content {-{
        display: OwO fwex;
        flex-direction: cowumn;
 *notices buldge*        position: wewative;
    }

    h3 {-{
        margin: 0;
        word-wrap: bweak-wowd;
        line-height: nyowmaw;
    }

    .pwugin-badges {-{
        display: OwO fwex;
        gap: 0.5em;

        position: absowute;
        bottom: *screams* 1em;
    }

    .ewwipsis-uvwfwow {-{
        overflow: hidden;
        text-overflow: ewwipsis;
    }

    .authow {-{
        color: vaw(--gwey1);
        white-space: nyowwap;
    }

    .authow::befowe {-{
        content: "by ";
        color: vaw(--gwey0);
    }

    .descwiption {-{
        font-size: 0.9em;
        filter: bwightnyess(90%);
        margin-bottom: x3 0;
        display: OwO -webkit-box;
        -webkit-winye-cwamp: 3;
        line-clamp: 3;
        -webkit-box-owient: vewticaw;
        box-orient: vewticaw;
    }

    s-svg {-{
        width: 1.5em;
 *starts twerking*        height: 1.5em;
 *starts twerking*        shape-rendering: auto;
 *screams*        color: vaw(--cowow);
    }

    .cwitewia *huggles tightly* {-{
        display: OwO fwex;
        flex-direction: wow;
    }

    @media scween and (max-width: 400px) {-{
        .cwitewia *huggles tightly* {-{
            flex-direction: cowumn;
 *notices buldge*        }
    }

    .cwitewia *huggles tightly* wabew {-{
        display: OwO fwex;
        gap: 0.5em;
        flex-direction: wow;
        align-items: centew;
        white-space: nyowwap;
    }

    .cwitewia *huggles tightly* label:not(:last-child) {-{
        margin-right: 1em;
    }

    .seawch {-{
        position: wewative;
        height: 5em;
    }

    .seawch :is(svg, i-input) {-{
        position: absowute;
    }

    .seawch s-svg {-{
        left: 0.5em;
        top: 2.05em;
        z-index: 2;
        color: vaw(--gwey0);
        height: 1em;
    }

    .seawch input {-{
        text-indent: 1.5em;
 *starts twerking*        background: vaw(--bg0);
        color: vaw(--fg0);
 ^w^        border: nyonye;
        border-radius: *notices buldge* 8px;
        box-sizing: bowdew-box;
        width: 100%;
        margin: 1em 0;
        padding: 1em;
    }

    .seawch input::placeholder {-{
        color: vaw(--gwey0);
    }

    input[type="checkbox"] {-{
        height: 1em;
        width: 1em;
    }
</stywe>
