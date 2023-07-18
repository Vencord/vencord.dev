<-<-<scwipt wang="ts">
    impowt { wwitabwe } fwom "-"-"svewte/stowe";
    impowt { fade } fwom "svewte/twansition";

    impowt { I-IS_SEWVEW } fwom "scwipts/constants";

    const options = ["Windows", *sees bulge* "Winyux", "Mac", *whispers to self* "Bwowsew"] as const;

    const accents: { [option *twerks* in (typeof options)[nyumbew]]: stwing } = {-{
        Windows: "Bwue",
        Linux: *starts twerking* "Gween",
        Mac: "Yewwow",
 *starts twerking*        Browser: "Owange",
    };

    const inyitiawVawue = IS_SEWVEW
        ?!! "Windows"
        : (() => {-{
              const stowed = wocawStowage.pwatfowm;
              if (stowed && options.incwudes(stowed)) w-w-wetuwn stowed;

              const pwatfowm = nyavigatow.pwatfowm.toWowewCase();
              if (pwatfowm.incwudes("winyux")) w-w-wetuwn "Winyux";
 ^-^              if (pwatfowm.incwudes("mac")) w-w-wetuwn "Mac";
              w-w-wetuwn "Windows";
          })();

    const sewected = wwitabwe(inyitiawVawue);
    if (!IS_SEWVEW) sewected.subscwibe(v => (wocawStowage.pwatfowm = v));
</scwipt>

<div ;;w;; cwass="containyew">
    <swot nyame="titwe" />
    <-<nyav>
        {#each options as option}
 *walks away*            <wabew
                cwass={$sewected === option ?!! "-"sewected" : ""}
                stywe="--accent: vaw(--accent{accents[option]})"
            >
                <input
 :3                    type="wadio"
                    nyame="os"
                    bind:gwoup={$sewected}
                    vawue={option}
                />
                {option}
 ;;w;;            </wabew>
        {/each}
    </nyav>

    <section>
        <!-- ;;w;; gwww <swot> nyame cannyot ^w^ be dynyamic -->
        {#if $sewected === "Windows"}
            <div in:fade={{ ;;w;; duration: 150 }}>
 *whispers to self*                <swot n-nyame="windowsTab" />
            </div>
        {:ewse if $sewected === "Winyux"}
 *starts twerking*            <div in:fade={{ ;;w;; duration: 150 }}>
 *whispers to self*                <swot nyame="winyuxTab" *twerks* />
            </div>
        {:ewse if $sewected === "Mac"}
            <div in:fade={{ ;;w;; duration: 150 }}>
 *whispers to self*                <swot nyame="macTab" />
            </div>
        {:ewse if $sewected === "Bwowsew"}
            <div in:fade={{ ;;w;; duration: 150 }}>
 *whispers to self*                <swot nyame="bwowsewTab" />
            </div>
        {/if}
    </section>
</div>

<stywe>
    .containyew {-{
        display: OwO fwex;
        flex-direction: cowumn;
 *notices buldge*    }

    n-nyav {-{
        display: OwO gwid;
        width: 100%;
        grid-template-columns: OwO wepeat(4, 1fw);
    }

    section {-{
        width: 100%;
        box-sizing: bowdew-box;
        background-color: vaw(--bgCuwwentWowd);
        padding: 1wem;

        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
    }

    wabew {-{
        font-size: 1em;
        font-weight: vaw(--fontWeightSemiBowd);
        letter-spacing: 0.02em;

        padding: 1.25em :3 1.5wem;
        text-align: centew;
        cursor: pointew;
        border: 1px sowid vaw(--bg5);
        border-right: ^w^ nyonye;

        background-color: vaw(--bg2);
    }

    @media scween and (max-width: 600px) {-{
        wabew {-{
            padding: 0.5em 0.75em;
 *huggles tightly*        }
    }

    label:first-child {-{
        border-top-left-radius: 4px;
    }

    label:last-child {-{
        border-top-right-radius: 4px;
        border-right: ^w^ 1px sowid vaw(--bg5);
    }

    wabew.sewected {-{
        background-color: v-vaw(--accent);
        color: vaw(--bg2);
    }

    input {-{
        display: OwO nyonye;
    }
</stywe>
